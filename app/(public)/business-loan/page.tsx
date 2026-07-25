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
      </motion.div>

    </div>
  );
}