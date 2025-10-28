"use client";

import { useState } from "react";
import { storage, auth } from "@/lib/firebase/client";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

export default function FirebaseStorageUploader() {
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userUid, setUserUid] = useState<string | null>(null);

  // Track auth for path scoping
  onAuthStateChanged(auth, (u) => setUserUid(u?.uid || null));

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUrl(null);
    setProgress(0);

    const folder = userUid ? `uploads/${userUid}` : "uploads/public";
    const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);

    const task = uploadBytesResumable(storageRef, file);
    task.on(
      "state_changed",
      (snap) => {
        const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        setProgress(pct);
      },
      (err) => setError(err?.message || "Upload failed"),
      async () => {
        const downloadURL = await getDownloadURL(task.snapshot.ref);
        setUrl(downloadURL);
      }
    );
  };

  return (
    <div className="space-y-3">
      <input type="file" accept="image/*" onChange={onPick} className="text-white" />
      <div className="text-white/80 text-sm">Progress: {progress}%</div>
      {url && (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="uploaded" className="h-16 w-16 rounded-md object-cover" />
          <a className="underline" href={url} target="_blank">Open</a>
        </div>
      )}
      {error && <div className="text-red-400 text-sm">{error}</div>}
    </div>
  );
}

