import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Lead, { LEAD_STATUSES } from "@/models/Lead";
import Notification from "@/models/Notification";
import { getAuthFromRequest } from "@/lib/auth";
import LoanApplication from "@/models/LoanApplication";

const updateSchema = z.object({
  status: z.enum(LEAD_STATUSES).optional(),
  note: z.string().min(1).optional(),
  reminderAt: z.string().datetime().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromRequest(req, "admin");
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await connectDB();
  const lead = await Lead.findById(id);
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  return NextResponse.json({ lead });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromRequest(req, "admin");
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json();
  const parsed = updateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { id } = await params;
  await connectDB();
  const lead = await Lead.findById(id);
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  const { status, note, reminderAt } = parsed.data;
  const statusChanged = !!status && status !== lead.status;

  if (status) lead.status = status;
  if (reminderAt) lead.reminderAt = new Date(reminderAt);
  if (note) {
    lead.notes.push({ text: note, createdAt: new Date(), createdBy: (auth as any).email });
  }

  await lead.save();

  if (statusChanged) {
    // Keep the customer-facing LoanApplication status in sync with the Lead status
    await LoanApplication.updateMany({ lead: lead._id }, { $set: { status } });
  }

  if (statusChanged && lead.customer) {
    await Notification.create({
      customer: lead.customer,
      title: `Application Update — ${lead.productType}`,
      message: `Your ${lead.productType} application status is now "${status}".`,
    });
  }

  return NextResponse.json({ success: true, lead });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromRequest(req, "admin");
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await connectDB();
  const deleted = await Lead.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
