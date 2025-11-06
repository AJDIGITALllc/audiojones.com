export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/integrations/whop
 * Handles Whop webhook events for purchases and memberships
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    console.log('Whop webhook received:', {
      timestamp: new Date().toISOString(),
      type: body.type || 'unknown',
      productId: body.product_id,
      customerEmail: body.customer?.email,
      // Log without exposing sensitive data
    });

    // TODO: Process Whop event
    // 1. Extract customer email and product ID
    // 2. Map product to MailerLite tag using automation-mappings.json
    // 3. Upsert subscriber in MailerLite
    // 4. Store sync event log

    return NextResponse.json({ 
      ok: true, 
      message: 'Whop event logged',
      processed: false // Will be true when fully implemented
    });
    
  } catch (error: any) {
    console.error('Whop webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    service: 'whop-integration',
    status: 'placeholder',
    endpoints: ['POST /api/integrations/whop']
  });
}