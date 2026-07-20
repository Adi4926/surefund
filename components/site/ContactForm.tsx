"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send message");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-4 p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-lg border border-primary/10 px-4 py-3 outline-none focus:border-secondary"
        />
        <input
          required
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-lg border border-primary/10 px-4 py-3 outline-none focus:border-secondary"
        />
        <input
          required
          placeholder="Mobile Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="rounded-lg border border-primary/10 px-4 py-3 outline-none focus:border-secondary"
        />
        <input
          required
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="rounded-lg border border-primary/10 px-4 py-3 outline-none focus:border-secondary"
        />
      </div>
      <textarea
        required
        rows={5}
        placeholder="Your Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full rounded-lg border border-primary/10 px-4 py-3 outline-none focus:border-secondary"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-center text-sm text-emerald-600">
          Thanks! We've received your message and will get back to you shortly.
        </p>
      )}
      {status === "error" && <p className="text-center text-sm text-red-500">{error}</p>}
    </form>
  );
}
