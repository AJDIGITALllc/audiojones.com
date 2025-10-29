export const runtime = 'nodejs';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = process.env.MAILERLITE_TOKEN;
  const base = process.env.MAILERLITE_API_BASE || "https://connect.mailerlite.com";
  const groupId = process.env.MAILERLITE_GROUP_ID; // optional

  if (!token) return NextResponse.json({ error: "Missing MAILERLITE_TOKEN" }, { status: 500 });

  try {
    const { email, name } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const body: any = { email, fields: {} as Record<string, string> };
    if (name) body.fields.name = name;
    if (groupId) body.groups = [groupId];

    const res = await fetch(`${base}/api/subscribers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text || "MailerLite error" }, { status: res.status });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Subscription failed" }, { status: 500 });
  }
}

