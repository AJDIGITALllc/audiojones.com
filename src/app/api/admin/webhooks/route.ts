export const runtime = 'nodejs';

import { adminAuth } from '@/lib/server/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Add authentication and authorization check
  return NextResponse.json({ message: 'Admin Webhooks API' });
}
