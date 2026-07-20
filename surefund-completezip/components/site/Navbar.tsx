"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, UserCircle2 } from "lucide-react";
import LoginModal from "@/components/portal/LoginModal";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "EMI Calculator", href: "/emi-calculator" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.customer) setCustomerEmail(data.customer.email);
      })
      .catch(() => {})
      .finally(() => setChecked(true));
  }, []);

  const accountLabel = customerEmail ? "Dashboard" : "Sign In";

  function handleAccountClick() {
    if (customerEmail) {
      window.location.href = "/portal/applications";
    } else {
      setLoginModalOpen(true);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-primary/5 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="SureFund Logo" width={38} height={38} priority />
            <div className="flex flex-col leading-tight">
              <span className="font-heading text-xl font-bold text-primary">
                Sure<span className="text-secondary">Fund</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/50">
                Financial Services
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-primary/70 transition-colors hover:text-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+911234567890"
              className="flex items-center gap-1.5 text-sm font-medium text-primary/70"
            >
              <Phone size={16} /> +91 1234567890
            </a>
            <button
              onClick={handleAccountClick}
              className="flex items-center gap-1.5 rounded-xl border border-secondary/30 bg-secondary/8 px-5 py-2.5 text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-white"
            >
              <UserCircle2 size={16} />
              {checked ? accountLabel : "Sign In"}
            </button>
          </div>

          <button className="text-primary lg:hidden" onClick={() => setOpen(true)}>
            <Menu size={26} />
          </button>
        </div>

        {open && (
          <div className="absolute left-0 right-0 top-full z-50 border-t border-white/10 bg-primary/95 shadow-2xl backdrop-blur-2xl lg:hidden">
            <nav className="flex flex-col gap-1 px-6 py-5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  handleAccountClick();
                }}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-secondary/15 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-secondary/30"
              >
                <UserCircle2 size={18} />
                {checked ? accountLabel : "Sign In / Sign Up"}
              </button>
            </nav>
          </div>
        )}
      </header>

      <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}
