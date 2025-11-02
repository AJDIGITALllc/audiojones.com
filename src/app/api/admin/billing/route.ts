// src/app/api/admin/billing/route.ts
import { adminAuth } from '@/lib/server/firebaseAdmin';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  // Your billing logic here
  return NextResponse.json({ message: 'Billing API endpoint.' });
}
