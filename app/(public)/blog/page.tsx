import type { Metadata } from "next";
import BlogListContent from "./BlogListContent";

export const metadata: Metadata = {
  title: "Blog | Loan & Credit Score Guides",
  description:
    "Practical guidance on personal loans, business loans, credit cards, and improving your CIBIL score — from the SureFund team.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogListPage() {
  return <BlogListContent />;
}