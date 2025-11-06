import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Check for required environment variables
  const mailerliteToken = process.env.MAILERLITE_TOKEN;
  const webhookSecret = process.env.MAILERLITE_WEBHOOK_SECRET;

  if (!mailerliteToken) {
    return NextResponse.json(
      { error: "MAILERLITE_TOKEN not configured" },
      { status: 500 }
    );
  }

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "MAILERLITE_WEBHOOK_SECRET not configured" },
      { status: 401 }
    );
  }

  // Verify webhook secret (simple comparison for now)
  const providedSecret = req.headers.get('x-webhook-secret') || req.headers.get('authorization');
  if (providedSecret !== webhookSecret) {
    return NextResponse.json(
      { error: "Invalid webhook secret" },
      { status: 401 }
    );
  }

  try {
    const payload = await req.json();
    
    // Log the payload to server console
    console.log('MailerLite webhook received:', {
      timestamp: new Date().toISOString(),
      payload
    });

    return NextResponse.json({ ok: true });
    
  } catch (error: any) {
    console.error('MailerLite webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}