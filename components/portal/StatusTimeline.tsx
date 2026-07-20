import { Check } from "lucide-react";
import { LEAD_STATUSES } from "@/lib/constants";

const REJECTED_OR_DISBURSED_TERMINAL = ["Rejected", "Disbursed"];

export default function StatusTimeline({ status }: { status: string }) {
  const isRejected = status === "Rejected";
  // The pipeline is linear except Rejected, which can happen from any stage.
  const pipeline = LEAD_STATUSES.filter((s) => s !== "Rejected");
  const currentIndex = pipeline.indexOf(status as (typeof pipeline)[number]);

  return (
    <div className="space-y-0">
      {pipeline.map((step, i) => {
        const completed = !isRejected && i <= currentIndex;
        const isCurrent = !isRejected && i === currentIndex;
        const isLast = i === pipeline.length - 1;

        return (
          <div key={step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                  completed
                    ? "border-secondary bg-secondary text-white"
                    : "border-primary/15 bg-white text-primary/30"
                }`}
              >
                {completed ? <Check size={16} /> : i + 1}
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 flex-1 ${
                    completed && i < currentIndex ? "bg-secondary" : "bg-primary/10"
                  }`}
                  style={{ minHeight: "2rem" }}
                />
              )}
            </div>
            <div className={`pb-8 ${isLast ? "pb-0" : ""}`}>
              <p
                className={`text-sm font-semibold ${
                  isCurrent ? "text-secondary" : completed ? "text-primary" : "text-primary/40"
                }`}
              >
                {step}
              </p>
              {isCurrent && (
                <p className="mt-0.5 text-xs text-primary/50">Current status</p>
              )}
            </div>
          </div>
        );
      })}

      {isRejected && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600">
          This application was marked Rejected. Contact our team for details.
        </div>
      )}
    </div>
  );
}
