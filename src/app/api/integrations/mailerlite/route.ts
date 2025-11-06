import { NextResponse } from "next/server";

interface MailerLiteRequestBody {
  email: string;
  name?: string;
  source?: string;
  tag?: string;
}

export async function POST(req: Request) {
  // Check for required environment variable
  const token = process.env.MAILERLITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "MAILERLITE_TOKEN not configured" },
      { status: 500 }
    );
  }

  try {
    const body: MailerLiteRequestBody = await req.json();
    
    // Validate required fields
    if (!body.email) {
      return NextResponse.json(
        { error: "Missing required field: email" },
        { status: 400 }
      );
    }

    // Prepare MailerLite subscriber data
    const subscriberData: any = {
      email: body.email,
    };

    // Add optional fields
    if (body.name) {
      subscriberData.name = body.name;
    }

    if (body.source) {
      subscriberData.fields = {
        source: body.source
      };
    }

    // Make request to MailerLite API
    try {
      const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriberData),
      });

      const data = await mlRes.json().catch(() => null);

      // Handle specific status codes
      if (mlRes.status === 409) {
        return NextResponse.json({
          ok: true,
          email: body.email,
          tag: body.tag,
          already: true
        });
      }

      return NextResponse.json({
        ok: mlRes.ok,
        status: mlRes.status,
        email: body.email,
        tag: body.tag,
        data,
      });

    } catch (err) {
      console.error('MailerLite API request failed:', err);
      return NextResponse.json({
        ok: false,
        error: "mailerlite request failed",
        detail: (err as Error).message,
      });
    }
    
  } catch (error: any) {
    console.error('MailerLite webhook processing error:', error);
    return NextResponse.json(
      { error: 'Request processing failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Check for API token
  const token = process.env.MAILERLITE_TOKEN;
  if (!token) {
    return NextResponse.json({
      ok: false,
      hasToken: false
    });
  }

  return NextResponse.json({
    ok: true,
    hasToken: true,
    note: "Token present. POST to this endpoint with { email } to upsert subscriber."
  });
}