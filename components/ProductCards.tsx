"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Briefcase, CreditCard, ArrowRight } from "lucide-react";

const products = [
  {
    title: "Personal Loan",
    desc: "Up to ₹25 Lakh for weddings, medical needs, travel & more.",
    icon: Wallet,
    href: "/personal-loan",
    gradient: "from-secondary to-blue-400",
  },
  {
    title: "Business Loan",
    desc: "Fuel your growth with collateral-free working capital.",
    icon: Briefcase,
    href: "/business-loan",
    gradient: "from-primary to-secondary",
  },
  {
    title: "Credit Card",
    desc: "Premium cards with cashback, rewards & lounge access.",
    icon: CreditCard,
    href: "/credit-card",
    gradient: "from-accent to-amber-500",
  },
];

export default function ProductCards() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / products.length;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  }

  function scrollTo(i: number) {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / products.length;
    el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  }

  return (
    <section className="section">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Products Tailored For You
        </h2>
        <p className="mt-3 text-white/60">Choose a product below and apply in minutes.</p>
      </div>

      {/* ── Mobile slider (hidden on sm+) ── */}
      <div className="sm:hidden">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {products.map((p) => (
            <a
              key={p.title}
              href={p.href}
              className="relative flex w-[80vw] flex-shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-card backdrop-blur-xl"
            >
              {/* Gradient accent blob */}
              <div className={`absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${p.gradient} opacity-20 blur-2xl`} />
              <div className={`relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${p.gradient} text-white shadow-md`}>
                <p.icon size={26} />
              </div>
              <h3 className="relative text-lg font-semibold text-white">{p.title}</h3>
              <p className="relative mt-2 text-sm text-white/60">{p.desc}</p>
              <div className="relative mt-5 flex items-center gap-1 text-sm font-semibold text-accent">
                Apply Now <ArrowRight size={15} />
              </div>
            </a>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="mt-4 flex justify-center gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 bg-accent"
                  : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop grid (hidden on mobile) ── */}
      <div className="mx-auto hidden max-w-4xl grid-cols-1 gap-6 sm:grid sm:grid-cols-3">
        {products.map((p, i) => {
          const shuffleFrom = [
            { x: -120, y: 40, rotate: -12 },
            { x: 0, y: -80, rotate: 8 },
            { x: 120, y: 40, rotate: -6 },
          ][i % 3];

          return (
            <motion.a
              key={p.title}
              href={p.href}
              initial={{ opacity: 0, ...shuffleFrom }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.04, y: -6 }}
              className="group relative block overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition-shadow hover:shadow-glow"
            >
              <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} text-white shadow-md transition-transform group-hover:scale-110`}>
                <p.icon size={26} />
              </div>
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-white/60">{p.desc}</p>
              <div className="mt-5 flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                Apply Now <ArrowRight size={16} />
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
