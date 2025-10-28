"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";

type FileDoc = {
  id: string;
  path: string;
  ikUrl?: string | null;
  visibility?: "public" | "private";
};

export default function FilesPage() {
  const { user, loading } = useAuth();
  const [items, setItems] = useState<FileDoc[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const ref = collection(db, "files");
        const q = query(ref, where("uid", "==", user.uid), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const rows: FileDoc[] = [];
        snap.forEach((d) => rows.push({ id: d.id, ...(d.data() as any) }));
        setItems(rows);
      } catch (e: any) {
        setError(e?.message || "Failed to load files");
      }
    })();
  }, [user]);

  if (loading) return <div className="text-white/70">Loading…</div>;
  if (!user) return <div className="text-white/80">Please sign in to view your files.</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Files</h1>
      {items.length === 0 ? (
        <p className="text-white/70">No files found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((f) => {
            const url = f.ikUrl || (f.path ? `https://ik.imagekit.io/audiojones/${encodeURIComponent(f.path)}` : "");
            return (
              <a key={f.id} href={url} target="_blank" className="group block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${url}?tr=w-320,h-320,fo-auto`}
                  alt={f.path}
                  className="aspect-square w-full rounded-lg object-cover ring-1 ring-white/10 group-hover:ring-white/30 transition"
                />
                <p className="mt-1 truncate text-xs text-white/70">{f.path}</p>
                <p className="text-[10px] text-white/50">{f.visibility || "private"}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

