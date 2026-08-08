import type { Metadata } from "next";
import EmiCalculatorInner from "./EmiCalculatorContent";

export const metadata: Metadata = {
  title: "EMI Calculator | Estimate Your Monthly Installment",
  description:
    "Calculate your personal loan or business loan EMI instantly. Adjust loan amount, interest rate, and tenure to plan your repayment with SureFund.",
  alternates: {
    canonical: "/emi-calculator",
  },
};

export default function EmiCalculatorPage() {
  return <EmiCalculatorInner />;
}