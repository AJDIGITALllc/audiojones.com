/**
 * Event Bus Replay API
 * 
 * Replays events from the event bus to webhook targets.
 * Useful for debugging, reprocessing failed events, or testing.
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';
import { replayEvent } from '@/lib/server/eventBus';

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);

    const body = await req.json();
    const { eventId, targetUrl } = body;

    if (!eventId) {
      return NextResponse.json(
        { ok: false, error: 'Missing required field: eventId' },
        { status: 400 }
      );
    }

    // Replay the event
    const result = await replayEvent(eventId, targetUrl);

    return NextResponse.json({
      ok: true,
      message: 'Event replayed successfully',
      replay_result: {
        original_event_id: eventId,
        new_event_id: result.event_id,
        dispatched_to: result.dispatched_to,
        delivery_attempts: result.delivery_attempts
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[event-bus/replay] Error:', error);
    return NextResponse.json(
      { 
        ok: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to replay event'
      },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}