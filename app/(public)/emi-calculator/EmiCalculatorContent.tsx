"use client";

import { useMemo, useState, Suspense } from "react";
import { Calculator, User, Briefcase, ArrowRight, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const loanTypes = [
  { label: "Personal Loan", icon: User, defaultRate: 9.9, slug: "personal-loan" },
  { label: "Business Loan", icon: Briefcase, defaultRate: 14, slug: "business-loan" },
];

const relatedProducts = [
  { slug: "personal-loan", label: "Personal Loan", href: "/personal-loan", icon: User },
  { slug: "business-loan", label: "Business Loan", href: "/business-loan", icon: Briefcase },
  { slug: "credit-card", label: "Credit Card", href: "/credit-card", icon: CreditCard },
];

// Helper to format number to Indian comma format
function formatIndianCurrency(num: number | string): string {
  if (num === "" || num === undefined) return "";
  const cleaned = String(num).replace(/[^0-9]/g, "");
  if (cleaned === "") return "";
  const n = parseInt(cleaned, 10);
  if (isNaN(n)) return "";
  return n.toLocaleString("en-IN");
}

function EmiCalculatorContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");
  const initialIndex = initialType === "business" ? 1 : 0;

  const [loanTypeIndex, setLoanTypeIndex] = useState(initialIndex);
  const [amount, setAmount] = useState<number>(500000);
  const [rate, setRate] = useState<number | ''>(loanTypes[initialIndex].defaultRate);
  
  const [tenureUnit, setTenureUnit] = useState<"yr" | "mo">("yr");
  const [tenureValue, setTenureValue] = useState<number | ''>(3);

  // State for amount input text with live commas
  const [amountInput, setAmountInput] = useState<string>("5,00,000");

  function selectLoanType(i: number) {
    setLoanTypeIndex(i);
    setRate(loanTypes[i].defaultRate);
  }

  const numericRate = typeof rate === 'number' ? rate : 0;
  const numericTenureVal = typeof tenureValue === 'number' ? tenureValue : 0;

  const totalMonths = tenureUnit === "yr" ? numericTenureVal * 12 : numericTenureVal;

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const months = totalMonths > 0 ? totalMonths : 1;
    const monthlyRate = numericRate / 12 / 100;
    if (monthlyRate === 0) {
      const flatEmi = amount / months;
      return {
        emi: flatEmi,
        totalInterest: 0,
        totalPayment: amount,
      };
    }
    const emiValue =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const total = emiValue * months;
    return {
      emi: emiValue,
      totalInterest: total - amount,
      totalPayment: total,
    };
  }, [amount, numericRate, totalMonths]);

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
          {/* 1. Loan Amount */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-white/60">Loan Amount</span>
              <div className="flex items-center gap-1 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 focus-within:border-accent">
                <span className="text-xl font-bold text-white">₹</span>
                <input
                  type="text"
                  value={amountInput}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^0-9]/g, "");
                    if (rawValue === "") {
                      setAmountInput("");
                      setAmount(0);
                    } else {
                      const num = Number(rawValue);
                      setAmount(num);
                      setAmountInput(formatIndianCurrency(num));
                    }
                  }}
                  className="w-36 bg-transparent text-xl font-bold text-white outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min={50000}
              max={5000000}
              step={10000}
              value={amount}
              onChange={(e) => {
                const val = Number(e.target.value);
                setAmount(val);
                setAmountInput(formatIndianCurrency(val));
              }}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-accent outline-none"
            />
            <div className="mt-2 flex justify-between text-xs text-white/40">
              <span>₹50K</span>
              <span>₹50L</span>
            </div>
          </div>

          {/* 2. Interest Rate */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-white/60">Interest Rate (p.a.)</span>
              <div className="flex items-center gap-1 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 focus-within:border-accent">
                <input
                  type="number"
                  step={0.1}
                  value={rate === '' ? '' : rate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setRate(val === '' ? '' : Number(val));
                  }}
                  className="w-16 bg-transparent text-xl font-bold text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <span className="text-xl font-bold text-white">%</span>
              </div>
            </div>
            <input
              type="range"
              min={5}
              max={24}
              step={0.1}
              value={numericRate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-accent outline-none"
            />
            <div className="mt-2 flex justify-between text-xs text-white/40">
              <span>5%</span>
              <span>24%</span>
            </div>
          </div>

          {/* 3. Tenure */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-white/60">Tenure</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 focus-within:border-accent">
                  <input
                    type="number"
                    value={tenureValue === '' ? '' : tenureValue}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTenureValue(val === '' ? '' : Number(val));
                    }}
                    className="w-14 bg-transparent text-xl font-bold text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>
                <div className="flex rounded-lg border border-white/15 bg-white/5 p-0.5 text-xs font-semibold">
                  <button
                    onClick={() => {
                      if (tenureUnit !== "yr") {
                        setTenureUnit("yr");
                        setTenureValue(Math.max(1, Math.round(numericTenureVal / 12)));
                      }
                    }}
                    className={`rounded-md px-2.5 py-1 transition-all ${
                      tenureUnit === "yr" ? "bg-accent text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Yr
                  </button>
                  <button
                    onClick={() => {
                      if (tenureUnit !== "mo") {
                        setTenureUnit("mo");
                        setTenureValue(numericTenureVal * 12);
                      }
                    }}
                    className={`rounded-md px-2.5 py-1 transition-all ${
                      tenureUnit === "mo" ? "bg-accent text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Mo
                  </button>
                </div>
              </div>
            </div>

            <input
              type="range"
              min={1}
              max={tenureUnit === "yr" ? 30 : 360}
              step={1}
              value={numericTenureVal}
              onChange={(e) => setTenureValue(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-accent outline-none"
            />
            <div className="mt-2 flex justify-between text-xs text-white/40">
              <span>{tenureUnit === "yr" ? "1 Yr" : "1 Mo"}</span>
              <span>{tenureUnit === "yr" ? "30 Yrs" : "360 Mos"}</span>
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
              ₹{isNaN(emi) ? 0 : emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
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
                ₹{isNaN(totalInterest) ? 0 : totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between border-t border-white/5 pt-5">
              <span className="text-white/80 font-medium">Total Payment</span>
              <span className="font-bold text-accent text-lg">
                ₹{isNaN(totalPayment) ? 0 : totalPayment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

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

      {/* --- YOU MAY ALSO LIKE --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-20"
      >
        <h2 className="mb-8 text-center text-2xl font-bold text-white md:text-3xl">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {relatedProducts.map((product) => (
            <Link
              key={product.slug}
              href={product.href}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <product.icon size={22} />
                </div>
                <span className="text-base font-semibold text-white">{product.label}</span>
              </div>
              <ArrowRight
                size={18}
                className="text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-yellow-400"
              />
            </Link>
          ))}
        </div>
      </motion.div>

    </div>
  );
}

export default function EmiCalculatorInner() {
  return (
    <Suspense fallback={null}>
      <EmiCalculatorContent />
    </Suspense>
  );
}