import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { connectDB } from "@/lib/mongodb";
import Lead, { LEAD_STATUSES } from "@/models/Lead";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req, "admin");
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.trim();
  const status = searchParams.get("status");
  const productType = searchParams.get("productType");

  const query: Record<string, unknown> = {};
  if (status && LEAD_STATUSES.includes(status as (typeof LEAD_STATUSES)[number])) {
    query.status = status;
  }
  if (productType) query.productType = productType;
  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { pan: { $regex: search, $options: "i" } },
    ];
  }

  const leads = await Lead.find(query).sort({ createdAt: -1 }).limit(5000).lean() as any;

  const rows = (leads as any[]).map((l) => ({
    "Full Name": l.fullName,
    "Mobile": l.mobile,
    "Email": l.email || "",
    "Product": l.productType,
    "City": l.city || "",
    "PAN": l.pan || "",
    "Employment Type": l.employmentType || "",
    "Company Name": l.companyName || "",
    "Monthly Income": l.monthlyIncome ?? "",
    "Work Experience (yrs)": l.workExperienceYears ?? "",
    "Existing EMI": l.existingEmi ?? "",
    "Loan Amount Requested": l.loanAmount ?? "",
    "CIBIL Score": l.cibilScore ?? "",
    "Business Age (yrs)": l.businessAgeYears ?? "",
    "Annual Turnover": l.annualTurnover ?? "",
    "Qualification": l.qualification,
    "Status": l.status,
    "Source": l.source,
    "Created At": new Date(l.createdAt).toLocaleString("en-IN"),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet["!cols"] = Object.keys(rows[0] || {}).map(() => ({ wch: 20 }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="surefund-leads-${Date.now()}.xlsx"`,
    },
  });
}
