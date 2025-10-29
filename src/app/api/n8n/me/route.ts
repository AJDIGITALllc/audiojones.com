export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { n8nMe } from "@/lib/server/n8n";

export async function GET() {
  try {
    const me = await n8nMe();
    // Return a minimal, safe subset
    const safe = {
      id: me?.id ?? null,
      email: me?.email ?? null,
      firstName: me?.firstName ?? null,
      lastName: me?.lastName ?? null,
    };
    return NextResponse.json({ ok: true, me: safe });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "n8n request failed" }, { status: 500 });
  }
}

