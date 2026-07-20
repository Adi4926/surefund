"use client";

import Link from "next/link";
import { Calculator } from "lucide-react";
import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_COMPANY_WHATSAPP?.replace(/\D/g, "") || "911234567890";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi SureFund! I'm interested in a loan. Could you please help me?"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function FloatingWidgets() {
  const pathname = usePathname();
  // Hide EMI button on the EMI calculator page itself
  const showEmi = pathname !== "/emi-calculator";

  return (
    <>
      {/* ── EMI Calculator — top-right ── */}
      {showEmi && (
        <Link
          href="/emi-calculator"
          aria-label="EMI Calculator"
          className="group fixed right-0 top-1/3 z-40 flex -translate-y-1/2 flex-col items-center gap-1.5 rounded-l-2xl bg-secondary px-3 py-4 shadow-glow transition-all duration-300 hover:bg-secondary-light hover:px-4"
        >
          <Calculator size={22} className="text-white" />
          <span
            className="[writing-mode:vertical-rl] rotate-180 text-[11px] font-semibold uppercase tracking-widest text-white/90"
          >
            EMI Calc
          </span>
        </Link>
      )}

      {/* ── WhatsApp — bottom-right ── */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.627 4.64 1.813 6.64L2.667 29.333l6.88-1.787A13.253 13.253 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 24.267c-2.12 0-4.187-.573-5.987-1.653l-.427-.253-4.08 1.053 1.08-3.973-.28-.44A10.934 10.934 0 0 1 5.067 16c0-6.04 4.893-10.933 10.937-10.933S26.933 9.96 26.933 16 22.047 26.934 16.004 26.934zm6-8.187c-.333-.166-1.96-.96-2.267-1.066-.306-.107-.52-.16-.746.16-.227.32-.866 1.067-1.054 1.28-.186.214-.373.24-.706.08-.334-.16-1.4-.52-2.667-1.654-.987-.88-1.653-1.96-1.84-2.293-.187-.334-.02-.52.14-.68.146-.147.333-.373.5-.56.166-.187.22-.32.333-.534.107-.213.054-.4-.027-.56-.08-.16-.747-1.787-1.013-2.44-.267-.64-.547-.547-.747-.56h-.627c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.24 3.44 5.44 4.827.76.32 1.347.507 1.813.653.76.24 1.454.207 2 .12.614-.094 1.96-.8 2.24-1.574.28-.773.28-1.44.2-1.573-.08-.133-.293-.213-.627-.373z" />
        </svg>

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "#25D366" }} />
      </a>
    </>
  );
}
