import Hero from "@/components/Hero";
import ProductCards from "@/components/ProductCards";
import TrustAndStats from "@/components/TrustAndStats";
import ReviewsSection from "@/components/site/ReviewsSection";
import HomeFaq from "@/components/site/HomeFaq";
import HomeLinkCards from "@/components/site/HomeLinkCards";
import WhyChooseUs from "@/components/site/WhyChooseUs";
import LightRays from "@/components/site/LightRays";

export default function HomePage() {
  return (
    <main className="relative">
      <LightRays
        raysOrigin="top-center"
        raysColor="#a78bfa"
        raysSpeed={1.2}
        lightSpread={1.4}
        rayLength={2.2}
        saturation={1.3}
        followMouse={true}
        mouseInfluence={0.15}
        noiseAmount={0.08}
        distortion={0.04}
      />
      <div className="relative z-10">
        <Hero />
        <ProductCards />
        <WhyChooseUs />
        <TrustAndStats />
        <ReviewsSection />
        <HomeFaq />
        <HomeLinkCards />
      </div>
    </main>
  );
}
