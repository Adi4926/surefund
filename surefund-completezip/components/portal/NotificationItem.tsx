"use client";

import { useState } from "react";
import { Bell, BellDot } from "lucide-react";
import { formatDateTime } from "@/lib/format";

interface NotificationItemProps {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationItem({
  id,
  title,
  message,
  read: initialRead,
  createdAt,
}: NotificationItemProps) {
  const [read, setRead] = useState(initialRead);
  const [updating, setUpdating] = useState(false);

  async function markAsRead() {
    if (read || updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      if (res.ok) setRead(true);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <button
      onClick={markAsRead}
      className={`flex w-full gap-3 rounded-xl border p-4 text-left transition-colors ${
        read
          ? "border-primary/5 bg-white"
          : "border-secondary/20 bg-secondary/5 hover:bg-secondary/10"
      }`}
    >
      <div className="mt-0.5 shrink-0 text-secondary">
        {read ? <Bell size={18} className="text-primary/30" /> : <BellDot size={18} />}
      </div>
      <div className="flex-1">
        <p className={`text-sm font-semibold ${read ? "text-primary/70" : "text-primary"}`}>
          {title}
        </p>
        <p className="mt-1 text-sm text-primary/60">{message}</p>
        <p className="mt-2 text-xs text-primary/40">{formatDateTime(createdAt)}</p>
      </div>
    </button>
  );
}
