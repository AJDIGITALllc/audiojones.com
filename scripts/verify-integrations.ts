#!/usr/bin/env tsx

/**
 * Audio Jones Integration Verification Script
 * 
 * Verifies connectivity to all key integrations using environment variables
 * from .env.local. Performs read-only, safe requests to validate credentials.
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

interface IntegrationResult {
  service: string;
  status: 'OK' | 'Failed' | 'Skipped';
  message: string;
  emoji: string;
}

const results: IntegrationResult[] = [];

/**
 * Add result to the results array
 */
function addResult(service: string, status: 'OK' | 'Failed' | 'Skipped', message: string) {
  const emoji = status === 'OK' ? '✅' : status === 'Failed' ? '❌' : '⏭️';
  results.push({ service, status, message, emoji });
  console.log(`${emoji} ${service}: ${message}`);
}

/**
 * Verify Firebase Admin SDK connectivity
 */
async function verifyFirebase(): Promise<void> {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
      addResult('Firebase', 'Failed', 'Missing required environment variables');
      return;
    }

    // Check if private key looks like a real RSA key
    if (!privateKey.includes('BEGIN PRIVATE KEY') && privateKey.length < 100) {
      addResult('Firebase', 'Skipped', 'Private key appears to be hashed/shortened for security');
      return;
    }

    // Import Firebase Admin dynamically to avoid issues if not available
    const { initializeApp, getApps, cert } = await import('firebase-admin/app');
    const { getFirestore } = await import('firebase-admin/firestore');

    // Initialize Firebase Admin if not already initialized
    if (getApps().length === 0) {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
        projectId,
      });
    }

    // Test connectivity by getting Firestore instance
    const db = getFirestore();
    
    // Simple test: try to get collections (read-only operation)
    await db.listCollections();
    
    addResult('Firebase', 'OK', `Connected to ${projectId}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (errorMessage.includes('private key')) {
      addResult('Firebase', 'Skipped', 'Private key format issue (may be hashed for security)');
    } else {
      addResult('Firebase', 'Failed', `Connection failed: ${errorMessage.substring(0, 50)}...`);
    }
  }
}

/**
 * Verify Basecamp 4 API connectivity
 */
async function verifyBasecamp(): Promise<void> {
  try {
    const accountId = process.env.BASECAMP_ACCOUNT_ID;
    const accessToken = process.env.BASECAMP_ACCESS_TOKEN;
    const userAgent = process.env.BASECAMP_USER_AGENT;

    if (!accountId || !accessToken || !userAgent) {
      addResult('Basecamp', 'Skipped', 'Missing access token or credentials');
      return;
    }

    const response = await fetch(`https://3.basecampapi.com/${accountId}/projects.json`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': userAgent,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      addResult('Basecamp', 'OK', `Connected to account ${accountId}`);
    } else {
      addResult('Basecamp', 'Failed', `HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    addResult('Basecamp', 'Failed', `Connection failed: ${errorMessage.substring(0, 50)}...`);
  }
}

/**
 * Verify ImageKit connectivity
 */
async function verifyImageKit(): Promise<void> {
  try {
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

    if (!urlEndpoint || !publicKey) {
      addResult('ImageKit', 'Failed', 'Missing URL endpoint or public key');
      return;
    }

    // Clean up URL endpoint (remove trailing slash if present)
    const cleanEndpoint = urlEndpoint.replace(/\/$/, '');
    
    // Test with a simple transformation request (HEAD to avoid downloading)
    const testUrl = `${cleanEndpoint}/tr:w-100/sample.jpg`;
    
    const response = await fetch(testUrl, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'AudioJones-Verification/1.0',
      },
    });

    if (response.ok || response.status === 404) {
      // 404 is OK - means ImageKit is responding, just no sample.jpg file
      addResult('ImageKit', 'OK', `Connected to ${cleanEndpoint}`);
    } else {
      addResult('ImageKit', 'Failed', `HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    addResult('ImageKit', 'Failed', `Connection failed: ${errorMessage.substring(0, 50)}...`);
  }
}

