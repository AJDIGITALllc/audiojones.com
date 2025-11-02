// src/app/api/admin/system/route.ts
import { adminAuth } from '@/lib/server/firebaseAdmin';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  // Your system logic here
  return NextResponse.json({ message: 'System API endpoint.' });
}
