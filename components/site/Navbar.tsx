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
      <header className="sticky top-4 z-50 mx-auto w-full max-w-4xl px-4">
        <div className="relative">
          <div className="relative flex items-center justify-between gap-4 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 shadow-2xl backdrop-blur-2xl">
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <Image src="/logo.svg" alt="SureFund Logo" width={30} height={30} priority />
              <span className="font-heading text-base font-bold text-white">
                Sure<span className="text-accent">Fund</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-5 lg:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <a
                href="tel:+911234567890"
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Phone size={15} />
              </a>
              <button
                onClick={handleAccountClick}
                className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-white"
              >
                <UserCircle2 size={15} />
                {checked ? accountLabel : "Sign In"}
              </button>
            </div>

            <button className="text-white lg:hidden" onClick={() => setOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-white/15 bg-primary/95 p-5 shadow-2xl backdrop-blur-2xl lg:hidden">
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
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-base font-semibold text-primary transition-colors hover:bg-accent hover:text-white"
            >
              <UserCircle2 size={18} />
              {checked ? accountLabel : "Sign In / Sign Up"}
            </button>
          </nav>
        </div>
      )}

      <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}
