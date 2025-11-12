# Audio Jones Event Bus

## Overview

The Audio Jones Event Bus is a unified publish/subscribe system that centralizes all event handling across the AJ Digital ecosystem. It provides secure, reliable event broadcasting with HMAC signing, delivery tracking, and comprehensive logging.

## Architecture

### Core Components

- **Event Bus Core** (`src/lib/server/eventBus.ts`) - Central publishing and subscription system
- **Webhook Infrastructure** - Built on existing status webhook system with HMAC-SHA256 signing
- **Firestore Storage** - Events stored in `aj_event_bus` collection with full audit trail
- **Admin Interface** - Web UI for monitoring, filtering, and replaying events
- **APIs** - Admin endpoints for stats, events listing, and replay functionality

### Data Flow

```
Application → publishEvent() → Event Bus → [Firestore + Webhook Targets] → External Systems
                                    ↓
                            Delivery Tracking & Retry Logic
```

## Usage

### Publishing Events

```typescript
import { publishEvent, SUPPORTED_EVENT_TYPES } from '@/lib/server/eventBus';

// Basic event publishing
await publishEvent(SUPPORTED_EVENT_TYPES.STATUS_CHANGE, {
  from: 'operational',
  to: 'degraded',
  changed_at: new Date().toISOString()
}, {
  source: 'status-monitor',
  severity: 'warning'
});

// Capacity alert example
await publishEvent(SUPPORTED_EVENT_TYPES.CAPACITY_ALERT, {
  current_hours: 180,
  max_hours: 200,
  utilization_percent: 90,
  risk_level: 'high'
}, {
  source: 'capacity-forecast',
  alert_type: 'capacity'
});
```

### Local Event Subscriptions

```typescript
import { subscribeEvent, SUPPORTED_EVENT_TYPES } from '@/lib/server/eventBus';

// Subscribe to status changes
subscribeEvent(SUPPORTED_EVENT_TYPES.STATUS_CHANGE, async (payload, metadata) => {
  console.log('Status changed:', payload.from, '→', payload.to);
  
  // Custom handling logic
  if (payload.to === 'outage') {
    await triggerEmergencyProtocol();
  }
});

// Subscribe to capacity alerts
subscribeEvent(SUPPORTED_EVENT_TYPES.CAPACITY_ALERT, async (payload, metadata) => {
  if (payload.risk_level === 'critical') {
    await notifyManagement(payload);
  }
});
```

## Supported Event Types

### Status Events
- `status_change` - General status transitions
- `status_operational` - System back to operational
- `status_degraded` - Performance degradation detected
- `status_outage` - Complete system outage

### Capacity Events
- `capacity_alert` - Capacity threshold breach
- `capacity_forecast` - Predictive capacity analysis
- `capacity_threshold` - Utilization threshold crossed

### Incident Events
- `incident_created` - New incident reported
- `incident_updated` - Incident status/details changed
- `incident_resolved` - Incident resolved

### Alert Events
- `alert_triggered` - System alert activated
- `alert_resolved` - Alert condition cleared

### System Events
- `system_maintenance` - Scheduled maintenance events
- `system_update` - System updates and deployments

## Event Payload Schemas

### Status Change Event
```json
{
  "event_id": "aj_event_1699123456789_abc123def",
  "event_type": "status_change",
  "timestamp": "2025-11-11T10:30:00.000Z",
  "payload": {
    "from": "operational",
    "to": "degraded",
    "changed_at": "2025-11-11T10:30:00.000Z"
  },
  "metadata": {
    "source": "status-system",
    "transition": "operational → degraded",
    "severity": "warning"
  }
}
```

### Capacity Alert Event
```json
{
  "event_id": "aj_event_1699123456789_def456ghi",
  "event_type": "capacity_alert",
  "timestamp": "2025-11-11T10:30:00.000Z",
  "payload": {
    "alert_id": "alert_xyz789",
    "risk_level": "high",
    "current_hours": 180,
    "max_hours": 200,
    "utilization_percent": 90,
    "threshold_breached": "high_capacity"
  },
  "metadata": {
    "source": "capacity-forecast",
    "alert_type": "capacity",
    "severity": "warning"
  }
}
```

