"use client";

import { ApplyDraft } from "@/lib/applyFormStorage";

export default function StepPersonalDetails({
  data,
  onChange,
}: {
  data: ApplyDraft;
  onChange: (patch: Partial<ApplyDraft>) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">Personal Details</h2>
      <p className="text-sm text-primary/50">Tell us a bit about yourself.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Full Name"
          value={data.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          className="rounded-lg border border-primary/10 px-4 py-3 outline-none focus:border-secondary sm:col-span-2"
        />
        <input
          required
          placeholder="Mobile Number"
          value={data.mobile}
          onChange={(e) => onChange({ mobile: e.target.value })}
          className="rounded-lg border border-primary/10 px-4 py-3 outline-none focus:border-secondary"
        />
        <input
          required
          type="email"
          placeholder="Email Address"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          className="rounded-lg border border-primary/10 px-4 py-3 outline-none focus:border-secondary"
        />
      </div>
    </div>
  );
}
