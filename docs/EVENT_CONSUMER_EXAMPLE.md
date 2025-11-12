# Audio Jones Event Consumer Example

This guide shows how to build a reliable webhook consumer for the Audio Jones unified event bus. The example demonstrates all the essential patterns for receiving, verifying, and processing events from the AJ ecosystem.

## Quick Start

### 1. Set Up Your Consumer Endpoint

```typescript
// src/app/api/my-consumer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyAjSignedRequest } from '@/lib/server/ajWebhookVerifier';

export async function POST(req: NextRequest) {
  // Verify the webhook signature
  const result = await verifyAjSignedRequest(req);
  
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }
  
  // Process the event
  const { event, payload } = result;
  console.log(`Received ${event}:`, payload);
  
  return NextResponse.json({ ok: true });
}
```

### 2. Configure Your Secret

Add to your `.env.local`:
```bash
AJ_WEBHOOK_SHARED_SECRET=your-32-character-or-longer-secret-key
```

### 3. Register Your Endpoint

Visit the AJ Admin Portal → Status Webhooks → Add Target:
- URL: `https://yourservice.com/api/my-consumer`
- Secret: Same as your `AJ_WEBHOOK_SHARED_SECRET`
- Events: Select the events you want to receive

## Complete Working Example

The Audio Jones codebase includes a complete reference implementation at:

**API Route:** `/api/examples/event-consumer`  
**Source:** `src/app/api/examples/event-consumer/route.ts`

### Test the Example

```bash
# Check if the example consumer is running
curl https://audiojones.com/api/examples/event-consumer

# Expected response shows supported event types and format info
```

## Event Types & Payloads

### Status Change Events
```json
{
  "event": "status_change",
  "from": "operational",
  "to": "degraded", 
  "changed_at": "2024-01-15T10:30:00Z",
  "reason": "High latency detected"
}
```

### Capacity Alerts
```json
{
  "event": "capacity_alert",
  "level": "warning",
  "hours": 72,
  "mrr": 15000,
  "threshold": 0.8,
  "current_capacity": 0.85
}
```

### Incident Events
```json
{
  "event": "incident_created", 
  "id": "inc_2024_001",
  "title": "Database Connection Issues",
  "severity": "high",
  "status": "investigating",
  "created_at": "2024-01-15T11:00:00Z"
}
```

### Subscription Events
```json
{
  "event": "whop_subscription_created",
  "customer_email": "user@example.com",
  "tier": "professional",
  "billing_sku": "pro-monthly",
  "timestamp": "2024-01-15T12:00:00Z"
}
```

## Security Implementation

### Webhook Verification

Every AJ webhook includes these headers:
```
X-AJ-Signature: sha256=<hmac-hex>
X-AJ-Timestamp: 2024-01-15T10:30:00Z  
X-AJ-Event: status_change
Content-Type: application/json
```

The signature is computed as:
```typescript
const message = `${timestamp}.${jsonBody}`;
const signature = crypto
  .createHmac('sha256', secret)
  .update(message)
  .digest('hex');
```

### Timestamp Window

Webhooks are only valid within a 5-minute window. This prevents replay attacks and ensures freshness.

### Constant-Time Comparison

The verifier uses `crypto.timingSafeEqual()` to prevent timing attacks when comparing signatures.

## Implementation Patterns

### 1. Basic Verification

```typescript
import { verifyAjSignedRequest } from '@/lib/server/ajWebhookVerifier';

export async function POST(req: NextRequest) {
  const result = await verifyAjSignedRequest(req);
  
  if (!result.ok) {
    console.error('Webhook verification failed:', result.error);
    return NextResponse.json({ error: result.error }, { status: 401 });
  }
  
  // Process result.event and result.payload
}
```

### 2. Event Type Routing

```typescript
import { handleEvent } from '@/lib/server/exampleEventHandlers';

export async function POST(req: NextRequest) {
  const result = await verifyAjSignedRequest(req);
  if (!result.ok) return /* error response */;
  
  try {
    await handleEvent(result.event!, result.payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'processing_failed' }, { status: 500 });
  }
}
```

### 3. Custom Event Handlers

```typescript
// src/lib/myEventHandlers.ts
export const myHandlers: Record<string, (payload: any) => Promise<void>> = {
  'status_change': async (payload) => {
    // Update your service status
    await updateServiceStatus(payload.to);
  },
  
  'capacity_alert': async (payload) => {
    // Scale your infrastructure
    if (payload.level === 'critical') {
      await triggerAutoScaling();
    }
  },
  
  'incident_created': async (payload) => {
    // Create ticket in your system
    await createJiraTicket(payload);
  }
};
```

### 4. Idempotency & Retries

AJ will retry failed webhooks (4xx/5xx responses). Use the built-in idempotency system to prevent duplicate processing:

```typescript
import { hasSeenWebhook, markWebhookSeen } from '@/lib/server/idempotency';

export async function POST(req: NextRequest) {
  const { event, payload } = await verifyAjSignedRequest(req);
  
  // Generate event ID from multiple possible sources
  const eventId = payload.id || 
                  payload.event_id || 
                  req.headers.get('x-aj-id') || 
                  crypto.randomUUID();
  
  // Check for duplicates
  if (await hasSeenWebhook(eventId)) {
    console.log(`[webhook] Duplicate event ignored: ${eventId}`);
    return NextResponse.json({ 
      ok: true, 
      already_processed: true,
      event_id: eventId 
    });
  }
  
  // Mark as seen before processing to prevent race conditions
  await markWebhookSeen(eventId);
  
  // Process the event
  await handleEvent(event, payload);
  
  return NextResponse.json({ 
    ok: true, 
    event_id: eventId,
    processed_at: new Date().toISOString()
  });
}
```

