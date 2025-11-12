/**
 * Test script for the Audio Jones Event Consumer Example
 * 
 * Tests the complete webhook consumer implementation:
 * - HMAC signature generation and verification
 * - Event routing and handling  
 * - Error responses for invalid requests
 */

const crypto = require('crypto');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const CONSUMER_ENDPOINT = `${BASE_URL}/api/examples/event-consumer`;
const SECRET = 'test-secret-at-least-32-characters-long-for-security';

/**
 * Generate HMAC signature for webhook payload
 */
function generateSignature(body, secret, timestamp) {
  const message = `${timestamp}.${body}`;
  return crypto.createHmac('sha256', secret).update(message).digest('hex');
}

/**
 * Send a test webhook to the consumer
 */
async function sendTestWebhook(eventType, payload) {
  const timestamp = new Date().toISOString();
  const body = JSON.stringify(payload);
  const signature = generateSignature(body, SECRET, timestamp);
  
  console.log(`\n🧪 Testing ${eventType} event...`);
  console.log(`Timestamp: ${timestamp}`);
  console.log(`Payload: ${body}`);
  console.log(`Signature: sha256=${signature}`);
  
  try {
    const response = await fetch(CONSUMER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-AJ-Signature': `sha256=${signature}`,
        'X-AJ-Timestamp': timestamp,
        'X-AJ-Event': eventType
      },
      body: body
    });
    
    const responseData = await response.text();
    
    console.log(`Status: ${response.status}`);
    console.log(`Response: ${responseData}`);
    
    if (response.ok) {
      console.log('✅ Test passed');
    } else {
      console.log('❌ Test failed');
    }
    
    return { ok: response.ok, status: response.status, data: responseData };
    
  } catch (error) {
    console.log(`❌ Request failed: ${error.message}`);
    return { ok: false, error: error.message };
  }
}

/**
 * Test invalid signature
 */
async function testInvalidSignature() {
  const timestamp = new Date().toISOString();
  const body = JSON.stringify({ test: 'invalid signature' });
  
  console.log('\n🧪 Testing invalid signature...');
  
  try {
    const response = await fetch(CONSUMER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-AJ-Signature': 'sha256=invalid_signature_here',
        'X-AJ-Timestamp': timestamp,
        'X-AJ-Event': 'test_event'
      },
      body: body
    });
    
    const responseData = await response.text();
    console.log(`Status: ${response.status}`);
    console.log(`Response: ${responseData}`);
    
    if (response.status === 401) {
      console.log('✅ Correctly rejected invalid signature');
    } else {
      console.log('❌ Should have rejected invalid signature with 401');
    }
    
  } catch (error) {
    console.log(`❌ Request failed: ${error.message}`);
  }
}

/**
 * Test missing headers
 */
async function testMissingHeaders() {
  console.log('\n🧪 Testing missing headers...');
  
  try {
    const response = await fetch(CONSUMER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ test: 'missing headers' })
    });
    
    const responseData = await response.text();
    console.log(`Status: ${response.status}`);
    console.log(`Response: ${responseData}`);
    
    if (response.status === 401) {
      console.log('✅ Correctly rejected missing headers');
    } else {
      console.log('❌ Should have rejected missing headers with 401');
    }
    
  } catch (error) {
    console.log(`❌ Request failed: ${error.message}`);
  }
}

/**
 * Test GET endpoint (health check)
 */
async function testHealthCheck() {
  console.log('\n🧪 Testing health check (GET)...');
  
  try {
    const response = await fetch(CONSUMER_ENDPOINT, {
      method: 'GET'
    });
    
    const responseData = await response.text();
    console.log(`Status: ${response.status}`);
    console.log(`Response: ${responseData}`);
    
    if (response.ok) {
      console.log('✅ Health check passed');
    } else {
      console.log('❌ Health check failed');
    }
    
  } catch (error) {
    console.log(`❌ Health check failed: ${error.message}`);
  }
}

/**
 * Main test suite
 */
async function runTests() {
  console.log('🚀 Audio Jones Event Consumer Test Suite');
  console.log('==========================================');
  
  // Test 1: Health check
  await testHealthCheck();
  
  // Test 2: Valid status change event
  await sendTestWebhook('status_change', {
    from: 'operational',
    to: 'degraded',
    changed_at: new Date().toISOString(),
    reason: 'High latency detected'
  });
  
  // Test 3: Valid capacity alert event
  await sendTestWebhook('capacity_alert', {
    level: 'warning',
    hours: 72,
    mrr: 15000,
    threshold: 0.8,
    current_capacity: 0.85
  });
  
  // Test 4: Valid incident event
  await sendTestWebhook('incident_created', {
    id: 'inc_test_001',
    title: 'Test Incident',
    severity: 'medium',
    status: 'investigating',
    created_at: new Date().toISOString()
  });
  
  // Test 5: Valid subscription event
  await sendTestWebhook('whop_subscription_created', {
    customer_email: 'test@example.com',
    tier: 'professional',
    billing_sku: 'pro-monthly',
    timestamp: new Date().toISOString()
  });
  
  // Test 6: Unknown event type (should use misc handler)
  await sendTestWebhook('unknown_event_type', {
    custom_field: 'test data',
    timestamp: new Date().toISOString()
  });
  
  // Test 7: Invalid signature
  await testInvalidSignature();
  
  // Test 8: Missing headers
  await testMissingHeaders();
  
  console.log('\n✨ Test suite completed');
  console.log('\nNOTE: Make sure AJ_WEBHOOK_SHARED_SECRET is set to:');
  console.log(`"${SECRET}"`);
  console.log('\nOr update this test script to use your actual secret.');
}

// Run the tests
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests, generateSignature };