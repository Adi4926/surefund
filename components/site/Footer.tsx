import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const productLinks = [
  { label: "Personal Loan", href: "/personal-loan" },
  { label: "Business Loan", href: "/business-loan" },
  { label: "Credit Card", href: "/credit-card" },
  { label: "Free CIBIL Check", href: "/#cibil-check" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white/70">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 md:px-10">
        <div>
          <p className="font-heading text-xl font-bold text-white">
            Sure<span className="text-accent">Fund</span>
          </p>
          <p className="mt-2 text-sm">Funding Dreams. Building Futures.</p>
          <div className="mt-4 space-y-2 text-sm">
            <p className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              2nd Floor, Hazratganj, Lucknow, Uttar Pradesh 226001, India
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> +91 1234567890
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle size={16} /> +91 1234567890 (WhatsApp)
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> info@surefund.in
            </p>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-heading font-semibold text-white">Products</h3>
          <ul className="space-y-2 text-sm">
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-heading font-semibold text-white">Company</h3>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-heading font-semibold text-white">Legal</h3>
          <ul className="space-y-2 text-sm">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} SureFund Financial Services Pvt. Ltd. All rights
        reserved. SureFund is a loan DSA (Direct Selling Agent) and does not itself
        disburse loans — all loans are sanctioned and disbursed by partner
        banks/NBFCs subject to their credit policies.
      </div>
    </footer>
  );
}
