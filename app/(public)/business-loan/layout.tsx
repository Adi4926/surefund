import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Business Loan | Collateral-Free Working Capital | SureFund",
  description:
    "Get a collateral-free business loan in Lucknow with minimal documentation, flexible repayment, and fast approvals from top bank partners.",
  keywords: [
    "business loan Lucknow",
    "collateral free business loan",
    "working capital loan",
    "SureFund business loan",
    "SureFund financial services business loan",
  ],
};

export default function BusinessLoanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}