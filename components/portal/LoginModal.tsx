"use client";

import { X } from "lucide-react";
import OtpLoginForm from "@/components/portal/OtpLoginForm";

export default function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[200] bg-primary/60 backdrop-blur-md"
        onClick={onClose}
      />
      <div
        className="fixed inset-0 z-[201] flex items-center justify-center overflow-y-auto p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative my-8 w-full max-w-md">
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-colors hover:bg-primary/5"
          >
            <X size={18} />
          </button>
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-2xl">
            <OtpLoginForm />
          </div>
        </div>
      </div>
    </>
  );
}