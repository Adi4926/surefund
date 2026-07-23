import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Personal Loan | Instant Approval | SureFund",
  description:
    "Get a personal loan in Lucknow starting at ₹25,000 monthly income, 620+ CIBIL score. 25+ bank partners, minimal paperwork, free CIBIL check. Apply with SureFund today.",
  keywords: [
    "personal loan Lucknow",
    "instant personal loan",
    "personal loan low CIBIL score",
    "SureFund personal loan",
  ],
};

export default function PersonalLoanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}