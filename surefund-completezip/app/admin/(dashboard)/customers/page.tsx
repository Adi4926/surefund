import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { formatDate } from "@/lib/format";
import { CheckCircle2, XCircle } from "lucide-react";
import ExportButton from "@/components/admin/ExportButton";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

async function getCustomers(page: number, search?: string) {
  await connectDB();

  const query: Record<string, unknown> = {};
  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const [customers, total] = await Promise.all([
    Customer.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean() as any,
    Customer.countDocuments(query),
  ]);

  return { customers, total, totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { page: pageStr, search } = await searchParams;
  const page = Number(pageStr || 1);
  const { customers, total, totalPages } = await getCustomers(page, search);

  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", String(p));
    return `/admin/customers?${params.toString()}`;
  }

  const exportHref = `/api/customers/export${search ? `?search=${encodeURIComponent(search)}` : ""}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Customers</h1>
          <p className="mt-1 text-sm text-primary/50">{total} registered portal users</p>
        </div>
        <ExportButton href={exportHref} label="Export to Excel" />
      </div>

      {/* Search */}
      <form method="GET" className="flex gap-3">
        <input
          name="search"
          defaultValue={search}
          placeholder="Search name, mobile, email…"
          className="flex-1 rounded-xl border border-primary/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-secondary"
        />
        <button type="submit" className="btn-primary !px-5 !py-2.5 text-sm">
          Search
        </button>
        {search && (
          <a href="/admin/customers" className="rounded-xl border border-primary/10 bg-white px-4 py-2.5 text-sm text-primary/60 hover:bg-secondary/10">
            Clear
          </a>
        )}
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-primary/5 bg-white shadow-card">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-primary/5 text-primary/50">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Mobile</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">City</th>
              <th className="px-5 py-3 font-medium">PAN</th>
              <th className="px-5 py-3 font-medium">Verified</th>
              <th className="px-5 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {(customers as any[]).map((c) => (
              <tr key={c._id} className="border-b border-primary/5 last:border-0 hover:bg-secondary/5">
                <td className="px-5 py-4 font-medium text-primary">{c.fullName}</td>
                <td className="px-5 py-4 text-primary/70">{c.mobile}</td>
                <td className="px-5 py-4 text-primary/70">{c.email || "—"}</td>
                <td className="px-5 py-4 text-primary/70">{c.city || "—"}</td>
                <td className="px-5 py-4 font-mono text-xs text-primary/60">{c.pan || "—"}</td>
                <td className="px-5 py-4">
                  {c.isVerified ? (
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 size={14} /> Yes
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-primary/40">
                      <XCircle size={14} /> No
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-primary/50">{formatDate(c.createdAt)}</td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-primary/40">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={pageHref(p)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                p === page
                  ? "bg-secondary text-white"
                  : "bg-white text-primary/60 hover:bg-secondary/10"
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
