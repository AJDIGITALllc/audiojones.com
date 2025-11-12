/**
 * Status Webhook Test Script
 * 
 * Tests the status change webhook system by:
 * 1. Calling the status API endpoint
 * 2. Monitoring for status change events
 * 3. Verifying webhook triggers
 */

import fetch from 'node-fetch';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const STATUS_ENDPOINT = `${BASE_URL}/api/public/status`;

interface StatusResponse {
  ok: boolean;
  status: 'operational' | 'degraded' | 'outage' | 'unknown';
  incident_count: number;
  last_updated: string;
  source: string;
}

async function fetchStatus(): Promise<StatusResponse | null> {
  try {
    console.log(`🔍 Fetching status from ${STATUS_ENDPOINT}...`);
    
    const response = await fetch(STATUS_ENDPOINT, {
      method: 'GET',
      headers: {
        'User-Agent': 'StatusWebhookTester/1.0',
      },
    });

    if (!response.ok) {
      console.error(`❌ Status API returned ${response.status}: ${response.statusText}`);
      return null;
    }

    const data = await response.json() as StatusResponse;
    console.log(`📊 Current status: ${data.status} (${data.incident_count} incidents)`);
    
    return data;

  } catch (error) {
    console.error('❌ Error fetching status:', error);
    return null;
  }
}

async function testStatusWebhooks(): Promise<void> {
  console.log('🚀 Starting Status Webhook Test');
  console.log('================================');

  // Initial status check
  const initialStatus = await fetchStatus();
  if (!initialStatus) {
    console.error('❌ Failed to get initial status');
    return;
  }

  console.log(`\n⏱️  Initial status: ${initialStatus.status}`);
  console.log('⏳ Waiting 3 seconds before second check...');
  
  // Wait a moment
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Second status check (should trigger webhook if status changed)
  const secondStatus = await fetchStatus();
  if (!secondStatus) {
    console.error('❌ Failed to get second status');
    return;
  }

  console.log(`\n📈 Status comparison:`);
  console.log(`   Initial: ${initialStatus.status}`);
  console.log(`   Current: ${secondStatus.status}`);

  if (initialStatus.status === secondStatus.status) {
    console.log('✅ Status unchanged - no webhook should be triggered');
  } else {
    console.log('🔄 Status changed - webhook should be triggered!');
    console.log(`   Transition: ${initialStatus.status} → ${secondStatus.status}`);
  }

  // Additional checks to potentially trigger changes
  console.log('\n🔄 Performing additional status checks...');
  
  for (let i = 1; i <= 3; i++) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const checkStatus = await fetchStatus();
    if (checkStatus) {
      console.log(`   Check ${i}: ${checkStatus.status}`);
      
      if (checkStatus.status !== secondStatus.status) {
        console.log(`🎯 Status change detected in check ${i}!`);
      }
    }
  }

  console.log('\n📋 Test Summary:');
  console.log('================');
  console.log('✅ Status API calls completed');
  console.log('✅ Status comparisons performed');
  
  if (process.env.STATUS_WEBHOOK_URLS) {
    const webhookCount = process.env.STATUS_WEBHOOK_URLS.split(',').length;
    console.log(`✅ ${webhookCount} webhook URL(s) configured`);
    console.log('💡 Check webhook endpoints for received payloads');
  } else {
    console.log('⚠️  No STATUS_WEBHOOK_URLS configured - no external webhooks sent');
  }
  
  console.log('💡 Check Firestore collections:');
  console.log('   - status_events (for event logs)');
  console.log('   - status_state (for cached status)');
  
  console.log('\n🏁 Test completed!');
}

async function main(): Promise<void> {
  try {
    await testStatusWebhooks();
  } catch (error) {
    console.error('💥 Test failed with error:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Test interrupted by user');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Test terminated');
  process.exit(0);
});

// Run the test
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { testStatusWebhooks, fetchStatus };