import { requireAdmin } from "@/lib/requireAdmin";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin(); // redirects to /admin/login if not authenticated

  return <AdminShell adminName={admin.email.split("@")[0]}>{children}</AdminShell>;
}
