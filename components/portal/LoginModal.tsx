"use client";

import { X, TrendingDown, Zap, ShieldCheck, Star } from "lucide-react";
import OtpLoginForm from "@/components/portal/OtpLoginForm";

const highlights = [
  {
    icon: TrendingDown,
    title: "Interest Rates from 9.9%",
    desc: "Compare offers across 25+ banks & NBFCs to get the lowest rate.",
  },
  {
    icon: Zap,
    title: "Approval in 24-48 hrs",
    desc: "Fast, digital processing — no long branch visits needed.",
  },
  {
    icon: ShieldCheck,
    title: "100% Transparent",
    desc: "Zero hidden charges. What we quote is what you pay.",
  },
];

export default function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-primary/60 p-4 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 flex w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-colors hover:bg-primary/5"
        >
          <X size={18} />
        </button>

        {/* Left — marketing panel (hidden on small screens) */}
        <div className="hidden w-[280px] shrink-0 flex-col justify-center border-r border-white/10 bg-gradient-hero p-8 text-white md:flex">
          <span className="mb-4 inline-flex w-fit items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
            <Star size={12} className="fill-accent" />
            Trusted by 5,000+ customers
          </span>
          <h3 className="text-xl font-bold leading-snug">
            Your next loan, on <span className="text-accent">better terms</span>
          </h3>

          <div className="mt-8 space-y-6">
            {highlights.map((h) => (
              <div key={h.title} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent">
                  <h.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{h.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/60">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — login form */}
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-sm">
            <OtpLoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
