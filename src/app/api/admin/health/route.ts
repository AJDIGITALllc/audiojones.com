// src/app/api/admin/health/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/server/firebaseAdmin';

export async function GET() {
  try {
    // A light call — fetch an auth config. If Admin isn't initialized, this throws.
    await adminAuth.getUserByEmail('nonexistent-check@health.local').catch(() => null);
    return NextResponse.json({ ok: true, service: 'firebase-admin', status: 'ready' });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? 'init failed' }, { status: 500 });
  }
}