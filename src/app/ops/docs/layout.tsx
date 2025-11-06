import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/server";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || !user.isAdmin) {
    redirect("/not-authorized");
  }

  return <>{children}</>;
}