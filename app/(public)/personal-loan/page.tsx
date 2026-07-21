"use client";

import ProductPageTemplate from "@/components/site/ProductPageTemplate";
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
        />
      </motion.div>

    </div>
  );
}