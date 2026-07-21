"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { TextAnimate } from "@/components/site/TextAnimate";

const floatVariants = {
  animate: {
    y: [0, -22, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const floatVariantsSlow = {
  animate: {
    y: [0, 14, 0],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
  },
};

const trustBadges = ["No Hidden Fees", "100% Paperless", "24-hr Approval"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden text-white">
      {/* === Animated floating orbs === */}
      

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="section relative z-10 flex flex-col items-center text-center">
        {/* Tag */}
        <motion.span
          initial={{ y: -12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-dark mb-6 rounded-full px-4 py-1.5 text-sm font-medium text-accent"
        >
          Funding Dreams. Building Futures.
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl"
        >
          Get the Right Loan with{" "}
          <span className="relative text-accent">
            Expert Guidance
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left rounded-full bg-accent/50"
            />
          </span>
        </motion.h1>

        {/* Subheading */}
       <p className="mt-6 max-w-2xl text-lg text-white/80">
          <TextAnimate delay={0.2}>
            Personal Loans, Business Loans and Credit Cards with fast processing and trusted assistance backed by SureFund Financial Services, Lucknow.
          </TextAnimate>
        </p>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/services"
            className="group flex items-center gap-2 rounded-xl bg-gradient-accent px-7 py-3.5 font-bold text-primary shadow-glow-accent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(251,191,36,0.55)]"
          >
            Apply Now
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href="/cibil-check"
            className="flex items-center gap-2 rounded-xl border-2 border-white/50 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/80 hover:bg-white/10"
          >
            Check Eligibility
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
            >
              <CheckCircle size={12} className="text-accent" />
              {badge}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
    </section>
  );
}