#### Idempotency System Features

- **Automatic Cleanup**: Events older than 7 days are automatically cleaned up
- **Race Condition Prevention**: Events are marked as seen before processing
- **Flexible Event ID**: Uses payload.id, payload.event_id, x-aj-id header, or generates UUID
- **Monitoring Support**: Built-in metrics and cleanup logging

#### Manual Cleanup (Optional)

```typescript
import { cleanupOldWebhooks } from '@/lib/server/idempotency';

// Clean up events older than custom age
await cleanupOldWebhooks(24 * 60 * 60 * 1000); // 24 hours
```

## Production Checklist

### Environment Setup
- [ ] `AJ_WEBHOOK_SHARED_SECRET` configured (32+ characters)
- [ ] Secret matches the one configured in AJ Admin Portal
- [ ] HTTPS endpoint accessible from audiojones.com

### Error Handling
- [ ] Return 401 for signature verification failures
- [ ] Return 200 for successful processing
- [ ] Return 4xx for client errors (don't retry)
- [ ] Return 5xx for server errors (will retry)
- [ ] Log all webhook processing for debugging

### Security
- [ ] Always verify signatures before processing
- [ ] Respect the 5-minute timestamp window
- [ ] Use constant-time comparison for signatures
- [ ] Don't log sensitive payload data in production

### Reliability
- [ ] Implement idempotency to handle retries safely
- [ ] Store failed events for manual reprocessing
- [ ] Monitor webhook processing latency
- [ ] Set up alerts for processing failures

## Integration with AJ Admin Portal

### Register Your Webhook Target

1. Visit Admin Portal → Status Webhooks
2. Click "Add New Target"
3. Fill in:
   - **Name:** Your Service Name
   - **URL:** `https://yourservice.com/api/webhook-consumer`
   - **Secret:** Same as `AJ_WEBHOOK_SHARED_SECRET`
   - **Events:** Select event types to receive
   - **Active:** ✅ Enabled

### Monitor Delivery Status

The Admin Portal shows:
- Delivery success/failure rates
- Recent webhook attempts and responses
- Retry attempts and final status
- Average response times

### Test Your Integration

Use the "Test Webhook" feature to send sample events to your endpoint for validation.

## Debugging Common Issues

### Signature Verification Fails

```
Error: invalid_signature
```

**Causes:**
- Secret mismatch between consumer and AJ Admin Portal
- Body modification (content-encoding, etc.)
- Clock skew exceeding 5-minute window

**Solutions:**
- Verify `AJ_WEBHOOK_SHARED_SECRET` matches Admin Portal
- Ensure raw body is used for signature calculation
- Check server time synchronization

### Missing Headers

```
Error: missing_signature / missing_timestamp / missing_event
```

**Cause:** Required headers not present in request

**Solution:** Check that your endpoint is registered correctly in Admin Portal

### Timestamp Too Old

```
Error: timestamp_too_old
```

**Cause:** Clock skew or webhook replay

**Solution:** Sync server clocks, check for replay attacks

### Processing Failures

```
Error: processing_failed
```

**Cause:** Handler threw exception during event processing

**Solution:** Check handler logs, implement proper error handling

## Advanced Patterns

### Event Bus Integration

For services that both consume and publish events:

```typescript
import { publishEvent } from '@/lib/server/eventBus';

// Consume event and publish reaction
export async function POST(req: NextRequest) {
  const result = await verifyAjSignedRequest(req);
  if (!result.ok) return /* error */;
  
  // Process the event
  await handleEvent(result.event!, result.payload);
  
  // Publish reaction event
  if (result.event === 'capacity_alert') {
    await publishEvent('infrastructure_scaled', {
      trigger_event: result.event,
      action_taken: 'auto_scale_up',
      timestamp: new Date().toISOString()
    });
  }
  
  return NextResponse.json({ ok: true });
}
```

### Event Transformation

Transform AJ events to match your internal event schema:

```typescript
function transformToInternalFormat(ajEvent: string, ajPayload: any) {
  const mapping = {
    'status_change': {
      type: 'system.status.changed',
      data: {
        previous_status: ajPayload.from,
        current_status: ajPayload.to,
        changed_at: ajPayload.changed_at
      }
    },
    'incident_created': {
      type: 'system.incident.created',
      data: {
        incident: {
          id: ajPayload.id,
          title: ajPayload.title,
          severity: ajPayload.severity
        }
      }
    }
  };
  
  return mapping[ajEvent] || {
    type: 'system.unknown',
    data: ajPayload
  };
}
```

## Reference Implementation

See the complete working example:

- **Route:** `src/app/api/examples/event-consumer/route.ts`
- **Verifier:** `src/lib/server/ajWebhookVerifier.ts`
- **Handlers:** `src/lib/server/exampleEventHandlers.ts`

This example processes all AJ event types and stores them in separate Firestore collections for easy querying and analysis.

## Support

For questions about webhook integration:

1. Check the Event Bus admin dashboard for delivery status
2. Review webhook logs in the AJ Admin Portal
3. Test with the built-in webhook testing tool
4. Reference this documentation and the working example code

The webhook consumer pattern ensures reliable, secure event processing across the AJ Digital ecosystem.