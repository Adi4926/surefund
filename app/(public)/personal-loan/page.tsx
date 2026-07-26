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
      </motion.div>

      {/* Floating Bottom Sticky Banner */}
      <FloatingBottomBanner />

    </div>
  );
}