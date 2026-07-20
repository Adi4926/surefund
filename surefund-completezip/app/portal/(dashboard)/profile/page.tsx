import { requireCustomer } from "@/lib/requireCustomer";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import ProfileForm from "@/components/portal/ProfileForm";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const auth = await requireCustomer();
  await connectDB();
  const customer = await Customer.findById(auth.id).lean() as any;

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">My Profile</h1>
        <p className="mt-1 text-sm text-primary/50">
          Keep your details up to date for faster loan processing.
        </p>
      </div>

      <ProfileForm
        initialData={{
          fullName: customer?.fullName || "",
          mobile: customer?.mobile || "",
          email: customer?.email || "",
          dob: customer?.dob || "",
          city: customer?.city || "",
          pan: customer?.pan || "",
        }}
      />
    </div>
  );
}
