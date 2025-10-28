import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/server/firebaseAdmin";

async function requireAdmin(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!idToken) throw new Error("unauthorized");
  const adminAuth = getAdminAuth();
  const decoded = await adminAuth.verifyIdToken(idToken);
  if (!(decoded as any).admin) throw new Error("forbidden");
  return { adminAuth };
}

export async function GET(req: NextRequest) {
  try {
    const { adminAuth } = await requireAdmin(req);
    const url = new URL(req.url);
    const pageToken = url.searchParams.get("pageToken") || undefined;
    const pageSize = Math.min(parseInt(url.searchParams.get("limit") || "50", 10), 100);
    const result = await adminAuth.listUsers(pageSize, pageToken);
    const users = result.users.map((u) => ({
      uid: u.uid,
      email: u.email,
      displayName: u.displayName,
      admin: !!(u.customClaims as any)?.admin,
      disabled: u.disabled,
      createdAt: u.metadata.creationTime,
      lastSignIn: u.metadata.lastSignInTime,
    }));
    return NextResponse.json({ users, nextPageToken: result.pageToken || null });
  } catch (e: any) {
    if (e.message === "unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e.message === "forbidden") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { adminAuth } = await requireAdmin(req);
    const body = await req.json();
    const uid = body?.uid as string;
    const admin = !!body?.admin;
    if (!uid) return NextResponse.json({ error: "uid required" }, { status: 400 });
    // Merge existing claims to avoid overwriting other custom claims.
    const user = await adminAuth.getUser(uid);
    const claims = { ...(user.customClaims || {}), admin } as Record<string, any>;
    await adminAuth.setCustomUserClaims(uid, claims);
    return NextResponse.json({ ok: true, uid, admin });
  } catch (e: any) {
    if (e.message === "unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e.message === "forbidden") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}

