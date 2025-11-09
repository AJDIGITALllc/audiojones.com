// test-production-webhook.js
// Test the production hardened webhook

const crypto = require('crypto');

const WEBHOOK_URL = 'https://audiojones.com/api/whop';
const WEBHOOK_SECRET = 'whsec_production_grade_secret_key_2024';

function createWebhookSignature(payload, secret, timestamp) {
  const signedPayload = `${timestamp}.${payload}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload, 'utf8')
    .digest('hex');
  return `sha256=${signature}`;
}

async function testProductionWebhook() {
  console.log('🚀 Testing Production Hardened Webhook\n');

  // Test 1: Health check
  console.log('🏥 Health Check');
  try {
    const response = await fetch(WEBHOOK_URL, { method: 'GET' });
    const result = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(`   Error:`, error.message);
  }

  // Test 2: Valid webhook with signature
  console.log('\n🔒 Valid Signed Webhook');
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const payload = JSON.stringify({
    id: 'evt_hardened_test_' + Date.now(),
    type: 'payment.succeeded',
    timestamp: new Date().toISOString(),
    data: {
      id: 'pay_hardened_123',
      user: { email: 'hardened-test@audiojones.com' },
      product: { id: 'prod_basic_miami' },
      amount: 4999
    }
  });

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'whop-signature': createWebhookSignature(payload, WEBHOOK_SECRET, timestamp),
        'whop-timestamp': timestamp,
      },
      body: payload,
    });

    const result = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(`   Error:`, error.message);
  }

  // Test 3: Invalid signature (should fail)
  console.log('\n❌ Invalid Signature Test');
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'whop-signature': 'sha256=invalid_signature_test',
        'whop-timestamp': Math.floor(Date.now() / 1000).toString(),
      },
      body: JSON.stringify({ type: 'test.invalid_signature' }),
    });

    const result = await response.json();
    console.log(`   Status: ${response.status} (should be 401)`);
    console.log(`   Response:`, JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(`   Error:`, error.message);
  }

  // Test 4: Missing signature (should fail)
  console.log('\n❌ Missing Signature Test');
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'test.missing_signature' }),
    });

    const result = await response.json();
    console.log(`   Status: ${response.status} (should be 401)`);
    console.log(`   Response:`, JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(`   Error:`, error.message);
  }

  console.log('\n✅ Production Webhook Hardening Test Complete!');
}

testProductionWebhook().catch(console.error);