### Alert Triggered Event
```json
{
  "event_id": "aj_event_1699123456789_ghi789jkl",
  "event_type": "alert_triggered",
  "timestamp": "2025-11-11T10:30:00.000Z",
  "payload": {
    "alert_id": "alert_abc123",
    "title": "High Error Rate Detected",
    "message": "API error rate exceeded 5% threshold",
    "severity": "critical",
    "category": "system"
  },
  "metadata": {
    "source": "admin-api",
    "alert_type": "system",
    "severity": "critical"
  }
}
```

## Webhook Security

### HMAC-SHA256 Signing

All outbound events are signed using HMAC-SHA256:

```
X-AJ-Signature: sha256=<hex-encoded-hmac-sha256-signature>
X-AJ-Timestamp: <ISO-8601-timestamp>
X-AJ-Event: <event-type>
```

### Signature Generation

```typescript
const timestamp = new Date().toISOString();
const message = `${timestamp}.${JSON.stringify(payload)}`;
const signature = crypto.createHmac('sha256', secret).update(message).digest('hex');
```

### Signature Verification (Receiving End)

```typescript
import crypto from 'crypto';

function verifyWebhookSignature(payload: string, signature: string, secret: string, timestamp: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${payload}`)
    .digest('hex');
    
  const expectedHeader = `sha256=${expectedSignature}`;
  
  // Use constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'utf8'),
    Buffer.from(expectedHeader, 'utf8')
  );
}
```

## Webhook Target Management

### Target Configuration

Webhook targets are configured in the `status_webhook_targets` Firestore collection:

```json
{
  "url": "https://your-webhook-endpoint.com/aj-events",
  "secret": "your-shared-secret-32-chars-minimum",
  "active": true,
  "events": ["status_change", "capacity_alert", "alert_triggered"],
  "description": "Production monitoring system",
  "created_at": "2025-11-11T10:00:00.000Z",
  "updated_at": "2025-11-11T10:00:00.000Z"
}
```

### Event Filtering

Targets can subscribe to specific event types by setting the `events` array. If empty or omitted, the target receives all events.

## Example Webhook Receivers

### Node.js/Express Receiver

```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.raw({ type: 'application/json' }));

