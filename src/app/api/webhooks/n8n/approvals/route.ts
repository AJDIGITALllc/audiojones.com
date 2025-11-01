// src/app/api/webhooks/n8n/approvals/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // TODO: Implement webhook logic
  return NextResponse.json({
    message: "n8n approvals webhook received"
  });
}
