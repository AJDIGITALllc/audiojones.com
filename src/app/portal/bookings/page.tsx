"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";

type Booking = {
  id: string;
  start?: string;
  end?: string;
  type?: string;
  status?: string;
};

/**
 * Renders the bookings page for the authenticated user.
 * This component fetches the user's bookings from Firestore and displays them in a list.
 * It handles loading, authentication, and error states.
 * @returns {JSX.Element} The bookings page component.
 */
export default function BookingsPage() {
  const { user, loading } = useAuth();
  const [items, setItems] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const ref = collection(db, "bookings");
        const q = query(ref, where("uid", "==", user.uid), orderBy("start", "desc"));
        const snap = await getDocs(q);
        const rows: Booking[] = [];
        snap.forEach((d) => rows.push({ id: d.id, ...(d.data() as any) }));
        setItems(rows);
      } catch (e: unknown) {
        setError(e?.message || "Failed to load bookings");
      }
    })();
  }, [user]);

  if (loading) return <div className="text-white/70">Loading…</div>;
  if (!user) return <div className="text-white/80">Please sign in to view your bookings.</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Bookings</h1>
      {items.length === 0 ? (
        <p className="text-white/70">No bookings yet.</p>
      ) : (
        <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
          {items.map((b) => (
            <div key={b.id} className="grid grid-cols-4 gap-4 p-4">
              <div className="text-white/90">{b.type || "Session"}</div>
              <div className="text-white/80">{b.status || "confirmed"}</div>
              <div className="text-white/70">{b.start || "—"}</div>
              <div className="text-white/70">{b.end || "—"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

