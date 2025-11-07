import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const headers = request.headers;
  
  return NextResponse.json({
    host: headers.get('host'),
    xForwardedHost: headers.get('x-forwarded-host'),
    xForwardedProto: headers.get('x-forwarded-proto'),
    userAgent: headers.get('user-agent'),
    origin: headers.get('origin'),
    referer: headers.get('referer'),
    timestamp: new Date().toISOString(),
  });
}