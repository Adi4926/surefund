import type { Metadata } from "next";
import PersonalLoanContent from "./PersonalLoanContent";

export const metadata: Metadata = {
  title: "Get Personal Loan | Instant Approval",
  description:
    "Get a personal loan in Lucknow starting at ₹25,000 monthly income, 620+ CIBIL score. 25+ bank partners, minimal paperwork, free CIBIL check. Apply with SureFund today.",
  alternates: {
    canonical: "/personal-loan",
  },
};

export default function PersonalLoanPage() {
  return <PersonalLoanContent />;
}