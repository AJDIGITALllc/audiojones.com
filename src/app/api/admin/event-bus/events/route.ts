/**
 * Event Bus Events API
 * 
 * Returns recent events from the event bus with optional filtering:
 * - Filter by event type
 * - Limit number of results
 * - Order by creation time (newest first)
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';
import { getRecentEvents } from '@/lib/server/eventBus';

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);

    const url = new URL(req.url);
    const eventType = url.searchParams.get('type');
    const limit = parseInt(url.searchParams.get('limit') || '100');

    // Get events with optional filtering
    const events = await getRecentEvents(
      Math.min(limit, 500), // Cap at 500 for performance
      eventType === 'all' ? undefined : eventType || undefined
    );

    return NextResponse.json({
      ok: true,
      events,
      count: events.length,
      filters: {
        event_type: eventType || 'all',
        limit
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[event-bus/events] Error:', error);
    return NextResponse.json(
      { 
        ok: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        events: [],
        count: 0
      },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}