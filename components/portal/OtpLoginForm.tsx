"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, ShieldCheck } from "lucide-react";

export default function OtpLoginForm() {
  return (
    <Suspense fallback={null}>
      <OtpLoginFormInner />
    </Suspense>
  );
}

function OtpLoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<"email" | "code">("email");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendIn, setResendIn] = useState(0);

  async function sendOtp() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName: fullName || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");
      setStep("code");
      setResendIn(30);
      const timer = setInterval(() => {
        setResendIn((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP");

      const redirectTo = searchParams.get("redirectTo") || "/portal/applications";
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-dark w-full max-w-md p-8 text-white">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-primary">
          {step === "email" ? <Mail size={26} /> : <ShieldCheck size={26} />}
        </div>
        <h1 className="text-2xl font-bold">Customer Login</h1>
        <p className="mt-1 text-sm text-white/60">
          {step === "email"
            ? "Login or sign up with your email"
            : `Enter the 6-digit code sent to ${email}`}
        </p>
      </div>

      {step === "email" ? (
        <div className="space-y-4">
          <input
            placeholder="Full Name (first time only)"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-accent"
          />
          <input
            required
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-accent"
          />
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button
            onClick={sendOtp}
            disabled={loading || !email.includes("@")}
            className="btn-accent w-full disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            required
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-center text-lg tracking-[0.5em] text-white placeholder-white/50 outline-none focus:border-accent"
          />
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button
            onClick={verifyOtp}
            disabled={loading || code.length !== 6}
            className="btn-accent w-full disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
          <button
            onClick={sendOtp}
            disabled={resendIn > 0}
            className="w-full text-center text-sm text-white/60 hover:text-white disabled:opacity-40"
          >
            {resendIn > 0 ? `Resend OTP in ${resendIn}s` : "Resend OTP"}
          </button>
          <button
            onClick={() => setStep("email")}
            className="w-full text-center text-xs text-white/40 hover:text-white/70"
          >
            Change email
          </button>
        </div>
      )}
    </div>
  );
}