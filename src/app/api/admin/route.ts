// src/app/api/admin/route.ts
import { adminAuth } from '@/lib/server/firebaseAdmin';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  // Your admin logic here
  return NextResponse.json({ message: 'Welcome to the admin API!' });
}
