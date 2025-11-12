/**
 * Status System Test Script
 * 
 * Validates the public status page and incident feed endpoints.
 * Run this after deployment to verify functionality.
 */

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://audiojones.com' 
  : 'http://localhost:3000';

/**
 * Test the public incidents API
 */
async function testPublicIncidentsAPI() {
  console.log('🔍 Testing /api/public/incidents endpoint...');
  
  try {
    const response = await fetch(`${BASE_URL}/api/public/incidents`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Validate response structure
    if (!data.ok) {
      throw new Error('Response missing ok:true');
    }
    
    if (!Array.isArray(data.incidents)) {
      throw new Error('Response missing incidents array');
    }
    
    console.log('✅ Public incidents API working');
    console.log(`   - Returned ${data.incidents.length} incidents`);
    console.log(`   - Response timestamp: ${data.timestamp}`);
    
    // Test with query parameters
    const filteredResponse = await fetch(`${BASE_URL}/api/public/incidents?status=open&limit=5`);
    if (filteredResponse.ok) {
      const filteredData = await filteredResponse.json();
      console.log(`   - Filtered query returned ${filteredData.incidents.length} incidents`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Public incidents API failed:', error.message);
    return false;
  }
}

/**
 * Test the original incidents API (should also work)
 */
async function testOriginalIncidentsAPI() {
  console.log('🔍 Testing /api/incidents endpoint...');
  
  try {
    const response = await fetch(`${BASE_URL}/api/incidents`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.ok || !Array.isArray(data.incidents)) {
      throw new Error('Invalid response structure');
    }
    
    console.log('✅ Original incidents API working');
    console.log(`   - Returned ${data.incidents.length} incidents`);
    
    return true;
  } catch (error) {
    console.error('❌ Original incidents API failed:', error.message);
    return false;
  }
}

/**
 * Test the status page (HTML)
 */
async function testStatusPage() {
  console.log('🔍 Testing /status page...');
  
  try {
    const response = await fetch(`${BASE_URL}/status`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Basic HTML validation
    if (!html.includes('<title>') || !html.includes('System Status')) {
      throw new Error('Status page missing expected content');
    }
    
    console.log('✅ Status page loads successfully');
    console.log(`   - Content length: ${html.length} characters`);
    
    return true;
  } catch (error) {
    console.error('❌ Status page failed:', error.message);
    return false;
  }
}

/**
 * Test incident data structure
 */
async function testIncidentDataStructure() {
  console.log('🔍 Testing incident data structure...');
  
  try {
    const response = await fetch(`${BASE_URL}/api/incidents`);
    const data = await response.json();
    
    if (data.incidents.length > 0) {
      const incident = data.incidents[0];
      
      // Validate required fields
      const requiredFields = ['id', 'title', 'status'];
      for (const field of requiredFields) {
        if (!incident[field]) {
          throw new Error(`Incident missing required field: ${field}`);
        }
      }
      
      // Validate status enum
      const validStatuses = ['open', 'investigating', 'monitoring', 'resolved'];
      if (!validStatuses.includes(incident.status)) {
        throw new Error(`Invalid status: ${incident.status}`);
      }
      
      // Check for admin-only fields (should not be present)
      const adminOnlyFields = ['admin_notes', 'runbooks', 'internal_metadata', 'actor'];
      for (const field of adminOnlyFields) {
        if (incident[field] !== undefined) {
          throw new Error(`Incident contains admin-only field: ${field}`);
        }
      }
      
      console.log('✅ Incident data structure valid');
      console.log(`   - Sample incident: ${incident.title} (${incident.status})`);
    } else {
      console.log('✅ No incidents to validate (empty feed)');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Incident data structure test failed:', error.message);
    return false;
  }
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log(`\n🚀 Starting status system tests for ${BASE_URL}\n`);
  
  const tests = [
    testOriginalIncidentsAPI,
    testPublicIncidentsAPI,
    testStatusPage,
    testIncidentDataStructure,
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    const result = await test();
    if (result) {
      passed++;
    } else {
      failed++;
    }
    console.log(''); // Add spacing
  }
  
  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
  
  if (failed > 0) {
    console.log('❌ Some tests failed - check deployment');
    process.exit(1);
  } else {
    console.log('✅ All tests passed - status system is working!');
    process.exit(0);
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runAllTests().catch(error => {
    console.error('💥 Test runner crashed:', error);
    process.exit(1);
  });
}

module.exports = {
  testPublicIncidentsAPI,
  testOriginalIncidentsAPI,
  testStatusPage,
  testIncidentDataStructure,
  runAllTests,
};