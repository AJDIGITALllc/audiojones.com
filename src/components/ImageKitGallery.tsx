"use client";

import { useEffect, useState } from "react";

type IkFile = {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
};

export default function ImageKitGallery() {
  const [files, setFiles] = useState<IkFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/imagekit-files", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load files");
        setFiles(data.files || []);
      } catch (e: any) {
        setError(e?.message || "Failed loading gallery");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <p className="text-white/70">Loading recent uploads…</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!files.length) return <p className="text-white/70">No uploads yet.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {files.map((f) => {
        const thumb = f.thumbnailUrl || `${f.url}?tr=w-320,h-320,fo-auto`;
        return (
          <a key={f.fileId} href={f.url} target="_blank" className="group block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt={f.name}
              className="aspect-square w-full rounded-lg object-cover ring-1 ring-white/10 group-hover:ring-white/30 transition"
              loading="lazy"
            />
            <p className="mt-1 truncate text-xs text-white/70">{f.name}</p>
          </a>
        );
      })}
    </div>
  );
}

