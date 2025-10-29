"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";

type Payment = {
  id: string;
  amount: number | null;
  currency: string | null;
  status: string | null;
  createdAt?: unknown;
};

/**
 * Renders the invoices page for the authenticated user.
 * This component fetches the user's payment history from Firestore and displays it in a list.
 * @returns {JSX.Element} The invoices page component.
 */
export default function InvoicesPage() {
  const { user, loading } = useAuth();
  const [items, setItems] = useState<Payment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const ref = collection(db, "payments");
        const q = query(ref, where("uid", "==", user.uid), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const rows: Payment[] = [];
        snap.forEach((d) => rows.push({ id: d.id, ...(d.data() as any) }));
        setItems(rows);
      } catch (e: unknown) {
        setError(e?.message || "Failed to load payments");
      }
    })();
  }, [user]);

  if (loading) return <div className="text-white/70">Loading…</div>;
  if (!user) return <div className="text-white/80">Please sign in to view your invoices.</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Invoices</h1>
      {items.length === 0 ? (
        <p className="text-white/70">No payments found.</p>
      ) : (
        <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
          {items.map((p) => (
            <div key={p.id} className="grid grid-cols-3 gap-4 p-4">
              <div className="text-white/90">{p.id}</div>
              <div className="text-white/80">
                {p.amount ? (p.amount / 100).toFixed(2) : "-"} {p.currency?.toUpperCase()}
              </div>
              <div className="text-white/70">{p.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

