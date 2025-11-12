/**
 * Incident Subscription API
 * 
 * POST /api/admin/incidents/[id]/subscribe - Subscribe to incident updates
 * DELETE /api/admin/incidents/[id]/subscribe - Unsubscribe from incident updates
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';
import { 
  addIncidentSubscription, 
  removeIncidentSubscription,
  getIncidentSubscription 
} from '@/lib/server/incidents';

interface SubscribeRequest {
  subscriber: string;
  channel?: "slack" | "email";
  preferences?: {
    status_changes?: boolean;
    timeline_updates?: boolean;
    resolution_only?: boolean;
  };
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require admin authentication
    requireAdmin(req);
    
    const { id: incidentId } = await params;
    
    if (!incidentId) {
      return NextResponse.json(
        { error: 'Incident ID is required' },
        { status: 400 }
      );
    }

    const body: SubscribeRequest = await req.json();
    const { subscriber, channel = "slack", preferences } = body;

    if (!subscriber || subscriber.trim().length === 0) {
      return NextResponse.json(
        { error: 'Subscriber email or ID is required' },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (subscriber.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(subscriber)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    console.log(`📧 Creating subscription for ${subscriber} to incident ${incidentId}`);

    // Create the subscription
    const subscriptionId = await addIncidentSubscription(incidentId, subscriber, {
      channel,
      preferences,
      created_by: 'admin' // Could extract from auth token if available
    });

    // Get the subscription details to return
    const subscription = await getIncidentSubscription(incidentId, subscriber);

    return NextResponse.json({
      ok: true,
      subscription_id: subscriptionId,
      message: 'Successfully subscribed to incident updates',
      subscription: subscription
    });

  } catch (error) {
    if (error instanceof NextResponse) {
      // Admin auth failure - return as-is
      return error;
    }
    
    console.error('❌ Failed to create incident subscription:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create subscription',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require admin authentication
    requireAdmin(req);
    
    const { id: incidentId } = await params;
    
    if (!incidentId) {
      return NextResponse.json(
        { error: 'Incident ID is required' },
        { status: 400 }
      );
    }

    // Get subscriber from query params or request body
    const { searchParams } = new URL(req.url);
    let subscriber = searchParams.get('subscriber');
    
    if (!subscriber) {
      try {
        const body = await req.json();
        subscriber = body.subscriber;
      } catch {
        // Body parsing failed, subscriber still null
      }
    }

    if (!subscriber || subscriber.trim().length === 0) {
      return NextResponse.json(
        { error: 'Subscriber email or ID is required' },
        { status: 400 }
      );
    }

    console.log(`📧 Removing subscription for ${subscriber} from incident ${incidentId}`);

    // Check if subscription exists before trying to remove
    const existingSubscription = await getIncidentSubscription(incidentId, subscriber);
    
    if (!existingSubscription) {
      return NextResponse.json(
        { 
          ok: true,
          message: 'No active subscription found',
          was_subscribed: false
        }
      );
    }

    // Remove the subscription
    await removeIncidentSubscription(incidentId, subscriber);

    return NextResponse.json({
      ok: true,
      message: 'Successfully unsubscribed from incident updates',
      was_subscribed: true
    });

  } catch (error) {
    if (error instanceof NextResponse) {
      // Admin auth failure - return as-is
      return error;
    }
    
    console.error('❌ Failed to remove incident subscription:', error);
    return NextResponse.json(
      { 
        error: 'Failed to remove subscription',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check subscription status
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require admin authentication
    requireAdmin(req);
    
    const { id: incidentId } = await params;
    const { searchParams } = new URL(req.url);
    const subscriber = searchParams.get('subscriber');
    
    if (!incidentId) {
      return NextResponse.json(
        { error: 'Incident ID is required' },
        { status: 400 }
      );
    }

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Subscriber parameter is required' },
        { status: 400 }
      );
    }

    // Get subscription status
    const subscription = await getIncidentSubscription(incidentId, subscriber);

    return NextResponse.json({
      ok: true,
      subscribed: !!subscription,
      subscription: subscription
    });

  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    
    console.error('❌ Failed to check subscription status:', error);
    return NextResponse.json(
      { error: 'Failed to check subscription status' },
      { status: 500 }
    );
  }
}