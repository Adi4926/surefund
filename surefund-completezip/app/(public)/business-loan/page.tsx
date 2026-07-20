import ProductPageTemplate from "@/components/site/ProductPageTemplate";

export default function BusinessLoanPage() {
  return (
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
  );
}
