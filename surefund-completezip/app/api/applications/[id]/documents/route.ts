import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import LoanApplication from "@/models/LoanApplication";
import {
  uploadDocumentToCloudinary,
  MAX_DOC_SIZE_BYTES,
} from "@/lib/cloudinary";
import { getAuthFromRequest } from "@/lib/auth";

const bodySchema = z.object({
  documents: z
    .array(
      z.object({
        type: z.enum(["PAN", "Aadhaar", "Other"]),
        dataUri: z.string().startsWith("data:"),
        bytesEstimate: z.number().max(MAX_DOC_SIZE_BYTES, "File must be under 5MB"),
      })
    )
    .min(1, "Select at least one file"),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromRequest(req, "customer");
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json();
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { id } = await params;
  await connectDB();
  const application = await LoanApplication.findById(id);
  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  const uploaded = await Promise.all(
    parsed.data.documents.map(async (doc) => {
      const result = await uploadDocumentToCloudinary(
        doc.dataUri,
        `applications/${id}`
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

  application.documents.push(...uploaded);
  await application.save();

  return NextResponse.json({ success: true, documents: application.documents });
}
