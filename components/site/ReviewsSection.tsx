"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Rahul Sharma",
    city: "Lucknow",
    product: "Personal Loan",
    rating: 5,
    text: "Got my ₹5 lakh personal loan approved in just 48 hours. The team at SureFund guided me through every document and made the whole process stress-free.",
    initials: "RS",
  },
  {
    name: "Priya Gupta",
    city: "Kanpur",
    product: "Business Loan",
    rating: 5,
    text: "I needed funds to expand my boutique and SureFund found me the best interest rate from Bajaj Finserv. Professional service and zero hidden charges.",
    initials: "PG",
  },
  {
    name: "Amit Verma",
    city: "Lucknow",
    product: "Credit Card",
    rating: 5,
    text: "Applied for a credit card and got approval within a day. The CIBIL check feature helped me understand my score before applying. Highly recommended!",
    initials: "AV",
  },
  {
    name: "Sunita Mishra",
    city: "Varanasi",
    product: "Personal Loan",
    rating: 5,
    text: "Excellent support throughout. They explained all terms clearly and helped me compare offers from multiple banks before I chose one. Saved me a lot of money.",
    initials: "SM",
  },
  {
    name: "Deepak Singh",
    city: "Agra",
    product: "Business Loan",
    rating: 4,
    text: "Quick disbursement and a very transparent process. The team followed up proactively and kept me informed at every step. Would definitely use SureFund again.",
    initials: "DS",
  },
  {
    name: "Neha Agarwal",
    city: "Lucknow",
    product: "Personal Loan",
    rating: 5,
    text: "As a first-time borrower I was nervous, but the SureFund team made it very easy. My loan was sanctioned from HDFC Bank at a great rate. Thank you!",
    initials: "NA",
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "fill-accent text-accent" : "fill-white/10 text-white/10"}
        />
      ))}
    </div>
  );
}

function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideWidth = 320;
  const rotationStep = 45;
  const inactiveScale = 0.82;

  const selectSlide = useCallback((nextIndex: number) => {
    setCurrentIndex((nextIndex + reviews.length) % reviews.length);
  }, []);

  return (
    <div className="relative isolate mx-auto w-full max-w-5xl pb-16">
      <div
        className="relative h-[500px] overflow-visible"
        style={{ perspective: "1400px" }}
      >
        <motion.div
          className="absolute left-1/2 top-0 flex w-fit items-start"
          animate={{ x: -(currentIndex * slideWidth + slideWidth / 2) }}
          transition={{ type: "spring", bounce: 0.14, duration: 0.9 }}
        >
          {reviews.map((r, index) => {
            const isActive = currentIndex === index;
            return (
              <div key={r.name} className="shrink-0 px-2" style={{ width: slideWidth }}>
                <motion.div
                  animate={{
                    rotateY: (currentIndex - index) * rotationStep,
                    scale: isActive ? 1 : inactiveScale,
                  }}
                  transition={{ type: "spring", bounce: 0.14, duration: 0.9 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <button
                    type="button"
                    onClick={() => selectSlide(index)}
                    className="relative flex h-[460px] w-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 text-left shadow-2xl backdrop-blur-xl"
                  >
                    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/15 blur-2xl" />
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-hero text-sm font-bold text-white">
                        {r.initials}
                      </div>
                      <div>
                        <p className="font-semibold leading-tight text-white">{r.name}</p>
                        <p className="text-xs text-white/50">{r.city}</p>
                      </div>
                    </div>
                    <span className="mt-3 w-fit rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
                      {r.product}
                    </span>
                    <div className="mt-3">
                      <StarRow rating={r.rating} />
                    </div>
                    <motion.p
                      className="mt-3 flex-1 overflow-hidden text-sm leading-relaxed text-white/70"
                      animate={{ opacity: isActive ? 1 : 0.35 }}
                      transition={{ duration: 0.4 }}
                    >
                      "{r.text}"
                    </motion.p>
                  </button>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto flex w-fit items-center justify-center gap-3 rounded-full border border-white/15 bg-white/10 px-2 py-1 shadow-sm backdrop-blur-xl">
        <button
          type="button"
          aria-label="Previous review"
          className="inline-flex size-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
          onClick={() => selectSlide(currentIndex - 1)}
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex items-center justify-center gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show review ${index + 1}`}
              className={`h-2 rounded-full bg-accent transition-[width,opacity] duration-300 ${
                currentIndex === index ? "w-6 opacity-100" : "w-2 opacity-30"
              }`}
              onClick={() => selectSlide(index)}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next review"
          className="inline-flex size-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
          onClick={() => selectSlide(currentIndex + 1)}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-accent/15 px-4 py-1.5 text-sm font-semibold text-accent">
            Customer Reviews
          </span>
          <h2 className="text-3xl font-bold text-white md:text-4xl">What Our Customers Say</h2>
          <p className="mt-3 text-white/60">Over 5,000 happy borrowers across Uttar Pradesh trust SureFund.</p>
        </motion.div>

        <ReviewsCarousel />

        {/* Overall rating */}
        <motion.div
          initial={{ y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="mt-4 flex flex-col items-center gap-2"
        >
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={22} className="fill-accent text-accent" />
            ))}
          </div>
          <p className="text-sm text-white/60">
            <span className="font-semibold text-white">4.9 / 5</span> average rating from 5,000+ customers
          </p>
        </motion.div>
      </div>
    </section>
  );
}
