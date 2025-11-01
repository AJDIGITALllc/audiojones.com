// src/app/api/projects/[id]/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/server/firebaseAdmin';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  // TODO: Verify Firebase ID token
  return NextResponse.json({
    message: `Project details for ${params.id}`
  });
}
