"use client";

import ProductPageTemplate from "@/components/site/ProductPageTemplate";
import { motion } from "framer-motion";

export default function BusinessLoanPage() {
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
        />
      </motion.div>

    </div>
  );
}