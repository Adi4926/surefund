import ProductPageTemplate from "@/components/site/ProductPageTemplate";

export default function PersonalLoanPage() {
  return (
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
  );
}
