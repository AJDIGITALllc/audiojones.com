/**
 * Individual Incident API
 * 
 * GET /api/admin/incidents/[id] - Get incident with related alerts
 * PATCH /api/admin/incidents/[id] - Update incident status
 * POST /api/admin/incidents/[id] - Add timeline note
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';
import { 
  getIncidentWithAlerts, 
  updateIncidentStatus, 
  appendIncidentEvent 
} from '@/lib/server/incidents';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireAdmin(req);
    
    const { id: incidentId } = await params;
    
    if (!incidentId) {
      return NextResponse.json(
        { error: 'Missing incident ID' },
        { status: 400 }
      );
    }

    console.log(`📋 Getting incident details: ${incidentId}`);

    const result = await getIncidentWithAlerts(incidentId);
    
    if (!result) {
      return NextResponse.json(
        { error: 'Incident not found' },
        { status: 404 }
      );
    }

    console.log(`✅ Retrieved incident ${incidentId} with ${result.alerts.length} related alerts`);

    return NextResponse.json({
      ok: true,
      incident: result.incident,
      alerts: result.alerts,
      timeline_count: result.incident.timeline?.length || 0
    });

  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    
    const { id } = await params;
    console.error(`❌ Failed to get incident ${id}:`, error);
    return NextResponse.json(
      { error: 'Failed to get incident' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireAdmin(req);
    
    const { id: incidentId } = await params;
    const body = await req.json();
    const { status } = body;
    
    if (!incidentId) {
      return NextResponse.json(
        { error: 'Missing incident ID' },
        { status: 400 }
      );
    }

    if (!status || !['open', 'investigating', 'monitoring', 'resolved'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: open, investigating, monitoring, or resolved' },
        { status: 400 }
      );
    }

    console.log(`🔄 Updating incident ${incidentId} status to: ${status}`);

    await updateIncidentStatus(incidentId, status, 'admin');

    console.log(`✅ Incident ${incidentId} status updated to ${status}`);

    return NextResponse.json({
      ok: true,
      incidentId,
      newStatus: status,
      message: 'Incident status updated successfully'
    });

  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    
    const { id } = await params;
    console.error(`❌ Failed to update incident ${id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update incident status' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireAdmin(req);
    
    const { id: incidentId } = await params;
    const body = await req.json();
    const { message, type = 'note' } = body;
    
    if (!incidentId) {
      return NextResponse.json(
        { error: 'Missing incident ID' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid message' },
        { status: 400 }
      );
    }

    if (!['note', 'action'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be: note or action' },
        { status: 400 }
      );
    }

    console.log(`📝 Adding ${type} to incident ${incidentId}: ${message.substring(0, 50)}...`);

    await appendIncidentEvent(incidentId, {
      type,
      message,
      meta: {
        actor: 'admin',
        added_via: 'web_interface'
      }
    });

    console.log(`✅ ${type} added to incident ${incidentId}`);

    return NextResponse.json({
      ok: true,
      incidentId,
      message: `${type} added successfully`
    });

  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    
    const { id } = await params;
    console.error(`❌ Failed to add note to incident ${id}:`, error);
    return NextResponse.json(
      { error: 'Failed to add note to incident' },
      { status: 500 }
    );
  }
}