"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import PortalSidebar from "./PortalSidebar";

export default function PortalShell({
  customerName,
  children,
}: {
  customerName: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:block">
        <PortalSidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-50 h-full">
            <PortalSidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-primary/5 bg-white px-4 py-4 md:px-8">
          <button
            className="text-primary md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>

          {/* Mobile Only Centered Logo */}
          <Link href="/" className="flex flex-col items-center md:hidden mx-auto transition-opacity hover:opacity-90">
            <div className="flex items-baseline font-extrabold tracking-tight text-base leading-none">
              <span className="text-gray-900">sure</span>
              <span className="text-indigo-600">fund</span>
              <span className="text-gray-500 text-[10px] font-semibold ml-0.5">.in</span>
            </div>
            <span className="text-[6px] font-bold tracking-[0.2em] text-gray-500 uppercase mt-0.5 text-center w-full">
              Financial Services
            </span>
          </Link>

          {/* Desktop Welcome Text (Hidden on mobile when logo is centered, or styled nicely) */}
          <span className="hidden font-heading font-semibold text-primary md:text-lg md:block">
            Welcome, {customerName}
          </span>

          <span className="hidden text-sm text-primary/40 md:block">
            SureFund Financial Services
          </span>
        </header>

        {/* Optional: Welcome text for mobile view right below header or inside main content if needed */}
        <div className="px-4 pt-4 md:hidden text-sm font-semibold text-primary">
          Welcome, {customerName}
        </div>

        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}