import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import CibilRequest from "@/models/CibilRequest";
import Lead from "@/models/Lead";
import { notifyNewCibilRequest } from "@/lib/email";
import { getAuthFromRequest } from "@/lib/auth";

const cibilSchema = z.object({
  fullName: z.string().min(2),
  mobile: z.string().min(10),
  pan: z.string().min(10).max(10),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: "Consent is required to check your CIBIL score" }),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = cibilSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { fullName, mobile, pan, consentGiven } = parsed.data;
    await connectDB();

    const cibilRequest = await CibilRequest.create({
      fullName,
      mobile,
      pan,
      consentGiven,
      consentTimestamp: new Date(),
    });

    // Also create a lead so it shows up in the admin pipeline immediately.
    const lead = await Lead.create({
      productType: "Personal Loan",
      fullName,
      mobile,
      pan,
      source: "CIBIL Check",
      qualification: "Needs Review",
      status: "New Lead",
    });

    cibilRequest.convertedToLead = true;
    await cibilRequest.save();

    // TODO: call the real bureau API here (see fetchCibilScore below) once
    // a licensed CIBIL/Experian/Equifax data-partner agreement is in place.
    // const score = await fetchCibilScore({ pan, mobile });

    await notifyNewCibilRequest({ fullName, mobile, pan });

    return NextResponse.json({
      success: true,
      requestId: cibilRequest._id,
      leadId: lead._id,
      message: "Thanks! Our team will share your CIBIL report shortly.",
    });
  } catch (err) {
    console.error("CIBIL request error:", err);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}

// GET /api/cibil — admin only: list CIBIL check requests
// Note: fetchCibilScore integration point lives in lib/cibil.ts
export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req, "admin");
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const requests = await CibilRequest.find({}).sort({ createdAt: -1 }).limit(200);
  return NextResponse.json({ requests });
}

