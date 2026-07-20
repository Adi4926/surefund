import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { signToken } from "@/lib/auth";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
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

    const { email, password } = parsed.data;
    await connectDB();

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = signToken({
      type: "admin",
      id: String(admin._id),
      email: admin.email,
      role: admin.role,
    });

    const res = NextResponse.json({
      success: true,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });

    res.cookies.set("surefund_admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("admin login error:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
