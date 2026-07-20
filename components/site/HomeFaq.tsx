"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { faqItems } from "@/lib/faqData";

// Show a subset on the homepage; link to full /faq page
const homeItems = faqItems.slice(0, 5);

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Left — heading */}
          <motion.div
            initial={{ x: -20 }}
            whileInView={{ x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-80 lg:shrink-0"
          >
            <span className="mb-3 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-primary">
              FAQ
            </span>
            <h2 className="text-3xl font-bold text-primary md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-primary/60 leading-relaxed">
              Have more questions? We're here to help you every step of the way.
            </p>
            <Link
              href="/faq"
              className="btn-primary mt-6 inline-flex"
            >
              View All FAQs
            </Link>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial={{ x: 20 }}
            whileInView={{ x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 space-y-3"
          >
            {homeItems.map((item, i) => {
              const open = openIndex === i;
              return (
                <div
                  key={item.question}
                  className="overflow-hidden rounded-2xl border border-primary/8 bg-background transition-shadow hover:shadow-card"
                >
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-medium text-primary">{item.question}</span>
                    <ChevronDown
                      size={18}
                      className={`ml-4 shrink-0 text-secondary transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-primary/5 px-6 py-4 text-sm leading-relaxed text-primary/65">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
