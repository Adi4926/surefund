import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

interface ProductPageTemplateProps {
  title: string;
  tagline: string;
  applySlug: string;
  eligibility: { label: string; value: string }[];
  features: string[];
}

export default function ProductPageTemplate({
  title,
  tagline,
  applySlug,
  eligibility,
  features,
}: ProductPageTemplateProps) {
  return (
    <main>
      <section className="bg-gradient-hero py-20 text-center text-white">
        <div className="section !py-0">
          <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">{tagline}</p>
          <Link href={`/apply/${applySlug}`} className="btn-accent mt-8 inline-flex">
            Apply Now
          </Link>
        </div>
      </section>

      <section className="section grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="glass-card p-8">
          <h2 className="mb-4 text-xl font-bold text-primary">Eligibility Criteria</h2>
          <ul className="space-y-3">
            {eligibility.map((e) => (
              <li key={e.label} className="flex items-start justify-between gap-3">
                <span className="text-sm text-primary/60">{e.label}</span>
                <span className="text-sm font-semibold text-primary">{e.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-8">
          <h2 className="mb-4 text-xl font-bold text-primary">Why Choose SureFund</h2>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-primary/70">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 text-center">
        <div className="section !py-0">
          <h2 className="text-2xl font-bold text-primary">Ready to get started?</h2>
          <p className="mt-2 text-primary/60">
            Apply in minutes and our team will reach out to guide you through the rest.
          </p>
          <Link href={`/apply/${applySlug}`} className="btn-primary mt-6 inline-flex">
            Apply Now
          </Link>
        </div>
      </section>
    </main>
  );
}
