"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";

export function ArtistLeadMagnetForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { show } = useToast();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, name, tags: ["freemium_artist_checklist", "artist_music_interest"] }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ error: "Unable to subscribe" }));
        throw new Error(error?.error || "Unable to subscribe");
      }

      setEmail("");
      setName("");
      setMessage("Checklist delivered. Check your inbox for the download link.");
      show({ title: "You're in", description: "We just emailed the checklist.", variant: "success" });
    } catch (err: any) {
      const errorMessage = err?.message || "Something went wrong";
      setMessage(errorMessage);
      show({ title: "Signup failed", description: errorMessage, variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 md:flex-row md:items-center">
      <input
        type="text"
        placeholder="Artist name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full border border-white/15 bg-black/40 px-5 py-3 text-white placeholder-white/50 focus:border-[#FFD700] focus:outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full rounded-full border border-white/15 bg-black/40 px-5 py-3 text-white placeholder-white/50 focus:border-[#FFD700] focus:outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
      >
        {loading ? "Sending..." : "Get the Checklist"}
      </button>
      {message && (
        <p className="text-sm text-white/70 md:w-full md:text-left">{message}</p>
      )}
    </form>
  );
}
