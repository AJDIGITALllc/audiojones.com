// simple-webhook-test.js
// Simple test to verify webhook is accessible

async function simpleTest() {
  try {
    console.log('Testing webhook endpoint...');
    
    // Test GET request first
    const getResponse = await fetch('http://localhost:3000/api/whop');
    console.log('GET Status:', getResponse.status);
    const getResult = await getResponse.json();
    console.log('GET Response:', getResult);
    
    // Test simple POST
    const postResponse = await fetch('http://localhost:3000/api/whop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: true })
    });
    
    console.log('POST Status:', postResponse.status);
    const postResult = await postResponse.json();
    console.log('POST Response:', postResult);
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

simpleTest();