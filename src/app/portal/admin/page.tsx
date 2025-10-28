"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/client";

type AdminUser = {
  uid: string;
  email?: string;
  displayName?: string;
  admin: boolean;
  disabled?: boolean;
  createdAt?: string | null;
  lastSignIn?: string | null;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pageToken, setPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingUid, setSavingUid] = useState<string | null>(null);

  async function fetchUsers(token?: string | null) {
    setLoading(true);
    setError(null);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) throw new Error("No ID token");
      const qs = new URLSearchParams();
      if (token) qs.set("pageToken", token);
      const res = await fetch(`/api/admin/users?${qs.toString()}`, {
        headers: { authorization: `Bearer ${idToken}` },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load users");
      setUsers(data.users || []);
      setPageToken(data.nextPageToken || null);
    } catch (e: any) {
      setError(e?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function setAdmin(uid: string, admin: boolean) {
    setSavingUid(uid);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) throw new Error("No ID token");
      const res = await fetch(`/api/admin/users`, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ uid, admin }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update role");
      setUsers((prev) => prev.map((u) => (u.uid === uid ? { ...u, admin } : u)));
    } catch (e: any) {
      alert(e?.message || "Failed to update role");
    } finally {
      setSavingUid(null);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin: Users & Roles</h1>
      {loading && <p className="text-white/70">Loading users…</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-white/70">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Admin</th>
                <th className="p-3">Last Sign-in</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.uid} className="border-t border-white/10">
                  <td className="p-3 text-white/90">{u.displayName || "—"}</td>
                  <td className="p-3 text-white/80">{u.email || "—"}</td>
                  <td className="p-3">{u.admin ? "Yes" : "No"}</td>
                  <td className="p-3 text-white/60">{u.lastSignIn || "—"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setAdmin(u.uid, !u.admin)}
                      disabled={savingUid === u.uid}
                      className="rounded-full border border-white/20 px-3 py-1 hover:bg-white/10"
                    >
                      {savingUid === u.uid ? "Saving…" : u.admin ? "Revoke Admin" : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => fetchUsers(pageToken)}
          disabled={!pageToken || loading}
          className="rounded-full border border-white/20 px-4 py-2 text-white/80 hover:bg-white/10 disabled:opacity-50"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

