"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

export default function FloatingBottomBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // चेक करें कि यूजर बिजनेस पेज पर है या पर्सनल पेज पर, ताकि सही लिंक और टेक्स्ट मिल सके
  const isBusinessPage = pathname?.includes("business-loan");

  // डिज़ाइन, थीम और कलर बिल्कुल पर्सनल पेज जैसा (Emerald Green) रहेगा
  const bannerConfig = isBusinessPage
    ? {
        badge: "🚀 Scale Your Business",
        titleHighlight: "₹1 Crore",
        rateHighlight: "10.49%*",
        titleText: "Business Loan up to",
        linkHref: "/apply/business-loan",
        // बिजनेस पेज के लिए अलग इमेज
        mascotImg: "3d currency2.png", 
      }
    : {
        badge: "⚡ Instant Approval",
        titleHighlight: "₹50 Lakhs",
        rateHighlight: "9.99%*",
        titleText: "Get up to",
        linkHref: "/apply/personal-loan",
        // पर्सनल लोन पेज के लिए करेंसी इमेज
        mascotImg: "3d currency.png",
      };

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
          className="fixed inset-x-0 bottom-0 z-50 p-3 pointer-events-none"
        >
          {/* Main Slim Container - अब दोनों पेजेस पर बिल्कुल सेम ग्रीन (Emerald) थीम रहेगी */}
          <div className="mx-auto max-w-5xl pointer-events-auto relative overflow-visible rounded-2xl border border-emerald-500/50 bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 px-4 py-0 sm:px-6 sm:py-0 shadow-[0_15px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex items-center justify-between gap-4 h-14 sm:h-16">
            
            {/* Background Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-600/15 via-transparent to-emerald-600/15 pointer-events-none" />

            {/* Left Side: Image & Text */}
            <div className="flex items-center gap-3 sm:gap-6 z-20">
              <motion.div 
                animate={{ y: [0, -3, 0], rotate: [0, 2, -2, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="relative -top-6 sm:-top-7 h-24 w-20 sm:h-32 sm:w-28 shrink-0 pointer-events-none filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)]"
              >
                <img
                  src={bannerConfig.mascotImg} 
                  alt="Banner Mascot"
                  className="h-full w-full object-contain filter saturate-150 scale-125"
                />
              </motion.div>

              <div className="z-10 flex flex-col justify-center">
                <span className="inline-block w-fit rounded-full bg-emerald-500/25 px-2 py-0.2 text-[8px] sm:text-[9px] font-extrabold text-emerald-400 uppercase tracking-wider border border-emerald-500/40 mb-0.5">
                  {bannerConfig.badge}
                </span>
                <p className="text-xs sm:text-lg font-black text-white tracking-tight leading-none">
                  {bannerConfig.titleText} <span className="text-yellow-400 text-sm sm:text-xl font-black">{bannerConfig.titleHighlight}</span> at <span className="text-emerald-400 text-sm sm:text-xl font-black">{bannerConfig.rateHighlight}</span>
                </p>
              </div>
            </div>

            {/* Right Side: Apply Button & Close Button */}
            <div className="flex items-center gap-2 sm:gap-3 z-10 shrink-0">
              <Link
                href={bannerConfig.linkHref}
                className="group flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-3.5 sm:px-6 py-2 text-xs sm:text-sm font-black text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all hover:scale-105 active:scale-95"
              >
                Apply Now 
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() => setIsDismissed(true)}
                className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
                title="Close Banner"
              >
                <X size={14} />
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}