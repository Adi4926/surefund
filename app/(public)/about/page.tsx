import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SureFund Financial Services Pvt. Ltd. is a Lucknow-based loan DSA helping individuals and businesses across India access the right credit products — quickly and transparently.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}