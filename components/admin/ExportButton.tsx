"use client";

import { useState } from "react";
import { Download } from "lucide-react";

export default function ExportButton({
  href,
  label = "Export Excel",
}: {
  href: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    try {
      const res = await fetch(href);
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const disposition = res.headers.get("content-disposition") || "";
      const match = disposition.match(/filename="?([^"]+)"?/);
      a.download = match?.[1] ?? "export.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Export failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-2 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-2.5 text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-white disabled:opacity-50"
    >
      <Download size={16} />
      {loading ? "Exporting…" : label}
    </button>
  );
}
