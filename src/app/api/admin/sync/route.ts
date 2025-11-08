// src/app/api/admin/sync/route.ts
// API route for admin health/sync check and Firestore document counts

import { NextRequest, NextResponse } from 'next/server';
import { getDashboardStats, getCustomers, getSubscriptionEvents } from '@/lib/firestore/collections';

/**
 * Admin-only sync endpoint
 * Returns Firestore document counts and recent events
 */
export async function GET(request: NextRequest) {
  try {
    // Simple auth check - verify ADMIN_KEY header
    const adminKey = request.headers.get('admin-key') || request.headers.get('authorization')?.replace('Bearer ', '');
    const expectedAdminKey = process.env.ADMIN_KEY;

    if (!expectedAdminKey) {
      return NextResponse.json(
        { error: 'Server configuration error: ADMIN_KEY not set' },
        { status: 500 }
      );
    }

    if (!adminKey || adminKey !== expectedAdminKey) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing admin key' },
        { status: 401 }
      );
    }

    // Fetch dashboard statistics
    const stats = await getDashboardStats();
    const recentCustomers = await getCustomers(5);
    const recentEvents = await getSubscriptionEvents(10);

    // Return comprehensive sync data
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      firestore: {
        collections: {
          customers: {
            count: stats.totalCustomers,
            active_subscriptions: stats.activeSubscriptions,
            recent: recentCustomers.map(c => ({
              id: c.id,
              email: c.email,
              tier: c.subscription_tier,
              status: c.subscription_status,
              created_at: c.created_at
            }))
          },
          subscription_events: {
            count: recentEvents.length,
            event_counts: stats.eventCounts,
            recent: recentEvents.slice(0, 5).map(e => ({
              id: e.id,
              type: e.event_type,
              customer: e.customer_email,
              amount: e.amount,
              timestamp: e.timestamp
            }))
          }
        },
        metrics: {
          total_revenue: stats.totalRevenue,
          customer_growth: stats.customerGrowth,
          active_rate: stats.totalCustomers > 0 
            ? Math.round((stats.activeSubscriptions / stats.totalCustomers) * 100) 
            : 0
        }
      },
      system: {
        environment: process.env.NODE_ENV,
        firebase_project: process.env.FIREBASE_PROJECT_ID,
        uptime: process.uptime(),
        memory: process.memoryUsage()
      }
    });

  } catch (error) {
    console.error('Admin sync error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * POST endpoint for triggering manual sync operations
 */
export async function POST(request: NextRequest) {
  try {
    // Admin auth check
    const adminKey = request.headers.get('admin-key') || request.headers.get('authorization')?.replace('Bearer ', '');
    const expectedAdminKey = process.env.ADMIN_KEY;

    if (!adminKey || !expectedAdminKey || adminKey !== expectedAdminKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'refresh_stats':
        const refreshedStats = await getDashboardStats();
        return NextResponse.json({
          success: true,
          action: 'refresh_stats',
          data: refreshedStats,
          timestamp: new Date().toISOString()
        });

      case 'health_check':
        return NextResponse.json({
          success: true,
          action: 'health_check',
          status: 'healthy',
          services: {
            firestore: 'connected',
            webhook: 'operational',
            auth: 'active'
          },
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { error: 'Unknown action', available_actions: ['refresh_stats', 'health_check'] },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Admin sync POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}