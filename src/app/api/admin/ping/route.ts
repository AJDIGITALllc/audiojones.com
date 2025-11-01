// src/app/api/admin/ping/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getAdminApp, adminAuth } from '@/lib/server/firebaseAdmin';

/** Validate Bearer token and require the `admin` custom claim */
async function requireAdmin(req: NextRequest) {
  const authz = req.headers.get('authorization') || '';
  const match = authz.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return { ok: false, res: NextResponse.json({ error: 'Missing Authorization Bearer token' }, { status: 401 }) };
  }

  try {
    const decoded = await adminAuth().verifyIdToken(match[1], true); // checks revocation
    if (!decoded.admin && !(decoded.customClaims && (decoded.customClaims as any).admin)) {
      return { ok: false, res: NextResponse.json({ error: 'Forbidden: admin claim required' }, { status: 403 }) };
    }
    return { ok: true, decoded };
  } catch (err: any) {
    return { ok: false, res: NextResponse.json({ error: 'Invalid token', details: err?.message }, { status: 401 }) };
  }
}

export async function GET(req: NextRequest) {
  const gate = await requireAdmin(req);
  if (!gate.ok) return gate.res!;

  const required = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'] as const;
  const missing = required.filter((k) => !process.env[k]);

  let firebaseStatus: 'ok' | 'error' | 'missing_env' = 'ok';
  let firebaseError: string | null = null;

  if (missing.length > 0) {
    firebaseStatus = 'missing_env';
  } else {
    try {
      // Attempt to initialize the app to test credentials
      getAdminApp();
    } catch (err: any) {
      firebaseStatus = 'error';
      firebaseError = err.message;
    }
  }

  return NextResponse.json({
    ok: true,
    service: 'admin-ping',
    time: new Date().toISOString(),
    firebaseAdminEnv: firebaseStatus,
    firebaseError: firebaseError,
    missingEnv: missing.length > 0 ? missing : undefined,
  });
}
