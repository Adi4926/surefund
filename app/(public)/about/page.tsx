"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Award, 
  Building, 
  Clock, 
  Target, 
  HeartHandshake 
} from "lucide-react";

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

const stats = [
  { value: "5000+", label: "Happy Customers" },
  { value: "25+", label: "Bank Partners" },
  { value: "₹500Cr+", label: "Loans Disbursed" },
  { value: "99%", label: "Approval Rate" },
];

const whyChooseUs = [
  {
    icon: Clock,
    title: "Minimal Processing Time",
    desc: "We fast-track your applications to ensure you get funds when you actually need them.",
  },
  {
    icon: Building,
    title: "Doorstep Document Collection",
    desc: "No need to visit branches. We collect and verify documents from your home or office.",
  },
  {
    icon: Target,
    title: "Best Interest Rates",
    desc: "We compare offers across multiple banks to lock in the lowest possible interest rate for you.",
  },
  {
    icon: HeartHandshake,
    title: "End-to-End Support",
    desc: "From the first inquiry to the final disbursal, our team stays with you throughout the journey.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-20 font-sans text-white">
      
      {/* --- HERO SECTION --- */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 mb-20"
      >
        <span className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-5 py-2 text-sm font-semibold text-accent backdrop-blur-xl mb-6">
          Know More About Us
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          About <span className="text-accent">SureFund</span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg md:text-xl text-white/70 leading-relaxed">
          SureFund Financial Services Pvt. Ltd. is a Lucknow-based loan DSA helping
          individuals and businesses across Uttar Pradesh access the right credit
          products — quickly, transparently, and with expert support at every step.
        </p>
      </motion.section>

      {/* --- STATS SECTION (NEW) --- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</h3>
              <p className="text-white/60 font-medium text-center">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- OUR STORY SECTION --- */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-16 backdrop-blur-xl text-center relative overflow-hidden">
          {/* Subtle background glow inside card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our <span className="text-accent">Story</span>
            </h2>
            <p className="mx-auto max-w-4xl text-lg text-white/70 leading-relaxed">
              Founded in Hazratganj, Lucknow, SureFund was built on a simple idea:
              getting a loan shouldn't be confusing or stressful. We've partnered with
              leading banks and NBFCs — including HDFC Bank, ICICI Bank, Axis Bank, SBI,
              and Bajaj Finserv — to give our customers real choice and honest advice,
              backed by a team that stays with you from application to disbursal.
            </p>
          </div>
        </div>
      </motion.section>

      {/* --- WHY CHOOSE US SECTION (NEW) --- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose <span className="text-accent">Us?</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            We don't just process applications; we engineer financial solutions tailored to your unique needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:bg-white/10 hover:border-accent/40 hover:shadow-[0_15px_40px_-10px_rgba(124,58,237,0.25)]"
            >
              <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center text-accent mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent/20">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- WHAT WE STAND FOR (VALUES) --- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What We <span className="text-accent">Stand For</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Our core values drive every interaction and decision we make.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-white/20"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                <v.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}