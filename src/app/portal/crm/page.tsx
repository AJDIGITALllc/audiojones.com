"use client";

import { useEffect, useState } from "react";

type WhopCustomer = {
  id: string;
  email?: string;
  name?: string;
  status?: string;
  plan_name?: string;
};

export default function CRMPage() {
  const [rows, setRows] = useState<WhopCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/whop/customers", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load customers");
        setRows(data?.data || []);
      } catch (e: any) {
        setError(e?.message || "Error fetching customers");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">CRM (Whop)</h1>
      {loading && <p className="text-white/70">Loading customers…</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && (
        rows.length === 0 ? (
          <p className="text-white/70">No customers found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rows.map((c) => (
              <div key={c.id} className="border border-white/10 rounded-xl p-4 bg-white/5">
                <p className="font-semibold text-white/90">{c.name || "Unnamed"}</p>
                <p className="text-sm text-white/70">{c.email || "—"}</p>
                <p className="mt-2 text-sm">Plan: <span className="text-white/90">{c.plan_name || "—"}</span></p>
                <p className="text-xs text-white/60">Status: {c.status || "—"}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

