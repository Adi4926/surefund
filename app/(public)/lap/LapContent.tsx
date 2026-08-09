"use client";

import ProductPageTemplate from "@/components/site/ProductPageTemplate";
import FloatingBottomBanner from "@/components/site/FloatingBottomBanner";
import { motion } from "framer-motion";

export default function LapContent() {
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
          title="Loan Against Property"
          tagline="Unlock the value of your residential or commercial property for high-value financial needs — with low interest rates and long repayment tenures."
          applySlug="lap"
          currentSlug="lap"
          eligibility={[
            { label: "Minimum Property Value", value: "₹10 Lakh+" },
            { label: "Minimum CIBIL Score", value: "650+" },
            { label: "Age Range", value: "25-65 years" },
          ]}
          features={[
            "Loan amounts up to ₹5 Crore against your property",
            "Interest rates starting from 8.75% p.a.",
            "Long repayment tenure of up to 20 years",
            "Both residential and commercial property accepted",
          ]}
          faqs={[
            {
              question: "What is a loan against property?",
              answer:
                "A loan against property (LAP) lets you borrow funds by pledging your residential or commercial property as collateral, while you continue to use and own the property. It typically offers lower interest rates and higher loan amounts than unsecured loans.",
            },
            {
              question: "What is the maximum loan amount I can get against my property?",
              answer:
                "You can get up to ₹5 Crore, depending on your property's market value, location, and your income profile. Lenders typically finance 50-70% of the property's current market value.",
            },
            {
              question: "What CIBIL score is required for a loan against property?",
              answer:
                "A CIBIL score of 650 or above is generally required. A higher score can help you secure a lower interest rate and faster approval.",
            },
            {
              question: "Can I get a loan against a commercial property?",
              answer:
                "Yes, SureFund's partner lenders offer loans against both residential and commercial properties, subject to clear property title and valuation.",
            },
            {
              question: "How long does loan against property approval take?",
              answer:
                "Approval typically takes longer than unsecured loans due to property valuation and legal verification — usually 7 to 15 working days, depending on the lender and documentation.",
            },
          ]}
        />

        {/* ── Types of Loans Against Property Section ── */}
        <section className="py-20 max-w-5xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Types of Loans Against Property — Tailored for Every Need
            </h2>
            <p className="text-gray-300">
              Explore the right option based on your property type and financial requirement.
            </p>
          </div>

          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Residential Property Loan
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Borrow against your self-owned house or apartment for large personal or business expenses.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                High Loan Value
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Commercial Property Loan
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Unlock funds against office space, shops, or commercial units to expand or diversify your business.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                For Business Owners
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Loan Against Rented Property
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Leverage a rented-out property's value while continuing to earn rental income from it.
                </p>
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                Keep Earning Rent
              </span>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Loan Against Property Balance Transfer
                </h3>
                <p className="text-gray-300 text-sm mt-1 pl-5">
                  Transfer your existing LAP to a new lender with a lower interest rate and reduce your total repayment cost.
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
              Documents Required for a Loan Against Property
            </h2>
            <p className="text-gray-300">
              Keep these basic documents ready for a smooth, transparent, and fast approval experience.
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
                  <td className="p-5">Last 6 Months Salary Account Statement</td>
                  <td className="p-5">Last 6 Months Current Bank Account Statement</td>
                </tr>
                <tr>
                  <td className="p-5 font-medium text-white">Property Documents</td>
                  <td className="p-5">Title Deed, Property Tax Receipts, Approved Building Plan</td>
                  <td className="p-5">Title Deed, Property Tax Receipts, Approved Building Plan</td>
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