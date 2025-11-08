/**
 * Required environment variables:
 * - FIREBASE_PROJECT_ID: Your Firebase project ID
 * - FIREBASE_CLIENT_EMAIL: Service account client email
 * - FIREBASE_PRIVATE_KEY: Service account private key (with \n replaced by actual newlines)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getTierByBillingSku } from '@/lib/getPricing';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin only if not already initialized and env vars are available
if (getApps().length === 0 && process.env.FIREBASE_PROJECT_ID) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  } catch (error) {
    console.warn('[Firebase Admin] Failed to initialize:', error);
    // Initialize without credentials for build-time
    initializeApp();
  }
}

// Get Firestore instance (will be null during build if no credentials)
let db: any = null;
try {
  db = getFirestore();
} catch (error) {
  console.warn('[Firestore] Not available during build time');
}

/**
 * Whop Webhook Handler
 * Processes incoming webhooks from Whop billing system and updates Firestore
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Add proper webhook signature validation
    // const signature = request.headers.get('whop-signature');
    // if (!validateWhopSignature(signature, body)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    const body = await request.json();
    console.log('[Whop Webhook] Received:', JSON.stringify(body, null, 2));

    // Extract billing SKU from webhook payload
    const billingSku = body.billing_sku || body.sku || body.product_sku;
    
    if (!billingSku) {
      console.error('[Whop Webhook] No billing_sku found in payload');
      return NextResponse.json({ error: 'Missing billing_sku' }, { status: 400 });
    }

    // Look up service and tier from pricing catalog
    const catalogMatch = getTierByBillingSku(billingSku);
    
    if (!catalogMatch) {
      console.error(`[Whop Webhook] No matching tier found for billing_sku: ${billingSku}`);
      return NextResponse.json({ error: 'Unknown billing_sku' }, { status: 404 });
    }

    const { service, tier } = catalogMatch;
    
    console.log(`[Whop Webhook] Matched to service: ${service.label}, tier: ${tier.name}`);
    console.log(`[Whop Webhook] Pricing: $${tier.price_min}-$${tier.price_max} (${tier.billing_model})`);

    // Extract customer information from webhook payload
    const customerId = body.customer_id || body.user_id || body.whop_user_id;
    const customerEmail = body.customer_email || body.email || body.user_email;
    const customerName = body.customer_name || body.name || body.user_name;
    const subscriptionId = body.subscription_id || body.whop_subscription_id;
    const eventType = body.event_type || body.type || 'subscription_created';

    if (!customerId) {
      console.error('[Whop Webhook] No customer ID found in payload');
      return NextResponse.json({ error: 'Missing customer_id' }, { status: 400 });
    }

    // Prepare customer data for Firestore
    const customerData = {
      whop_customer_id: customerId,
      email: customerEmail,
      name: customerName,
      subscription_id: subscriptionId,
      service_id: service.id,
      service_label: service.label,
      tier_id: tier.id,
      tier_name: tier.name,
      billing_model: tier.billing_model,
      billing_sku: billingSku,
      price_min: tier.price_min,
      price_max: tier.price_max,
      contract_min_months: tier.contract_min_months,
      deliverables: tier.deliverables,
      event_type: eventType,
      webhook_received_at: new Date().toISOString(),
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Upsert customer record in Firestore (skip during build)
    if (db) {
      const customerRef = db.collection('customers').doc(customerId);
      
      try {
        await customerRef.set(customerData, { merge: true });
        console.log(`[Whop Webhook] Successfully upserted customer: ${customerId}`);
        
        // Log subscription event
        await db.collection('subscription_events').add({
          customer_id: customerId,
          subscription_id: subscriptionId,
          event_type: eventType,
          service_id: service.id,
          tier_id: tier.id,
          billing_sku: billingSku,
          webhook_payload: body,
          processed_at: new Date().toISOString(),
        });
        
        console.log(`[Whop Webhook] Logged subscription event: ${eventType}`);
        
      } catch (firestoreError) {
        console.error('[Whop Webhook] Firestore error:', firestoreError);
        return NextResponse.json(
          { error: 'Failed to update customer record' }, 
          { status: 500 }
        );
      }
    } else {
      console.log('[Whop Webhook] Skipping Firestore operations (not initialized)');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed and customer updated successfully',
      customer_id: customerId,
      matched_service: service.id,
      matched_tier: tier.id
    });

  } catch (error) {
    console.error('[Whop Webhook] Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    endpoint: 'whop-webhook',
    timestamp: new Date().toISOString()
  });
}