/**
 * Predictive Scheduler API
 * 
 * Triggers predictive capacity scanning and alert creation.
 * POST /api/admin/scheduler/run
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';
import { runPredictiveScan, type PredictiveScanResult } from '@/lib/server/predictiveScheduler';

export async function POST(req: NextRequest) {
  try {
    // Require admin authentication
    requireAdmin(req);
    
    console.log('🚀 Predictive scheduler triggered via API');
    
    // Run the predictive scan
    const result: PredictiveScanResult = await runPredictiveScan();
    
    // Return detailed results
    const response = {
      ok: result.ok,
      message: result.ok 
        ? `Predictive scan completed successfully` 
        : `Predictive scan failed: ${result.error}`,
      alertsCreated: result.alertsCreated,
      forecastSummary: {
        current_utilization: `${result.forecastSummary.current_utilization}%`,
        projected_3day_utilization: `${result.forecastSummary.projected_3day_utilization}%`,
        trend_hours_per_day: result.forecastSummary.trend_hours_per_day,
        risk_level: result.forecastSummary.risk_level,
        days_until_capacity: result.forecastSummary.days_until_capacity,
        confidence_score: result.forecastSummary.confidence_score
      },
      scanDetails: {
        scan_timestamp: result.scan_timestamp,
        snapshots_analyzed: result.snapshots_analyzed,
        existing_alerts_skipped: result.existing_alerts_skipped
      },
      error: result.error
    };
    
    console.log(`✅ Predictive scheduler API response:`, {
      ok: result.ok,
      alerts: result.alertsCreated,
      risk: result.forecastSummary.risk_level,
      utilization: `${result.forecastSummary.projected_3day_utilization}%`
    });
    
    return NextResponse.json(response);

  } catch (error) {
    if (error instanceof NextResponse) {
      return error; // This is from requireAdmin
    }
    
    console.error('❌ Predictive scheduler API failed:', error);
    return NextResponse.json(
      { 
        ok: false,
        error: 'Scheduler API failed', 
        details: error instanceof Error ? error.message : 'Unknown error',
        alertsCreated: 0,
        forecastSummary: null
      },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { 
      error: 'Method not allowed. Use POST to run predictive scan.',
      endpoint: '/api/admin/scheduler/run',
      method: 'POST',
      auth: 'admin-key header required'
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to run predictive scan.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to run predictive scan.' },
    { status: 405 }
  );
}