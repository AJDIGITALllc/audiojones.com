#!/usr/bin/env node

/**
 * Simple Test Script for Client Portal API
 * 
 * Tests the /api/client/me endpoint in development mode with email override
 */

const testClientAPI = async () => {
  const baseUrl = 'http://localhost:3000';
  const testEmail = 'test-client@audiojones.com';
  
  console.log('🧪 Testing Client Portal API...');
  console.log('Endpoint:', `${baseUrl}/api/client/me?email=${testEmail}`);
  
  try {
    const response = await fetch(`${baseUrl}/api/client/me?email=${testEmail}`, {
      headers: {
        'Authorization': 'Bearer test-token-dev-mode',
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:');
    console.log(JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ API test successful!');
    } else {
      console.log('❌ API test failed');
    }
    
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
};

testClientAPI();