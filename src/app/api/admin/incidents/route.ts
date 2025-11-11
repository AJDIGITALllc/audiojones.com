/**
 * Incidents List API
 * 
 * GET /api/admin/incidents - List incidents with filtering
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';
import { listIncidents } from '@/lib/server/incidents';

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as 'open' | 'investigating' | 'monitoring' | 'resolved' | null;
    const source = searchParams.get('source');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    console.log(`📋 Listing incidents:`, { status, source, limit });

    const incidents = await listIncidents({
      status: status || undefined,
      source: source || undefined,
      limit
    });

    console.log(`✅ Retrieved ${incidents.length} incidents`);

    return NextResponse.json({
      ok: true,
      incidents,
      count: incidents.length,
      filters: {
        status: status || 'all',
        source: source || 'all',
        limit: limit || 50
      }
    });

  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    
    console.error('❌ Failed to list incidents:', error);
    return NextResponse.json(
      { error: 'Failed to list incidents' },
      { status: 500 }
    );
  }
}