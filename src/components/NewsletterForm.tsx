"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const { show } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Subscribe failed");
      setStatus("success");
      setMessage("Subscribed. Check your inbox.");
      setEmail("");
      setName("");
      show({ title: "Subscribed", description: "Check your inbox", variant: "success" });
    } catch (e: any) {
      setStatus("error");
      const m = e?.message || "Something went wrong";
      setMessage(m);
      show({ title: "Subscribe failed", description: m, variant: "error" });
    }
  };

  return (
    <section className="max-w-3xl mx-auto text-center mt-12 mb-8 px-4">
      <h3 className="text-2xl font-bold text-white mb-2">Join the Movement</h3>
      <p className="text-white/70 mb-6">
        Get weekly AI + Brand insights from Audio Jones. No fluff. Just signal.
      </p>
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Your email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="gradient-bg h-12 px-8 rounded-full font-bold text-black disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {message && (
        <p className={`mt-3 text-sm ${status === "error" ? "text-red-400" : "text-white/80"}`}>{message}</p>
      )}
    </section>
  );
}
