import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req, "customer");
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const notifications = await Notification.find({ customer: auth.id })
    .sort({ createdAt: -1 })
    .limit(100);

  const unreadCount = await Notification.countDocuments({
    customer: auth.id,
    read: false,
  });

  return NextResponse.json({ notifications, unreadCount });
}
