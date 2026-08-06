import type { Metadata } from "next";
import BusinessLoanContent from "./BusinessLoanContent";

export const metadata: Metadata = {
  title: "Get Business Loan | Collateral-Free Funding",
  description:
    "Get a collateral-free business loan in Lucknow. Minimum 1 year business age, ₹5 Lakh+ annual turnover. 25+ bank partners, fast approval. Apply with SureFund today.",
  alternates: {
    canonical: "/business-loan",
  },
};

export default function BusinessLoanPage() {
  return <BusinessLoanContent />;
}