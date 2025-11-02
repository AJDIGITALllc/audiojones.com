// src/app/api/admin/approvals/route.ts
import { adminAuth } from '@/lib/server/firebaseAdmin';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  // Your approvals logic here
  return NextResponse.json({ message: 'Approvals API endpoint.' });
}
