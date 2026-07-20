import { STATUS_STYLES, QUALIFICATION_STYLES } from "@/lib/format";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export function QualificationBadge({ qualification }: { qualification: string }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
        QUALIFICATION_STYLES[qualification] || "bg-gray-100 text-gray-700"
      }`}
    >
      {qualification}
    </span>
  );
}
