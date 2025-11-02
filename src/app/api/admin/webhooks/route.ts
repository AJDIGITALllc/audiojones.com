// src/app/api/admin/webhooks/route.ts
import { adminAuth } from '@/lib/server/firebaseAdmin';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  // Your webhooks logic here
  return NextResponse.json({ message: 'Webhooks API endpoint.' });
}
