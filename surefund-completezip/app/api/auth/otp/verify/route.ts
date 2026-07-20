import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { signToken } from "@/lib/auth";

const bodySchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, "OTP must be 6 digits"),
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

    const { email, code } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    await connectDB();

    const existing = await Customer.findOne({ email: normalizedEmail });

    if (!existing || !existing.otpCode || !existing.otpExpiresAt) {
      return NextResponse.json({ error: "No OTP found, please request a new one" }, { status: 401 });
    }

    if (existing.otpExpiresAt < new Date()) {
      return NextResponse.json({ error: "OTP expired, please request a new one" }, { status: 401 });
    }

    if (existing.otpCode !== code) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    const customer = await Customer.findOneAndUpdate(
      { email: normalizedEmail },
      { $set: { isVerified: true }, $unset: { otpCode: "", otpExpiresAt: "" } },
      { new: true }
    );

    if (!customer) {
  return NextResponse.json({ error: "Customer not found" }, { status: 404 });
}

    const token = signToken({
      type: "customer",
      id: String(customer._id),
      email: customer.email,
    });

    const res = NextResponse.json({
      success: true,
      customer: {
        id: customer._id,
        fullName: customer.fullName,
        email: customer.email,
      },
    });

    res.cookies.set("surefund_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err) {
    console.error("verify OTP error:", err);
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}