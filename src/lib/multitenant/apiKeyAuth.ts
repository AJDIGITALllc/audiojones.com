/**
 * API Authentication Middleware for Multi-Tenant Scoped API Keys
 * Validates API keys and enforces tenant isolation
 */

import { NextRequest } from 'next/server';
import { multiTenantEngine } from '@/lib/multitenant/MultiTenantEngine';

export interface ApiKeyContext {
  valid: boolean;
  apiKey?: {
    id: string;
    name: string;
    org_id: string;
    scopes: string[];
    rate_limits: {
      requests_per_minute: number;
      requests_per_hour: number;
      requests_per_day: number;
    };
  };
  organization?: {
    id: string;
    name: string;
    subscription: {
      plan: string;
      status: string;
    };
  };
  error?: string;
}

/**
 * Middleware to authenticate API requests using scoped API keys
 */
export async function authenticateApiKey(request: NextRequest): Promise<ApiKeyContext> {
  try {
    // Extract API key from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return { valid: false, error: 'Missing Authorization header' };
    }

    // Support both "Bearer" and "ApiKey" prefixes
    const keyMatch = authHeader.match(/^(?:Bearer|ApiKey)\s+(.+)$/i);
    if (!keyMatch) {
      return { valid: false, error: 'Invalid Authorization header format' };
    }

    const rawKey = keyMatch[1];

    // Validate the API key
    const validation = await multiTenantEngine.validateApiKey(rawKey);
    if (!validation.valid) {
      return { valid: false, error: validation.error || 'Invalid API key' };
    }

    const { apiKey, organization } = validation;
    if (!apiKey || !organization) {
      return { valid: false, error: 'API key validation failed' };
    }

    return {
      valid: true,
      apiKey: {
        id: apiKey.id,
        name: apiKey.name,
        org_id: apiKey.org_id,
        scopes: apiKey.scopes,
        rate_limits: apiKey.rate_limits
      },
      organization: {
        id: organization.id,
        name: organization.name,
        subscription: organization.subscription || { plan: 'free', status: 'inactive' }
      }
    };

  } catch (error) {
    console.error('API key authentication error:', error);
    return { valid: false, error: 'Authentication service error' };
  }
}

/**
 * Check if API key has required scope
 */
export function requireScope(context: ApiKeyContext, requiredScope: string): boolean {
  if (!context.valid || !context.apiKey) {
    return false;
  }

  return context.apiKey.scopes.includes('*') || context.apiKey.scopes.includes(requiredScope);
}

/**
 * Check if API key has any of the required scopes
 */
export function requireAnyScope(context: ApiKeyContext, requiredScopes: string[]): boolean {
  if (!context.valid || !context.apiKey) {
    return false;
  }

  if (context.apiKey.scopes.includes('*')) {
    return true;
  }

  return requiredScopes.some(scope => context.apiKey!.scopes.includes(scope));
}

/**
 * Get tenant-scoped data filters based on organization
 */
export function getTenantFilters(context: ApiKeyContext, collection: string): Record<string, any> {
  if (!context.valid || !context.organization) {
    return {};
  }

  return multiTenantEngine.getTenantDataFilters(context.organization.id, collection);
}

/**
 * Rate limiting check (simplified - in production use Redis or similar)
 */
export async function checkRateLimit(context: ApiKeyContext, window: 'minute' | 'hour' | 'day'): Promise<{
  allowed: boolean;
  remaining: number;
  resetTime: Date;
}> {
  if (!context.valid || !context.apiKey) {
    return { allowed: false, remaining: 0, resetTime: new Date() };
  }

  // This is a simplified implementation
  // In production, you'd use Redis or a proper rate limiting service
  const limits = context.apiKey.rate_limits;
  const now = new Date();

  let limit: number;
  let resetTime: Date;

  switch (window) {
    case 'minute':
      limit = limits.requests_per_minute;
      resetTime = new Date(now.getTime() + 60000); // +1 minute
      break;
    case 'hour':
      limit = limits.requests_per_hour;
      resetTime = new Date(now.getTime() + 3600000); // +1 hour
      break;
    case 'day':
      limit = limits.requests_per_day;
      resetTime = new Date(now.getTime() + 86400000); // +1 day
      break;
    default:
      return { allowed: false, remaining: 0, resetTime: now };
  }

  // For now, always allow (implement proper rate limiting in production)
  return {
    allowed: true,
    remaining: limit - 1,
    resetTime
  };
}

