export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/server/firebaseAdmin';

function assertKey(req: NextRequest) {
  const got = req.headers.get('x-admin-api-key') || '';
  if (!process.env.ADMIN_API_KEY || got !== process.env.ADMIN_API_KEY) {
    throw new Error('Unauthorized');
  }
}

export async function POST(req: NextRequest) {
  try {
    assertKey(req);
    const { email, admin = true } = await req.json();
    if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 });

    const auth = adminAuth();
    const user = await auth.getUserByEmail(email);
    const claims = { ...(user.customClaims || {}), admin };
    if (!admin) delete (claims as any).admin;

    await auth.setCustomUserClaims(user.uid, claims);
    return NextResponse.json({ ok: true, uid: user.uid, email, claims });
  } catch (e: any) {
    const status = /Unauthorized/.test(e?.message) ? 401 : 400;
    return NextResponse.json({ error: e?.message || 'failed' }, { status });
  }
}