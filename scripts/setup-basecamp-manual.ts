#!/usr/bin/env tsx

/**
 * Basecamp Manual Token Setup
 * 
 * If you already have a Basecamp access token, this script helps you
 * add it to your environment and test the connection.
 */

import dotenv from "dotenv";
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

async function testBasecampConnection(accessToken: string): Promise<boolean> {
  try {
    const accountId = process.env.BASECAMP_ACCOUNT_ID;
    const userAgent = process.env.BASECAMP_USER_AGENT || 'AudioJonesApp (dev@audiojones.com)';

    const response = await fetch(`https://3.basecampapi.com/${accountId}/projects.json`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': userAgent,
      },
    });

    return response.ok;
  } catch (error) {
    return false;
  }
}

function updateEnvFile(accessToken: string, refreshToken?: string) {
  const envPath = resolve(process.cwd(), '.env.local');
  let envContent = readFileSync(envPath, 'utf-8');
  
  // Update access token
  envContent = envContent.replace(
    /^BASECAMP_ACCESS_TOKEN=.*$/m,
    `BASECAMP_ACCESS_TOKEN=${accessToken}`
  );
  
  // Update refresh token if provided
  if (refreshToken) {
    envContent = envContent.replace(
      /^BASECAMP_REFRESH_TOKEN=.*$/m,
      `BASECAMP_REFRESH_TOKEN=${refreshToken}`
    );
  }
  
  writeFileSync(envPath, envContent);
}

async function main() {
  console.log('🔑 Basecamp Manual Token Setup');
  console.log('===============================\n');

  // Check if we already have a token
  const currentToken = process.env.BASECAMP_ACCESS_TOKEN;
  if (currentToken) {
    console.log('✅ Found existing access token in .env.local');
    console.log('🧪 Testing current token...');
    
    const isValid = await testBasecampConnection(currentToken);
    if (isValid) {
      console.log('✅ Current token is valid and working!');
      console.log('📋 Run npm run verify:integrations to see full status');
      return;
    } else {
      console.log('❌ Current token is invalid or expired');
      console.log('💡 You can replace it by running this script with a new token\n');
    }
  } else {
    console.log('⚠️  No access token found in .env.local');
  }

  console.log('📝 To add a Basecamp access token manually:');
  console.log('1. Get your token from the OAuth flow or Basecamp developer console');
  console.log('2. Add it to your .env.local file:');
  console.log('   BASECAMP_ACCESS_TOKEN=your_access_token_here');
  console.log('3. Optionally add refresh token:');
  console.log('   BASECAMP_REFRESH_TOKEN=your_refresh_token_here');
  console.log('4. Run npm run verify:integrations to test\n');

  console.log('🔗 OAuth Setup Options:');
  console.log('• Production: npm run setup:basecamp');
  console.log('• Local dev:  npm run setup:basecamp:local');
  console.log('• Manual:     Edit .env.local directly\n');

  console.log('📋 Current Configuration:');
  console.log(`   Client ID: ${process.env.BASECAMP_CLIENT_ID}`);
  console.log(`   Account ID: ${process.env.BASECAMP_ACCOUNT_ID}`);
  console.log(`   User Agent: ${process.env.BASECAMP_USER_AGENT}`);
  console.log(`   Access Token: ${currentToken ? '***' + currentToken.slice(-8) : '(none)'}`);
}

main().catch(console.error);