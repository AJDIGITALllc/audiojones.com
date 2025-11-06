import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface AutomationMapping {
  whopProductId: string;
  mailerliteTag: string;
  epmStage: string;
}

interface WhopWebhookBody {
  event: string;
  email: string;
  productId: string;
}

export async function POST(req: Request) {
  // Check for required environment variable
  const apiKey = process.env.WHOP_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "WHOP_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    const body: WhopWebhookBody = await req.json();
    
    // Validate required fields
    if (!body.email || !body.productId) {
      return NextResponse.json(
        { error: "Missing required fields: email or productId" },
        { status: 400 }
      );
    }

    // Read automation mappings
    const mappingsPath = path.join(process.cwd(), 'src/config/automation-mappings.json');
    const mappingsData = fs.readFileSync(mappingsPath, 'utf-8');
    const mappings: AutomationMapping[] = JSON.parse(mappingsData);

    // Find matching product mapping
    const mapping = mappings.find(m => m.whopProductId === body.productId);
    if (!mapping) {
      return NextResponse.json({
        ok: false,
        reason: "unmapped productId",
        productId: body.productId
      });
    }

    // Simulate Whop API lookup
    let whopRes: Response | null = null;
    try {
      whopRes = await fetch("https://api.whop.com/v2/members", {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      });
    } catch (error) {
      console.error('Whop API request failed:', error);
      return NextResponse.json({
        ok: false,
        reason: "whop request failed"
      });
    }

    // Log successful processing
    console.log('Whop webhook processed:', {
      timestamp: new Date().toISOString(),
      event: body.event,
      email: body.email,
      productId: body.productId,
      mappedTo: mapping,
      whopApiStatus: whopRes?.status
    });

    return NextResponse.json({
      ok: true,
      received: body,
      mappedTo: {
        mailerliteTag: mapping.mailerliteTag,
        epmStage: mapping.epmStage,
      },
      whopApi: {
        attempted: true,
        status: whopRes?.status ?? null,
      },
    });
    
  } catch (error: any) {
    console.error('Whop webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Check for API key
  const apiKey = process.env.WHOP_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      ok: false,
      hasKey: false
    });
  }

  try {
    // Test Whop API connection
    const response = await fetch("https://api.whop.com/v2/members", {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    return NextResponse.json({
      ok: true,
      hasKey: true,
      status: response.status
    });

  } catch (error) {
    console.error('Whop API test failed:', error);
    return NextResponse.json({
      ok: false,
      hasKey: true,
      error: 'API request failed'
    });
  }
}