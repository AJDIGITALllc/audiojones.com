// Simple POST test with minimal payload
console.log("Testing minimal POST to webhook...");

fetch("https://audiojones.com/api/whop", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    test: true,
    billing_sku: "personal-brand-t1-monthly"
  })
})
.then(response => {
  console.log(`Status: ${response.status}`);
  return response.text();
})
.then(result => {
  console.log(`Response: ${result}`);
})
.catch(error => {
  console.log(`Error: ${error.message}`);
});