"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import LoginModal from "@/components/portal/LoginModal";

export default function ApplySuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center rounded-2xl border border-primary/5 bg-white p-10 text-center shadow-card">
        <CheckCircle2 size={56} className="mb-4 text-emerald-500" />
        <h1 className="text-2xl font-bold text-primary">Application Submitted!</h1>
        <p className="mt-2 max-w-md text-primary/60">
          Thank you for applying with SureFund Financial Services. Our team will review
          your application and get in touch shortly.
        </p>
        {ref && (
          <p className="mt-4 rounded-lg bg-background px-4 py-2 font-mono text-sm text-primary/70">
            Reference ID: {ref}
          </p>
        )}
        <div className="mt-8 flex gap-3">
          <button onClick={() => setLoginModalOpen(true)} className="btn-primary">
            Track in Customer Portal
          </button>
          <Link href="/" className="btn-outline !border-primary/20 !text-primary">
            Back to Home
          </Link>
        </div>
      </div>

      <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}