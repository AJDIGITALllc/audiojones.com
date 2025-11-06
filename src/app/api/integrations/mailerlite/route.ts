export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/integrations/mailerlite
 * Handles MailerLite webhook events for subscriber actions
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    console.log('MailerLite webhook received:', {
      timestamp: new Date().toISOString(),
      type: body.type || 'unknown',
      subscriberEmail: body.data?.email,
      // Log without exposing sensitive data
    });

    // TODO: Process MailerLite event
    // 1. Validate webhook signature/secret
    // 2. Handle different event types (subscribe, unsubscribe, tag-added)
    // 3. Update local subscriber records
    // 4. Optional: Forward high-value events to Slack
    // 5. Store sync event log

    return NextResponse.json({ 
      ok: true, 
      message: 'MailerLite event logged',
      processed: false // Will be true when fully implemented
    });
    
  } catch (error: any) {
    console.error('MailerLite webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    service: 'mailerlite-integration',
    status: 'placeholder',
    endpoints: ['POST /api/integrations/mailerlite']
  });
}