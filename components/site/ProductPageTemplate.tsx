"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProductPageTemplateProps {
  title: string;
  tagline: string;
  applySlug: string;
  eligibility: { label: string; value: string }[];
  features: string[];
}

export default function ProductPageTemplate({
  title,
  tagline,
  applySlug,
  eligibility,
  features,
}: ProductPageTemplateProps) {
  return (
    <div className="relative min-h-screen overflow-hidden pt-28 pb-20 font-sans text-white">
      
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