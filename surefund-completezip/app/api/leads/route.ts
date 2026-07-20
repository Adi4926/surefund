import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Lead, { LEAD_STATUSES, PRODUCT_TYPES } from "@/models/Lead";
import { evaluateQualification } from "@/lib/qualification";
import { notifyNewLead } from "@/lib/email";
import { getAuthFromRequest } from "@/lib/auth";
import Customer from "@/models/Customer";

const leadSchema = z.object({
  productType: z.enum(PRODUCT_TYPES),
  fullName: z.string().min(2),
  mobile: z.string().min(10),
  email: z.string().email().optional(),
  dob: z.string().optional(),
  city: z.string().optional(),
  pan: z.string().optional(),
  employmentType: z.enum(["Salaried", "Self-Employed", "Business Owner"]).optional(),
  companyName: z.string().optional(),
  designation: z.string().optional(),
  monthlyIncome: z.coerce.number().optional(),
  workExperienceYears: z.coerce.number().optional(),
  existingEmi: z.coerce.number().optional(),
  existingLoan: z.coerce.boolean().optional(),
  loanAmount: z.coerce.number().optional(),
  cibilScore: z.coerce.number().optional(),
  businessAgeYears: z.coerce.number().optional(),
  annualTurnover: z.coerce.number().optional(),
  source: z.enum(["Website", "CIBIL Check", "Manual"]).optional(),
});

// POST /api/leads — public lead capture (loan product forms) + portal applications
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = leadSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const qualification = evaluateQualification(data);

    await connectDB();

    const customerAuth = getAuthFromRequest(req, "customer");

    let customerId: string | undefined = customerAuth?.id;

    if (!customerId && data.email) {
      const customer = await Customer.findOneAndUpdate(
        { email: data.email.toLowerCase() },
        { $setOnInsert: { fullName: data.fullName, email: data.email.toLowerCase() } },
        { upsert: true, new: true }
      );
      customerId = String(customer._id);
    }

    const lead = await Lead.create({
      ...data,
      qualification,
      source: data.source || "Website",
      ...(customerId ? { customer: customerId } : {}),
    });

    await notifyNewLead({
      fullName: lead.fullName,
      mobile: lead.mobile,
      productType: lead.productType,
      qualification: lead.qualification,
    });

    return NextResponse.json({ success: true, leadId: lead._id, qualification });
  } catch (err) {
    console.error("create lead error:", err);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

// GET /api/leads — admin only: list with search/filter/pagination
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
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 20);

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

  const [leads, total] = await Promise.all([
    Lead.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Lead.countDocuments(query),
  ]);

  const metrics = {
    total: await Lead.countDocuments({}),
    qualified: await Lead.countDocuments({ qualification: "Qualified" }),
    pending: await Lead.countDocuments({
      status: { $nin: ["Disbursed", "Rejected"] },
    }),
    disbursed: await Lead.countDocuments({ status: "Disbursed" }),
  };

  return NextResponse.json({
    leads,
    total,
    page,
    limit,
    metrics,
  });
}
