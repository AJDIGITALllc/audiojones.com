// app/admin/media/page.tsx
import AdminOnly from '@/components/AdminOnly';
import Uploader from '@/components/ImageKitUploader';

export default function MediaPage() {
  const isAdmin = true; // Simulate admin user for now
  return (
    <AdminOnly isAdmin={isAdmin}>
      <Uploader />
    </AdminOnly>
  );
}
