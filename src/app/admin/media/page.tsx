'use client';
import { AdminOnly } from '@/components/AdminOnly';
import ImageKitUploader from '@/components/ImageKitUploader';

export default function AdminMediaPage() {
  const isAdmin = true; // This should be replaced with real auth check

  return (
    <main className="min-h-screen bg-[#111] text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Media Uploader</h1>
      <AdminOnly isAdmin={isAdmin}>
        <ImageKitUploader />
      </AdminOnly>
    </main>
  );
}
