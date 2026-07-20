import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { getAuthFromRequest } from "@/lib/auth";

const updateSchema = z.object({
  fullName: z.string().min(2).optional(),
  email: z.string().email().optional(),
  dob: z.string().optional(),
  city: z.string().optional(),
  pan: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req, "customer");
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const customer = await Customer.findById(auth.id);
  if (!customer) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ customer });
}

export async function PATCH(req: NextRequest) {
  const auth = getAuthFromRequest(req, "customer");
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json();
  const parsed = updateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  await connectDB();
  const customer = await Customer.findByIdAndUpdate(
    auth.id,
    { $set: parsed.data },
    { new: true }
  );
  if (!customer) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true, customer });
}
