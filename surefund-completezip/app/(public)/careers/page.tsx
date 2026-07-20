import { Briefcase, Code2, Calculator, Headphones, Users, Mail, MapPin, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | SureFund Financial Services",
  description:
    "Join the SureFund team. Explore open roles in HR, Technology, Accounts, and Customer Support & Sales across Lucknow.",
};

const APPLY_EMAIL_BASE = "careers@surefund.in";

const categories = [
  {
    id: "hr",
    label: "Human Resources",
    icon: Users,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
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
    color: "from-secondary to-blue-400",
    bg: "bg-blue-50",
    border: "border-blue-100",
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
    bg: "bg-emerald-50",
    border: "border-emerald-100",
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
    color: "from-accent to-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
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
    <main>
      {/* Hero */}
      <section className="bg-gradient-hero py-20 text-center text-white">
        <div className="section !py-0">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-accent">
            We&apos;re Hiring
          </span>
          <h1 className="text-4xl font-bold md:text-5xl">Join the SureFund Team</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Help us make financial services simpler and fairer for people across
            Uttar Pradesh. We&apos;re looking for driven individuals who love solving
            real problems.
          </p>
        </div>
      </section>

      {/* Why join */}
      <section className="section">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { title: "Growth-First Culture", desc: "Clear career paths and mentorship from day one." },
            { title: "Lucknow HQ", desc: "Work from our modern Hazratganj office or remotely for tech roles." },
            { title: "Impact at Scale", desc: "Your work directly helps thousands of families access credit." },
          ].map((item) => (
            <div key={item.title} className="glass-card p-6 text-center">
              <h3 className="font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-primary/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Job categories */}
      <section className="bg-white py-16">
        <div className="section !py-0 space-y-14">
          <h2 className="text-center text-3xl font-bold text-primary">Open Positions</h2>

          {categories.map((cat) => (
            <div key={cat.id}>
              {/* Category header */}
              <div className="mb-6 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white shadow`}>
                  <cat.icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-primary">{cat.label}</h3>
                <div className="ml-2 flex-1 border-t border-primary/10" />
                <a
                  href={`mailto:${cat.email}?subject=Resume%20Application%20%E2%80%93%20${encodeURIComponent(cat.label)}`}
                  className="flex items-center gap-1.5 text-sm font-semibold text-secondary hover:underline"
                >
                  <Mail size={14} /> {cat.email}
                </a>
              </div>

              {/* Role cards */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cat.roles.map((role) => (
                  <div
                    key={role.title}
                    className={`flex flex-col rounded-2xl border ${cat.border} ${cat.bg} p-6`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-primary">{role.title}</h4>
                      <span className="shrink-0 rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-primary/60 shadow-sm">
                        {role.type}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-primary/50">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {role.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> Immediate joining
                      </span>
                    </div>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-primary/65">
                      {role.description}
                    </p>

                    <a
                      href={`mailto:${cat.email}?subject=Application%20for%20${encodeURIComponent(role.title)}&body=Hi%20SureFund%20HR%20Team%2C%0A%0AI%20would%20like%20to%20apply%20for%20the%20${encodeURIComponent(role.title)}%20position.%20Please%20find%20my%20resume%20attached.%0A%0AName%3A%0AMobile%3A%0AExperience%3A%0A%0AThank%20you!`}
                      className="btn-primary mt-5 flex items-center justify-center gap-2 !py-2.5 text-sm"
                    >
                      <Mail size={15} />
                      Apply via Email
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* General application CTA */}
      <section className="section text-center">
        <div className="mx-auto max-w-xl rounded-3xl bg-gradient-hero p-10 text-white shadow-glow">
          <Briefcase className="mx-auto mb-4" size={36} />
          <h3 className="text-2xl font-bold">Don&apos;t see the right role?</h3>
          <p className="mt-3 text-white/70">
            Send us your resume anyway. We&apos;re always looking for great people
            to grow with us.
          </p>
          <a
            href={`mailto:${APPLY_EMAIL_BASE}?subject=General%20Application%20%E2%80%93%20SureFund`}
            className="btn-accent mt-6 inline-flex items-center gap-2"
          >
            <Mail size={16} /> Email Us Your Resume
          </a>
        </div>
      </section>
    </main>
  );
}
