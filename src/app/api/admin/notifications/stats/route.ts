/**
 * Notification System Debug API
 * 
 * GET /api/admin/notifications/stats - Get notification system statistics
 * POST /api/admin/notifications/clear-cache - Clear notification caches
 * POST /api/admin/notifications/bypass-rate-limit - Bypass rate limit for subscriber
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';
import { 
  getNotificationStats, 
  clearNotificationCaches, 
  bypassRateLimit 
} from '@/lib/server/incidents';

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    
    const stats = getNotificationStats();
    
    return NextResponse.json({
      ok: true,
      stats,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    
    console.error('❌ Failed to get notification stats:', error);
    return NextResponse.json(
      { error: 'Failed to get notification stats' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);
    
    const body = await req.json();
    const { action, subscriber } = body;
    
    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'clear_cache':
        const result = clearNotificationCaches();
        return NextResponse.json({
          ok: true,
          message: 'Notification caches cleared',
          cleared_entries: result.cleared
        });

      case 'bypass_rate_limit':
        if (!subscriber) {
          return NextResponse.json(
            { error: 'Subscriber is required for bypass_rate_limit action' },
            { status: 400 }
          );
        }
        
        bypassRateLimit(subscriber);
        return NextResponse.json({
          ok: true,
          message: `Rate limit bypassed for ${subscriber}`,
          subscriber
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported: clear_cache, bypass_rate_limit' },
          { status: 400 }
        );
    }

  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    
    console.error('❌ Failed to process notification action:', error);
    return NextResponse.json(
      { error: 'Failed to process action' },
      { status: 500 }
    );
  }
}