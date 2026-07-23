"use client";

import { useMemo, useState } from "react";
import { Calculator, User, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const loanTypes = [
  { label: "Personal Loan", icon: User, defaultRate: 9.9, slug: "personal-loan" },
  { label: "Business Loan", icon: Briefcase, defaultRate: 14, slug: "business-loan" },
];

const tenureOptions = [
  { label: "1 yr", months: 12 },
  { label: "2 yr", months: 24 },
  { label: "3 yr", months: 36 },
  { label: "4 yr", months: 48 },
  { label: "5 yr", months: 60 },
  { label: "7 yr", months: 84 },
];

export default function EmiCalculatorPage() {
  const [loanTypeIndex, setLoanTypeIndex] = useState(0);
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(loanTypes[0].defaultRate);
  const [tenure, setTenure] = useState(36); // months

  function selectLoanType(i: number) {
    setLoanTypeIndex(i);
    setRate(loanTypes[i].defaultRate);
  }

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    if (monthlyRate === 0) {
      const flatEmi = amount / tenure;
      return {
        emi: flatEmi,
        totalInterest: 0,
        totalPayment: amount,
      };
    }
    const emiValue =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    const total = emiValue * tenure;
    return {
      emi: emiValue,
      totalInterest: total - amount,
      totalPayment: total,
    };
  }, [amount, rate, tenure]);

  // Determine current selected loan route slug
  const currentLoanSlug = loanTypes[loanTypeIndex].slug;

  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-20 font-sans text-white">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-10 max-w-2xl text-center px-4"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent backdrop-blur-xl shadow-[0_0_20px_rgba(124,58,237,0.2)]">
          <Calculator size={32} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          EMI <span className="text-accent">Calculator</span>
        </h1>
        <p className="mt-4 text-lg text-white/60">
          Estimate your monthly installment before you apply.
        </p>
      </motion.div>

      {/* --- LOAN TYPE TABS --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mx-auto mb-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 px-4"
      >
        {loanTypes.map((type, i) => {
          const active = loanTypeIndex === i;
          return (
            <button
              key={type.label}
              onClick={() => selectLoanType(i)}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                active
                  ? "border-accent bg-accent text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                  : "border-white/15 bg-white/5 text-white/60 hover:border-white/25 hover:bg-white/10 hover:text-white"
              }`}
            >
              <type.icon size={16} />
              {type.label}
            </button>
          );
        })}
      </motion.div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 sm:px-6 lg:px-8 md:grid-cols-2">

        {/* --- LEFT CARD: INPUTS --- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10"
        >
          {/* Amount Slider */}
          <div>
            <div className="mb-4 flex items-end justify-between">
              <span className="text-sm font-medium text-white/60">Loan Amount</span>
              <span className="text-2xl font-bold text-white">
                ₹{amount.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min={50000}
              max={5000000}
              step={10000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-accent outline-none"
            />
            <div className="mt-2 flex justify-between text-xs text-white/40">
              <span>₹50K</span>
              <span>₹50L</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div>
            <div className="mb-4 flex items-end justify-between">
              <span className="text-sm font-medium text-white/60">Interest Rate (p.a.)</span>
              <span className="text-2xl font-bold text-white">{rate}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={24}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-accent outline-none"
            />
            <div className="mt-2 flex justify-between text-xs text-white/40">
              <span>5%</span>
              <span>24%</span>
            </div>
          </div>

          {/* Tenure — clickable pills */}
          <div>
            <div className="mb-4 flex items-end justify-between">
              <span className="text-sm font-medium text-white/60">Tenure</span>
              <span className="text-2xl font-bold text-white">
                {tenure} <span className="text-lg font-normal text-white/60">months</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tenureOptions.map((opt) => {
                const active = tenure === opt.months;
                return (
                  <button
                    key={opt.months}
                    onClick={() => setTenure(opt.months)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                      active
                        ? "border-accent bg-accent text-white"
                        : "border-white/15 bg-white/5 text-white/60 hover:border-white/25 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT CARD: RESULT --- */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center rounded-3xl border border-accent/20 bg-accent/10 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.15)] sm:p-10"
        >
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-accent">Your Estimated Monthly EMI</p>
            <p className="mt-2 text-5xl font-bold text-white drop-shadow-md">
              ₹{emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="mt-10 space-y-5 border-t border-white/10 pt-8 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Principal Amount</span>
              <span className="font-semibold text-white text-base">₹{amount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Total Interest</span>
              <span className="font-semibold text-white text-base">
                ₹{totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between border-t border-white/5 pt-5">
              <span className="text-white/80 font-medium">Total Payment</span>
              <span className="font-bold text-accent text-lg">
                ₹{totalPayment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          {/* Dynamic Link matching selected loan tab */}
          <Link
            href={`/apply/${currentLoanSlug}`}
            className="mt-10 block w-full rounded-full bg-accent py-4 text-center font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300 hover:-translate-y-1 hover:bg-accent/90 hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]"
          >
            Apply for This Amount
          </Link>
        </motion.div>

      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mx-auto mt-10 max-w-2xl px-4 text-center text-xs text-white/30"
      >
        This calculator is for illustration only. Actual EMI, interest rate, and
        tenure depend on the lender&apos;s assessment of your profile.
      </motion.p>

    </div>
  );
}