// Quick test script to verify webhook logic locally
const { getTierByBillingSku } = require('./src/lib/getPricing.ts');

// Test simple payload (legacy format)
const simplePayload = {
  billing_sku: "personal-brand-t1-monthly",
  whop_user_id: "user_test123",
  email: "test@example.com",
  name: "Test User"
};

// Test event-based payload (modern format)
const eventPayload = {
  event: "payment.succeeded", 
  data: {
    id: "payment_abc123",
    billing_sku: "ai-automation-t2-monthly",
    user: {
      id: "user_test456",
      email: "test2@example.com",
      username: "testuser2"
    }
  }
};

// Test the billing SKU lookup
console.log("Testing billing SKU lookup:");
try {
  const tier1 = getTierByBillingSku("personal-brand-t1-monthly");
  console.log("✅ Found tier for personal-brand-t1-monthly:", tier1?.name);
  
  const tier2 = getTierByBillingSku("ai-automation-t2-monthly");
  console.log("✅ Found tier for ai-automation-t2-monthly:", tier2?.name);
  
  const invalid = getTierByBillingSku("invalid-sku");
  console.log("❌ Invalid SKU result:", invalid);
  
} catch (error) {
  console.error("Error testing getPricing:", error.message);
}

console.log("\nWebhook payloads would be processed as:");
console.log("Simple payload:", JSON.stringify(simplePayload, null, 2));
console.log("Event payload:", JSON.stringify(eventPayload, null, 2));