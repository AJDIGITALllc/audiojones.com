/* components/AdminOnly.tsx */
export default function AdminOnly({ children, isAdmin }: { children: React.ReactNode; isAdmin: boolean }) {
  if (!isAdmin) return null;
  return <>{children}</>;
}
