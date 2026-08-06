import type { Metadata } from "next";
import ProductPageTemplate from "@/components/site/ProductPageTemplate";

export const metadata: Metadata = {
  title: "Get Credit Card | Compare & Apply",
  description:
    "Compare and apply for credit cards in Lucknow with SureFund. 620+ CIBIL score, cashback & rewards cards, fast digital approval, free CIBIL check.",
  alternates: {
    canonical: "/credit-card",
  },
};

export default function CreditCardPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-20 pb-20 font-sans text-white">

      {/* Optional Top Glow Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10">
        <ProductPageTemplate
          title="Credit Card"
          tagline="Premium credit cards with cashback, rewards, and lounge access — matched to your spending profile and credit score."
          applySlug="credit-card"
          currentSlug="credit-card"
          eligibility={[{ label: "Minimum CIBIL Score", value: "620+" }]}
          features={[
            "Cards from India's leading banks compared side-by-side",
            "Guidance on cards suited to your spend category (travel, fuel, cashback)",
            "Fast digital application with minimal paperwork",
            "Free CIBIL check to see which cards you qualify for",
          ]}
          faqs={[
            {
              question: "What is the minimum CIBIL score required for a credit card?",
              answer:
                "Most banks look for a CIBIL score of 620 or above to approve a credit card application. A higher score improves your chances of approval and can also get you access to premium cards with better rewards.",
            },
            {
              question: "What documents are required to apply for a credit card?",
              answer:
                "You'll typically need PAN card, Aadhaar card, a recent photograph, and income proof such as salary slips or bank statements. Self-employed applicants may need to provide ITR or business proof as well.",
            },
            {
              question: "How long does credit card approval take?",
              answer:
                "Approval timelines vary by bank, but most applications are processed within 3 to 7 working days after document verification. Some banks also offer instant in-principle approval based on your CIBIL score.",
            },
            {
              question: "Is there an annual fee on credit cards?",
              answer:
                "It depends on the card. Many entry-level cards are free or have the annual fee waived off on reaching a minimum yearly spend, while premium cards with travel and lounge benefits usually carry a fixed annual fee.",
            },
            {
              question: "Can I apply for a credit card with a low income?",
              answer:
                "Yes, several banks offer credit cards designed for lower income brackets, including secured cards backed by a fixed deposit. Our team can help match you with a card suited to your income level.",
            },
            {
              question: "Will applying for a credit card affect my CIBIL score?",
              answer:
                "Every credit card application involves a hard inquiry, which can cause a small, temporary dip in your CIBIL score. We recommend checking your eligibility first to avoid unnecessary rejections and multiple inquiries.",
            },
          ]}
        />

        {/* ── Types of Credit Cards Section ── */}
        <section className="py-20 max-w-5xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Types of Credit Cards — Matched to Your Spending
            </h2>
            <p className="text-gray-300">
              Explore the right card category based on how and where you spend the most.
            </p>
          </div>

          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Cashback Credit Card
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Earn a fixed percentage back on everyday spends like groceries, utility bills, and online shopping.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Everyday Savings
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Travel & Rewards Credit Card
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Earn reward points on every spend and redeem for flights, hotels, and airport lounge access.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Lounge Access
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Fuel Credit Card
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Save on fuel surcharge and earn extra reward points on fuel spends at partner petrol pumps.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Fuel Surcharge Waiver
              </span>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Lifetime Free Credit Card
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Zero joining and annual fee — a good entry-level option for first-time credit card users.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Zero Annual Fee
              </span>
            </div>

            {/* Item 5 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Secured Credit Card
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Backed by a fixed deposit — ideal for low income, no credit history, or building your CIBIL score.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Low Income Friendly
              </span>
            </div>
          </div>
        </section>

        {/* ── Documents Required Table Section ── */}
        <section className="py-20 max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Documents Required for a Credit Card
            </h2>
            <p className="text-gray-300">
              Keep these basic documents ready for a smooth, paperless application experience.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/10 text-white border-b border-white/10">
                  <th className="p-5 font-semibold">Category</th>
                  <th className="p-5 font-semibold">Salaried Individuals</th>
                  <th className="p-5 font-semibold">Self-Employed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm text-gray-300">
                <tr>
                  <td className="p-5 font-medium text-white">Identity & Address Proof</td>
                  <td className="p-5">Aadhaar Card, PAN Card, Voter ID / Passport</td>
                  <td className="p-5">Aadhaar Card, PAN Card, Business Proof</td>
                </tr>
                <tr>
                  <td className="p-5 font-medium text-white">Income Proof</td>
                  <td className="p-5">Last 3 Months Salary Slips</td>
                  <td className="p-5">Last 2 Years ITR & P&L Statements</td>
                </tr>
                <tr>
                  <td className="p-5 font-medium text-white">Bank Statements</td>
                  <td className="p-5">Last 3 to 6 Months Salary Account Statement</td>
                  <td className="p-5">Last 6 Months Current Bank Account Statement</td>
                </tr>
                <tr>
                  <td className="p-5 font-medium text-white">Employment / Business Proof</td>
                  <td className="p-5">Company ID Card & Employment Certificate</td>
                  <td className="p-5">GST Registration, Trade License or Udyam Registration</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}