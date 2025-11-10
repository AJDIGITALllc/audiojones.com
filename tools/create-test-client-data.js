#!/usr/bin/env node

/**
 * Test Data Helper for Client Portal
 * 
 * This utility creates sample customer and event data in Firestore
 * for testing the Client Portal functionality.
 * 
 * Usage:
 *   npm run test-client-data
 *   or
 *   node tools/create-test-client-data.js
 */

import { getFirestore } from 'firebase-admin/firestore';
import { adminAuth } from '../src/lib/server/firebaseAdmin.js';

async function createTestClientData() {
  console.log('🔧 Creating test client data...');

  try {
    const db = getFirestore();

    // Test customer email
    const testEmail = 'test-client@audiojones.com';

    // Create sample customer data
    const customerData = {
      email: testEmail,
      status: 'active',
      service_id: 'audio-generation-pro',
      tier_id: 'premium',
      billing_sku: 'aj-pro-monthly',
      created_at: new Date('2024-01-15').toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Save customer to Firestore
    await db.collection('customers').doc(testEmail).set(customerData);
    console.log('✅ Created customer record for:', testEmail);

    // Create sample events
    const events = [
      {
        customer_email: testEmail,
        event_type: 'subscription_created',
        timestamp: new Date('2024-01-15').toISOString(),
        status: 'completed',
      },
      {
        customer_email: testEmail,
        event_type: 'payment_processed',
        timestamp: new Date('2024-02-15').toISOString(),
        status: 'completed',
      },
      {
        customer_email: testEmail,
        event_type: 'tier_upgraded',
        timestamp: new Date('2024-03-01').toISOString(),
        status: 'completed',
      },
      {
        customer_email: testEmail,
        event_type: 'audio_generated',
        timestamp: new Date('2024-03-15').toISOString(),
        status: 'completed',
      },
      {
        customer_email: testEmail,
        event_type: 'api_call',
        timestamp: new Date().toISOString(),
        status: 'completed',
      },
    ];

    // Save events to Firestore
    const batch = db.batch();
    events.forEach((eventData, index) => {
      const eventRef = db.collection('events').doc(`test-event-${index + 1}`);
      batch.set(eventRef, eventData);
    });

    await batch.commit();
    console.log('✅ Created', events.length, 'sample events');

    console.log('\n🎉 Test data created successfully!');
    console.log('\nYou can now test the Client Portal with:');
    console.log('1. Visit: http://localhost:3000/portal/client');
    console.log('2. Or test the API directly: GET /api/client/me?email=' + testEmail);
    console.log('\nCustomer data:');
    console.log(JSON.stringify(customerData, null, 2));

  } catch (error) {
    console.error('❌ Error creating test data:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createTestClientData();
}

export { createTestClientData };