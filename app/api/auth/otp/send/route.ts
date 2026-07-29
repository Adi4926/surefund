import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { sendOtpEmail } from "@/lib/email";

const bodySchema = z.object({
  email: z.string().min(1, "Email is required"), // पहले लचीला रखें ताकि चेक कर सकें
  fullName: z.string().min(2).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    
    // अगर गलती से यूजर ने ईमेल वाले बॉक्स में नाम और नाम वाले बॉक्स में ईमेल भर दिया हो, तो उन्हें सही क्रम में सेट करें
    let targetEmail = json.email || "";
    let targetName = json.fullName;

    if (targetEmail && !targetEmail.includes("@") && json.fullName && json.fullName.includes("@")) {
      // दोनों को आपस में बदल लें (Swap)
      const temp = targetEmail;
      targetEmail = json.fullName;
      targetName = temp;
    }

    const parsed = bodySchema.safeParse({ email: targetEmail, fullName: targetName });
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // सुनिश्चित करें कि यह वाकई एक वैध ईमेल है
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const normalizedEmail = targetEmail.trim().toLowerCase();
    
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

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
        $setOnInsert: { fullName: targetName || "SureFund Customer", email: normalizedEmail },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("send OTP error:", err);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}