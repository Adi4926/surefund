"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, TrendingUp, Award } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    desc: "No hidden charges, no false promises — just honest guidance on every loan product we offer.",
  },
  {
    icon: Users,
    title: "Customer First",
    desc: "Every recommendation starts with what's actually right for your financial situation.",
  },
  {
    icon: TrendingUp,
    title: "Fast Processing",
    desc: "Our partnerships with 25+ banks and NBFCs mean quicker approvals and disbursals.",
  },
  {
    icon: Award,
    title: "Expert Guidance",
    desc: "Our advisors help you pick the right product and get your documentation right the first time.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-gradient-hero py-20 text-center text-white">
        <div className="section !py-0">
          <h1 className="text-4xl font-bold md:text-5xl">About SureFund</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            SureFund Financial Services Pvt. Ltd. is a Lucknow-based loan DSA helping
            individuals and businesses across Uttar Pradesh access the right credit
            products — quickly, transparently, and with expert support at every step.
          </p>
        </div>
      </section>

      <motion.section
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="section"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-primary">Our Story</h2>
          <p className="mt-4 text-primary/60">
            Founded in Hazratganj, Lucknow, SureFund was built on a simple idea:
            getting a loan shouldn't be confusing or stressful. We've partnered with
            leading banks and NBFCs — including HDFC Bank, ICICI Bank, Axis Bank, SBI,
            and Bajaj Finserv — to give our customers real choice and honest advice,
            backed by a team that stays with you from application to disbursal.
          </p>
        </div>
      </motion.section>

      <section className="bg-white py-20">
        <div className="section !py-0">
          <h2 className="mb-10 text-center text-3xl font-bold text-primary">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <v.icon size={24} />
                </div>
                <h3 className="font-semibold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm text-primary/60">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}