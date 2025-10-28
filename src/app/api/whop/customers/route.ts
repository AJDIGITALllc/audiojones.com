import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
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
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to fetch Whop" }, { status: 500 });
  }
}

