/**
 * User Subscriptions API
 * 
 * GET /api/admin/subscriptions/[subscriber] - Get all incident subscriptions for a user
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';
import { getUserIncidentSubscriptions } from '@/lib/server/incidents';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ subscriber: string }> }
) {
  try {
    // Require admin authentication
    requireAdmin(req);
    
    const { subscriber: rawSubscriber } = await params;
    const subscriber = decodeURIComponent(rawSubscriber);
    
    if (!subscriber || subscriber.trim().length === 0) {
      return NextResponse.json(
        { error: 'Subscriber email or ID is required' },
        { status: 400 }
      );
    }

    console.log(`📋 Getting subscriptions for user ${subscriber}`);

    // Get all subscriptions for this user
    const subscriptions = await getUserIncidentSubscriptions(subscriber);

    // Group by subscription status for easier frontend handling
    const activeSubscriptions = subscriptions.filter(sub => sub.active);
    const inactiveSubscriptions = subscriptions.filter(sub => !sub.active);

    return NextResponse.json({
      ok: true,
      subscriber: subscriber,
      total_subscriptions: subscriptions.length,
      active_count: activeSubscriptions.length,
      inactive_count: inactiveSubscriptions.length,
      subscriptions: {
        active: activeSubscriptions,
        inactive: inactiveSubscriptions,
        all: subscriptions
      }
    });

  } catch (error) {
    if (error instanceof NextResponse) {
      // Admin auth failure - return as-is
      return error;
    }
    
    console.error('❌ Failed to get user subscriptions:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get subscriptions',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}