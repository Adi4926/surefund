"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, UserCircle2, ChevronDown } from "lucide-react";
import LoginModal from "@/components/portal/LoginModal";

interface NavLink {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}

const links: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Personal Loan", href: "/personal-loan" },
      { label: "Business Loan", href: "/business-loan" },
      { label: "Credit Card", href: "/credit-card" },
      { label: "Loan Against Property", href: "/lap" },
    ],
  },
  {
    label: "EMI Calculator",
    href: "/emi-calculator",
    dropdown: [
      { label: "Personal Loan EMI", href: "/emi-calculator?type=personal" },
      { label: "Business Loan EMI", href: "/emi-calculator?type=business" },
    ],
  },
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
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [mobileOpenLabel, setMobileOpenLabel] = useState<string | null>(null);

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
          
          {/* 1. Left: Full Image Logo — मोबाइल और डेस्कटॉप दोनों पर, pill container के बाहर */}
          <Link href="/" className="flex items-center px-2 py-1 transition-opacity hover:opacity-90 shrink-0">
            <Image
              src="/logo-full.png"
              alt="SureFund Financial Services Pvt Ltd"
              width={220}
              height={220}
              priority
              className="h-16 w-auto object-contain lg:h-24"
            />
          </Link>

          {/* 2. Center: Apple Liquid Glass Drop Sliding Pill Navbar */}
          <div className="relative flex-1 lg:flex-none flex items-center justify-end lg:justify-center rounded-full lg:border lg:border-white/15 bg-transparent lg:bg-white/10 p-0 lg:p-1.5 shadow-none lg:shadow-2xl backdrop-blur-none lg:backdrop-blur-2xl">

            {/* Desktop Links with Framer Motion LayoutId */}
            <nav className="hidden items-center gap-1 lg:flex">
              {links.map((link) => {
                const isActive = pathname === link.href;
                const hasDropdown = !!link.dropdown;

                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => hasDropdown && setHoveredLabel(link.label)}
                    onMouseLeave={() => hasDropdown && setHoveredLabel(null)}
                  >
                    <Link
                      href={link.href}
                      className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        isActive ? "text-white font-semibold" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="liquid-pill"
                          layout
                          className="absolute inset-0 rounded-full bg-white/20 border border-white/30 backdrop-blur-md shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 35,
                          }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                      {hasDropdown && (
                        <ChevronDown
                          size={14}
                          className={`relative z-10 transition-transform duration-200 ${
                            hoveredLabel === link.label ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Link>

                    {/* Dropdown Panel */}
                    {hasDropdown && (
                      <AnimatePresence>
                        {hoveredLabel === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/15 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-2xl"
                          >
                            {link.dropdown!.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile Menu Toggle Button */}
            <button 
              className="text-white lg:hidden px-3 py-1.5 transition-transform active:scale-95" 
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* 3. Right: Phone Icon & Sign In Button */}
          <div className="hidden items-center gap-3 lg:flex shrink-0">
            <a
              href="tel:+916306757612"
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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-4 top-20 z-50 overflow-hidden rounded-3xl border border-white/15 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <div className="mb-3 flex justify-end">
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 pb-2">
              {links.map((link) => {
                const hasDropdown = !!link.dropdown;
                const isMobileOpen = mobileOpenLabel === link.label;

                return (
                  <div key={link.href}>
                    <div
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        pathname === link.href
                          ? "bg-white/20 border border-white/30 text-white font-semibold backdrop-blur-md"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Link
                        href={link.href}
                        onClick={() => !hasDropdown && setOpen(false)}
                        className="flex-1"
                      >
                        {link.label}
                      </Link>
                      {hasDropdown && (
                        <button
                          onClick={() =>
                            setMobileOpenLabel(isMobileOpen ? null : link.label)
                          }
                          aria-label="Toggle submenu"
                        >
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${
                              isMobileOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {hasDropdown && (
                      <AnimatePresence>
                        {isMobileOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden pl-4"
                          >
                            {link.dropdown!.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => {
                                  setOpen(false);
                                  setMobileOpenLabel(null);
                                }}
                                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
              <div className="mt-3 flex items-center gap-3 pt-3 border-t border-white/10">
                <a
                  href="tel:+916306757612"
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
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}