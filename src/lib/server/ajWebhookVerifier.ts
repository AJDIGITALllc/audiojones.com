/**
 * Audio Jones Webhook Consumer Verifier
 * 
 * High-level wrapper around the core AJ webhook verification logic
 * specifically designed for consuming events from the unified event bus.
 * 
 * Usage:
 *   const result = await verifyAjSignedRequest(req);
 *   if (!result.ok) return NextResponse.json({ error: result.error }, { status: 401 });
 *   
 *   // result.event and result.payload are now safe to use
 */

import { NextRequest } from 'next/server';
import { verifyAjWebhook } from './verifyAjWebhook';

export interface AjWebhookVerifyResult {
  ok: boolean;
  event?: string;
  payload?: any;
  error?: string;
  timestamp?: string;
}

/**
 * Verify an Audio Jones signed webhook request and parse the payload
 * 
 * This function handles:
 * - Raw body extraction from NextRequest
 * - HMAC-SHA256 signature verification 
 * - 5-minute timestamp window enforcement
 * - JSON payload parsing
 * - Comprehensive error handling
 * 
 * @param req - NextRequest from Next.js API route
 * @returns Promise<AjWebhookVerifyResult> with verification status and parsed data
 */
export async function verifyAjSignedRequest(req: NextRequest): Promise<AjWebhookVerifyResult> {
  try {
    // Extract raw body text for signature verification
    const rawBody = await req.text();
    
    if (!rawBody) {
      return { 
        ok: false, 
        error: 'empty_body' 
      };
    }

    // Get the shared secret from environment
    const secret = process.env.AJ_WEBHOOK_SHARED_SECRET;
    if (!secret) {
      return { 
        ok: false, 
        error: 'missing_secret_config' 
      };
    }

    // Verify the webhook signature using existing utility
    const verifyResult = verifyAjWebhook({ req, rawBody, secret });
    
    if (!verifyResult.ok) {
      return {
        ok: false,
        error: verifyResult.reason || 'verification_failed'
      };
    }

    // Parse the JSON payload
    let payload: any;
    try {
      payload = JSON.parse(rawBody);
    } catch (parseError) {
      return {
        ok: false,
        error: 'invalid_json_payload'
      };
    }

    // Extract timestamp for consumer use
    const timestamp = req.headers.get('x-aj-timestamp') || new Date().toISOString();

    return {
      ok: true,
      event: verifyResult.event!,
      payload,
      timestamp
    };

  } catch (error) {
    console.error('[ajWebhookVerifier] Unexpected error:', error);
    return {
      ok: false,
      error: 'internal_verifier_error'
    };
  }
}

/**
 * Environment variable checker for webhook secret
 * Useful for startup validation
 */
export function validateWebhookConfig(): { ok: boolean; error?: string } {
  const secret = process.env.AJ_WEBHOOK_SHARED_SECRET;
  
  if (!secret) {
    return {
      ok: false,
      error: 'AJ_WEBHOOK_SHARED_SECRET environment variable is required'
    };
  }

  if (secret.length < 32) {
    return {
      ok: false,
      error: 'AJ_WEBHOOK_SHARED_SECRET must be at least 32 characters for security'
    };
  }

  return { ok: true };
}