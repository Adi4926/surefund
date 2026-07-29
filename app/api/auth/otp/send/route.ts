import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { sendOtpEmail } from "@/lib/email";

const bodySchema = z.object({
  email: z.string().email("Enter a valid email address"),
  fullName: z.string().min(2).optional(), // used on first-time signup
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, fullName } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    await connectDB();

    // Basic rate-limit: block resend within 30 seconds
    const existing = await Customer.findOne({ email: normalizedEmail });
    if (existing?.lastOtpSentAt) {
      const secondsSince = (Date.now() - existing.lastOtpSentAt.getTime()) / 1000;
      if (secondsSince < 30) {
        return NextResponse.json(
          { error: `Please wait ${Math.ceil(30 - secondsSince)}s before resending OTP` },
          { status: 429 }
        );
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const sent = await sendOtpEmail(normalizedEmail, otp);
    if (!sent) {
      return NextResponse.json({ error: "Failed to send OTP email" }, { status: 500 });
    }

    await Customer.findOneAndUpdate(
      { email: normalizedEmail },
      {
        $set: {
          lastOtpSentAt: new Date(),
          otpCode: otp,
          otpExpiresAt: expiresAt,
        },
        $setOnInsert: { fullName: fullName || "SureFund Customer", email: normalizedEmail },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("send OTP error:", err);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}