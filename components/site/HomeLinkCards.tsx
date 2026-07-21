"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Briefcase, ArrowRight, MapPin, Award } from "lucide-react";

export default function HomeLinkCards() {
  return (
    <section className="section !pt-0">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

        {/* About Us — indigo-to-blue gradient, glassy */}
        <motion.div
  initial={{ opacity: 0, x: -120 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: false, amount: 0.35 }}
  transition={{
    duration: 0.9,
    type: "spring",
    stiffness: 70,
    damping: 15,
  }}
>
  <Link
    href="/about"
    className="group relative overflow-hidden rounded-3xl p-[1px] shadow-glow transition-transform hover:-translate-y-1"
    style={{
      background:
        "linear-gradient(135deg, rgba(99,102,241,0.55) 0%, rgba(59,130,246,0.45) 100%)",
    }}
  >
    {/* Glass inner */}
    <div
      className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] p-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-indigo-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
          <Users size={24} />
        </div>

        <h3 className="text-2xl font-bold text-white drop-shadow-sm">
          About Us
        </h3>

        <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80">
          Learn how SureFund helps thousands of families across Uttar Pradesh
          access the right credit — transparently and without the stress.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
            <MapPin size={11} /> Lucknow, UP
          </span>

          <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
            <Award size={11} /> 5,000+ Customers
          </span>
        </div>

        <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-yellow-300">
          Our Story{" "}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </div>
  </Link>
</motion.div>

        {/* Careers — amber-to-emerald gradient, glassy */}
        <motion.div
  initial={{ opacity: 0, x: 120 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: false, amount: 0.35 }}
  transition={{
    duration: 0.9,
    type: "spring",
    stiffness: 70,
    damping: 15,
    delay: 0.15,
  }}
>
  <Link
    href="/careers"
    className="group relative overflow-hidden rounded-3xl p-[1px] shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
    style={{
      background:
        "linear-gradient(135deg, rgba(245,158,11,0.55) 0%, rgba(16,185,129,0.45) 100%)",
    }}
  >
    {/* Glass inner */}
    <div
      className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] p-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-emerald-400/25 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
          <Briefcase size={24} />
        </div>

        <h3 className="text-2xl font-bold text-white drop-shadow-sm">
          Join With Us
        </h3>

        <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80">
          We&apos;re hiring across HR, Technology, Accounts, and Sales.
          Build a meaningful career in financial services with a team that cares.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {["HR", "Technology", "Accounts", "Sales"].map((dept) => (
            <span
              key={dept}
              className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm"
            >
              {dept}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-yellow-200">
          View Open Roles{" "}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </div>
  </Link>
</motion.div>
      </div>
    </section>
  );
}