"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProfileData {
  fullName: string;
  mobile: string;
  email: string;
  dob: string;
  city: string;
  pan: string;
}

export default function ProfileForm({ initialData }: { initialData: ProfileData }) {
  const router = useRouter();
  const [form, setForm] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const { mobile, ...updatable } = form;
      const res = await fetch("/api/customer/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatable),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");
      setMessage("Profile updated successfully.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-primary/5 bg-white p-6 shadow-card"
    >
      <div>
        <label className="mb-1 block text-xs font-medium text-primary/50">
          Mobile Number (login ID — cannot be changed)
        </label>
        <input
          disabled
          value={form.mobile}
          className="w-full cursor-not-allowed rounded-lg border border-primary/10 bg-background px-4 py-2.5 text-primary/50"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-primary/50">Full Name</label>
        <input
          required
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="w-full rounded-lg border border-primary/10 px-4 py-2.5 outline-none focus:border-secondary"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-primary/50">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-lg border border-primary/10 px-4 py-2.5 outline-none focus:border-secondary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-primary/50">Date of Birth</label>
          <input
            type="date"
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            className="w-full rounded-lg border border-primary/10 px-4 py-2.5 outline-none focus:border-secondary"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-primary/50">City</label>
          <input
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full rounded-lg border border-primary/10 px-4 py-2.5 outline-none focus:border-secondary"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-primary/50">PAN Number</label>
        <input
          maxLength={10}
          value={form.pan}
          onChange={(e) => setForm({ ...form, pan: e.target.value.toUpperCase() })}
          className="w-full rounded-lg border border-primary/10 px-4 py-2.5 uppercase outline-none focus:border-secondary"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {message && <p className="text-sm text-emerald-600">{message}</p>}

      <button
        type="submit"
        disabled={saving}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
