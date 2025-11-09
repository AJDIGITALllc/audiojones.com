// Test webhook with proper event-style payload
const https = require('https');

const eventPayload = {
  "type": "payment.succeeded",
  "id": "evt_test_123",
  "timestamp": "2025-01-10T16:45:00Z",
  "data": {
    "id": "payment_test_event_123",
    "billing_sku": "personal-brand-t1-monthly",
    "amount": 9700,
    "currency": "usd",
    "user": {
      "id": "user_event_test123",
      "email": "event-test@audiojones.com",
      "username": "eventuser123"
    }
  }
};

console.log("🧪 Testing Event-Style Webhook (with type field)");
console.log("Payload:", JSON.stringify(eventPayload, null, 2));

const postData = JSON.stringify(eventPayload);

const options = {
  hostname: 'audiojones.com',
  port: 443,
  path: '/api/whop',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log(`\n✅ Status: ${res.statusCode}`);
      console.log("📄 Response:", JSON.stringify(response, null, 2));
      
      if (response.mode === "event") {
        console.log("\n🎉 SUCCESS: Event-style payload detected and processed!");
        console.log(`📧 Email: ${response.email}`);
        console.log(`🏷️ SKU: ${response.sku}`);
      } else {
        console.log("\n⚠️ WARNING: Event payload fell through to simple mode");
      }
    } catch (err) {
      console.error("❌ JSON Parse Error:", err.message);
      console.log("Raw response:", data);
    }
  });
});

req.on('error', (err) => {
  console.error("❌ Request Error:", err.message);
});

req.write(postData);
req.end();