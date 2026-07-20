"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

const LOAN_TYPES = [
  { value: "Personal Loan", label: "Personal Loan" },
  { value: "Business Loan", label: "Business Loan" },
  { value: "Credit Card", label: "Credit Card" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function HeroApplyModal({ open, onClose }: Props) {
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    productType: "Personal Loan",
    loanAmount: "",
    city: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function patch(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) {
      setError("Please accept the disclaimer and privacy policy to continue.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          mobile: form.mobile,
          email: form.email || undefined,
          productType: form.productType,
          loanAmount: form.loanAmount ? Number(form.loanAmount) : undefined,
          city: form.city || undefined,
          source: "Website",
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong. Please try again.");
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setSuccess(false);
      setError("");
      setForm({ fullName: "", mobile: "", email: "", productType: "Personal Loan", loanAmount: "", city: "" });
      setAgreed(false);
    }, 300);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-primary/75 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-2xl">
              {/* Decorative orbs inside dialog */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-secondary/40 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />

              <div className="relative p-7 sm:p-8">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Apply for a Loan</h2>
                    <p className="mt-1 text-sm text-white/60">Fill in a few details — our team will call you shortly.</p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                {success ? (
                  /* Success state */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-8 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/20">
                      <CheckCircle2 size={36} className="text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Application Received!</h3>
                    <p className="max-w-xs text-sm text-white/65">
                      Thank you, <strong className="text-white">{form.fullName}</strong>! Our loan advisor will call you on{" "}
                      <strong className="text-white">{form.mobile}</strong> within 1 business hour.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-2 rounded-xl bg-emerald-500/20 px-6 py-2.5 text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/30"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  /* Form */
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <input
                        required
                        placeholder="Full Name *"
                        value={form.fullName}
                        onChange={(e) => patch("fullName", e.target.value)}
                        className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-accent/60 focus:bg-white/15 sm:col-span-2"
                      />
                      <input
                        required
                        placeholder="Mobile Number *"
                        value={form.mobile}
                        onChange={(e) => patch("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                        maxLength={10}
                        inputMode="numeric"
                        className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-accent/60 focus:bg-white/15"
                      />
                      <input
                        type="email"
                        placeholder="Email (optional)"
                        value={form.email}
                        onChange={(e) => patch("email", e.target.value)}
                        className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-accent/60 focus:bg-white/15"
                      />
                      <select
                        value={form.productType}
                        onChange={(e) => patch("productType", e.target.value)}
                        className="rounded-xl border border-white/15 bg-primary/80 px-4 py-3 text-sm text-white outline-none transition focus:border-accent/60 focus:bg-primary/90"
                      >
                        {LOAN_TYPES.map((t) => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                      <input
                        placeholder="Loan Amount (₹)"
                        value={form.loanAmount}
                        onChange={(e) => patch("loanAmount", e.target.value.replace(/\D/g, ""))}
                        inputMode="numeric"
                        className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-accent/60 focus:bg-white/15"
                      />
                      <input
                        placeholder="Your City"
                        value={form.city}
                        onChange={(e) => patch("city", e.target.value)}
                        className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-accent/60 focus:bg-white/15"
                      />
                    </div>

                    {/* Disclaimer checkbox */}
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 transition hover:bg-white/10">
                      <div className="relative mt-0.5 shrink-0">
                        <input
                          type="checkbox"
                          className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-white/30 bg-white/10 checked:border-accent checked:bg-accent"
                          checked={agreed}
                          onChange={(e) => { setAgreed(e.target.checked); setError(""); }}
                        />
                        <CheckCircle2
                          size={12}
                          className="pointer-events-none absolute left-0.5 top-0.5 text-primary opacity-0 transition peer-checked:opacity-100"
                        />
                      </div>
                      <span className="text-xs leading-relaxed text-white/65">
                        I have read and agree to the{" "}
                        <Link href="/privacy-policy" target="_blank" className="font-semibold text-accent underline underline-offset-2">
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link href="/terms-conditions" target="_blank" className="font-semibold text-accent underline underline-offset-2">
                          Terms &amp; Conditions
                        </Link>
                        . I authorise SureFund Financial Services and its partner banks/NBFCs to contact me via SMS, email, or phone regarding my loan application. I understand that SureFund is a Loan DSA and does not disburse loans directly.
                      </span>
                    </label>

                    {error && (
                      <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2.5 text-xs text-red-300">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-accent py-3.5 text-sm font-bold text-primary shadow-glow-accent transition-all hover:-translate-y-0.5 disabled:opacity-60"
                    >
                      {loading ? (
                        <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                      ) : (
                        <>Submit Application <ArrowRight size={16} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
