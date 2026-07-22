"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutList, User, Bell, LogOut, Home, X } from "lucide-react";

interface PortalSidebarProps {
  onClose?: () => void;
  unreadCount?: number; // अनपढ़ नोटिफिकेशन की संख्या दिखाने के लिए
}

export default function PortalSidebar({ onClose, unreadCount = 0 }: PortalSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const navItems = [
    { label: "My Applications", href: "/portal/applications", icon: LayoutList },
    { label: "Profile", href: "/portal/profile", icon: User },
    { label: "Notifications", href: "/portal/notifications", icon: Bell, badge: unreadCount },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-primary text-white">
      
      {/* Top Header with New Text Logo */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
        <Link href="/" onClick={onClose} className="flex flex-col items-start transition-opacity hover:opacity-90">
          <div className="flex items-baseline font-extrabold tracking-tight text-lg leading-none">
            <span className="text-white">sure</span>
            <span className="text-indigo-400">fund</span>
            <span className="text-gray-400 text-[10px] font-semibold ml-0.5">.in</span>
          </div>
          <span className="text-[6px] font-bold tracking-[0.2em] text-white/60 uppercase mt-1">
            Customer Portal
          </span>
        </Link>
        <button onClick={onClose} className="md:hidden text-white/70">
          <X size={22} />
        </button>
      </div>

      <div className="px-3 pt-4">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 mt-2">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-secondary text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                {item.label}
              </div>
              {/* Unread Notification Badge */}
              {item.badge && item.badge > 0 ? (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow">
                  {item.badge}
                </span>
              ) : null}
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