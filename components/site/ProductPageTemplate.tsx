"use client";

import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, ArrowRight, ChevronDown,ShieldCheck, Award, Users, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface ProductPageTemplateProps {
  title: string;
  tagline: string;
  applySlug: string;
  eligibility: { label: string; value: string }[];
  features: string[];
  currentSlug: string;
  faqs?: FAQ[];
}

const allProducts = [
  { slug: "personal-loan", label: "Personal Loan", href: "/personal-loan" },
  { slug: "business-loan", label: "Business Loan", href: "/business-loan" },
  { slug: "credit-card", label: "Credit Card", href: "/credit-card" },
  { slug: "emi-calculator", label: "EMI Calculator", href: "/emi-calculator" },
];

function FAQItem({ faq, isOpen, onClick }: { faq: FAQ; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-sm md:text-base font-semibold text-white">{faq.question}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-yellow-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-xs md:text-sm leading-relaxed text-white/70">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductPageTemplate({
  title,
  tagline,
  applySlug,
  eligibility,
  features,
  currentSlug,
  faqs,
}: ProductPageTemplateProps) {
  const relatedProducts = allProducts.filter((p) => p.slug !== currentSlug);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="relative min-h-screen overflow-hidden pt-28 pb-20 font-sans text-white">

      {/* --- FAQ SCHEMA (JSON-LD) --- */}
      {faqs && faqs.length > 0 && (
        <Script
          id={`faq-schema-${currentSlug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* --- HERO SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-20 max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      >
        <span className="mb-6 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-yellow-400 backdrop-blur-xl">
          Financial Solutions
        </span>
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-white/70">
          {tagline}
        </p>

        <div className="mt-8">
          <Link 
            href={`/apply/${applySlug}`} 
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-9 py-4 text-lg font-bold text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-[0_0_35px_rgba(37,99,235,0.6)]"
          >
            Apply Now <ArrowRight size={20} />
          </Link>
        </div>
      </motion.div>

      {/* --- ELIGIBILITY & FEATURES SECTION --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* Eligibility Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10 shadow-[0_15px_40px_-10px_rgba(59,130,246,0.15)]"
          >
            <h2 className="mb-6 text-2xl font-bold text-white">Eligibility Criteria</h2>
            <ul className="space-y-6">
              {eligibility.map((e) => (
                <li key={e.label} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <span className="text-sm font-medium text-white/60">{e.label}</span>
                  <span className="text-lg font-bold text-yellow-400">{e.value}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Features Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10 shadow-[0_15px_40px_-10px_rgba(59,130,246,0.15)]"
          >
            <h2 className="mb-6 text-2xl font-bold text-white">Why Choose SureFund</h2>
            <ul className="space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0 text-sm text-white/70">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-yellow-400" />
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>

      {/* --- FAQ & HIGHLIGHTED TRUST BOX SECTION (2-Column Layout) --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Side: FAQs (Takes 2 columns) */}
          {faqs && faqs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <FAQItem
                    key={faq.question}
                    faq={faq}
                    isOpen={openIndex === i}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Right Side: Trust & Compliance Guarantee Box (Takes 1 column) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-black/90 p-8 backdrop-blur-2xl shadow-[0_0_30px_rgba(16,185,129,0.15)] lg:sticky lg:top-28"
          >
            {/* Glowing Accent */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/20 blur-[60px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-4">
                <ShieldCheck size={14} /> 100% SECURE & VERIFIED
              </div>
              
              <h3 className="text-xl font-extrabold text-white mb-3">
                The SureFund Trust Guarantee
              </h3>
              
              <p className="text-xs md:text-sm text-white/70 mb-6 leading-relaxed">
                We partner only with RBI-registered banks and top NBFCs to ensure your data privacy, transparent loan terms, and absolute financial safety.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2.5 text-xs font-medium text-white/95">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Zero Hidden Charges & Full Transparency</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-white/95">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Bank-Grade 256-Bit Data Encryption</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-white/95">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Direct Assistance from Lucknow Experts</span>
                </div>
              </div>

              <Link
                href={`/apply/${applySlug}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 px-6 text-sm font-bold text-white shadow-lg hover:bg-emerald-500 transition-all duration-300 hover:scale-[1.02]"
              >
                Apply with Confidence <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      {/* --- RELATED PRODUCTS / INTERNAL LINKING SECTION --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24"
      >
        <h2 className="mb-8 text-center text-2xl font-bold text-white md:text-3xl">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {relatedProducts.map((product) => (
            <Link
              key={product.slug}
              href={product.href}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/10"
            >
              <span className="text-base font-semibold text-white">{product.label}</span>
              <ArrowRight
                size={18}
                className="text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-yellow-400"
              />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* --- BOTTOM CTA SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 md:p-16 backdrop-blur-xl shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-lg text-white/70 mb-8 max-w-lg mx-auto">
              Apply in minutes and our team will reach out to guide you through the rest.
            </p>
            <Link 
              href={`/apply/${applySlug}`} 
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
            >
              Apply Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </motion.div>

    </div>
  );
}