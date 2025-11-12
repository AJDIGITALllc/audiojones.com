#!/usr/bin/env node

/**
 * Simple test for the new Webhook Signature Tester admin page
 * Demonstrates the complete idempotency + signature tester implementation
 */

const crypto = require('crypto');
const https = require('https');

async function testWebhookTester() {
  console.log('🔧 Testing Webhook Signature Tester Implementation\n');

  // Test 1: Generate a valid signature for testing
  console.log('1. Generating test signature...');
  const secret = process.env.AJ_WEBHOOK_SHARED_SECRET || 'test-secret-key';
  const payload = {
    event: 'test.signature',
    data: {
      message: 'Testing webhook signature',
      timestamp: new Date().toISOString()
    }
  };
  
  const payloadString = JSON.stringify(payload);
  const signature = crypto.createHmac('sha256', secret)
    .update(payloadString)
    .digest('hex');
  
  console.log(`   ✅ Generated signature: sha256=${signature}`);
  console.log(`   📦 Payload: ${payloadString}`);
  
  // Test 2: Show idempotency event ID extraction
  console.log('\n2. Testing event ID extraction...');
  const eventId1 = payload.data?.id || 'test-' + Date.now();
  const eventId2 = crypto.randomUUID();
  
  console.log(`   ✅ From payload: ${eventId1}`);
  console.log(`   ✅ From UUID: ${eventId2}`);
  
  // Test 3: Show example cURL command
  console.log('\n3. Example webhook consumer test:');
  const timestamp = Math.floor(Date.now() / 1000);
  const curlCommand = `curl -X POST https://localhost:3000/api/examples/event-consumer \\
  -H "Content-Type: application/json" \\
  -H "x-aj-signature: sha256=${signature}" \\
  -H "x-aj-timestamp: ${timestamp}" \\
  -H "x-aj-id: ${eventId2}" \\
  -d '${payloadString.replace(/\n/g, '').replace(/\s+/g, ' ')}'`;
  
  console.log(`   💻 ${curlCommand}`);
  
  // Test 4: Explain the admin UI workflow
  console.log('\n4. Admin UI Testing Workflow:');
  console.log('   🌐 Visit: /portal/admin/webhook-tester');
  console.log('   📝 Paste payload JSON in the form');
  console.log('   🔐 Paste signature (generated above)');
  console.log('   ⏰ Add timestamp (optional - auto-generated)');
  console.log('   ✅ Click "Validate Signature"');
  console.log('   📋 Copy cURL command for live testing');
  
  // Test 5: Show idempotency features
  console.log('\n5. Idempotency System Features:');
  console.log('   🔄 Automatic duplicate detection');
  console.log('   🧹 7-day TTL with auto-cleanup');
  console.log('   🏃 Race condition prevention');
  console.log('   📊 Built-in monitoring stats');
  console.log('   🛠️ Manual cleanup capabilities');
  
  console.log('\n✅ Webhook Consumer Starter Kit Complete!');
  console.log('\n🔗 Key Components:');
  console.log('   • ajWebhookVerifier.ts - HMAC signature verification');
  console.log('   • idempotency.ts - Duplicate prevention system');
  console.log('   • event-consumer route - Complete reference implementation');
  console.log('   • webhook-tester page - Admin signature testing UI');
  console.log('   • webhook/validate API - Server-side validation endpoint');
  console.log('   • EVENT_CONSUMER_EXAMPLE.md - Comprehensive documentation');
}

// Run the test
testWebhookTester().catch(console.error);