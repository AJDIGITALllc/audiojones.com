/**
 * Incident Subscribers List API
 * 
 * GET /api/admin/incidents/[id]/subscribers - Get all subscribers for an incident
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';
import { getIncidentSubscribers } from '@/lib/server/incidents';

export async function GET(
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

    console.log(`📋 Getting subscribers for incident ${incidentId}`);

    // Get all subscribers for this incident
    const subscribers = await getIncidentSubscribers(incidentId);

    return NextResponse.json({
      ok: true,
      incident_id: incidentId,
      subscriber_count: subscribers.length,
      subscribers: subscribers
    });

  } catch (error) {
    if (error instanceof NextResponse) {
      // Admin auth failure - return as-is
      return error;
    }
    
    console.error('❌ Failed to get incident subscribers:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get subscribers',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}