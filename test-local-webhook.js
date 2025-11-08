// test-local-webhook.js - Test local webhook with PowerShell
const testPayload = {
  billing_sku: "personal-brand-t1-monthly",
  whop_user_id: "user_test123",
  email: "test@audiojones.com",
  name: "Test User Local"
};

console.log("Testing local webhook...");
console.log("Payload:", JSON.stringify(testPayload, null, 2));

fetch("http://localhost:3000/api/whop", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(testPayload)
})
.then(response => {
  console.log(`Status: ${response.status}`);
  return response.text();
})
.then(result => {
  console.log(`Response: ${result}`);
  console.log("✅ Test completed!");
})
.catch(error => {
  console.log(`❌ Error: ${error.message}`);
});