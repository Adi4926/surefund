import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { requireCustomer } from "@/lib/requireCustomer";
import { connectDB } from "@/lib/mongodb";
import LoanApplication from "@/models/LoanApplication";
import StatusTimeline from "@/components/portal/StatusTimeline";
import DocumentViewer from "@/components/admin/DocumentViewer";
import AdditionalDocumentUpload from "@/components/portal/AdditionalDocumentUpload";
import { formatCurrency, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const auth = await requireCustomer();
  const { id } = await params;
  await connectDB();

  const application = await LoanApplication.findById(id)
    .populate("lead")
    .lean() as any;

  if (!application || String((application as any).customer) !== auth.id) {
    notFound();
  }

  const app = application as any;
  const lead = app.lead;

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/portal/applications"
          className="mb-2 flex items-center gap-1 text-sm text-primary/50 hover:text-secondary"
        >
          <ChevronLeft size={16} /> Back to Applications
        </Link>
        <h1 className="text-2xl font-bold text-primary">{app.productType} Application</h1>
        <p className="mt-1 text-sm text-primary/50">
          Amount requested: {formatCurrency(app.loanAmount)} • Submitted{" "}
          {formatDate(app.createdAt)}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-primary/5 bg-white p-6 shadow-card lg:col-span-1">
          <h3 className="mb-5 font-heading font-semibold text-primary">
            Application Status
          </h3>
          <StatusTimeline status={app.status} />
        </div>

        <div className="space-y-6 lg:col-span-2">
          <DocumentViewer documents={app.documents || []} />
          <AdditionalDocumentUpload applicationId={String(app._id)} />

          {lead && (
            <div className="rounded-2xl border border-primary/5 bg-white p-5 shadow-card">
              <h3 className="mb-3 font-heading font-semibold text-primary">
                Application Details
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <p className="text-primary/50">
                  Name: <span className="font-medium text-primary">{lead.fullName}</span>
                </p>
                <p className="text-primary/50">
                  Mobile: <span className="font-medium text-primary">{lead.mobile}</span>
                </p>
                <p className="text-primary/50">
                  City: <span className="font-medium text-primary">{lead.city || "—"}</span>
                </p>
                <p className="text-primary/50">
                  CIBIL: <span className="font-medium text-primary">{lead.cibilScore || "—"}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
