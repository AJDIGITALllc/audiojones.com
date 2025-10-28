"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase/client";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { useToast } from "@/components/Toast";

export default function ContractSignPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [meta, setMeta] = useState<{ signedUrl?: string; signatureHash?: string } | null>(null);
  const { show } = useToast();

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const q = query(collection(db, "contracts"), where("pdfFileId", "==", String(id)), limit(1));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const d = snap.docs[0].data() as any;
          setMeta({ signedUrl: d.signedUrl, signatureHash: d.signatureHash });
        }
      } catch {}
    })();
  }, [id]);

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
      show({ title: "Contract signed", variant: "success" });
      router.push("/portal/contracts");
    } catch (e: any) {
      setMsg(e?.message || "Error");
      show({ title: "Sign failed", description: e?.message || "Error", variant: "error" });
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
      {meta && (
        <div className="text-sm text-white/70">
          {meta.signedUrl && (
            <a href={meta.signedUrl} target="_blank" className="underline text-[#FFD700] mr-4">View signed PDF</a>
          )}
          {meta.signatureHash && <span>Hash: {meta.signatureHash.slice(0, 12)}…</span>}
        </div>
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
