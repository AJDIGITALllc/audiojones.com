/**
 * Audio Jones Event Consumer Example
 * 
 * This is a complete example of how to consume events from the AJ unified event bus.
 * 
 * Features demonstrated:
 * - HMAC-SHA256 signature verification
 * - 5-minute timestamp window enforcement  
 * - Event type routing and handling
 * - Firestore storage with error handling
 * - Proper HTTP status codes for webhook reliability
 * 
 * Route: POST /api/examples/event-consumer
 * 
 * Expected headers:
 * - X-AJ-Signature: sha256=<hmac-hex>
 * - X-AJ-Timestamp: ISO timestamp  
 * - X-AJ-Event: event_type_name
 * 
 * Returns:
 * - 200: Event processed successfully
 * - 401: Invalid signature or missing headers
 * - 400: Invalid payload or event type
 * - 500: Internal processing error
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAjSignedRequest } from '@/lib/server/ajWebhookVerifier';
import { handleEvent, getSupportedEventTypes } from '@/lib/server/exampleEventHandlers';
import { hasSeenWebhook, markWebhookSeen } from '@/lib/server/idempotency';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  
  try {
    console.log('[event-consumer] Received webhook request');
    
    // Step 1: Verify the webhook signature and extract payload
    const verifyResult = await verifyAjSignedRequest(req);
    
    if (!verifyResult.ok) {
      console.error('[event-consumer] Verification failed:', verifyResult.error);
      return NextResponse.json(
        { 
          ok: false, 
          error: 'invalid_request',
          reason: verifyResult.error,
          message: 'Webhook signature verification failed'
        }, 
        { status: 401 }
      );
    }

    const { event, payload, timestamp } = verifyResult;
    
    console.log(`[event-consumer] Verified event: ${event} at ${timestamp}`);
    
    // Step 2: Check for idempotency to prevent duplicate processing
    const eventId = payload.id || payload.event_id || req.headers.get('x-aj-id') || randomUUID();
    
    if (await hasSeenWebhook(eventId)) {
      console.log(`[event-consumer] Duplicate webhook detected: ${eventId}`);
      return NextResponse.json({
        ok: true,
        duplicate: true,
        event_type: event,
        event_id: eventId,
        message: 'Event already processed'
      });
    }
    
    // Mark this event as seen before processing to prevent race conditions
    await markWebhookSeen(eventId);
    
    // Step 3: Validate event type (optional - handlers will fallback to misc)
    const supportedTypes = getSupportedEventTypes();
    const isKnownType = supportedTypes.includes(event!);
    
    if (!isKnownType) {
      console.log(`[event-consumer] Unknown event type: ${event}, will use misc handler`);
    }

    // Step 4: Process the event through appropriate handler
    try {
      await handleEvent(event!, payload, {
        event_type: event!,
        received_at: new Date().toISOString(),
        source: 'aj_event_bus'
      });
      
      const processingTime = Date.now() - startTime;
      
      console.log(`[event-consumer] Successfully processed ${event} in ${processingTime}ms`);
      
      return NextResponse.json({
        ok: true,
        event_id: eventId,
        event_type: event,
        processed_at: new Date().toISOString(),
        processing_time_ms: processingTime,
        known_event_type: isKnownType
      });
      
    } catch (handlerError) {
      console.error(`[event-consumer] Handler error for ${event}:`, handlerError);
      
      return NextResponse.json(
        {
          ok: false,
          error: 'processing_failed',
          event_type: event,
          message: handlerError instanceof Error ? handlerError.message : 'Unknown processing error'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    const processingTime = Date.now() - startTime;
    
    console.error('[event-consumer] Unexpected error:', error);
    
    return NextResponse.json(
      {
        ok: false,
        error: 'internal_error',
        message: 'Internal consumer error',
        processing_time_ms: processingTime
      },
      { status: 500 }
    );
  }
}

/**
 * GET handler for health check and information
 */
export async function GET() {
  const supportedTypes = getSupportedEventTypes();
  
  return NextResponse.json({
    name: 'AJ Event Consumer Example',
    status: 'ready',
    supported_event_types: supportedTypes,
    webhook_format: {
      method: 'POST',
      headers: {
        'X-AJ-Signature': 'sha256=<hmac-hex>',
        'X-AJ-Timestamp': '<iso-timestamp>',
        'X-AJ-Event': '<event-type>',
        'Content-Type': 'application/json'
      },
      body: '<json-payload>'
    },
    collections_used: [
      'aj_consumer_status',
      'aj_consumer_capacity', 
      'aj_consumer_incidents',
      'aj_consumer_subscriptions',
      'aj_consumer_misc',
      'aj_consumer_errors'
    ],
    timestamp: new Date().toISOString()
  });
}

/**
 * Method not allowed for other HTTP methods
 */
export async function PUT() {
  return NextResponse.json(
    { error: 'method_not_allowed', allowed: ['GET', 'POST'] },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'method_not_allowed', allowed: ['GET', 'POST'] },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: 'method_not_allowed', allowed: ['GET', 'POST'] },
    { status: 405 }
  );
}