"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";

export default function EmiCalculatorPage() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(11);
  const [tenure, setTenure] = useState(36); // months

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

  return (
    <main className="section">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
          <Calculator size={24} />
        </div>
        <h1 className="text-3xl font-bold text-primary md:text-4xl">EMI Calculator</h1>
        <p className="mt-3 text-primary/60">
          Estimate your monthly installment before you apply.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        <div className="glass-card space-y-6 p-8">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-primary/60">Loan Amount</span>
              <span className="font-semibold text-primary">
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
              className="w-full accent-secondary"
            />
          </div>

          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-primary/60">Interest Rate (p.a.)</span>
              <span className="font-semibold text-primary">{rate}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={24}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-secondary"
            />
          </div>

          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-primary/60">Tenure (months)</span>
              <span className="font-semibold text-primary">{tenure} months</span>
            </div>
            <input
              type="range"
              min={6}
              max={84}
              step={1}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full accent-secondary"
            />
          </div>
        </div>

        <div className="glass-dark flex flex-col justify-center p-8 text-white">
          <p className="text-sm text-white/60">Your Estimated Monthly EMI</p>
          <p className="mt-2 text-4xl font-bold text-accent">
            ₹
            {emi.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })}
          </p>

          <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Principal Amount</span>
              <span className="font-medium">₹{amount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Total Interest</span>
              <span className="font-medium">
                ₹{totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Total Payment</span>
              <span className="font-medium">
                ₹{totalPayment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          <a href="/personal-loan" className="btn-accent mt-8 justify-center">
            Apply for This Amount
          </a>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-primary/40">
        This calculator is for illustration only. Actual EMI, interest rate, and
        tenure depend on the lender's assessment of your profile.
      </p>
    </main>
  );
}
