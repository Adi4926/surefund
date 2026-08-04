"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Replace each lottieUrl below with the URL you copy from LottieFiles.com
// (same idea as the "You May Also Like" section — search "money", "briefcase",
// "credit card" and grab the free .lottie embed link for each one)
const products = [
  {
    title: "Personal Loan",
    desc: "Up to ₹25 Lakh for weddings, medical needs, travel & more.",
    lottieUrl: "https://lottie.host/REPLACE-WITH-PERSONAL-LOAN-URL.lottie",
    href: "/personal-loan",
    gradient: "from-secondary to-blue-400",
  },
  {
    title: "Business Loan",
    desc: "Fuel your growth with collateral-free working capital.",
    lottieUrl: "https://lottie.host/REPLACE-WITH-BUSINESS-LOAN-URL.lottie",
    href: "/business-loan",
    gradient: "from-primary to-secondary",
  },
  {
    title: "Credit Card",
    desc: "Premium cards with cashback, rewards & lounge access.",
    lottieUrl: "https://lottie.host/REPLACE-WITH-CREDIT-CARD-URL.lottie",
    href: "/credit-card",
    gradient: "from-accent to-amber-500",
  },
];

export default function ProductCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Auto-Fade effect for mobile version ──
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 2500); // 2.5 सेकंड में कार्ड फेड होगा

    return () => clearInterval(interval);
  }, []);

  const activeProduct = products[activeIndex];

  return (
    <section className="section">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Products Tailored For You
        </h2>
        <p className="mt-3 text-white/60">Choose a product below and apply in minutes.</p>
      </div>

      {/* ── Mobile FADE slider (hidden on sm+) ── */}
      <div className="sm:hidden flex flex-col items-center px-4">
        <div className="relative w-full max-w-sm h-[260px]">
          <AnimatePresence mode="wait">
            <motion.a
              key={activeIndex}
              href={activeProduct.href}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeInOut" }} // यहाँ फेड की स्मूथनेस सेट की गई है
              className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-card backdrop-blur-xl"
            >
              {/* Gradient accent blob */}
              <div className={`absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${activeProduct.gradient} opacity-20 blur-2xl`} />

              <div className="relative mb-5 h-16 w-16">
                <DotLottieReact src={activeProduct.lottieUrl} loop autoplay />
              </div>

              <h3 className="relative text-xl font-semibold text-white">{activeProduct.title}</h3>
              <p className="relative mt-2 text-sm text-white/60 leading-relaxed">{activeProduct.desc}</p>
              
              <div className="relative mt-auto flex items-center gap-1 text-sm font-semibold text-accent">
                Apply Now <ArrowRight size={15} />
              </div>
            </motion.a>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ease-out ${
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
              <div className="mb-5 h-16 w-16 transition-transform group-hover:scale-110">
                <DotLottieReact src={p.lottieUrl} loop autoplay />
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
