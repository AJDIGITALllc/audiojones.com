// test-hardened-webhook.js
// Comprehensive test suite for the hardened Whop webhook

const crypto = require('crypto');

const WEBHOOK_URL = 'http://localhost:3000/api/whop';
const WEBHOOK_SECRET = 'whsec_production_grade_secret_key_2024';

function createWebhookSignature(payload, secret, timestamp) {
  const signedPayload = `${timestamp}.${payload}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload, 'utf8')
    .digest('hex');
  return `sha256=${signature}`;
}

async function testWebhook(testName, payload, options = {}) {
  console.log(`\n🧪 Testing: ${testName}`);
  
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const payloadString = JSON.stringify(payload);
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // Add signature if not testing signature failures
  if (!options.skipSignature) {
    headers['whop-signature'] = createWebhookSignature(payloadString, WEBHOOK_SECRET, timestamp);
    headers['whop-timestamp'] = timestamp;
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers,
      body: payloadString,
    });

    const result = await response.json();
    
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, JSON.stringify(result, null, 2));
    
    return { response, result };
  } catch (error) {
    console.error(`   Error:`, error.message);
    return { error };
  }
}

async function runTests() {
  console.log('🚀 Starting Hardened Webhook Test Suite\n');

  // Test 1: Valid event-based webhook
  await testWebhook('Valid Event Webhook', {
    id: 'evt_test_' + Date.now(),
    type: 'payment.succeeded',
    timestamp: new Date().toISOString(),
    data: {
      id: 'pay_test_123',
      user: {
        email: 'test-user@example.com'
      },
      product: {
        id: 'prod_basic_miami'
      },
      amount: 4999
    }
  });

  // Test 2: Valid simple webhook
  await testWebhook('Valid Simple Webhook', {
    user: {
      email: 'simple-test@example.com'
    },
    billing_sku: 'prod_basic_miami',
    status: 'active'
  });

  // Test 3: Invalid signature
  await testWebhook('Invalid Signature', {
    type: 'payment.succeeded',
    data: { user: { email: 'test@example.com' } }
  }, {
    headers: {
      'whop-signature': 'sha256=invalid_signature',
      'whop-timestamp': Math.floor(Date.now() / 1000).toString()
    },
    skipSignature: true
  });

  // Test 4: Missing signature
  await testWebhook('Missing Signature', {
    type: 'payment.succeeded',
    data: { user: { email: 'test@example.com' } }
  }, {
    skipSignature: true
  });

  // Test 5: Old timestamp (replay attack)
  const oldTimestamp = Math.floor((Date.now() - 10 * 60 * 1000) / 1000).toString(); // 10 minutes ago
  const oldPayload = JSON.stringify({ type: 'payment.succeeded', data: { user: { email: 'test@example.com' } } });
  
  await testWebhook('Old Timestamp (Replay Attack)', JSON.parse(oldPayload), {
    headers: {
      'whop-signature': createWebhookSignature(oldPayload, WEBHOOK_SECRET, oldTimestamp),
      'whop-timestamp': oldTimestamp
    },
    skipSignature: true
  });

  // Test 6: Invalid JSON
  console.log('\n🧪 Testing: Invalid JSON');
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'whop-signature': 'sha256=invalid',
        'whop-timestamp': Math.floor(Date.now() / 1000).toString()
      },
      body: 'invalid json{',
    });
    
    const result = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(`   Error:`, error.message);
  }

  // Test 7: Rate limiting (send multiple requests quickly)
  console.log('\n🧪 Testing: Rate Limiting');
  const promises = [];
  for (let i = 0; i < 65; i++) { // Exceed 60 req/min limit
    promises.push(testWebhook(`Rate Limit Test ${i + 1}`, {
      type: 'test.event',
      data: { sequence: i }
    }));
  }
  
  const results = await Promise.all(promises);
  const rateLimited = results.filter(r => r.response?.status === 429);
  console.log(`   Rate limited requests: ${rateLimited.length}/65`);

  console.log('\n✅ Test Suite Complete!');
}

// Health check first
async function healthCheck() {
  console.log('🏥 Performing health check...');
  try {
    const response = await fetch(WEBHOOK_URL, { method: 'GET' });
    const result = await response.json();
    console.log(`   Health check: ${response.status} - ${JSON.stringify(result)}`);
    return response.ok;
  } catch (error) {
    console.error('   Health check failed:', error.message);
    console.log('   Waiting 3 seconds and retrying...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    try {
      const retryResponse = await fetch(WEBHOOK_URL, { method: 'GET' });
      const retryResult = await retryResponse.json();
      console.log(`   Retry health check: ${retryResponse.status} - ${JSON.stringify(retryResult)}`);
      return retryResponse.ok;
    } catch (retryError) {
      console.error('   Retry failed:', retryError.message);
      return false;
    }
  }
}

// Run tests
healthCheck().then(healthy => {
  if (healthy) {
    runTests().catch(console.error);
  } else {
    console.error('❌ Server not healthy, skipping tests');
  }
});