"use client";

import ProductPageTemplate from "@/components/site/ProductPageTemplate";
import FloatingBottomBanner from "@/components/site/FloatingBottomBanner";
import { motion } from "framer-motion";

export default function BusinessLoanContent() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-20 pb-20 font-sans text-white">
      
      {/* Background Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <ProductPageTemplate
          title="Business Loan"
          tagline="Collateral-free working capital to fuel your business growth — matched to the right lender for your turnover and business age."
          applySlug="business-loan"
          currentSlug="business-loan"
          eligibility={[
            { label: "Business Age", value: "1 year+" },
            { label: "Minimum Annual Turnover", value: "₹5 Lakh" },
          ]}
          features={[
            "Flexible loan amounts based on turnover and business health",
            "Support for self-employed professionals and business owners",
            "Faster approvals through our banking partner network",
            "Guidance on the right documentation for your business type",
          ]}
          faqs={[
            {
              question: "What are the eligibility criteria for a business loan?",
              answer:
                "Your business should be at least 1 year old with a minimum annual turnover of ₹5 Lakh. Both self-employed professionals and business owners can apply through SureFund.",
            },
            {
              question: "Is collateral required for a business loan?",
              answer:
                "No, SureFund helps you access collateral-free business loans from our partner banks and NBFCs — no need to pledge property or assets to secure funding.",
            },
            {
              question: "How much loan amount can I get for my business?",
              answer:
                "Loan amount depends on your business turnover, age, and financial health. Our team matches you with the right lender to get the maximum eligible amount at the best rate.",
            },
            {
              question: "What documents are needed for a business loan in Lucknow?",
              answer:
                "You'll typically need business registration proof, GST returns or ITR, bank statements, and KYC documents. Our advisor guides you through the exact list based on your business type.",
            },
            {
              question: "How long does business loan approval take?",
              answer:
                "Through SureFund's banking partner network, most business loan applications are processed faster than going directly to a bank, often within a few business days.",
            },
          ]}
        />

        {/* ── Types of Business Loans Section (Bullet Point Style) ── */}
        <section className="py-16 max-w-5xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Types of Business Loans — Tailored for Every Enterprise
            </h2>
            <p className="text-gray-300">
              Explore the right funding solution designed to match your specific business requirements and cash flow needs.
            </p>
          </div>

          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Term Loan
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Lump-sum funding for long-term investments, business expansion, or buying machinery with fixed monthly tenures.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Growth Financing
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Working Capital Loan
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Manage day-to-day operational expenses, pay salaries, and handle inventory shortages smoothly.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Daily Operations
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Business Overdraft Loan
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Withdraw funds flexibly from an approved credit limit as per requirement and pay interest only on the utilized amount.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Flexible Credit Limit
              </span>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Professional Loan
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Special unsecured loans tailored for doctors, chartered accountants, architects, and independent consultants.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                For Professionals
              </span>
            </div>
          </div>
        </section>

        {/* ── Documents Required Table Section ── */}
        <section className="py-16 max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Documents Required for a Business Loan
            </h2>
            <p className="text-gray-300">
              Keep these basic documents ready for a seamless verification and fast approval process.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/10 text-white border-b border-white/10">
                  <th className="p-5 font-semibold">Category</th>
                  <th className="p-5 font-semibold">Proprietorship / Partnership</th>
                  <th className="p-5 font-semibold">Private Limited / LLP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm text-gray-300">
                <tr>
                  <td className="p-5 font-medium text-white">Identity & Address Proof</td>
                  <td className="p-5">PAN Card, Aadhaar Card of Promoters</td>
                  <td className="p-5">Company PAN, Director KYC & Address Proof</td>
                </tr>
                <tr>
                  <td className="p-5 font-medium text-white">Business Proof</td>
                  <td className="p-5">GST Registration, Trade License or MSME Certificate</td>
                  <td className="p-5">Certificate of Incorporation, MOA & AOA</td>
                </tr>
                <tr>
                  <td className="p-5 font-medium text-white">Financial Documents</td>
                  <td className="p-5">Last 2 Years ITR, Balance Sheet & P&L Statements</td>
                  <td className="p-5">Audited Financials, Last 2 Years ITR & Computations</td>
                </tr>
                <tr>
                  <td className="p-5 font-medium text-white">Bank Statements</td>
                  <td className="p-5">Last 6 Months Current Business Account Statement</td>
                  <td className="p-5">Last 6 Months Company Bank Account Statement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </motion.div>

      {/* Floating Bottom Sticky Banner for Business Page */}
      <FloatingBottomBanner />

    </div>
  );
}