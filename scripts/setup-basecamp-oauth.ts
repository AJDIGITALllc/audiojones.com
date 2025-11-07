#!/usr/bin/env tsx

/**
 * Basecamp OAuth 2 Setup Helper
 * 
 * This script helps you get an OAuth access token for Basecamp 4 integration.
 * It will generate the authorization URL and guide you through the process.
 */

import dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

function generateBasecampAuthUrl(): string {
  const clientId = process.env.BASECAMP_CLIENT_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  
  if (!clientId || !siteUrl) {
    throw new Error('Missing BASECAMP_CLIENT_ID or NEXT_PUBLIC_SITE_URL in environment');
  }

  const params = new URLSearchParams({
    type: 'web_server',
    client_id: clientId,
    redirect_uri: `${siteUrl}/api/basecamp/callback`,
    state: 'audio-jones-setup', // Optional state parameter
  });

  return `https://launchpad.37signals.com/authorization/new?${params.toString()}`;
}

async function main() {
  console.log('🏕️  Basecamp OAuth 2 Setup Helper');
  console.log('=====================================\n');

  try {
    const authUrl = generateBasecampAuthUrl();
    
    console.log('📋 Current Configuration:');
    console.log(`   Client ID: ${process.env.BASECAMP_CLIENT_ID}`);
    console.log(`   Account ID: ${process.env.BASECAMP_ACCOUNT_ID}`);
    console.log(`   Redirect URI: ${process.env.NEXT_PUBLIC_SITE_URL}/api/basecamp/callback\n`);
    
    console.log('🚀 Steps to Complete OAuth Setup:');
    console.log('1. Make sure your dev server is running: npm run dev');
    console.log('2. Open this URL in your browser:');
    console.log(`   ${authUrl}\n`);
    console.log('3. Log in to your Basecamp account and authorize the app');
    console.log('4. You\'ll be redirected to the callback URL');
    console.log('5. Check your terminal/server logs for the access tokens');
    console.log('6. Add the tokens to your .env.local file:\n');
    console.log('   BASECAMP_ACCESS_TOKEN=your_access_token_here');
    console.log('   BASECAMP_REFRESH_TOKEN=your_refresh_token_here\n');
    console.log('7. Run npm run verify:integrations to test the connection\n');
    
    console.log('💡 Note: The access token will be printed in your server logs');
    console.log('   for security reasons (not displayed in the browser).\n');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

main();