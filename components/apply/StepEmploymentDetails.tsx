"use client";

import { ApplyDraft } from "@/lib/applyFormStorage";
import { ProductType } from "@/lib/constants";

export default function StepEmploymentDetails({
  data,
  onChange,
  productType,
}: {
  data: ApplyDraft;
  onChange: (patch: Partial<ApplyDraft>) => void;
  productType: ProductType;
}) {
  const isBusinessLoan = productType === "Business Loan";

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">
        {isBusinessLoan ? "Business Details" : "Employment Details"}
      </h2>
      <p className="text-sm text-primary/50">
        {isBusinessLoan
          ? "Tell us a little about your business."
          : "Tell us about your current employment."}
      </p>

      {isBusinessLoan ? (
        <div className="grid grid-cols-1 gap-4">
          <input
            placeholder="Business / Company Name"
            value={data.companyName}
            onChange={(e) => onChange({ companyName: e.target.value })}
            className="rounded-lg border border-primary/10 px-4 py-3 outline-none focus:border-secondary"
          />
          <input
            type="number"
            min={0}
            placeholder="Annual Turnover (₹)"
            value={data.annualTurnover}
            onChange={(e) => onChange({ annualTurnover: e.target.value })}
            className="rounded-lg border border-primary/10 px-4 py-3 outline-none focus:border-secondary"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <select
            value={data.employmentType}
            onChange={(e) => onChange({ employmentType: e.target.value })}
            className="rounded-lg border border-primary/10 px-4 py-3 outline-none focus:border-secondary sm:col-span-2"
          >
            <option value="">Select Employment Type</option>
            <option value="Salaried">Salaried</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Business Owner">Business Owner</option>
          </select>
          <input
            type="number"
            min={0}
            placeholder="Monthly Salary (₹)"
            value={data.monthlyIncome}
            onChange={(e) => onChange({ monthlyIncome: e.target.value })}
            className="rounded-lg border border-primary/10 px-4 py-3 outline-none focus:border-secondary sm:col-span-2"
          />
        </div>
      )}
    </div>
  );
}