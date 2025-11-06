import { NextRequest, NextResponse } from "next/server";
import { updateGoDaddyDNS } from "@/lib/integrations/godaddy";

interface DNSUpdateRequest {
  domain: string;
  subdomain: string;
  ip: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: DNSUpdateRequest = await req.json();
    const { domain, subdomain, ip } = body;

    // Validate required fields
    if (!domain || !subdomain || !ip) {
      return NextResponse.json(
        { error: "Missing required fields: domain, subdomain, ip" },
        { status: 400 }
      );
    }

    // Build GoDaddy DNS record payload
    const records = [
      {
        type: "A",
        name: subdomain,
        data: ip,
        ttl: 600
      }
    ];

    console.log(`[godaddy-api] Updating DNS for ${subdomain}.${domain} -> ${ip}`);

    // Update DNS via GoDaddy API
    const result = await updateGoDaddyDNS(domain, records);

    return NextResponse.json({
      ok: true,
      records,
      domain,
      subdomain,
      ip,
      result
    });

  } catch (error: any) {
    console.error('[godaddy-api] DNS update failed:', error);
    
    return NextResponse.json(
      { 
        error: "DNS update failed",
        message: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}