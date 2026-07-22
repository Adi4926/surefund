"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // 1. Notifications fetch karein
    fetch("/api/customer/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data.notifications || []))
      .catch(() => {});

    // 2. Jaise hi page khule, sabhi unread notifications ko read mark kar dein taaki count 0 ho jaye
    fetch("/api/customer/notifications/mark-read", { method: "POST" })
      .then(() => {
        // Sidebar ka count turant update karne ke liye router refresh karein
        router.refresh();
      })
      .catch(() => {});
  }, [router]);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Notifications</h1>
        <p className="mt-1 text-sm text-primary/50">
          Stay updated with your loan application statuses.
        </p>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-sm text-primary/50">No notifications found.</p>
        ) : (
          notifications.map((notif: any, i) => (
            <div key={i} className="rounded-2xl border border-primary/5 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-primary">{notif.title}</p>
              <p className="mt-1 text-xs text-primary/70">{notif.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}