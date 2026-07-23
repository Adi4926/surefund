import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const productLinks = [
  { label: "Personal Loan", href: "/personal-loan" },
  { label: "Business Loan", href: "/business-loan" },
  { label: "Credit Card", href: "/credit-card" },
 
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
    <footer className="relative mt-20 border-t border-white/10 bg-black/40 backdrop-blur-2xl text-white/70">
      
      {/* Top Section / Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 md:px-10">
        
        {/* Brand & Contact Info */}
        <div className="space-y-4">
          <Link href="/" className="inline-flex flex-col items-start transition-opacity hover:opacity-90">
            <div className="flex items-baseline font-extrabold tracking-tight text-xl leading-none">
              <span className="text-white">sure</span>
              <span className="text-indigo-400">fund</span>
              <span className="text-gray-400 text-xs font-semibold ml-0.5">.in</span>
            </div>
            <span className="text-[7px] font-bold tracking-[0.2em] text-white/60 uppercase mt-1">
              Financial Services
            </span>
          </Link>
          
          <p className="text-sm font-medium text-white/80">Funding Dreams. Building Futures.</p>
          
          <div className="space-y-3 text-sm text-white/60 pt-2">
            <p className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-1 shrink-0 text-yellow-400" />
              <span>2/26, 2nd Floor, Ruchi Khand 1, Sharda Nagar, Lucknow, Uttar Pradesh 226012</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-yellow-400" /> +91 1234567890
            </p>
            <p className="flex items-center gap-2.5">
              <MessageCircle size={16} className="shrink-0 text-yellow-400" /> +91 1234567890 (WhatsApp)
            </p>
            <p className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-yellow-400" /> info@surefund.in
            </p>
          </div>
        </div>

        {/* Products Links */}
        <div>
          <h3 className="mb-4 text-base font-bold text-white tracking-wide">Products</h3>
          <ul className="space-y-3 text-sm">
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-yellow-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="mb-4 text-base font-bold text-white tracking-wide">Company</h3>
          <ul className="space-y-3 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-yellow-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="mb-4 text-base font-bold text-white tracking-wide">Legal</h3>
          <ul className="space-y-3 text-sm">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-yellow-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Social Icons Section (Uiverse Style) */}
      <div className="border-t border-white/10 py-8 px-6 text-center">
        <p className="text-sm font-medium text-white mb-6">Connect with us</p>
        <ul className="flex justify-center items-center gap-4 list-none p-0 m-0">
          
          {/* LinkedIn */}
          <li className="relative group">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/15 text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(2,116,179,0.6)] hover:border-[#0274b3]"
            >
              <div className="absolute inset-x-0 bottom-0 w-full h-0 bg-[#0274b3] transition-all duration-300 group-hover:h-full z-0"></div>
              <svg className="relative z-10 w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0274b3] text-white text-xs px-2.5 py-1 rounded-md opacity-0 visibility-hidden group-hover:opacity-100 group-hover:visibility-visible transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg">LinkedIn</span>
          </li>

          

          {/* Instagram */}
          <li className="relative group">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/15 text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(225,48,108,0.6)] hover:border-[#e1306c]"
            >
              <div className="absolute inset-x-0 bottom-0 w-full h-0 bg-gradient-to-tr from-[#fd1f1f] via-[#e1306c] to-[#405de6] transition-all duration-300 group-hover:h-full z-0"></div>
              <svg className="relative z-10 w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#e1306c] text-white text-xs px-2.5 py-1 rounded-md opacity-0 visibility-hidden group-hover:opacity-100 group-hover:visibility-visible transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg">Instagram</span>
          </li>

          

        </ul>
      </div>

      {/* Bottom Copyright & Disclaimer */}
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} SureFund Financial Services Pvt. Ltd. All rights
        reserved. SureFund is a loan DSA (Direct Selling Agent) and does not itself
        disburse loans — all loans are sanctioned and disbursed by partner
        banks/NBFCs subject to their credit policies.
      </div>
      
    </footer>
  );
}