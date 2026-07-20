export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "improve-cibil-score-fast",
    title: "5 Practical Ways to Improve Your CIBIL Score",
    excerpt:
      "Your CIBIL score can make or break a loan application. Here are five habits that make a real difference.",
    date: "2026-05-12",
    author: "SureFund Team",
    content: [
      "Your CIBIL score is one of the first things a lender checks, and even a 20-30 point improvement can change which offers you're eligible for.",
      "1. Pay every EMI and credit card bill on time — payment history carries the most weight in your score.",
      "2. Keep your credit utilization under 30% of your total limit across all cards.",
      "3. Avoid applying for multiple loans or cards in a short window, since each hard inquiry has a small negative impact.",
      "4. Maintain a healthy mix of secured and unsecured credit rather than relying on one type.",
      "5. Check your credit report periodically for errors and get them corrected with the bureau promptly.",
      "A free CIBIL check on our homepage is a good first step before you apply for any new credit.",
    ],
  },
  {
    slug: "personal-vs-business-loan",
    title: "Personal Loan vs Business Loan: Which One Do You Need?",
    excerpt:
      "Both can fund similar needs, but eligibility, tenure, and tax treatment differ significantly.",
    date: "2026-04-28",
    author: "SureFund Team",
    content: [
      "It's common to wonder whether a personal loan or a business loan is the better fit when you need working capital.",
      "Personal loans are typically faster to process and don't require business vintage or turnover proof, but loan amounts are usually smaller and interest isn't tax-deductible.",
      "Business loans are assessed against your business's turnover and age (SureFund's partner lenders typically require 1+ year in business and ₹5 lakh+ annual turnover), but often unlock larger amounts and the interest may be deductible as a business expense.",
      "If your need is strictly personal (medical, travel, wedding), a personal loan is usually simpler. If it's for inventory, equipment, or expansion, a business loan is generally the better long-term fit.",
    ],
  },
  {
    slug: "documents-checklist-loan-application",
    title: "The Complete Document Checklist Before You Apply",
    excerpt:
      "Save time by having these ready before you start your application.",
    date: "2026-04-10",
    author: "SureFund Team",
    content: [
      "Missing documents are the single biggest cause of delayed loan approvals.",
      "At minimum, every application needs a PAN card and an Aadhaar card — both are collected during the application itself and uploaded securely.",
      "Depending on the product and lender, you may also be asked for salary slips, bank statements, or business registration proof during the review stage.",
      "Uploading clear, unedited scans or photos (PDF, JPG, or PNG, under 5MB) the first time avoids back-and-forth that can slow down your approval.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
