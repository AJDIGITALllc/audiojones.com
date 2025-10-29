import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/server/firebaseAdmin";

/**
 *
 */
export async function GET(req: NextRequest) {
  // Verify Firebase ID token and require admin claim
  try {
    const authHeader = req.headers.get("authorization") || "";
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!idToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const adminAuth = getAdminAuth();
    const decoded = await adminAuth.verifyIdToken(idToken);
    if (!(decoded as { admin?: boolean }).admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } catch (e: unknown) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const apiKey = process.env.WHOP_API_KEY;
  const base = process.env.WHOP_API_URL || "https://api.whop.com/v2";
  if (!apiKey) return NextResponse.json({ error: "Missing WHOP_API_KEY" }, { status: 500 });

  try {
    const res = await fetch(`${base}/customers`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data?.message || "Whop API error" }, { status: res.status });
    }
    return NextResponse.json(data);
  } catch (e: unknown) {
    return NextResponse.json({ error: e?.message || "Failed to fetch Whop" }, { status: 500 });
  }
}
