"use client";

import ProductPageTemplate from "@/components/site/ProductPageTemplate";
import FloatingBottomBanner from "@/components/site/FloatingBottomBanner";
import { motion } from "framer-motion";

export default function PersonalLoanPage() {
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

        {/* ── Types of Personal Loans Section ── */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Types of Personal Loans — Tailored for Every Need
            </h2>
            <p className="text-gray-300">
              Whether it is a medical emergency, a grand wedding, or an urgent cash requirement, we find the right match for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:border-secondary/50 transition-all">
              <div className="text-white text-xl font-bold mb-3 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Instant Emergency Loan
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Unplanned expenses cannot wait. Get quick disbursal for medical emergencies, sudden travel, or urgent bills with minimal paperwork.
              </p>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Fastest Approval
              </span>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:border-secondary/50 transition-all">
              <div className="text-white text-xl font-bold mb-3 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Wedding & Lifestyle Loan
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Make your special moments unforgettable without dipping into your personal savings. Enjoy flexible tenures to repay comfortably.
              </p>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Zero Hidden Costs
              </span>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:border-secondary/50 transition-all">
              <div className="text-white text-xl font-bold mb-3 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Debt Consolidation Loan
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Combine multiple high-interest credit card bills or loans into a single, easy monthly EMI with much lower interest rates.
              </p>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Lower EMI Saver
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
                  <td className="p-5">GST Registration, Trade License or Udyam Aadhaar</td>
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