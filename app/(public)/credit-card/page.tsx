import ProductPageTemplate from "@/components/site/ProductPageTemplate";

export default function CreditCardPage() {
  return (
    <ProductPageTemplate
      title="Credit Card"
      tagline="Premium credit cards with cashback, rewards, and lounge access — matched to your spending profile and credit score."
      applySlug="credit-card"
      currentSlug="credit-card"
      eligibility={[{ label: "Minimum CIBIL Score", value: "620+" }]}
      features={[
        "Cards from India's leading banks compared side-by-side",
        "Guidance on cards suited to your spend category (travel, fuel, cashback)",
        "Fast digital application with minimal paperwork",
        "Free CIBIL check to see which cards you qualify for",
      ]}
      faqs={[
        {
          question: "What is the minimum CIBIL score required for a credit card?",
          answer:
            "Most banks look for a CIBIL score of 620 or above to approve a credit card application. A higher score improves your chances of approval and can also get you access to premium cards with better rewards.",
        },
        {
          question: "What documents are required to apply for a credit card?",
          answer:
            "You'll typically need PAN card, Aadhaar card, a recent photograph, and income proof such as salary slips or bank statements. Self-employed applicants may need to provide ITR or business proof as well.",
        },
        {
          question: "How long does credit card approval take?",
          answer:
            "Approval timelines vary by bank, but most applications are processed within 3 to 7 working days after document verification. Some banks also offer instant in-principle approval based on your CIBIL score.",
        },
        {
          question: "Is there an annual fee on credit cards?",
          answer:
            "It depends on the card. Many entry-level cards are free or have the annual fee waived off on reaching a minimum yearly spend, while premium cards with travel and lounge benefits usually carry a fixed annual fee.",
        },
        {
          question: "Can I apply for a credit card with a low income?",
          answer:
            "Yes, several banks offer credit cards designed for lower income brackets, including secured cards backed by a fixed deposit. Our team can help match you with a card suited to your income level.",
        },
        {
          question: "Will applying for a credit card affect my CIBIL score?",
          answer:
            "Every credit cards application involves a hard inquiry, which can cause a small, temporary dip in your CIBIL score. We recommend checking your eligibility first to avoid unnecessary rejections and multiple inquiries.",
        },
      ]}
    />
  );
}
