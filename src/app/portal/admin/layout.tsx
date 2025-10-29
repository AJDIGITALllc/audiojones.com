import "server-only";
export const runtime = "nodejs";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/server/firebaseAdmin";

export default async function AdminLayout({
  children,
}: { children: React.ReactNode }) {
  const jar = await cookies();
  const sessionCookie =
    jar.get("session")?.value ||
    jar.get("__session")?.value ||
    jar.get("fb_session")?.value;

  if (!sessionCookie) {
    redirect("/login?next=/portal/admin");
  }

  try {
    const decoded = await adminAuth().verifySessionCookie(sessionCookie, true);
    if (decoded.admin !== true) {
      redirect("/not-authorized");
    }
  } catch {
    redirect("/login?next=/portal/admin");
  }

  return <>{children}</>;
}