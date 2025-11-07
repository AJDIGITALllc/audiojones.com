import { NextRequest, NextResponse } from 'next/server';

/**
 * Basecamp OAuth 2 Callback Handler
 * 
 * This endpoint handles the OAuth callback from Basecamp and exchanges
 * the authorization code for an access token.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // Handle OAuth error
    if (error) {
      console.error('Basecamp OAuth error:', error);
      return NextResponse.json({ error: 'OAuth authorization failed' }, { status: 400 });
    }

    // Require authorization code
    if (!code) {
      return NextResponse.json({ error: 'Missing authorization code' }, { status: 400 });
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://launchpad.37signals.com/authorization/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': process.env.BASECAMP_USER_AGENT || 'AudioJonesApp (dev@audiojones.com)',
      },
      body: new URLSearchParams({
        type: 'web_server',
        client_id: process.env.BASECAMP_CLIENT_ID!,
        client_secret: process.env.BASECAMP_CLIENT_SECRET!,
        redirect_uri: request.nextUrl.origin + '/api/basecamp/callback',
        code,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token exchange failed:', errorText);
      return NextResponse.json({ error: 'Failed to exchange code for token' }, { status: 400 });
    }

    const tokenData = await tokenResponse.json();
    
    // Log the tokens (you'll need to manually add these to your .env.local)
    console.log('=== BASECAMP OAUTH SUCCESS ===');
    console.log('Access Token:', tokenData.access_token);
    console.log('Refresh Token:', tokenData.refresh_token);
    console.log('Expires In:', tokenData.expires_in);
    console.log('==============================');
    
    return NextResponse.json({
      success: true,
      message: 'OAuth successful! Check server logs for tokens to add to .env.local',
      tokens: {
        access_token: tokenData.access_token?.substring(0, 20) + '...',
        refresh_token: tokenData.refresh_token?.substring(0, 20) + '...',
        expires_in: tokenData.expires_in,
      }
    });

  } catch (error) {
    console.error('Basecamp OAuth callback error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}