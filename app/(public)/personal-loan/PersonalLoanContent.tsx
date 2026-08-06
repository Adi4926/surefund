"use client";

import ProductPageTemplate from "@/components/site/ProductPageTemplate";
import FloatingBottomBanner from "@/components/site/FloatingBottomBanner";
import { motion } from "framer-motion";

export default function PersonalLoanContent() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-20 pb-20 font-sans text-white">
      
      {/* Optional Top Glow Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <ProductPageTemplate
          title="Personal Loan"
          tagline="Fast, flexible personal loans for weddings, medical needs, travel, and more — with expert guidance at every step."
          applySlug="personal-loan"
          currentSlug="personal-loan"
          eligibility={[
            { label: "Minimum Monthly Income", value: "₹25,000" },
            { label: "Minimum CIBIL Score", value: "620+" },
            { label: "Work Experience", value: "1 year+" },
          ]}
          features={[
            "Access to 25+ banking and NBFC partners for the best rate",
            "Minimal documentation with fast digital processing",
            "Dedicated advisor support from application to disbursal",
            "Free CIBIL check before you apply",
          ]}
          faqs={[
            {
              question: "How to get a personal loan in Lucknow?",
              answer:
                "Apply online through SureFund with your monthly income and basic KYC documents. We match you with the best offer from our 25+ bank and NBFC partners, and most applications are approved within 24-48 hours.",
            },
            {
              question: "What is the minimum salary required for a personal loan?",
              answer:
                "You need a minimum monthly income of ₹25,000 to qualify. Higher income can help you access larger loan amounts and better interest rates.",
            },
            {
              question: "What CIBIL score is needed for a personal loan?",
              answer:
                "A CIBIL score of 620 or above is required. SureFund also offers a free CIBIL check before you apply, so you know your eligibility in advance.",
            },
            {
              question: "How long does personal loan approval take?",
              answer:
                "Most personal loan applications through SureFund are processed and approved within 24-48 hours, thanks to minimal documentation and our digital verification process.",
            },
            {
              question: "What documents are required for a personal loan?",
              answer:
                "You typically need ID proof, address proof, income proof (salary slips or bank statements), and PAN card. Our advisor will guide you through the exact list based on your profile.",
            },
          ]}
        />

        {/* ── Types of Personal Loans Section (Updated with all 5 types in bullet points & refined style) ── */}
        <section className="py-20 max-w-5xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Types of Personal Loans — Tailored for Every Need
            </h2>
            <p className="text-gray-300">
              Explore the right financial category that matches your exact requirements with quick processing.
            </p>
          </div>

          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Short-Term Personal Loan (STPL)
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Ideal for quick, immediate cash needs with smaller ticket sizes and fast repayment windows.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Quick Disbursal
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Pre-approved Personal Loan
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Special instant loan offers for pre-qualified customers with zero to minimal paperwork required.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Instant Approval
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Flexi Personal Loan
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Withdraw money as needed from a pre-set limit and pay interest only on the amount you actually use.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Pay Interest on Usage
              </span>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Top-up Personal Loan
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Need extra funds over your existing running loan? Avail a quick top-up amount with minimal documentation.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Extra Funding
              </span>
            </div>

            {/* Item 5 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Personal Loan Balance Transfer
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Transfer your high-interest ongoing loan to a new lender with lower rates and save heavily on total interest.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Lower Interest Rates
              </span>
            </div>
          </div>
        </section>

        {/* ── Documents Required Table Section ── */}
        <section className="py-20 max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Documents Required for a Personal Loan
            </h2>
            <p className="text-gray-300">
              Keep these basic documents ready for a smooth, paperless, and lightning-fast approval experience.
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
                  <td className="p-5">GST Registration, Trade License or Udyam [Aadhaar Redacted]</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </motion.div>

      {/* Floating Bottom Sticky Banner */}
      <FloatingBottomBanner />

    </div>
  );
}