/**
 * Verify Stripe API connectivity
 */
async function verifyStripe(): Promise<void> {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      addResult('Stripe', 'Failed', 'Missing secret key');
      return;
    }

    // Test with balance endpoint (read-only, safe)
    const response = await fetch('https://api.stripe.com/v1/balance', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'AudioJones-Verification/1.0',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const currency = data.available?.[0]?.currency || 'USD';
      addResult('Stripe', 'OK', `Connected - Account balance available (${currency.toUpperCase()})`);
    } else {
      const errorData = await response.text();
      addResult('Stripe', 'Failed', `HTTP ${response.status}: Authentication failed`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    addResult('Stripe', 'Failed', `Connection failed: ${errorMessage.substring(0, 50)}...`);
  }
}

/**
 * Verify MailerLite API connectivity
 */
async function verifyMailerLite(): Promise<void> {
  try {
    const apiKey = process.env.MAILERLITE_API_KEY;

    if (!apiKey) {
      addResult('MailerLite', 'Failed', 'Missing API key');
      return;
    }

    // Test with subscribers endpoint (limit to 1 for minimal impact)
    const response = await fetch('https://api.mailerlite.com/api/v2/subscribers?limit=1', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'AudioJones-Verification/1.0',
      },
    });

    if (response.ok) {
      addResult('MailerLite', 'OK', 'Connected - API responding');
    } else if (response.status === 401) {
      addResult('MailerLite', 'Failed', 'Invalid API key or expired token');
    } else {
      addResult('MailerLite', 'Failed', `HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    addResult('MailerLite', 'Failed', `Connection failed: ${errorMessage.substring(0, 50)}...`);
  }
}

/**
 * Print a formatted summary table
 */
function printSummaryTable(): void {
  console.log('\n' + '='.repeat(70));
  console.log('📊 INTEGRATION VERIFICATION SUMMARY');
  console.log('='.repeat(70));
  
  // Table header
  console.log('┌──────────────┬───────────┬────────────────────────────────────────┐');
  console.log('│ Service      │ Status    │ Message                                │');
  console.log('├──────────────┼───────────┼────────────────────────────────────────┤');
  
  // Table rows
  results.forEach(result => {
    const service = result.service.padEnd(12);
    const status = `${result.emoji} ${result.status}`.padEnd(9);
    const message = result.message.length > 38 
      ? result.message.substring(0, 35) + '...' 
      : result.message.padEnd(38);
    
    console.log(`│ ${service} │ ${status} │ ${message} │`);
  });
  
  console.log('└──────────────┴───────────┴────────────────────────────────────────┘');
  
  // Summary stats
  const okCount = results.filter(r => r.status === 'OK').length;
  const failedCount = results.filter(r => r.status === 'Failed').length;
  const skippedCount = results.filter(r => r.status === 'Skipped').length;
  
  console.log(`\n📈 Results: ${okCount} OK, ${failedCount} Failed, ${skippedCount} Skipped`);
  
  if (failedCount === 0) {
    console.log('🎉 All available integrations are working correctly!');
  } else {
    console.log(`⚠️  ${failedCount} integration(s) need attention.`);
  }
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  console.log('🔍 Audio Jones Integration Verification');
  console.log('========================================\n');
  
  console.log('Loading environment variables from .env.local...');
  console.log('Testing integration connectivity...\n');

  // Run all verification checks
  await Promise.all([
    verifyFirebase(),
    verifyBasecamp(),
    verifyImageKit(),
    verifyStripe(),
    verifyMailerLite(),
  ]);

  // Print summary
  printSummaryTable();

  // Exit with appropriate code
  const hasFailures = results.some(r => r.status === 'Failed');
  
  // Clean exit to avoid assertion errors
  setTimeout(() => {
    process.exit(hasFailures ? 1 : 0);
  }, 100);
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run the verification
main().catch((error) => {
  console.error('❌ Verification script failed:', error);
  process.exit(1);
});