app.post('/aj-webhook', (req, res) => {
  const signature = req.headers['x-aj-signature'];
  const timestamp = req.headers['x-aj-timestamp'];
  const eventType = req.headers['x-aj-event'];
  const rawBody = req.body.toString();
  
  // Verify timestamp (within 5 minutes)
  const eventTime = new Date(timestamp);
  const now = new Date();
  if (now - eventTime > 5 * 60 * 1000) {
    return res.status(401).json({ error: 'timestamp_expired' });
  }
  
  // Verify signature
  const secret = process.env.AJ_WEBHOOK_SECRET;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`)
    .digest('hex');
  const expectedHeader = `sha256=${expectedSignature}`;
  
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedHeader))) {
    return res.status(401).json({ error: 'signature_mismatch' });
  }
  
  // Process the event
  const event = JSON.parse(rawBody);
  console.log('Received AJ event:', event.event_type, event.event_id);
  
  // Handle different event types
  switch (eventType) {
    case 'status_change':
      handleStatusChange(event.payload);
      break;
    case 'capacity_alert':
      handleCapacityAlert(event.payload);
      break;
    case 'alert_triggered':
      handleAlert(event.payload);
      break;
    default:
      console.log('Unknown event type:', eventType);
  }
  
  res.json({ ok: true, event_id: event.event_id });
});

function handleStatusChange(payload) {
  console.log(`Status: ${payload.from} → ${payload.to}`);
  // Your status change logic here
}

function handleCapacityAlert(payload) {
  console.log(`Capacity alert: ${payload.risk_level} risk at ${payload.utilization_percent}%`);
  // Your capacity alert logic here
}

function handleAlert(payload) {
  console.log(`Alert: ${payload.title} (${payload.severity})`);
  // Your alert handling logic here
}

app.listen(3001, () => {
  console.log('AJ webhook receiver listening on port 3001');
});
```

### Next.js API Route Receiver

```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-aj-signature');
    const timestamp = request.headers.get('x-aj-timestamp');
    const eventType = request.headers.get('x-aj-event');
    const rawBody = await request.text();
    
    if (!signature || !timestamp || !eventType) {
      return NextResponse.json(
        { error: 'missing_headers' },
        { status: 400 }
      );
    }
    
    // Verify timestamp
    const eventTime = new Date(timestamp);
    const now = new Date();
    if (now.getTime() - eventTime.getTime() > 5 * 60 * 1000) {
      return NextResponse.json(
        { error: 'timestamp_expired' },
        { status: 401 }
      );
    }
    
    // Verify signature
    const secret = process.env.AJ_WEBHOOK_SECRET!;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${timestamp}.${rawBody}`)
      .digest('hex');
    const expectedHeader = `sha256=${expectedSignature}`;
    
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedHeader))) {
      return NextResponse.json(
        { error: 'signature_mismatch' },
        { status: 401 }
      );
    }
    
    // Process the event
    const event = JSON.parse(rawBody);
    
    // Your event processing logic here
    await processAudioJonesEvent(event, eventType);
    
    return NextResponse.json({
      ok: true,
      event_id: event.event_id,
      processed_at: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'processing_error' },
      { status: 500 }
    );
  }
}

async function processAudioJonesEvent(event: any, eventType: string) {
  // Your custom event processing logic
  console.log(`Processing ${eventType}:`, event.event_id);
}
```

## Admin Interface

### Event Bus Dashboard

Navigate to `/portal/admin/events` to access the Event Bus dashboard:

- **Statistics Overview** - Total events, success rates, recent activity
- **Event Timeline** - Filterable list of recent events
- **Event Details** - Full payload and metadata viewer
- **Replay Functionality** - Re-send events to webhook targets
- **Real-time Monitoring** - Auto-refresh capabilities

### API Endpoints

#### Get Event Statistics
```
GET /api/admin/event-bus/stats
Headers: admin-key: <your-admin-key>
```

#### List Recent Events
```
GET /api/admin/event-bus/events?type=<event-type>&limit=<limit>
Headers: admin-key: <your-admin-key>
```

#### Replay Event
```
POST /api/admin/event-bus/replay
Headers: admin-key: <your-admin-key>
Content-Type: application/json

