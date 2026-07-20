"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function CibilCheckForm() {
  const [form, setForm] = useState({ fullName: "", mobile: "", pan: "", consentGiven: false });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/cibil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setMessage(data.message);
      setForm({ fullName: "", mobile: "", pan: "", consentGiven: false });
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="cibil-check" className="section">
      <div className="glass-card mx-auto max-w-xl p-8 md:p-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 text-white">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary">Free CIBIL Check</h3>
            <p className="text-sm text-primary/60">Know your score in seconds.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="w-full rounded-lg border border-primary/10 bg-white px-4 py-3 outline-none focus:border-secondary"
          />
          <input
            required
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="w-full rounded-lg border border-primary/10 bg-white px-4 py-3 outline-none focus:border-secondary"
          />
          <input
            required
            placeholder="PAN Number"
            maxLength={10}
            value={form.pan}
            onChange={(e) => setForm({ ...form, pan: e.target.value.toUpperCase() })}
            className="w-full rounded-lg border border-primary/10 bg-white px-4 py-3 uppercase outline-none focus:border-secondary"
          />
          <label className="flex items-start gap-2 text-sm text-primary/70">
            <input
              type="checkbox"
              required
              checked={form.consentGiven}
              onChange={(e) => setForm({ ...form, consentGiven: e.target.checked })}
              className="mt-1"
            />
            I authorize SureFund Financial Services to check my credit score
            and contact me regarding loan offers.
          </label>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === "loading"}
            className="btn-primary w-full"
          >
            {status === "loading" ? "Checking..." : "Check My CIBIL Score"}
          </motion.button>

          {message && (
            <p
              className={`text-center text-sm ${
                status === "error" ? "text-red-500" : "text-emerald-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
