#!/usr/bin/env tsx

/**
 * Debug Basecamp API Call
 */

import dotenv from "dotenv";
import fetch from "node-fetch";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

async function debugBasecampCall() {
  const accountId = process.env.BASECAMP_ACCOUNT_ID;
  const accessToken = process.env.BASECAMP_ACCESS_TOKEN;
  const userAgent = process.env.BASECAMP_USER_AGENT;

  console.log('🏕️  Debugging Basecamp API Call');
  console.log('================================');
  console.log(`Account ID: ${accountId}`);
  console.log(`User Agent: ${userAgent}`);
  console.log(`Token Length: ${accessToken?.length} characters`);
  console.log(`Token Preview: ${accessToken?.substring(0, 50)}...`);
  console.log(`Full Token: ${accessToken}`);
  console.log('');

  try {
    const url = `https://3.basecampapi.com/${accountId}/projects.json`;
    console.log(`Making request to: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': userAgent || 'AudioJonesApp (dev@audiojones.com)',
        'Content-Type': 'application/json',
      },
    });

    console.log(`Response Status: ${response.status} ${response.statusText}`);
    console.log('Response Headers:');
    response.headers.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });

    const responseText = await response.text();
    console.log('\nResponse Body:');
    console.log(responseText.substring(0, 500) + (responseText.length > 500 ? '...' : ''));

    if (response.ok) {
      console.log('\n✅ SUCCESS: Basecamp API call worked!');
    } else {
      console.log('\n❌ FAILED: Basecamp API call failed');
    }

  } catch (error) {
    console.error('❌ ERROR:', error);
  }
}

debugBasecampCall();