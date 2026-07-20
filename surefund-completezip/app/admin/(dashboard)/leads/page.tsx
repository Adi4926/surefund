import Link from "next/link";
import { Suspense } from "react";
import { connectDB } from "@/lib/mongodb";
import Lead, { LEAD_STATUSES } from "@/models/Lead";
import LeadFilters from "@/components/admin/LeadFilters";
import { StatusBadge, } from "@/components/admin/Badges";
import { formatDate } from "@/lib/format";
import ExportButton from "@/components/admin/ExportButton";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 15;

async function getLeads(searchParams: { [key: string]: string | undefined }) {
  await connectDB();

  const page = Number(searchParams.page || 1);
  const search = searchParams.search?.trim();
  const status = searchParams.status;
  const productType = searchParams.productType;

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
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean() as any,
    Lead.countDocuments(query),
  ]);

  return { leads, total, page, totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const { leads, total, page, totalPages } = await getLeads(resolvedSearchParams);

  function pageHref(p: number) {
    const params = new URLSearchParams(
      Object.entries(resolvedSearchParams).filter(([, v]) => v) as [string, string][]
    );
    params.set("page", String(p));
    return `/admin/leads?${params.toString()}`;
  }

  const exportHref = `/api/leads/export${
    Object.keys(resolvedSearchParams).length
      ? "?" + new URLSearchParams(
          Object.entries(resolvedSearchParams).filter(([, v]) => v) as [string, string][]
        ).toString()
      : ""
  }`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Leads</h1>
          <p className="mt-1 text-sm text-primary/50">{total} total leads</p>
        </div>
        <ExportButton href={exportHref} label="Export to Excel" />
      </div>

      <Suspense fallback={<div className="h-12" />}>
        <LeadFilters />
      </Suspense>

      <div className="overflow-x-auto rounded-2xl border border-primary/5 bg-white shadow-card">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-primary/5 text-primary/50">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Loan Amount</th>
              <th className="px-5 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead: any) => (
              <tr
                key={lead._id}
                className="border-b border-primary/5 last:border-0 hover:bg-secondary/5"
              >
                <td className="px-5 py-4">
                  <Link
                    href={`/admin/leads/${lead._id}`}
                    className="font-medium text-primary hover:text-secondary"
                  >
                    {lead.fullName}
                  </Link>
                  <p className="text-xs text-primary/40">{lead.mobile}</p>
                </td>
                <td className="px-5 py-4 text-primary/70">{lead.productType}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-5 py-4 text-primary/70">
                  {lead.loanAmount ? `₹${lead.loanAmount.toLocaleString("en-IN")}` : "—"}
                </td>
                <td className="px-5 py-4 text-primary/50">{formatDate(lead.createdAt)}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-primary/40">
                  No leads match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={pageHref(p)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                p === page
                  ? "bg-secondary text-white"
                  : "bg-white text-primary/60 hover:bg-secondary/10"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
