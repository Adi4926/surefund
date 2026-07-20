import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { getAuthFromRequest } from "@/lib/auth";

const bodySchema = z.object({ read: z.boolean().default(true) });

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromRequest(req, "customer");
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json().catch(() => ({}));
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { id } = await params;
  await connectDB();
  const notification = await Notification.findOneAndUpdate(
    { _id: id, customer: auth.id },
    { $set: { read: parsed.data.read } },
    { new: true }
  );

  if (!notification) {
    return NextResponse.json({ error: "Notification not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, notification });
}
