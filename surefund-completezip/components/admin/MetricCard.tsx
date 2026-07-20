import { LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  icon: Icon,
  accent = "bg-secondary/10 text-secondary",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-primary/5 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-primary/50">{label}</p>
          <p className="mt-2 text-2xl font-bold text-primary md:text-3xl">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
