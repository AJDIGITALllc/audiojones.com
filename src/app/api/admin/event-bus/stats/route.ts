/**
 * Event Bus Statistics API
 * 
 * Returns statistics about the event bus including:
 * - Total events count
 * - Events by type breakdown
 * - Delivery success rate
 * - Recent activity (24h, 7d)
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';
import { getEventBusStats } from '@/lib/server/eventBus';

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);

    const stats = await getEventBusStats();

    return NextResponse.json({
      ok: true,
      stats,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[event-bus/stats] Error:', error);
    return NextResponse.json(
      { 
        ok: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        stats: {
          total_events: 0,
          events_by_type: {},
          delivery_success_rate: 0,
          recent_activity: { last_24h: 0, last_7d: 0 }
        }
      },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}