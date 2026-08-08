import type { Metadata } from "next";
import CareersContent from "./CareersContent";

export const metadata: Metadata = {
  title: "Careers | Join Our Team",
  description:
    "Explore open positions at SureFund Financial Services in Lucknow — HR, Technology, Accounts & Finance, and Customer Support & Sales roles.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  return <CareersContent />;
}