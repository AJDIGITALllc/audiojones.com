// src/app/api/webhooks/n8n/projects/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // TODO: Implement webhook logic
  return NextResponse.json({
    message: "n8n projects webhook received"
  });
}
