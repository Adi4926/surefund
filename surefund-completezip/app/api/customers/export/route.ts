import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req, "admin");
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const customers = await Customer.find({}).sort({ createdAt: -1 }).limit(5000).lean() as any[];

  const rows = customers.map((c) => ({
    "Full Name":    c.fullName,
    "Mobile":       c.mobile,
    "Email":        c.email || "",
    "Date of Birth":c.dob || "",
    "City":         c.city || "",
    "PAN":          c.pan || "",
    "Verified":     c.isVerified ? "Yes" : "No",
    "Joined At":    new Date(c.createdAt).toLocaleString("en-IN"),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet["!cols"] = Object.keys(rows[0] || {}).map(() => ({ wch: 22 }));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="surefund-customers-${Date.now()}.xlsx"`,
    },
  });
}
