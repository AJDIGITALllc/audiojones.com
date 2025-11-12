/**
 * Real-time Analytics Streaming API
 * 
 * Provides Server-Sent Events (SSE) stream for real-time analytics data
 * including live metrics, alerts, and system performance updates.
 */

import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';
import advancedAnalyticsEngine from '@/lib/analytics/AdvancedAnalyticsEngine';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    requireAdmin(request);
    const adminUserId = 'admin-user'; // Mock admin user ID
    
    const url = new URL(request.url);
    const organizationId = url.searchParams.get('organizationId');
    const metrics = url.searchParams.get('metrics')?.split(',') || [];

    // Initialize analytics engine if not already done
    if (!advancedAnalyticsEngine.getSystemStatus().initialized) {
      await advancedAnalyticsEngine.initialize();
    }

    // Set up Server-Sent Events stream
    const encoder = new TextEncoder();
    let isActive = true;

    const stream = new ReadableStream({
      async start(controller) {
        // Send initial connection confirmation
        const initialData = {
          type: 'connection',
          timestamp: Date.now(),
          message: 'Real-time analytics stream connected',
          organizationId,
          userId: adminUserId,
        };

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(initialData)}\n\n`));

        // Set up periodic data streaming
        const streamInterval = setInterval(async () => {
          if (!isActive) {
            clearInterval(streamInterval);
            return;
          }

          try {
            // Get real-time analytics data
            const realTimeData = await getRealTimeAnalyticsData(organizationId, metrics);
            
            const streamData = {
              type: 'analytics_update',
              timestamp: Date.now(),
              data: realTimeData,
            };

            controller.enqueue(encoder.encode(`data: ${JSON.stringify(streamData)}\n\n`));

          } catch (error) {
            console.error('Real-time analytics streaming error:', error);
            
            const errorData = {
              type: 'error',
              timestamp: Date.now(),
              error: error instanceof Error ? error.message : 'Unknown streaming error',
            };

            controller.enqueue(encoder.encode(`data: ${JSON.stringify(errorData)}\n\n`));
          }
        }, 5000); // Update every 5 seconds

        // Handle stream cleanup
        request.signal.addEventListener('abort', () => {
          isActive = false;
          clearInterval(streamInterval);
          controller.close();
        });
      },

      cancel() {
        isActive = false;
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control',
      },
    });

  } catch (error) {
    console.error('Analytics streaming setup error:', error);
    
    if (error instanceof Error && error.message.includes('Admin required')) {
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        error: 'Failed to establish analytics stream',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * Get real-time analytics data for streaming
 */
async function getRealTimeAnalyticsData(organizationId?: string | null, metrics: string[] = []) {
  const now = Date.now();
  const fiveMinutesAgo = now - (5 * 60 * 1000);

  // Get recent metrics
  const recentMetrics = await advancedAnalyticsEngine.executeQuery({
    metrics: metrics.length > 0 ? metrics : [],
    timeRange: { start: fiveMinutesAgo, end: now },
    granularity: 'minute',
    organizationId: organizationId || undefined,
    limit: 50,
  });

  // Get latest insights
  const insights = await advancedAnalyticsEngine.generatePredictiveInsights(
    organizationId || undefined
  );

  // Detect any new anomalies
  const anomalies = await advancedAnalyticsEngine.detectAnomalies(
    organizationId || undefined
  );

  // Get system performance
  const systemStatus = advancedAnalyticsEngine.getSystemStatus();

  // Calculate live statistics
  const liveStats = {
    activeUsers: Math.floor(Math.random() * 500) + 100, // Mock data
    requestsPerMinute: Math.floor(Math.random() * 1000) + 200,
    errorRate: Math.random() * 5, // 0-5%
    avgResponseTime: Math.random() * 200 + 50, // 50-250ms
    cacheHitRate: Math.random() * 40 + 60, // 60-100%
  };

  // Prepare recent alerts (mock data - replace with real alert system)
  const recentAlerts = anomalies.slice(0, 5).map((anomaly: any) => ({
    id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'anomaly',
    severity: anomaly.severity || 'warning',
    title: `Anomaly detected: ${anomaly.metricId || 'unknown metric'}`,
    message: anomaly.description || 'Anomaly detected in system metrics',
    timestamp: anomaly.timestamp,
    organizationId: anomaly.organizationId,
  }));

  return {
    metrics: recentMetrics.data.slice(-10), // Last 10 data points
    insights: insights.slice(0, 3), // Top 3 recent insights
    anomalies: anomalies.slice(0, 3), // Top 3 recent anomalies
    alerts: recentAlerts,
    liveStats,
    systemStatus: {
      cacheSize: systemStatus.cacheSize,
      lastUpdate: Date.now(),
      initialized: systemStatus.initialized,
    },
    timestamp: now,
  };
}