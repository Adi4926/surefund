"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
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
          >
            <Menu size={24} />
          </button>
          <span className="font-heading font-semibold text-primary md:text-lg">
            Welcome, {customerName}
          </span>
          <span className="hidden text-sm text-primary/40 md:block">
            SureFund Financial Services
          </span>
        </header>

        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