{
  "eventId": "aj_event_1699123456789_abc123def",
  "targetUrl": "https://specific-endpoint.com/webhook" // optional
}
```

## Integration Examples

### Slack Integration

```javascript
// Webhook receiver that forwards alerts to Slack
app.post('/aj-to-slack', async (req, res) => {
  const event = JSON.parse(req.body);
  
  if (event.event_type === 'alert_triggered' && event.payload.severity === 'critical') {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🚨 Critical Alert: ${event.payload.title}`,
        attachments: [{
          color: 'danger',
          fields: [
            { title: 'Message', value: event.payload.message, short: false },
            { title: 'Category', value: event.payload.category, short: true },
            { title: 'Event ID', value: event.event_id, short: true }
          ]
        }]
      })
    });
  }
  
  res.json({ ok: true });
});
```

### Discord Integration

```javascript
// Discord webhook for status changes
app.post('/aj-to-discord', async (req, res) => {
  const event = JSON.parse(req.body);
  
  if (event.event_type.startsWith('status_')) {
    const color = event.payload.to === 'operational' ? 0x00ff00 : 
                  event.payload.to === 'degraded' ? 0xffaa00 : 0xff0000;
    
    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: 'Audio Jones Status Update',
          description: `Status changed from **${event.payload.from}** to **${event.payload.to}**`,
          color: color,
          timestamp: event.timestamp,
          footer: { text: `Event ID: ${event.event_id}` }
        }]
      })
    });
  }
  
  res.json({ ok: true });
});
```

## Environment Configuration

### Required Variables

```env
# Event Bus Configuration
AJ_WEBHOOK_SHARED_SECRET=your-32-character-minimum-secret-key

# Admin API Access
ADMIN_KEY=your-admin-api-key

# Firebase Configuration (for Firestore)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
```

## Firestore Collections

### aj_event_bus
Stores all published events with full metadata:
```json
{
  "event_id": "aj_event_1699123456789_abc123def",
  "event_type": "status_change",
  "payload": { /* event-specific data */ },
  "metadata": { /* additional context */ },
  "source": "status-system",
  "created_at": "2025-11-11T10:30:00.000Z",
  "dispatched_to": 3,
  "delivery_success": 2,
  "delivery_failed": 1
}
```

### status_webhook_targets
Webhook target configurations (reused from existing system):
```json
{
  "url": "https://example.com/webhook",
  "secret": "shared-secret",
  "active": true,
  "events": ["status_change", "capacity_alert"],
  "description": "Production monitoring",
  "created_at": "2025-11-11T10:00:00.000Z"
}
```

### status_webhook_deliveries
Delivery attempt logs (existing system):
```json
{
  "event_id": "aj_event_1699123456789_abc123def",
  "url": "https://example.com/webhook",
  "status": 200,
  "timestamp": "2025-11-11T10:30:01.000Z",
  "response_time_ms": 245
}
```

## Best Practices

### Event Design
- Use clear, consistent event types
- Include all necessary context in payload
- Add metadata for debugging and routing
- Keep payloads focused and minimal

### Security
- Always verify webhook signatures
- Implement timestamp validation (5-minute window)
- Use HTTPS for all webhook endpoints
- Store secrets securely and rotate regularly

### Error Handling
- Implement idempotent event processing
- Log all webhook attempts for debugging
- Use exponential backoff for retries
- Provide meaningful error responses

### Performance
- Use appropriate Firestore indexes
- Implement pagination for large result sets
- Cache frequently accessed data
- Monitor delivery latency and success rates

### Monitoring
- Set up alerts for high failure rates
- Monitor event volume and patterns
- Track webhook endpoint health
- Log security violations (invalid signatures)

## Troubleshooting

### Common Issues

**Events not being delivered**
- Check webhook target configuration in Firestore
- Verify target endpoint is accessible and responding
- Check event type filtering in target configuration
- Review delivery logs in status_webhook_deliveries collection

**Signature verification failures**
- Ensure shared secret matches on both ends
- Check timestamp is within 5-minute window
- Verify HMAC calculation matches expected format
- Use constant-time comparison for security

**High failure rates**
- Check target endpoint response times
- Verify endpoint can handle expected load
- Review error logs for specific failure patterns
- Consider adjusting retry backoff settings

### Debug Tools

Use the admin interface at `/portal/admin/events` to:
- View recent events and delivery status
- Replay events for testing
- Monitor delivery success rates
- Filter events by type and time range

### Log Analysis

Event bus operations are logged with these prefixes:
- `📢 Publishing event:` - Event publication
- `✅ Event ... published:` - Successful delivery
- `❌ Failed to publish event:` - Publication failures
- `📬 Subscribed to event type:` - Local subscriptions

## Support and Updates

For questions, issues, or feature requests related to the Event Bus system:

1. Check the admin dashboard for delivery status
2. Review Firestore collections for event data
3. Examine server logs for error details
4. Test webhook endpoints independently
5. Verify environment configuration

The Event Bus system is designed to be extensible and can be enhanced with additional event types, delivery mechanisms, and monitoring capabilities as needed.