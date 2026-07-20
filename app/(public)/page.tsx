import Hero from "@/components/Hero";
import ProductCards from "@/components/ProductCards";
import TrustAndStats from "@/components/TrustAndStats";
import ReviewsSection from "@/components/site/ReviewsSection";
import HomeFaq from "@/components/site/HomeFaq";
import HomeLinkCards from "@/components/site/HomeLinkCards";
import WhyChooseUs from "@/components/site/WhyChooseUs";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProductCards />
      <WhyChooseUs />
      <TrustAndStats />
      <ReviewsSection />
      <HomeFaq />
      <HomeLinkCards />
    </main>
  );
}