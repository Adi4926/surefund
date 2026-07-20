import { requireCustomer } from "@/lib/requireCustomer";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import PortalShell from "@/components/portal/PortalShell";

export default async function PortalDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await requireCustomer(); // redirects to /portal/login if not authenticated

  await connectDB();
  const customer = await Customer.findById(auth.id).lean() as any;
  const displayName = customer?.fullName?.split(" ")[0] || "Customer";

  return <PortalShell customerName={displayName}>{children}</PortalShell>;
}
