"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-xl border border-primary/10 bg-white"
          >
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-medium text-primary">{item.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-primary/40 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            {open && (
              <div className="border-t border-primary/5 px-5 py-4 text-sm text-primary/60">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
