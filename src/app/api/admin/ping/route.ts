export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function GET() {
  const required = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'] as const;
  const missing = required.filter((k) => !process.env[k]);

  return NextResponse.json({
    ok: true,
    service: 'admin-ping',
    time: new Date().toISOString(),
    firebaseAdminEnv: missing.length === 0 ? 'ok' : { missing },
  });
}