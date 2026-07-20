import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import LoanApplication from "@/models/LoanApplication";
import { QualificationBadge } from "@/components/admin/Badges";
import StatusUpdateForm from "@/components/admin/StatusUpdateForm";
import NotesSection from "@/components/admin/NotesSection";
import ReminderForm from "@/components/admin/ReminderForm";
import DocumentViewer from "@/components/admin/DocumentViewer";
import DeleteLeadButton from "@/components/admin/DeleteLeadButton";
import { formatCurrency, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

async function getLeadWithDocuments(id: string) {
  await connectDB();
  const lead = await Lead.findById(id).lean() as any;
  if (!lead) return null;

  const application = await LoanApplication.findOne({ lead: id }).lean() as any;
  return { lead, documents: application?.documents || [] };
}

function InfoRow({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex justify-between border-b border-primary/5 py-2.5 last:border-0">
      <span className="text-sm text-primary/50">{label}</span>
      <span className="text-sm font-medium text-primary">{value ?? "—"}</span>
    </div>
  );
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getLeadWithDocuments(id);
  if (!data) notFound();

  const { lead, documents } = data as any;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/leads"
            className="mb-2 flex items-center gap-1 text-sm text-primary/50 hover:text-secondary"
          >
            <ChevronLeft size={16} /> Back to Leads
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-primary">{lead.fullName}</h1>
            <QualificationBadge qualification={lead.qualification} />
          </div>
          <p className="mt-1 text-sm text-primary/50">
            {lead.productType} • Applied {formatDate(lead.createdAt)} • Source: {lead.source}
          </p>
        </div>
        <DeleteLeadButton leadId={String(lead._id)} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column: lead info */}
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-2xl border border-primary/5 bg-white p-5 shadow-card">
            <h3 className="mb-2 font-heading font-semibold text-primary">
              Contact Details
            </h3>
            <InfoRow label="Mobile" value={lead.mobile} />
            <InfoRow label="Email" value={lead.email} />
            <InfoRow label="City" value={lead.city} />
            <InfoRow label="DOB" value={lead.dob} />
            <InfoRow label="PAN" value={lead.pan} />
          </div>

          <div className="rounded-2xl border border-primary/5 bg-white p-5 shadow-card">
            <h3 className="mb-2 font-heading font-semibold text-primary">
              Financial Profile
            </h3>
            <InfoRow label="Employment Type" value={lead.employmentType} />
            <InfoRow label="Company" value={lead.companyName} />
            <InfoRow label="Designation" value={lead.designation} />
            <InfoRow label="Monthly Income" value={formatCurrency(lead.monthlyIncome)} />
            <InfoRow
              label="Work Experience"
              value={lead.workExperienceYears ? `${lead.workExperienceYears} yrs` : undefined}
            />
            <InfoRow label="Existing EMI" value={formatCurrency(lead.existingEmi)} />
            <InfoRow label="Existing Loan" value={lead.existingLoan ? "Yes" : "No"} />
            <InfoRow label="CIBIL Score" value={lead.cibilScore} />
            {lead.productType === "Business Loan" && (
              <>
                <InfoRow
                  label="Business Age"
                  value={lead.businessAgeYears ? `${lead.businessAgeYears} yrs` : undefined}
                />
                <InfoRow
                  label="Annual Turnover"
                  value={formatCurrency(lead.annualTurnover)}
                />
              </>
            )}
            <InfoRow label="Loan Amount Requested" value={formatCurrency(lead.loanAmount)} />
          </div>
        </div>

        {/* Right column: actions */}
        <div className="space-y-6 lg:col-span-2">
          <StatusUpdateForm leadId={String(lead._id)} currentStatus={lead.status} />
          <ReminderForm
            leadId={String(lead._id)}
            currentReminder={lead.reminderAt ? String(lead.reminderAt) : undefined}
          />
          <DocumentViewer documents={documents} />
          <NotesSection leadId={String(lead._id)} notes={lead.notes || []} />
        </div>
      </div>
    </div>
  );
}