/**
 * Enhanced authentication middleware with comprehensive checks
 */
export async function authenticateAndAuthorize(
  request: NextRequest,
  requiredScopes: string[] = [],
  options: {
    requireActiveSubscription?: boolean;
    checkRateLimit?: boolean;
    collection?: string; // For tenant filtering
  } = {}
): Promise<{
  success: boolean;
  context?: ApiKeyContext;
  tenantFilters?: Record<string, any>;
  error?: string;
  statusCode?: number;
}> {
  try {
    // Authenticate API key
    const context = await authenticateApiKey(request);
    if (!context.valid) {
      return {
        success: false,
        error: context.error || 'Authentication failed',
        statusCode: 401
      };
    }

    // Check subscription status
    if (options.requireActiveSubscription && context.organization?.subscription.status !== 'active') {
      return {
        success: false,
        error: 'Organization subscription is not active',
        statusCode: 403
      };
    }

    // Check required scopes
    if (requiredScopes.length > 0 && !requireAnyScope(context, requiredScopes)) {
      return {
        success: false,
        error: `Missing required scopes: ${requiredScopes.join(', ')}`,
        statusCode: 403
      };
    }

    // Check rate limits
    if (options.checkRateLimit) {
      const rateLimitCheck = await checkRateLimit(context, 'minute');
      if (!rateLimitCheck.allowed) {
        return {
          success: false,
          error: 'Rate limit exceeded',
          statusCode: 429
        };
      }
    }

    // Get tenant filters if collection specified
    let tenantFilters = {};
    if (options.collection) {
      tenantFilters = getTenantFilters(context, options.collection);
    }

    return {
      success: true,
      context,
      tenantFilters
    };

  } catch (error) {
    console.error('Authentication and authorization error:', error);
    return {
      success: false,
      error: 'Internal authentication error',
      statusCode: 500
    };
  }
}

/**
 * Utility function to create API key authentication response
 */
export function createAuthResponse(result: {
  success: boolean;
  error?: string;
  statusCode?: number;
}) {
  const { success, error, statusCode } = result;
  
  if (!success) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error || 'Authentication failed'
      }),
      {
        status: statusCode || 401,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  return null; // Success, continue with request
}

/**
 * Scope definitions for different API endpoints
 */
export const API_SCOPES = {
  // Data access scopes
  DATA_READ: 'data.read',
  DATA_WRITE: 'data.write',
  DATA_DELETE: 'data.delete',

  // Webhook scopes
  WEBHOOKS_READ: 'webhooks.read',
  WEBHOOKS_WRITE: 'webhooks.write',
  WEBHOOKS_DELETE: 'webhooks.delete',

  // Organization scopes
  ORG_READ: 'org.read',
  ORG_UPDATE: 'org.update',
  ORG_MEMBERS_READ: 'org.members.read',
  ORG_MEMBERS_MANAGE: 'org.members.manage',

  // API key scopes
  API_KEYS_READ: 'org.apikeys.read',
  API_KEYS_CREATE: 'org.apikeys.create',
  API_KEYS_REVOKE: 'org.apikeys.revoke',

  // Analytics scopes
  ANALYTICS_READ: 'analytics.read',
  ANALYTICS_EXPORT: 'analytics.export',

  // Billing scopes
  BILLING_READ: 'billing.read',
  BILLING_WRITE: 'billing.write',

  // Admin scopes (for super admin operations)
  ADMIN_ALL: '*'
} as const;

export type ApiScope = typeof API_SCOPES[keyof typeof API_SCOPES];