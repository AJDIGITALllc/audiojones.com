// Test admin key validation
const testKeys = [
  "wTd8JBx2OUHVjFNWePAXslhqSDtb6aIk",
  "verify-admin-access-12345"
];

const testEndpoints = [
  "https://audiojones.com/api/admin/stats",
  "https://audiojones.com/api/admin/sync"
];

async function testAdminAuth() {
  console.log("🔐 Testing Admin Authentication");
  
  for (const key of testKeys) {
    console.log(`\n🔑 Testing key: ${key.substring(0, 10)}...`);
    
    for (const endpoint of testEndpoints) {
      try {
        const response = await fetch(endpoint, {
          headers: {
            "X-Admin-Key": key
          }
        });
        
        console.log(`  ${endpoint}: ${response.status}`);
        
        if (response.status === 200) {
          const data = await response.text();
          console.log(`    ✅ Success: ${data.substring(0, 100)}...`);
        } else if (response.status === 401) {
          console.log(`    ❌ Unauthorized`);
        } else {
          console.log(`    ⚠️  Status: ${response.status}`);
        }
        
      } catch (error) {
        console.log(`    💥 Error: ${error.message}`);
      }
    }
  }
}

testAdminAuth();