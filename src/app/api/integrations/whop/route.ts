import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Check for required environment variable
  const whopApiKey = process.env.WHOP_API_KEY;
  if (!whopApiKey) {
    return NextResponse.json(
      { error: "WHOP_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    const payload = await req.json();
    
    // Log the payload to server console
    console.log('Whop webhook received:', {
      timestamp: new Date().toISOString(),
      payload
    });

    return NextResponse.json({ 
      ok: true, 
      received: payload
    });
    
  } catch (error: any) {
    console.error('Whop webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}