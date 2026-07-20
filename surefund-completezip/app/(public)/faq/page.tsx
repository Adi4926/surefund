import FaqAccordion from "@/components/site/FaqAccordion";
import { faqItems } from "@/lib/faqData";

export default function FaqPage() {
  return (
    <main className="section">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-primary/60">
          Answers to the questions we hear most often from our customers.
        </p>
      </div>
      <FaqAccordion items={faqItems} />
    </main>
  );
}
