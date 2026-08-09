import type { Metadata } from "next";
import LapContent from "./LapContent";

export const metadata: Metadata = {
  title: "Loan Against Property | Up to ₹5 Crore",
  description:
    "Get a loan against your residential or commercial property in Lucknow. Up to ₹5 Crore, rates from 8.75%, tenure up to 20 years. Apply with SureFund today.",
  alternates: {
    canonical: "/lap",
  },
};

export default function LapPage() {
  return <LapContent />;
}