import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import LoanApplication from "@/models/LoanApplication";
import Lead, { PRODUCT_TYPES } from "@/models/Lead";
import {
  uploadDocumentToCloudinary,
  MAX_DOC_SIZE_BYTES,
} from "@/lib/cloudinary";
import { notifyNewApplication } from "@/lib/email";
import { getAuthFromRequest } from "@/lib/auth";

const documentSchema = z.object({
  type: z.enum(["PAN", "Aadhaar"]),
  dataUri: z.string().startsWith("data:"),
  bytesEstimate: z.number().max(MAX_DOC_SIZE_BYTES, "File must be under 5MB"),
});

const applicationSchema = z.object({
  leadId: z.string().min(1),
  productType: z.enum(PRODUCT_TYPES),
  loanAmount: z.coerce.number().positive(),
  documents: z.array(documentSchema).min(1, "Upload at least one document"),
});

// POST /api/applications — submits the application + uploads docs to Cloudinary
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = applicationSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { leadId, productType, loanAmount, documents } = parsed.data;
    await connectDB();

    const lead = await Lead.findById(leadId);
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const uploaded = await Promise.all(
      documents.map(async (doc) => {
        const result = await uploadDocumentToCloudinary(
          doc.dataUri,
          `leads/${leadId}`
        );
        return {
          type: doc.type,
          url: result.url,
          publicId: result.publicId,
          format: result.format,
          bytes: result.bytes,
          uploadedAt: new Date(),
        };
      })
    );

    const application = await LoanApplication.create({
      lead: lead._id,
      customer: lead.customer,
      productType,
      loanAmount,
      documents: uploaded,
      status: "Documents Pending",
    });

    lead.status = "Documents Pending";
    await lead.save();

    await notifyNewApplication({
      fullName: lead.fullName,
      productType,
      loanAmount,
    });

    return NextResponse.json({ success: true, applicationId: application._id });
  } catch (err) {
    console.error("create application error:", err);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

// GET /api/applications — customer: own applications, admin: all applications
export async function GET(req: NextRequest) {
  const customerAuth = getAuthFromRequest(req, "customer");
  const adminAuth = getAuthFromRequest(req, "admin");

  if (!customerAuth && !adminAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  if (adminAuth) {
    const applications = await LoanApplication.find({})
      .populate("lead")
      .sort({ createdAt: -1 });
    return NextResponse.json({ applications });
  }

  const applications = await LoanApplication.find({ customer: customerAuth!.id })
    .populate("lead")
    .sort({ createdAt: -1 });
  return NextResponse.json({ applications });
}
