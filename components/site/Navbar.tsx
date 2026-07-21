"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
  const pathname = usePathname();
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
      <header className="sticky top-4 z-50 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between gap-4">
          
          {/* 1. Left: Logo & Company Name */}
          <Link href="/" className="hidden lg:flex shrink-0 items-center gap-2.5 px-3 py-2 transition-opacity hover:opacity-80">
            <Image src="/logo.svg" alt="SureFund Logo" width={32} height={32} priority />
            <span className="font-heading text-lg font-bold text-white">
              Sure<span className="text-accent">Fund</span>
            </span>
          </Link>

          {/* 2. Center: Apple Liquid Glass Drop Sliding Pill Navbar */}
          <div className="relative flex-1 lg:flex-none flex items-center justify-between lg:justify-center rounded-full border border-white/15 bg-white/10 p-1.5 shadow-2xl backdrop-blur-2xl">
            
            {/* Mobile Logo inside pill container */}
            <Link href="/" className="flex lg:hidden shrink-0 items-center gap-2 px-3">
              <Image src="/logo.svg" alt="SureFund Logo" width={28} height={28} priority />
              <span className="font-heading text-sm font-bold text-white">
                Sure<span className="text-accent">Fund</span>
              </span>
            </Link>

            {/* Desktop Links with Framer Motion LayoutId for Liquid Glass Effect */}
            <nav className="hidden items-center gap-1 lg:flex">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-white font-semibold" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="liquid-pill"
                        className="absolute inset-0 rounded-full bg-white/20 border border-white/30 backdrop-blur-md shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button className="text-white lg:hidden px-3" onClick={() => setOpen(true)}>
              <Menu size={22} />
            </button>
          </div>

          {/* 3. Right: Phone Icon & Sign In Button */}
          <div className="hidden items-center gap-3 lg:flex shrink-0">
            <a
              href="tel:+911234567890"
              className="flex items-center justify-center rounded-full border border-white/15 bg-white/10 p-3 text-white/80 transition-all hover:bg-white/20 hover:text-white backdrop-blur-xl shadow-lg"
              title="Call Us"
            >
              <Phone size={16} />
            </a>
            <button
              onClick={handleAccountClick}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
            >
              <UserCircle2 size={16} />
              {checked ? accountLabel : "Sign In"}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-white/15 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-2xl lg:hidden">
          <div className="mb-3 flex justify-end">
            <button onClick={() => setOpen(false)} className="text-white/70">
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  pathname === link.href ? "bg-white/20 border border-white/30 text-white font-semibold backdrop-blur-md" : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-3 pt-3 border-t border-white/10">
              <a
                href="tel:+911234567890"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                <Phone size={16} /> Call Us
              </a>
              <button
                onClick={() => {
                  setOpen(false);
                  handleAccountClick();
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <UserCircle2 size={16} />
                {checked ? accountLabel : "Sign In"}
              </button>
            </div>
          </nav>
        </div>
      )}

      <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}