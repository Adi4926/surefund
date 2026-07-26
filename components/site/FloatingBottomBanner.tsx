"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

export default function FloatingBottomBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isDismissed]);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-x-0 bottom-0 z-50 p-4 pointer-events-none"
        >
          {/* Main Banner Container: max-w-5xl (बड़ा चौड़ा) और py-2.5 (और पतला) */}
          <div className="mx-auto max-w-5xl pointer-events-auto relative overflow-visible rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 px-5 py-2.5 sm:px-8 sm:py-3 shadow-[0_10px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex items-center justify-between gap-4">
            
            {/* Background Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/10 pointer-events-none" />

            {/* Left Side: Currency Mascot & Offer Text */}
            <div className="flex items-center gap-3 sm:gap-6 z-20">
              <motion.div 
                animate={{ y: [0, -4, 0], rotate: [0, 2, -2, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="relative -top-10 sm:-top-12 h-24 w-20 sm:h-32 sm:w-28 shrink-0 pointer-events-none filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)]"
              >
                <img
                  src="3d currency.png" 
                  alt="Currency Mascot"
                  className="h-full w-full object-contain filter saturate-150 scale-110"
                />
              </motion.div>

              {/* Offer Text */}
              <div className="z-10">
                <span className="inline-block rounded-full bg-emerald-500/20 px-2 py-0.5 text-[8px] sm:text-[9px] font-bold text-emerald-400 uppercase tracking-wider border border-emerald-500/30 mb-0.5">
                  ⚡ Instant Approval
                </span>
                <p className="text-xs sm:text-base font-bold text-white tracking-tight leading-snug">
                  Get up to <span className="text-yellow-400 font-extrabold">₹50 Lakhs</span> starting at <span className="text-emerald-400 font-extrabold">9.99%*</span>
                </p>
              </div>
            </div>

            {/* Right Side: Apply Button & Close Button */}
            <div className="flex items-center gap-3 z-10 shrink-0">
              <Link
                href="/apply/personal-loan"
                className="group flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] active:scale-95"
              >
                Apply Now 
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() => setIsDismissed(true)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                title="Close Banner"
              >
                <X size={15} />
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}