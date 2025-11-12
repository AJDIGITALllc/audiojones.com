/**
 * Advanced Analytics API
 * 
 * Provides comprehensive analytics data including metrics, insights,
 * predictions, and business intelligence for the admin dashboard.
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';
import advancedAnalyticsEngine from '@/lib/analytics/AdvancedAnalyticsEngine';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    requireAdmin(request);
    const adminUserId = 'admin-user'; // Mock admin user ID
    
    const url = new URL(request.url);
    const timeRange = url.searchParams.get('timeRange') || '24h';
    const metric = url.searchParams.get('metric') || 'all';
    const organizationId = url.searchParams.get('organizationId');

    // Initialize analytics engine if not already done
    if (!advancedAnalyticsEngine.getSystemStatus().initialized) {
      await advancedAnalyticsEngine.initialize();
    }

    // Parse time range
    const timeRangeMs = parseTimeRange(timeRange);
    const endTime = Date.now();
    const startTime = endTime - timeRangeMs;

    // Build analytics query
    const query = {
      metrics: metric === 'all' ? [] : [metric],
      timeRange: { start: startTime, end: endTime },
      granularity: getGranularityFromTimeRange(timeRange),
      organizationId: organizationId || undefined,
    } as const;

    // Execute analytics query
    const analyticsResult = await advancedAnalyticsEngine.executeQuery(query);

    // Get recent predictive insights
    const insights = await advancedAnalyticsEngine.generatePredictiveInsights(organizationId || undefined);

    // Detect any anomalies
    const anomalies = await advancedAnalyticsEngine.detectAnomalies(organizationId || undefined);

    // Get system performance metrics
    const systemStatus = advancedAnalyticsEngine.getSystemStatus();

    // Prepare response data
    const responseData = {
      metrics: analyticsResult.data.map(dataPoint => ({
        id: `metric_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: Object.keys(dataPoint.values)[0] || 'unknown',
        value: Object.values(dataPoint.values)[0] || 0,
        timestamp: dataPoint.timestamp,
        dimensions: dataPoint.dimensions,
        organizationId,
      })),
      insights: [...insights, ...anomalies].sort((a, b) => b.timestamp - a.timestamp).slice(0, 20),
      alerts: [], // Would be populated from actual alert system
      performance: {
        totalQueries: Math.floor(Math.random() * 10000) + 1000, // Mock data - replace with real stats
        avgResponseTime: analyticsResult.metadata.executionTime,
        cacheHitRate: analyticsResult.metadata.cacheHit ? 85 : 45,
        activeConnections: systemStatus.cacheSize,
      },
      aggregations: analyticsResult.aggregations,
      metadata: {
        timeRange,
        metric,
        organizationId,
        executionTime: analyticsResult.metadata.executionTime,
        dataPoints: analyticsResult.metadata.dataPoints,
        cacheHit: analyticsResult.metadata.cacheHit,
      },
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Analytics API error:', error);
    
    if (error instanceof Error && error.message.includes('Admin required')) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to fetch analytics data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    requireAdmin(request);
    const adminUserId = 'admin-user'; // Mock admin user ID
    
    const body = await request.json();
    const { action, data } = body;

    // Initialize analytics engine if not already done
    if (!advancedAnalyticsEngine.getSystemStatus().initialized) {
      await advancedAnalyticsEngine.initialize();
    }

    switch (action) {
      case 'record_metric':
        {
          const metricId = await advancedAnalyticsEngine.recordMetric({
            name: data.name,
            value: data.value,
            dimensions: data.dimensions || {},
            organizationId: data.organizationId,
            userId: adminUserId,
            metadata: data.metadata || {},
          });

          return NextResponse.json({ 
            success: true, 
            metricId,
            message: 'Metric recorded successfully'
          });
        }

      case 'create_dashboard':
        {
          const dashboardId = await advancedAnalyticsEngine.createDashboard({
            name: data.name,
            description: data.description,
            widgets: data.widgets || [],
            organizationId: data.organizationId,
            userId: adminUserId,
            isPublic: data.isPublic || false,
          });

          return NextResponse.json({ 
            success: true, 
            dashboardId,
            message: 'Dashboard created successfully'
          });
        }

      case 'generate_insights':
        {
          const insights = await advancedAnalyticsEngine.generatePredictiveInsights(
            data.organizationId
          );

          return NextResponse.json({ 
            success: true, 
            insights,
            count: insights.length,
            message: 'Insights generated successfully'
          });
        }

      case 'detect_anomalies':
        {
          const anomalies = await advancedAnalyticsEngine.detectAnomalies(
            data.organizationId
          );

          return NextResponse.json({ 
            success: true, 
            anomalies,
            count: anomalies.length,
            message: 'Anomaly detection completed'
          });
        }

      case 'custom_query':
        {
          const result = await advancedAnalyticsEngine.executeQuery({
            metrics: data.metrics || [],
            dimensions: data.dimensions,
            filters: data.filters,
            timeRange: data.timeRange,
            granularity: data.granularity || 'hour',
            limit: data.limit,
            organizationId: data.organizationId,
          });

          return NextResponse.json({ 
            success: true, 
            result,
            message: 'Custom query executed successfully'
          });
        }

      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Analytics API POST error:', error);
    
    if (error instanceof Error && error.message.includes('Admin required')) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to process analytics request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Parse time range string to milliseconds
 */
function parseTimeRange(timeRange: string): number {
  const timeRangeMap: Record<string, number> = {
    '1h': 60 * 60 * 1000,
    '24h': 24 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
    '30d': 30 * 24 * 60 * 60 * 1000,
    '90d': 90 * 24 * 60 * 60 * 1000,
  };

  return timeRangeMap[timeRange] || timeRangeMap['24h'];
}

/**
 * Get appropriate granularity based on time range
 */
function getGranularityFromTimeRange(timeRange: string): 'minute' | 'hour' | 'day' | 'week' | 'month' {
  switch (timeRange) {
    case '1h': return 'minute';
    case '24h': return 'hour';
    case '7d': return 'hour';
    case '30d': return 'day';
    case '90d': return 'day';
    default: return 'hour';
  }
}