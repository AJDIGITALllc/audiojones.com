export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/server/firebaseAdmin';

const FORBIDDEN_CLAIMS = new Set([
  'aud','iss','sub','iat','exp','auth_time','uid','email','email_verified','firebase'
]);

function bad(status: number, message: string) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(req: NextRequest) {
  try {
    // --- Check API key header ---
    const apiKeyHeader = req.headers.get('x-admin-api-key') || '';
    const apiKeyEnv = process.env.ADMIN_API_KEY || '';
    if (!apiKeyEnv || apiKeyHeader !== apiKeyEnv) {
      return bad(401, 'Invalid or missing x-admin-api-key');
    }

    // --- Verify caller is an admin (Firebase custom claim) ---
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    if (!token) return bad(401, 'Missing Bearer token');

    const decoded = await adminAuth().verifyIdToken(token, true);
    if (!decoded.admin) return bad(403, 'Admin claim required');

    // --- Parse body ---
    const body = await req.json().catch(() => null) as {
      email?: string;
      uid?: string;
      claims?: Record<string, unknown>;
    } | null;

    if (!body) return bad(400, 'Invalid JSON body');
    const { email, uid, claims } = body;

    if ((!email && !uid) || (email && uid)) {
      return bad(400, 'Provide exactly one of: email OR uid');
    }
    if (!claims || typeof claims !== 'object' || Array.isArray(claims)) {
      return bad(400, 'claims must be an object');
    }

    // --- Validate claims keys ---
    for (const k of Object.keys(claims)) {
      if (FORBIDDEN_CLAIMS.has(k)) {
        return bad(400, `Claim key "${k}" is not allowed`);
      }
    }

    // --- Resolve user ---
    const auth = adminAuth();
    const userRecord = email
      ? await auth.getUserByEmail(email)
      : await auth.getUser(uid!);

    const previous = userRecord.customClaims || {};

    // --- Set claims ---
    await auth.setCustomUserClaims(userRecord.uid, claims);

    return NextResponse.json({
      ok: true,
      uid: userRecord.uid,
      email: userRecord.email ?? null,
      previousClaims: previous,
      newClaims: claims,
    });
  } catch (e: any) {
    const msg = e?.message || 'Unexpected error';
    const status = /auth\/(id-token|argument|user-not-found)/i.test(msg) ? 400 : 500;
    return bad(status, msg);
  }
}