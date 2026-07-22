import FaqAccordion from "@/components/site/FaqAccordion";
import { faqItems } from "@/lib/faqData";

export default function FaqPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-20 px-6 md:px-10 text-white">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 mx-auto max-w-4xl">
        
        {/* Header Section */}
        <div className="mx-auto mb-16 text-center">
          <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-yellow-400 backdrop-blur-xl mb-6">
            Got Questions?
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Frequently Asked <span className="text-blue-400">Questions</span>
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Answers to the questions we hear most often from our customers regarding loans, CIBIL, and documentation.
          </p>
        </div>

        {/* FAQ Accordion Container */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 backdrop-blur-xl shadow-2xl">
          <FaqAccordion items={faqItems} />
        </div>

      </div>
    </main>
  );
}