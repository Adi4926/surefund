"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StickyNote } from "lucide-react";
import { formatDateTime } from "@/lib/format";

interface Note {
  text: string;
  createdAt: string;
  createdBy: string;
}

export default function NotesSection({
  leadId,
  notes,
}: {
  leadId: string;
  notes: Note[];
}) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add note");
      setNote("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add note");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border border-primary/5 bg-white p-5 shadow-card">
      <div className="mb-3 flex items-center gap-2">
        <StickyNote size={18} className="text-accent" />
        <h3 className="font-heading font-semibold text-primary">Notes</h3>
      </div>

      <form onSubmit={handleAddNote} className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about this lead..."
          className="flex-1 rounded-xl border border-primary/10 px-4 py-2.5 text-sm outline-none focus:border-secondary"
        />
        <button
          type="submit"
          disabled={saving}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? "Adding..." : "Add Note"}
        </button>
      </form>
      {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

      <div className="max-h-64 space-y-3 overflow-y-auto">
        {[...notes].reverse().map((n, i) => (
          <div key={i} className="rounded-xl bg-background p-3">
            <p className="text-sm text-primary">{n.text}</p>
            <p className="mt-1 text-xs text-primary/40">
              {n.createdBy} • {formatDateTime(n.createdAt)}
            </p>
          </div>
        ))}
        {notes.length === 0 && (
          <p className="py-4 text-center text-sm text-primary/40">No notes yet.</p>
        )}
      </div>
    </div>
  );
}
