import { Check } from "lucide-react";

const STEPS = [
  "Personal Details",
  "Employment Details",
  "Loan Details",
  "Documents",
  "Review & Submit",
];

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-10 flex items-center justify-between">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const completed = stepNum < currentStep;
        const active = stepNum === currentStep;
        return (
          <div key={label} className="flex flex-1 flex-col items-center last:flex-none">
            <div className="flex w-full items-center">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  completed
                    ? "bg-secondary text-white"
                    : active
                    ? "bg-accent text-primary"
                    : "bg-white text-primary/30 border border-primary/10"
                }`}
              >
                {completed ? <Check size={16} /> : stepNum}
              </div>
              {stepNum < STEPS.length && (
                <div
                  className={`mx-1 h-0.5 flex-1 ${
                    completed ? "bg-secondary" : "bg-primary/10"
                  }`}
                />
              )}
            </div>
            <span
              className={`mt-2 hidden text-center text-xs font-medium sm:block ${
                active ? "text-primary" : "text-primary/40"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
