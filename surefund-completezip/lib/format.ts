export function formatCurrency(value?: number): string {
  if (value === undefined || value === null) return "—";
  return `₹${value.toLocaleString("en-IN")}`;
}

export function formatDate(value?: string | Date): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(value?: string | Date): string {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const STATUS_STYLES: Record<string, string> = {
  "New Lead": "bg-blue-100 text-blue-700",
  "Contacted": "bg-indigo-100 text-indigo-700",
  "Documents Pending": "bg-amber-100 text-amber-700",
  "Under Review": "bg-purple-100 text-purple-700",
  "Approved": "bg-emerald-100 text-emerald-700",
  "Rejected": "bg-red-100 text-red-700",
  "Disbursed": "bg-teal-100 text-teal-700",
};

export const QUALIFICATION_STYLES: Record<string, string> = {
  Qualified: "bg-emerald-100 text-emerald-700",
  "Needs Review": "bg-amber-100 text-amber-700",
};
