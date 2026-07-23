"use client";

import { motion } from "framer-motion";
import { Briefcase, Code2, Calculator, Headphones, Users, Mail, MapPin, Clock } from "lucide-react";

const APPLY_EMAIL_BASE = "careers@surefund.in";

const categories = [
  {
    id: "hr",
    label: "Human Resources",
    icon: Users,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    email: "hr@surefund.in",
    roles: [
      {
        title: "HR Executive",
        type: "Full-time",
        location: "Lucknow, UP",
        description:
          "Handle end-to-end recruitment, onboarding, and employee engagement initiatives. Prior experience in BFSI sector preferred.",
      },
      {
        title: "Talent Acquisition Specialist",
        type: "Full-time",
        location: "Lucknow, UP",
        description:
          "Source and screen candidates for sales and operations roles. Coordinate with department heads and manage offer roll-outs.",
      },
    ],
  },
  {
    id: "technology",
    label: "Technology",
    icon: Code2,
    color: "from-blue-500 to-cyan-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    email: "tech@surefund.in",
    roles: [
      {
        title: "Full Stack Developer",
        type: "Full-time",
        location: "Lucknow, UP / Remote",
        description:
          "Build and maintain the SureFund customer portal and admin panel using Next.js, TypeScript, and MongoDB. Own features end-to-end.",
      },
      {
        title: "UI/UX Designer",
        type: "Full-time",
        location: "Lucknow, UP / Remote",
        description:
          "Design intuitive loan application flows and dashboards. Work closely with engineers and product to deliver high-quality interfaces.",
      },
      {
        title: "IT Support Executive",
        type: "Full-time",
        location: "Lucknow, UP",
        description:
          "Manage internal systems, troubleshoot hardware/software issues, and ensure smooth day-to-day IT operations across the office.",
      },
    ],
  },
  {
    id: "accounts",
    label: "Accounts & Finance",
    icon: Calculator,
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    email: "accounts@surefund.in",
    roles: [
      {
        title: "Accounts Executive",
        type: "Full-time",
        location: "Lucknow, UP",
        description:
          "Handle day-to-day bookkeeping, bank reconciliations, GST filings, and monthly financial reports. Tally & MS Excel proficiency required.",
      },
      {
        title: "Finance Analyst",
        type: "Full-time",
        location: "Lucknow, UP",
        description:
          "Analyse loan portfolio performance, track DSA commissions, and prepare monthly P&L and MIS reports for management review.",
      },
    ],
  },
  {
    id: "sales",
    label: "Customer Support & Sales",
    icon: Headphones,
    color: "from-orange-500 to-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    email: "sales@surefund.in",
    roles: [
      {
        title: "Loan Sales Executive",
        type: "Full-time",
        location: "Lucknow, UP",
        description:
          "Generate leads, counsel walk-in customers, and guide them through the personal and business loan application process.",
      },
      {
        title: "Customer Support Associate",
        type: "Full-time",
        location: "Lucknow, UP",
        description:
          "Handle inbound customer queries via call, WhatsApp, and email. Update application statuses and resolve post-disbursal issues.",
      },
      {
        title: "Relationship Manager",
        type: "Full-time",
        location: "Lucknow / Kanpur / Varanasi",
        description:
          "Build and manage banker/NBFC relationships, drive cross-sell opportunities, and maintain long-term customer accounts.",
      },
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-20 font-sans text-white">
      
      {/* --- HERO SECTION --- */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 mb-24"
      >
        <span className="mb-6 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-400 backdrop-blur-xl">
          We're Hiring
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Join the <span className="text-blue-500">SureFund</span> Team
        </h1>
        <p className="mx-auto max-w-3xl text-lg md:text-xl text-white/70 leading-relaxed">
          Help us make financial services simpler and fairer for people across
          India. We're looking for driven individuals who love solving
          real problems.
        </p>
      </motion.section>

      {/* --- WHY JOIN US --- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { title: "Growth-First Culture", desc: "Clear career paths and mentorship from day one." },
            { title: "Lucknow HQ", desc: "Work from our modern office or remotely for tech roles." },
            { title: "Impact at Scale", desc: "Your work directly helps thousands of families access credit." },
          ].map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- JOB CATEGORIES --- */}
      <section className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 mb-32">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center text-3xl md:text-4xl font-bold text-white mb-16"
        >
          Open Positions
        </motion.h2>

        <div className="space-y-20">
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              {/* Category header */}
              <div className="mb-8 flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-lg`}>
                  <cat.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white">{cat.label}</h3>
                <div className="ml-4 flex-1 border-t border-white/10" />
                <a
                  href={`mailto:${cat.email}?subject=Resume%20Application%20%E2%80%93%20${encodeURIComponent(cat.label)}`}
                  className="hidden md:flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Mail size={16} /> {cat.email}
                </a>
              </div>

              {/* Role cards */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cat.roles.map((role) => (
                  <div
                    key={role.title}
                    className={`group flex flex-col rounded-3xl border ${cat.border} ${cat.bg} p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/10`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h4 className="text-xl font-bold text-white">{role.title}</h4>
                      <span className="shrink-0 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                        {role.type}
                      </span>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-4 text-xs text-white/50">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} /> {role.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} /> Immediate joining
                      </span>
                    </div>

                    <p className="flex-1 text-sm leading-relaxed text-white/60 mb-8">
                      {role.description}
                    </p>

                    <a
                      href={`mailto:${cat.email}?subject=Application%20for%20${encodeURIComponent(role.title)}&body=Hi%20SureFund%20HR%20Team%2C%0A%0AI%20would%20like%20to%20apply%20for%20the%20${encodeURIComponent(role.title)}%20position.%20Please%20find%20my%20resume%20attached.%0A%0AName%3A%0AMobile%3A%0AExperience%3A%0A%0AThank%20you!`}
                      className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
                    >
                      <Mail size={16} />
                      Apply via Email
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- GENERAL APPLICATION CTA --- */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-10 md:p-16 backdrop-blur-xl shadow-2xl">
          {/* Subtle glowing orb in the background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <Briefcase className="mx-auto mb-6 text-blue-400" size={48} />
            <h3 className="text-3xl font-bold text-white mb-4">Don't see the right role?</h3>
            <p className="text-lg text-white/70 mb-8 max-w-lg mx-auto">
              Send us your resume anyway. We're always looking for great people
              to grow with us.
            </p>
            <a
              href={`mailto:${APPLY_EMAIL_BASE}?subject=General%20Application%20%E2%80%93%20SureFund`}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
            >
              <Mail size={20} /> Email Us Your Resume
            </a>
          </div>
        </div>
      </motion.section>

    </div>
  );
}