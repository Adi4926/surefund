import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { notifyContactForm } from "@/lib/email";

const bodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(2),
  message: z.string().min(10),
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

    await notifyContactForm(parsed.data);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("contact form error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
