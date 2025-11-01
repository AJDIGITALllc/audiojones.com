// src/app/api/webhooks/gbu/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // TODO: Implement webhook logic
  return NextResponse.json({
    message: "GBU webhook received"
  });
}
