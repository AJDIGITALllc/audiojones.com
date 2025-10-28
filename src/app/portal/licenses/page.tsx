"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";

type License = {
  id: string;
  product: string | null;
  status: string | null;
  expires?: any;
};

export default function LicensesPage() {
  const { user, loading } = useAuth();
  const [items, setItems] = useState<License[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;
    (async () => {
      try {
        const ref = collection(db, "licenses");
        const q = query(ref, where("email", "==", user.email), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const rows: License[] = [];
        snap.forEach((d) => rows.push({ id: d.id, ...(d.data() as any) }));
        setItems(rows);
      } catch (e: any) {
        setError(e?.message || "Failed to load licenses");
      }
    })();
  }, [user?.email]);

  if (loading) return <div className="text-white/70">Loading…</div>;
  if (!user) return <div className="text-white/80">Please sign in to view your licenses.</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Licenses</h1>
      {items.length === 0 ? (
        <p className="text-white/70">No licenses found.</p>
      ) : (
        <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
          {items.map((p) => (
            <div key={p.id} className="grid grid-cols-3 gap-4 p-4">
              <div className="text-white/90">{p.product}</div>
              <div className="text-white/80">{p.status}</div>
              <div className="text-white/70">{p.expires || "-"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

