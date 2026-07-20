"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const partners = [
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "SBI",
  "Kotak Mahindra",
  "IDFC First",
  "IndusInd Bank",
  "Bajaj Finserv",
  "Tata Capital",
];

const stats = [
  { value: "₹100+ Cr", label: "Loans Facilitated" },
  { value: "5000+", label: "Happy Customers" },
  { value: "25+", label: "Banking Partners" },
  { value: "98%", label: "Customer Satisfaction" },
];

function CountUpStat({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const [display, setDisplay] = useState(value.replace(/[0-9]/g, "0"));

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/[\d,]+/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const numberStr = match[0].replace(/,/g, "");
    const target = parseInt(numberStr, 10);
    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index || 0) + match[0].length);

    const duration = 1500;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setDisplay(`${prefix}${current.toLocaleString("en-IN")}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
}

export default function TrustAndStats() {
  const loopPartners = [...partners, ...partners];

  return (
    <>
      <section className="border-y border-primary/5 bg-white py-12">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wide text-primary/40">
          Trusted Banking &amp; NBFC Partners
        </p>
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-16">
            {loopPartners.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap text-xl font-heading font-semibold text-primary/30"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-hero py-16 text-white">
        <div className="section !py-0 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-accent md:text-4xl">
                <CountUpStat value={s.value} />
              </div>
              <div className="mt-1 text-sm text-white/70">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}