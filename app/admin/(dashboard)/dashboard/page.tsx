import Link from "next/link";
import { Users, CheckCircle2, Clock, Banknote, Bell } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { MetricCard } from "@/components/admin/MetricCard";
import { StatusBadge, QualificationBadge } from "@/components/admin/Badges";
import { formatDate, formatDateTime } from "@/lib/format";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  await connectDB();

  const [total, qualified, pending, disbursed, recentLeads, upcomingReminders] =
    await Promise.all([
      Lead.countDocuments({}),
      Lead.countDocuments({ qualification: "Qualified" }),
      Lead.countDocuments({ status: { $nin: ["Disbursed", "Rejected"] } }),
      Lead.countDocuments({ status: "Disbursed" }),
      Lead.find({}).sort({ createdAt: -1 }).limit(6).lean() as any,
      Lead.find({ reminderAt: { $gte: new Date() } })
        .sort({ reminderAt: 1 })
        .limit(5)
        .lean() as any,
    ]);

  return { total, qualified, pending, disbursed, recentLeads, upcomingReminders };
}

export default async function DashboardPage() {
  const { total, qualified, pending, disbursed, recentLeads, upcomingReminders } =
    await getDashboardData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <p className="mt-1 text-sm text-primary/50">
          Live overview of your loan-DSA pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Leads" value={total} icon={Users} />
        <MetricCard
          label="Qualified Leads"
          value={qualified}
          icon={CheckCircle2}
          accent="bg-emerald-100 text-emerald-700"
        />
        <MetricCard
          label="Pending Leads"
          value={pending}
          icon={Clock}
          accent="bg-amber-100 text-amber-700"
        />
        <MetricCard
          label="Disbursed"
          value={disbursed}
          icon={Banknote}
          accent="bg-teal-100 text-teal-700"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent leads */}
        <div className="rounded-2xl border border-primary/5 bg-white p-5 shadow-card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading font-semibold text-primary">Recent Leads</h2>
            <Link href="/admin/leads" className="text-sm font-medium text-secondary">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-primary/5 text-primary/50">
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Product</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 pr-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead: any) => (
                  <tr key={lead._id} className="border-b border-primary/5 last:border-0">
                    <td className="py-3 pr-4">
                      <Link
                        href={`/admin/leads/${lead._id}`}
                        className="font-medium text-primary hover:text-secondary"
                      >
                        {lead.fullName}
                      </Link>
                      <p className="text-xs text-primary/40">{lead.mobile}</p>
                    </td>
                    <td className="py-3 pr-4 text-primary/70">{lead.productType}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="py-3 pr-4 text-primary/50">
                      {formatDate(lead.createdAt)}
                    </td>
                  </tr>
                ))}
                {recentLeads.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-primary/40">
                      No leads yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming follow-ups */}
        <div className="rounded-2xl border border-primary/5 bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <Bell size={18} className="text-accent" />
            <h2 className="font-heading font-semibold text-primary">
              Upcoming Follow-ups
            </h2>
          </div>
          <div className="space-y-3">
            {upcomingReminders.map((lead: any) => (
              <Link
                key={lead._id}
                href={`/admin/leads/${lead._id}`}
                className="block rounded-xl border border-primary/5 p-3 transition-colors hover:border-secondary/30 hover:bg-secondary/5"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-primary">{lead.fullName}</p>
                  <QualificationBadge qualification={lead.qualification} />
                </div>
                <p className="mt-1 text-xs text-primary/50">
                  Follow up: {formatDateTime(lead.reminderAt)}
                </p>
              </Link>
            ))}
            {upcomingReminders.length === 0 && (
              <p className="py-6 text-center text-sm text-primary/40">
                No upcoming follow-ups scheduled.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
