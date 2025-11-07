#!/usr/bin/env tsx

/**
 * Basecamp OAuth 2 Local Development Setup Helper
 * 
 * This script helps you get an OAuth access token for Basecamp 4 integration
 * using localhost for development purposes.
 */

import dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

function generateBasecampAuthUrl(): string {
  const clientId = process.env.BASECAMP_CLIENT_ID;
  
  if (!clientId) {
    throw new Error('Missing BASECAMP_CLIENT_ID in environment');
  }

  // Use localhost for development
  const redirectUri = 'http://localhost:3000/api/basecamp/callback';

  const params = new URLSearchParams({
    type: 'web_server',
    client_id: clientId,
    redirect_uri: redirectUri,
    state: 'audio-jones-local-setup',
  });

  return `https://launchpad.37signals.com/authorization/new?${params.toString()}`;
}

async function main() {
  console.log('🏕️  Basecamp OAuth 2 Local Development Setup');
  console.log('===============================================\n');

  try {
    const authUrl = generateBasecampAuthUrl();
    
    console.log('📋 Local Development Configuration:');
    console.log(`   Client ID: ${process.env.BASECAMP_CLIENT_ID}`);
    console.log(`   Account ID: ${process.env.BASECAMP_ACCOUNT_ID}`);
    console.log(`   Local Redirect URI: http://localhost:3000/api/basecamp/callback\n`);
    
    console.log('⚠️  IMPORTANT: For this to work, you need to:');
    console.log('   1. Add http://localhost:3000/api/basecamp/callback to your');
    console.log('      Basecamp app\'s authorized redirect URIs in the 37signals console\n');
    
    console.log('🚀 Steps to Complete Local OAuth Setup:');
    console.log('1. Make sure your dev server is running: npm run dev');
    console.log('2. Add localhost redirect URI to your Basecamp app settings');
    console.log('3. Open this URL in your browser:');
    console.log(`   ${authUrl}\n`);
    console.log('4. Log in to your Basecamp account and authorize the app');
    console.log('5. You\'ll be redirected to localhost:3000');
    console.log('6. Check your terminal/server logs for the access tokens');
    console.log('7. Add the tokens to your .env.local file:\n');
    console.log('   BASECAMP_ACCESS_TOKEN=your_access_token_here');
    console.log('   BASECAMP_REFRESH_TOKEN=your_refresh_token_here\n');
    console.log('8. Run npm run verify:integrations to test the connection\n');
    
    console.log('💡 Alternatively, you can:');
    console.log('   - Use the production OAuth flow if you have access to the live site');
    console.log('   - Use ngrok to expose your local server with a public URL\n');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

main();