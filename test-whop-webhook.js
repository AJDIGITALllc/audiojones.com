// test-whop-webhook.js - Test script for Whop webhook with real data
const testSimplePayload = {
  billing_sku: "personal-brand-t1-monthly",
  whop_user_id: "user_test123",
  email: "test@audiojones.com",
  name: "Test User Simple"
};

const testEventPayload = {
  event: "payment.succeeded",
  data: {
    id: "payment_test123",
    billing_sku: "ai-automation-t2-monthly", 
    amount: 149700, // $1497 in cents
    currency: "usd",
    user: {
      id: "user_test456",
      email: "test2@audiojones.com",
      username: "testuser2"
    }
  }
};

async function testWebhook(payload, description) {
  console.log(`\n🧪 Testing: ${description}`);
  console.log("Payload:", JSON.stringify(payload, null, 2));
  
  try {
    const response = await fetch("https://audiojones.com/api/whop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });
    
    const result = await response.text();
    console.log(`✅ Status: ${response.status}`);
    console.log(`📄 Response: ${result}`);
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

async function runTests() {
  console.log("🚀 Testing Whop Webhook Integration");
  console.log("Webhook URL: https://audiojones.com/api/whop");
  console.log("Firebase Project: audiojoneswebsite");
  
  // Test 1: Simple legacy payload
  await testWebhook(testSimplePayload, "Simple Legacy Payload");
  
  // Wait a bit between tests
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 2: Event-based payload
  await testWebhook(testEventPayload, "Event-based Modern Payload");
  
  console.log("\n✨ Tests completed! Check Firebase Console for new records:");
  console.log("   📊 customers collection");
  console.log("   📋 subscription_events collection");
}

runTests();