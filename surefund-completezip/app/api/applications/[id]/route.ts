import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import LoanApplication from "@/models/LoanApplication";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const customerAuth = getAuthFromRequest(req, "customer");
  const adminAuth = getAuthFromRequest(req, "admin");
  if (!customerAuth && !adminAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();
  const application = await LoanApplication.findById(id).populate("lead");
  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  if (
    customerAuth &&
    String(application.customer || "") !== customerAuth.id &&
    // fall back: match via the underlying lead's linked customer
    String((application.lead as any)?.customer || "") !== customerAuth.id
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ application });
}
