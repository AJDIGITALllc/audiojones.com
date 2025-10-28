"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/client";

export default function ContractSignPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agree || !name) return setMsg("Please agree and enter your full name.");
    try {
      setLoading(true);
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) throw new Error("Not authenticated");
      const res = await fetch("/api/contracts/sign", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ id, signerName: name, ip: (typeof window !== "undefined" ? (window as any).clientIp : undefined) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to sign");
      setMsg("Signed successfully.");
      router.push("/portal/contracts");
    } catch (e: any) {
      setMsg(e?.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto text-white space-y-6">
      <h1 className="text-2xl font-bold">Review & Sign</h1>
      {id && (
        <iframe
          src={`https://drive.google.com/file/d/${id}/preview`}
          className="w-full h-[70vh] rounded-lg border border-white/10"
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="h-4 w-4" />
          I have read and agree to the terms in this contract.
        </label>
        <input
          type="text"
          placeholder="Type your full legal name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md bg-white/10 px-3 py-2 border border-white/10 focus:border-[#FF4500]"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] text-black font-semibold py-3 hover:opacity-90"
        >
          {loading ? "Submitting…" : "Sign Contract"}
        </button>
        {msg && <p className="text-sm text-white/70">{msg}</p>}
      </form>
    </div>
  );
}

