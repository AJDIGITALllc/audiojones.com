"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";

type Contract = {
  id: string;
  status?: string;
  driveFileId?: string;
  pdfFileId?: string;
  signedUrl?: string | null;
};

export default function ContractsPage() {
  const { user, loading } = useAuth();
  const [items, setItems] = useState<Contract[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
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

  if (loading) return <div className="text-white/70">Loading…</div>;
  if (!user) return <div className="text-white/80">Please sign in to view your contracts.</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Contracts</h1>
      {items.length === 0 ? (
        <p className="text-white/70">No contracts yet.</p>
      ) : (
        <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
          {items.map((c) => (
            <div key={c.id} className="grid grid-cols-4 gap-4 p-4">
              <div className="text-white/90">{c.id}</div>
              <div className="text-white/80">{c.status || "generated"}</div>
              <div className="text-white/70">Doc: {c.driveFileId || "—"}</div>
              <div className="text-white/70">PDF: {c.pdfFileId || "—"}</div>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-white/60">Note: For Drive files, access is managed via your Google account permissions.</p>
    </div>
  );
}

