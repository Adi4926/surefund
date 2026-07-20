"use client";

import { ApplyDraft } from "@/lib/applyFormStorage";
import { ProductType } from "@/lib/constants";

function formatIndianNumber(value: string): string {
  const digitsOnly = value.replace(/\D/g, "");
  if (!digitsOnly) return "";
  return new Intl.NumberFormat("en-IN").format(Number(digitsOnly));
}

export default function StepLoanDetails({
  data,
  onChange,
  productType,
}: {
  data: ApplyDraft;
  onChange: (patch: Partial<ApplyDraft>) => void;
  productType: ProductType;
}) {
  const isCreditCard = productType === "Credit Card";

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">
        {isCreditCard ? "Credit Card Details" : "Loan Details"}
      </h2>
      <p className="text-sm text-primary/50">
        {isCreditCard
          ? "Tell us how much credit limit you're looking for."
          : "Tell us how much you'd like to borrow."}
      </p>

      <div className="grid grid-cols-1 gap-4">
        <input
          required
          type="text"
          inputMode="numeric"
          placeholder={isCreditCard ? "Desired Credit Limit (₹)" : "Loan Amount Required (₹)"}
          value={formatIndianNumber(data.loanAmount)}
          onChange={(e) => onChange({ loanAmount: e.target.value.replace(/\D/g, "") })}
          className="rounded-lg border border-primary/10 px-4 py-3 outline-none focus:border-secondary"
        />
      </div>
    </div>
  );
}