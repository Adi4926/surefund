"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Users, Award, FileCheck, Headphones } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Lightning Fast Processing",
    desc: "Get loan approval in 24–48 hours with our streamlined digital process — no long waits.",
    gradient: "from-yellow-400/25 to-orange-400/10",
    border: "rgba(251,191,36,0.35)",
    glow: "0 0 25px rgba(251,191,36,0.25)",
    iconBg: "rgba(251,191,36,0.15)",
  },
  {
    icon: Shield,
    title: "Zero Hidden Charges",
    desc: "Completely transparent fee structure — what we quote is exactly what you pay. No surprises.",
    gradient: "from-blue-400/25 to-cyan-400/10",
    border: "rgba(59,130,246,0.35)",
    glow: "0 0 25px rgba(59,130,246,0.25)",
    iconBg: "rgba(59,130,246,0.15)",
  },
  {
    icon: Users,
    title: "Expert Loan Advisors",
    desc: "Dedicated relationship managers who guide you through every step — from application to disbursal.",
    gradient: "from-purple-400/25 to-pink-400/10",
    border: "rgba(168,85,247,0.35)",
    glow: "0 0 25px rgba(168,85,247,0.2)",
    iconBg: "rgba(168,85,247,0.15)",
  },
  {
    icon: Award,
    title: "5,000+ Happy Customers",
    desc: "Trusted by thousands of families across Uttar Pradesh for personal loans, business loans & credit cards.",
    gradient: "from-emerald-400/25 to-teal-400/10",
    border: "rgba(16,185,129,0.35)",
    glow: "0 0 25px rgba(16,185,129,0.25)",
    iconBg: "rgba(16,185,129,0.15)",
  },
  {
    icon: FileCheck,
    title: "100% Paperless Process",
    desc: "Upload documents digitally, track your application status online — anytime, anywhere.",
    gradient: "from-sky-400/25 to-blue-500/10",
    border: "rgba(14,165,233,0.35)",
    glow: "0 0 25px rgba(14,165,233,0.25)",
    iconBg: "rgba(14,165,233,0.15)",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Our customer care team is available 6 days a week to answer every question you have.",
    gradient: "from-rose-400/25 to-red-400/10",
    border: "rgba(244,63,94,0.35)",
    glow: "0 0 25px rgba(244,63,94,0.2)",
    iconBg: "rgba(244,63,94,0.15)",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-primary py-24">
      {/* Ambient background orbs */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-accent backdrop-blur-sm">
            Why SureFund?
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Why Choose <span className="text-accent">Us</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/55">
            We make borrowing simple, transparent and stress-free — because your financial freedom matters.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-60px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              variants={cardVariants}
              className={`group relative overflow-hidden rounded-2xl border bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/10`}
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
              whileHover={{ borderColor: r.border, boxShadow: r.glow }}
            >
              {/* Hover gradient bg */}
              <div
                className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${r.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-white"
                  style={{ background: r.iconBg, boxShadow: r.glow }}
                >
                  <r.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
