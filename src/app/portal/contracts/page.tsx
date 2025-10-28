"use client";

import { useEffect, useMemo, useState } from "react";
import { db, auth } from "@/lib/firebase/client";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/Toast";
import { fetchJsonWithToast } from "@/lib/client/fetchJson";

type Contract = {
  id: string;
  status?: string;
  driveFileId?: string;
  pdfFileId?: string;
  signedUrl?: string | null;
  signatureHash?: string | null;
};

export default function ContractsPage() {
  const { user, loading } = useAuth();
  const [items, setItems] = useState<Contract[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [verifying, setVerifying] = useState<string | null>(null);
  const [verifyMsg, setVerifyMsg] = useState<Record<string, string>>({});
  const { show } = useToast();

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const token = await user.getIdTokenResult();
        setIsAdmin(!!token.claims.admin);
        const ref = collection(db, "contracts");
        const q = query(ref, where("uid", "==", user.uid), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const rows: Contract[] = [];
        snap.forEach((d) => rows.push({ id: d.id, ...(d.data() as any) }));
        setItems(rows);
      } catch (e: any) {
        setError(e?.message || "Failed to load contracts");
      }
    })();
  }, [user]);

  async function generate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    const fd = new FormData(e.currentTarget);
    const templateId = String(fd.get("templateId") || "");
    const folderId = String(fd.get("folderId") || "");
    const name = String(fd.get("name") || "");
    const fieldsJson = String(fd.get("fields") || "{}");
    let fields: Record<string, string> = {};
    try { fields = JSON.parse(fieldsJson || "{}"); } catch {}
    try {
      const idToken = await user.getIdToken();
      await fetchJsonWithToast(
        "/api/contracts/generate",
        {
          method: "POST",
          headers: { "content-type": "application/json", authorization: `Bearer ${idToken}` },
          body: JSON.stringify({ uid: user.uid, templateId, folderId, name, fields }),
        },
        { show },
        { success: { title: "Contract generated" }, failure: { title: "Generate failed" } }
      );
    } catch (err: any) {
      show({ title: "Generate failed", description: err?.message || "Error generating contract", variant: "error" });
    }
  }

  if (loading) return <div className="text-white/70">Loading…</div>;
  if (!user) return <div className="text-white/80">Please sign in to view your contracts.</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contracts</h1>
        {isAdmin && <span className="text-xs text-white/60">Admin</span>}
      </div>

      {isAdmin && (
        <form onSubmit={generate} className="rounded-xl border border-white/10 bg-white/5 p-4 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2 text-white/80 font-semibold">Generate Contract (Admin)</div>
          <input name="templateId" placeholder="Google Doc Template ID" className="rounded-md bg-white/10 px-3 py-2 border border-white/10 text-white" required />
          <input name="folderId" placeholder="Drive Folder ID" className="rounded-md bg-white/10 px-3 py-2 border border-white/10 text-white" required />
          <input name="name" placeholder="Document Name" className="rounded-md bg-white/10 px-3 py-2 border border-white/10 text-white" required />
          <textarea name="fields" placeholder='Merge fields JSON, e.g. {"client_name":"John"}' className="rounded-md bg-white/10 px-3 py-2 border border-white/10 text-white sm:col-span-2" rows={3} />
          <div className="sm:col-span-2 text-right">
            <button type="submit" className="rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] text-black font-semibold px-5 py-2">Generate</button>
          </div>
        </form>
      )}

      {items.length === 0 ? (
        <p className="text-white/70">No contracts yet.</p>
      ) : (
        <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
          {items.map((c) => (
            <div key={c.id} className="grid grid-cols-1 sm:grid-cols-5 gap-4 p-4 items-center">
              <div className="text-white/90">{c.id}</div>
              <div className="text-white/80">{c.status || "generated"}</div>
              <div className="text-white/70">Doc: {c.driveFileId || "—"}</div>
              <div className="text-white/70">PDF: {c.pdfFileId || "—"}</div>
              <div className="flex gap-2 flex-wrap">
                {c.driveFileId && (
                  <button
                    className="rounded-full border border-white/20 px-3 py-1 text-xs hover:bg-white/10"
                    onClick={async () => {
                      const idToken = await auth.currentUser?.getIdToken();
                      const res = await fetch("/api/contracts/links", {
                        method: "POST",
                        headers: { "content-type": "application/json", authorization: `Bearer ${idToken}` },
                        body: JSON.stringify({ fileId: c.driveFileId, makePublic: true }),
                      });
                      const data = await res.json();
                      if (res.ok && data.webViewLink) window.open(data.webViewLink, "_blank");
                    }}
                  >
                    Open Doc
                  </button>
                )}
                {c.pdfFileId && (
                  <button
                    className="rounded-full border border-white/20 px-3 py-1 text-xs hover:bg-white/10"
                    onClick={async () => {
                      const idToken = await auth.currentUser?.getIdToken();
                      const res = await fetch("/api/contracts/links", {
                        method: "POST",
                        headers: { "content-type": "application/json", authorization: `Bearer ${idToken}` },
                        body: JSON.stringify({ fileId: c.pdfFileId, makePublic: true }),
                      });
                      const data = await res.json();
                      if (res.ok && (data.webContentLink || data.webViewLink)) {
                        window.open(data.webContentLink || data.webViewLink, "_blank");
                      }
                    }}
                  >
                    Open PDF
                  </button>
                )}
                {c.status !== "signed" && c.pdfFileId && (
                  <a
                    href={`/portal/contracts/${c.pdfFileId}`}
                    className="rounded-full border border-white/20 px-3 py-1 text-xs hover:bg-white/10"
                  >
                    Review & Sign
                  </a>
                )}
                {c.status === "signed" && (
                  <button
                    className="rounded-full border border-white/20 px-3 py-1 text-xs hover:bg-white/10"
                    onClick={async () => {
                      try {
                        setVerifying(c.id);
                        setVerifyMsg((m) => ({ ...m, [c.id]: "Verifying…" }));
                        const idToken = await auth.currentUser?.getIdToken();
                        const resp = await fetchJsonWithToast(
                          "/api/contracts/verify",
                          {
                            method: "POST",
                            headers: { "content-type": "application/json", authorization: `Bearer ${idToken}` },
                            body: JSON.stringify({ id: c.id }),
                          },
                          { show },
                          { success: { title: "Signature verified" }, failure: { title: "Verification failed" } }
                        );
                        if (resp.ok && (resp.data as any)?.ok) {
                          setVerifyMsg((m) => ({ ...m, [c.id]: "Verified ✓" }));
                        } else {
                          setVerifyMsg((m) => ({ ...m, [c.id]: `Failed ✗` }));
                        }
                      } finally {
                        setVerifying(null);
                      }
                    }}
                  >
                    {verifying === c.id ? "Verifying…" : "Verify"}
                  </button>
                )}
                {c.signatureHash && (
                  <>
                    <span className="text-xs text-white/60">Hash: {c.signatureHash.slice(0, 12)}…</span>
                    <button
                      className="rounded-full border border-white/20 px-2 py-1 text-[10px] hover:bg-white/10"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(c.signatureHash || "");
                          setVerifyMsg((m) => ({ ...m, [c.id]: "Hash copied" }));
                          show({ title: "Hash copied", variant: "info" });
                        } catch {}
                      }}
                    >
                      Copy Hash
                    </button>
                  </>
                )}
              </div>
              {verifyMsg[c.id] && (
                <div className="text-[11px] text-white/60 mt-1">{verifyMsg[c.id]}</div>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-white/60">Note: For Drive files, access is managed via your Google account permissions.</p>
    </div>
  );
}
