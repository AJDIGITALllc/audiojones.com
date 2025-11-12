/**
 * Audio Jones Webhook Verification
 * 
 * Verifies inbound webhooks signed with Audio Jones format:
 * - X-AJ-Signature: HMAC-SHA256 hex digest
 * - X-AJ-Timestamp: ISO timestamp
 * - X-AJ-Event: Event type
 * - Signature computed over: timestamp.body
 * - Timestamp tolerance: 300 seconds (5 minutes)
 */

import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest } from 'next/server';

export interface VerifyResult {
  ok: boolean;
  event?: string;
  reason?: string;
}

export interface VerifyWebhookParams {
  req: NextRequest;
  rawBody: string;
  secret: string;
}

/**
 * Verify an Audio Jones webhook signature
 */
export function verifyAjWebhook({ req, rawBody, secret }: VerifyWebhookParams): VerifyResult {
  try {
    // Read required headers
    const signature = req.headers.get('x-aj-signature');
    const timestamp = req.headers.get('x-aj-timestamp');
    const event = req.headers.get('x-aj-event');

    if (!signature) {
      return { ok: false, reason: 'missing-signature' };
    }

    if (!timestamp) {
      return { ok: false, reason: 'missing-timestamp' };
    }

    if (!event) {
      return { ok: false, reason: 'missing-event' };
    }

    // Validate timestamp format and freshness
    let timestampDate: Date;
    try {
      timestampDate = new Date(timestamp);
      if (isNaN(timestampDate.getTime())) {
        return { ok: false, reason: 'invalid-timestamp-format' };
      }
    } catch {
      return { ok: false, reason: 'invalid-timestamp-format' };
    }

    // Check timestamp is within 5 minutes (300 seconds)
    const now = new Date();
    const timeDiff = Math.abs(now.getTime() - timestampDate.getTime()) / 1000;
    
    if (timeDiff > 300) {
      return { ok: false, reason: 'timestamp-too-old' };
    }

    // Recompute signature using the same logic as outbound webhooks
    const expectedSignature = generateWebhookSignature(rawBody, secret, timestamp);

    // Constant-time comparison to prevent timing attacks
    if (!constantTimeEqual(signature, expectedSignature)) {
      return { ok: false, reason: 'invalid-signature' };
    }

    return { ok: true, event };

  } catch (error) {
    console.error('Error verifying AJ webhook:', error);
    return { ok: false, reason: 'verification-error' };
  }
}

/**
 * Generate HMAC signature for webhook payload (mirrors statusEvents.ts)
 */
function generateWebhookSignature(payload: string, secret: string, timestamp: string): string {
  const message = `${timestamp}.${payload}`;
  const hmac = createHmac('sha256', secret);
  hmac.update(message);
  return hmac.digest('hex');
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  const aBuffer = Buffer.from(a, 'utf8');
  const bBuffer = Buffer.from(b, 'utf8');

  return timingSafeEqual(aBuffer, bBuffer);
}

/**
 * Validate webhook event type
 */
export function isValidEventType(event: string): boolean {
  const validEvents = [
    'status_change',
    'status_operational', 
    'status_degraded',
    'status_outage'
  ];
  
  return validEvents.includes(event);
}

/**
 * Extract webhook headers for logging/debugging
 */
export function extractWebhookHeaders(req: NextRequest): {
  signature?: string;
  timestamp?: string;
  event?: string;
  userAgent?: string;
} {
  return {
    signature: req.headers.get('x-aj-signature') || undefined,
    timestamp: req.headers.get('x-aj-timestamp') || undefined,
    event: req.headers.get('x-aj-event') || undefined,
    userAgent: req.headers.get('user-agent') || undefined,
  };
}