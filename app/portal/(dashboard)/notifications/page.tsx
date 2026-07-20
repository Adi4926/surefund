import { Bell } from "lucide-react";
import { requireCustomer } from "@/lib/requireCustomer";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";
import NotificationItem from "@/components/portal/NotificationItem";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const auth = await requireCustomer();
  await connectDB();

  const notifications = await Notification.find({ customer: auth.id })
    .sort({ createdAt: -1 })
    .limit(100)
    .lean() as any;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-2">
        <Bell className="text-accent" size={22} />
        <h1 className="text-2xl font-bold text-primary">Notifications</h1>
      </div>

      <div className="space-y-3">
        {notifications.map((n: any) => (
          <NotificationItem
            key={n._id}
            id={String(n._id)}
            title={n.title}
            message={n.message}
            read={n.read}
            createdAt={String(n.createdAt)}
          />
        ))}
        {notifications.length === 0 && (
          <div className="rounded-2xl border border-dashed border-primary/15 bg-white p-12 text-center">
            <p className="text-sm text-primary/40">You have no notifications yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
