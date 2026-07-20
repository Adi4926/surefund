export const ELIGIBILITY_RULES = {
  personalLoan: { minIncome: 25000, minCibil: 620, minExperienceYears: 1 },
  creditCard: { minCibil: 620 },
  businessLoan: { minBusinessAgeYears: 1, minAnnualTurnover: 500000 },
};

interface QualificationInput {
  productType: "Personal Loan" | "Business Loan" | "Credit Card";
  monthlyIncome?: number;
  cibilScore?: number;
  workExperienceYears?: number;
  businessAgeYears?: number;
  annualTurnover?: number;
}

/**
 * Central rule engine — mirrors the eligibility rules defined for
 * SureFund's three products. Returns "Qualified" or "Needs Review".
 */
export function evaluateQualification(
  input: QualificationInput
): "Qualified" | "Needs Review" {
  const { productType } = input;

  if (productType === "Personal Loan") {
    const { minIncome, minCibil, minExperienceYears } = ELIGIBILITY_RULES.personalLoan;
    const ok =
      (input.monthlyIncome ?? 0) >= minIncome &&
      (input.cibilScore ?? 0) >= minCibil &&
      (input.workExperienceYears ?? 0) >= minExperienceYears;
    return ok ? "Qualified" : "Needs Review";
  }

  if (productType === "Credit Card") {
    const ok = (input.cibilScore ?? 0) >= ELIGIBILITY_RULES.creditCard.minCibil;
    return ok ? "Qualified" : "Needs Review";
  }

  if (productType === "Business Loan") {
    const { minBusinessAgeYears, minAnnualTurnover } = ELIGIBILITY_RULES.businessLoan;
    const ok =
      (input.businessAgeYears ?? 0) >= minBusinessAgeYears &&
      (input.annualTurnover ?? 0) >= minAnnualTurnover;
    return ok ? "Qualified" : "Needs Review";
  }

  return "Needs Review";
}
