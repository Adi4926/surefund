"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutList, User, Bell, LogOut, Home, X } from "lucide-react";

const navItems = [
  { label: "My Applications", href: "/portal/applications", icon: LayoutList },
  { label: "Profile", href: "/portal/profile", icon: User },
  { label: "Notifications", href: "/portal/notifications", icon: Bell },
];

export default function PortalSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex h-full w-64 flex-col bg-primary text-white">
      <div className="flex items-center justify-between px-6 py-6">
        <div>
          <p className="font-heading text-lg font-bold">SureFund</p>
          <p className="text-xs text-white/50">Customer Portal</p>
        </div>
        <button onClick={onClose} className="md:hidden text-white/70">
          <X size={22} />
        </button>
      </div>

      <div className="px-3">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-secondary text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
