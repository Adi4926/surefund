import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { requireCustomer } from "@/lib/requireCustomer";
import { connectDB } from "@/lib/mongodb";
import LoanApplication from "@/models/LoanApplication";
import { StatusBadge } from "@/components/admin/Badges";
import { formatCurrency, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ApplicationsDashboardPage() {
  const auth = await requireCustomer();
  await connectDB();

  const applications = await LoanApplication.find({ customer: auth.id })
    .populate("lead")
    .sort({ createdAt: -1 })
    .lean() as any;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">My Applications</h1>
          <p className="mt-1 text-sm text-primary/50">
            Track the status of every loan application you've submitted.
          </p>
        </div>
        <Link href="/apply/personal-loan" className="btn-primary">
          <Plus size={18} className="mr-1.5" />
          New Application
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-primary/15 bg-white p-12 text-center">
          <FileText className="mx-auto mb-3 text-primary/20" size={40} />
          <p className="font-medium text-primary/60">No applications yet</p>
          <p className="mt-1 text-sm text-primary/40">
            Start a new loan application to see it tracked here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app: any) => (
            <Link
              key={app._id}
              href={`/portal/applications/${app._id}`}
              className="rounded-2xl border border-primary/5 bg-white p-5 shadow-card transition-shadow hover:shadow-glow"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-heading font-semibold text-primary">
                  {app.productType}
                </span>
                <StatusBadge status={app.status} />
              </div>
              <p className="text-sm text-primary/50">
                Amount: {formatCurrency(app.loanAmount)}
              </p>
              <p className="mt-1 text-xs text-primary/40">
                Submitted {formatDate(app.createdAt)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
