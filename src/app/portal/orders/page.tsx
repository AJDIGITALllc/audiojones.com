"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

type Order = {
  id: string;
  email: string | null;
  amount: number | null;
  product: string | null;
  status: string | null;
};

/**
 * Renders the orders page, which is an admin-only view of all orders.
 * This component fetches all orders from Firestore and displays them in a list.
 * @returns {JSX.Element} The orders page component.
 */
export default function OrdersPage() {
  const [items, setItems] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const ref = collection(db, "orders");
        const q = query(ref, orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const rows: Order[] = [];
        snap.forEach((d) => rows.push({ id: d.id, ...(d.data() as any) }));
        setItems(rows);
      } catch (e: unknown) {
        setError(e?.message || "Failed to load orders (admin only)");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-white/70">Loading…</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Orders (admin)</h1>
      {items.length === 0 ? (
        <p className="text-white/70">No orders found.</p>
      ) : (
        <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
          {items.map((o) => (
            <div key={o.id} className="grid grid-cols-4 gap-4 p-4">
              <div className="text-white/90">{o.id}</div>
              <div className="text-white/80">{o.email}</div>
              <div className="text-white/80">{o.product}</div>
              <div className="text-white/70">{o.amount ?? "-"} / {o.status}</div>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-white/60">Access requires admin claim; non-admin users will see a permission error.</p>
    </div>
  );
}

