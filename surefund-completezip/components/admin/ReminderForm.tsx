"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BellRing } from "lucide-react";
import { formatDateTime } from "@/lib/format";

export default function ReminderForm({
  leadId,
  currentReminder,
}: {
  leadId: string;
  currentReminder?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    if (!value) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reminderAt: new Date(value).toISOString() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to set reminder");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set reminder");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border border-primary/5 bg-white p-5 shadow-card">
      <div className="mb-3 flex items-center gap-2">
        <BellRing size={18} className="text-accent" />
        <h3 className="font-heading font-semibold text-primary">Follow-up Reminder</h3>
      </div>

      {currentReminder && (
        <p className="mb-3 text-sm text-primary/60">
          Currently set for <b>{formatDateTime(currentReminder)}</b>
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="datetime-local"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 rounded-xl border border-primary/10 px-4 py-2.5 text-sm outline-none focus:border-secondary"
        />
        <button
          onClick={handleSave}
          disabled={saving || !value}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? "Saving..." : "Set Reminder"}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
