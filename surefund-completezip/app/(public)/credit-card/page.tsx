import ProductPageTemplate from "@/components/site/ProductPageTemplate";

export default function CreditCardPage() {
  return (
    <ProductPageTemplate
      title="Credit Card"
      tagline="Premium credit cards with cashback, rewards, and lounge access — matched to your spending profile and credit score."
      applySlug="credit-card"
      eligibility={[{ label: "Minimum CIBIL Score", value: "620+" }]}
      features={[
        "Cards from India's leading banks compared side-by-side",
        "Guidance on cards suited to your spend category (travel, fuel, cashback)",
        "Fast digital application with minimal paperwork",
        "Free CIBIL check to see which cards you qualify for",
      ]}
    />
  );
}
