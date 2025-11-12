/**
 * Simple Status Webhook Test (JavaScript version)
 * 
 * Quick test script that can be run with node directly
 */

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const STATUS_ENDPOINT = `${BASE_URL}/api/public/status`;

async function testStatusWebhooks() {
  console.log('🚀 Starting Status Webhook Test');
  console.log('================================');

  try {
    // First status check
    console.log(`🔍 Calling ${STATUS_ENDPOINT}...`);
    const response1 = await fetch(STATUS_ENDPOINT);
    const status1 = await response1.json();
    
    console.log(`📊 Initial status: ${status1.status} (${status1.incident_count} incidents)`);
    
    // Wait and check again
    console.log('⏳ Waiting 3 seconds...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const response2 = await fetch(STATUS_ENDPOINT);
    const status2 = await response2.json();
    
    console.log(`📊 Second status: ${status2.status} (${status2.incident_count} incidents)`);
    
    if (status1.status !== status2.status) {
      console.log('🔄 Status changed! Webhook should have been triggered.');
      console.log(`   Transition: ${status1.status} → ${status2.status}`);
    } else {
      console.log('✅ Status unchanged - no webhook triggered');
    }
    
    // Show webhook configuration
    if (process.env.STATUS_WEBHOOK_URLS) {
      const urls = process.env.STATUS_WEBHOOK_URLS.split(',');
      console.log(`💌 ${urls.length} webhook URL(s) configured:`);
      urls.forEach((url, i) => console.log(`   ${i + 1}. ${url.trim()}`));
    } else {
      console.log('⚠️  No STATUS_WEBHOOK_URLS configured');
    }
    
    console.log('\n🏁 Test completed!');
    console.log('💡 Check your webhook endpoints and Firestore collections');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testStatusWebhooks();