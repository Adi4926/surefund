"use client";

import { ApplyDraft } from "@/lib/applyFormStorage";
import { ProductType } from "@/lib/constants";
import { ApplyDocuments } from "./StepDocumentUpload";

function Row({ label, value }: { label: string; value?: string | number | boolean }) {
  if (value === "" || value === undefined || value === null) return null;
  return (
    <div className="flex justify-between border-b border-primary/5 py-2 last:border-0">
      <span className="text-sm text-primary/50">{label}</span>
      <span className="text-sm font-medium text-primary">{String(value)}</span>
    </div>
  );
}

export default function StepReview({
  data,
  documents,
  productType,
}: {
  data: ApplyDraft;
  documents: ApplyDocuments;
  productType: ProductType;
}) {
  const isBusinessLoan = productType === "Business Loan";

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-primary">Review &amp; Submit</h2>
      <p className="text-sm text-primary/50">
        Please confirm your details below before submitting your {productType} application.
      </p>

      <div className="rounded-xl border border-primary/5 bg-background p-4">
        <h3 className="mb-1 text-sm font-semibold text-primary">Personal Details</h3>
        <Row label="Full Name" value={data.fullName} />
        <Row label="Mobile" value={data.mobile} />
        <Row label="Email" value={data.email} />
        <Row label="Date of Birth" value={data.dob} />
        <Row label="City" value={data.city} />
        <Row label="PAN" value={data.pan} />
      </div>

      <div className="rounded-xl border border-primary/5 bg-background p-4">
        <h3 className="mb-1 text-sm font-semibold text-primary">
          {isBusinessLoan ? "Business Details" : "Employment Details"}
        </h3>
        {isBusinessLoan ? (
          <>
            <Row label="Business Name" value={data.companyName} />
            <Row label="Business Age (yrs)" value={data.businessAgeYears} />
            <Row label="Annual Turnover" value={data.annualTurnover} />
          </>
        ) : (
          <>
            <Row label="Employment Type" value={data.employmentType} />
            <Row label="Company" value={data.companyName} />
            <Row label="Designation" value={data.designation} />
            <Row label="Monthly Income" value={data.monthlyIncome} />
            <Row label="Work Experience (yrs)" value={data.workExperienceYears} />
          </>
        )}
      </div>

      <div className="rounded-xl border border-primary/5 bg-background p-4">
        <h3 className="mb-1 text-sm font-semibold text-primary">Loan Details</h3>
        <Row label="Amount Requested" value={data.loanAmount} />
        <Row label="CIBIL Score" value={data.cibilScore} />
        <Row label="Existing EMI" value={data.existingEmi} />
        <Row label="Existing Loan" value={data.existingLoan ? "Yes" : "No"} />
      </div>

      <div className="rounded-xl border border-primary/5 bg-background p-4">
        <h3 className="mb-1 text-sm font-semibold text-primary">Documents</h3>
        <Row label="PAN Card" value={documents.pan?.name || "Not uploaded"} />
        <Row label="Aadhaar Card" value={documents.aadhaar?.name || "Not uploaded"} />
      </div>
    </div>
  );
}
