"use client";

import { motion } from "framer-motion";

const banks = [
  { abbr: "SBI",   name: "State Bank of India",     bg: "#1A4B8C", text: "#fff" },
  { abbr: "HDFC",  name: "HDFC Bank",                bg: "#004C8F", text: "#fff" },
  { abbr: "ICICI", name: "ICICI Bank",               bg: "#B02A2A", text: "#fff" },
  { abbr: "AXIS",  name: "Axis Bank",                bg: "#97144D", text: "#fff" },
  { abbr: "KOTAK", name: "Kotak Mahindra",           bg: "#E5202E", text: "#fff" },
  { abbr: "INDUS", name: "IndusInd Bank",            bg: "#00529B", text: "#fff" },
  { abbr: "PNB",   name: "Punjab National",          bg: "#F37021", text: "#fff" },
  { abbr: "BOB",   name: "Bank of Baroda",           bg: "#F6821F", text: "#fff" },
  { abbr: "YES",   name: "YES Bank",                 bg: "#00529B", text: "#fff" },
  { abbr: "BAJAJ", name: "Bajaj Finance",            bg: "#003087", text: "#fff" },
  { abbr: "TATA",  name: "Tata Capital",             bg: "#003366", text: "#fff" },
  { abbr: "ABFL",  name: "Aditya Birla Finance",     bg: "#E2231A", text: "#fff" },
];

// Duplicate for seamless infinite loop
const allBanks = [...banks, ...banks];

export default function BankPartners() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.55 }}
          className="mb-10 text-center"
        >
          <span className="mb-2 inline-block rounded-full bg-accent/15 px-4 py-1.5 text-sm font-semibold text-accent">
            Our Banking Partners
          </span>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
            Loans Powered by India&apos;s{" "}
            <span className="text-accent">Top Lenders</span>
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-white/55">
            We work exclusively with RBI-regulated banks &amp; NBFCs to secure
            the best rates and terms for you.
          </p>
        </motion.div>
      </div>

      {/* Full-bleed marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-primary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-primary to-transparent" />

        <div className="flex overflow-hidden">
          <div className="flex animate-marquee items-center gap-5 pr-5 [animation-play-state:running] hover:[animation-play-state:paused]">
            {allBanks.map((bank, i) => (
              <div
                key={`${bank.abbr}-${i}`}
                className="flex min-w-[150px] flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-glow"
              >
                {/* Brand-coloured logo badge */}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-xs font-black tracking-tighter"
                  style={{ background: bank.bg, color: bank.text }}
                >
                  {bank.abbr}
                </div>
                <span className="text-center text-xs font-semibold leading-tight text-white/65">
                  {bank.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
