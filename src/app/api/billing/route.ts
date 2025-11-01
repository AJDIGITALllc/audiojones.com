// src/app/api/billing/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/server/firebaseAdmin';

export async function GET(req: NextRequest) {
  // TODO: Verify Firebase ID token
  return NextResponse.json({
    message: "Billing information"
  });
}
