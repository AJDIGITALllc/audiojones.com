// src/app/api/admin/users/route.ts
export const runtime = 'nodejs'; // firebase-admin requires Node, not Edge

import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/server/firebaseAdmin';

export async function GET() {
  try {
    // Example: list up to 10 users to verify Admin SDK is working
    const list = await adminAuth.listUsers(10);
    return NextResponse.json({
      ok: true,
      count: list.users.length,
      uids: list.users.map(u => u.uid)
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? 'Admin error' },
      { status: 500 }
    );
  }
}