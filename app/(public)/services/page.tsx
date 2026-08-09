import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Our Services | Loans & Credit Cards",
  description:
    "Explore SureFund's range of financial services — personal loans, business loans, car loans, and loans against property — with expert guidance at every step.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}