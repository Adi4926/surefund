import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req, "customer");
  if (!auth) {
    return NextResponse.json({ customer: null }, { status: 401 });
  }

  await connectDB();
  const customer = await Customer.findById(auth.id);
  if (!customer) {
    return NextResponse.json({ customer: null }, { status: 401 });
  }

  return NextResponse.json({
    customer: { id: customer._id, email: customer.email, fullName: customer.fullName },
  });
}