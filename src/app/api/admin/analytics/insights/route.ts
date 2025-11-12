/**
 * Analytics Insights API
 * 
 * Generates and manages AI-powered predictive insights including
 * trend analysis, forecasting, recommendations, and anomaly detection.
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
    const organizationId = url.searchParams.get('organizationId');
    const insightType = url.searchParams.get('type') || 'all';
    const timeRange = url.searchParams.get('timeRange') || '30d';
    const limit = parseInt(url.searchParams.get('limit') || '20');

    // Initialize analytics engine if not already done
    if (!advancedAnalyticsEngine.getSystemStatus().initialized) {
      await advancedAnalyticsEngine.initialize();
    }

    let insights = [];

    if (insightType === 'all' || insightType === 'predictive') {
      // Generate predictive insights
      const predictiveInsights = await advancedAnalyticsEngine.generatePredictiveInsights(
        organizationId || undefined
      );
      insights.push(...predictiveInsights);
    }

    if (insightType === 'all' || insightType === 'anomalies') {
      // Detect anomalies
      const anomalies = await advancedAnalyticsEngine.detectAnomalies(
        organizationId || undefined
      );
      insights.push(...anomalies);
    }

    if (insightType === 'all' || insightType === 'trends') {
      // Generate trend analysis
      const trendInsights = await generateTrendInsights(organizationId, timeRange);
      insights.push(...trendInsights);
    }

    if (insightType === 'all' || insightType === 'recommendations') {
      // Generate business recommendations
      const recommendations = await generateBusinessRecommendations(organizationId);
      insights.push(...recommendations);
    }

    // Sort by timestamp and apply limit
    insights.sort((a, b) => b.timestamp - a.timestamp);
    insights = insights.slice(0, limit);

    // Categorize insights for easier consumption
    const categorizedInsights = {
      critical: insights.filter((i: any) => i.severity === 'critical'),
      warning: insights.filter((i: any) => i.severity === 'warning'),
      info: insights.filter((i: any) => i.severity === 'info'),
      positive: insights.filter((i: any) => i.type === 'positive_trend' || i.type === 'opportunity'),
    };

    return NextResponse.json({
      insights,
      categorized: categorizedInsights,
      summary: {
        total: insights.length,
        critical: categorizedInsights.critical.length,
        warnings: categorizedInsights.warning.length,
        opportunities: categorizedInsights.positive.length,
      },
      metadata: {
        organizationId,
        insightType,
        timeRange,
        generatedAt: Date.now(),
        userId: adminUserId,
      },
    });

  } catch (error) {
    console.error('Analytics insights API error:', error);
    
    if (error instanceof Error && error.message.includes('Admin required')) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to generate insights',
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
      case 'acknowledge_insight':
        {
          // Mark insight as acknowledged (would typically update database)
          const insightId = data.insightId;
          
          // Mock acknowledgment - replace with real implementation
          const acknowledged = {
            insightId,
            acknowledgedBy: adminUserId,
            acknowledgedAt: Date.now(),
            status: 'acknowledged',
          };

          return NextResponse.json({ 
            success: true, 
            acknowledged,
            message: 'Insight acknowledged successfully'
          });
        }

      case 'dismiss_insight':
        {
          // Dismiss insight (would typically update database)
          const insightId = data.insightId;
          const reason = data.reason || 'User dismissed';
          
          // Mock dismissal - replace with real implementation
          const dismissed = {
            insightId,
            dismissedBy: adminUserId,
            dismissedAt: Date.now(),
            reason,
            status: 'dismissed',
          };

          return NextResponse.json({ 
            success: true, 
            dismissed,
            message: 'Insight dismissed successfully'
          });
        }

      case 'generate_custom_insight':
        {
          // Generate custom insight based on specific criteria
          const { metric, timeRange, threshold } = data;
          
          const customInsight = await generateCustomInsight({
            metric,
            timeRange,
            threshold,
            organizationId: data.organizationId,
            userId: adminUserId,
          });

          return NextResponse.json({ 
            success: true, 
            insight: customInsight,
            message: 'Custom insight generated successfully'
          });
        }

      case 'export_insights':
        {
          // Export insights data
          const insights = await advancedAnalyticsEngine.generatePredictiveInsights(
            data.organizationId
          );

          const exportData = {
            insights,
            exportedAt: Date.now(),
            exportedBy: adminUserId,
            organizationId: data.organizationId,
            format: data.format || 'json',
          };

          return NextResponse.json({ 
            success: true, 
            exportData,
            message: 'Insights exported successfully'
          });
        }

      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Analytics insights API POST error:', error);
    
    if (error instanceof Error && error.message.includes('Admin required')) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to process insights request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Generate trend analysis insights
 */
async function generateTrendInsights(organizationId?: string | null, timeRange: string = '30d'): Promise<any[]> {
  const insights: any[] = [];
  const now = Date.now();
  
  // Mock trend insights - replace with real trend analysis
  const trendTypes = ['user_growth', 'revenue_trend', 'engagement_rate', 'conversion_rate'];
  
  for (const trendType of trendTypes) {
    const trend = Math.random() > 0.5 ? 'increasing' : 'decreasing';
    const percentage = Math.floor(Math.random() * 50) + 5;
    
    insights.push({
      id: `trend_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'trend_analysis',
      metric: trendType,
      trend,
      percentage,
      severity: trend === 'increasing' ? 'info' : 'warning',
      description: `${trendType.replace('_', ' ')} is ${trend} by ${percentage}% over the last ${timeRange}`,
      timestamp: now - Math.floor(Math.random() * 86400000), // Random time in last 24h
      organizationId: organizationId || undefined,
      metadata: {
        timeRange,
        confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
      },
    });
  }
  
  return insights;
}

/**
 * Generate business recommendations
 */
async function generateBusinessRecommendations(organizationId?: string | null): Promise<any[]> {
  const recommendations: any[] = [];
  const now = Date.now();
  
  // Mock business recommendations - replace with real AI-powered recommendations
  const recommendationTemplates = [
    {
      type: 'optimization',
      title: 'Optimize peak usage times',
      description: 'Consider scaling resources during 2-4 PM when usage peaks by 150%',
      impact: 'high',
      effort: 'medium',
    },
    {
      type: 'cost_saving',
      title: 'Reduce unused capacity',
      description: 'Identified 25% unused capacity during off-peak hours - consider auto-scaling',
      impact: 'medium',
      effort: 'low',
    },
    {
      type: 'growth_opportunity',
      title: 'Expand to high-engagement segments',
      description: 'Users in segment A show 300% higher engagement - focus marketing efforts',
      impact: 'high',
      effort: 'high',
    },
  ];
  
  for (const template of recommendationTemplates) {
    recommendations.push({
      id: `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'recommendation',
      category: template.type,
      title: template.title,
      description: template.description,
      severity: 'info',
      impact: template.impact,
      effort: template.effort,
      timestamp: now - Math.floor(Math.random() * 86400000),
      organizationId: organizationId || undefined,
      metadata: {
        priority: template.impact === 'high' ? 1 : template.impact === 'medium' ? 2 : 3,
        estimated_roi: Math.floor(Math.random() * 200) + 50, // 50-250% ROI
      },
    });
  }
  
  return recommendations;
}

/**
 * Generate custom insight based on specific criteria
 */
async function generateCustomInsight(params: {
  metric: string;
  timeRange: string;
  threshold: number;
  organizationId?: string;
  userId: string;
}): Promise<any> {
  const { metric, timeRange, threshold, organizationId, userId } = params;
  
  // Mock custom insight generation - replace with real analysis
  const value = Math.random() * 1000;
  const isAboveThreshold = value > threshold;
  
  return {
    id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'custom_insight',
    metric,
    value,
    threshold,
    isAboveThreshold,
    severity: isAboveThreshold ? 'warning' : 'info',
    description: `${metric} is ${isAboveThreshold ? 'above' : 'below'} the threshold of ${threshold} with a value of ${value.toFixed(2)}`,
    timestamp: Date.now(),
    organizationId,
    createdBy: userId,
    metadata: {
      timeRange,
      customGenerated: true,
    },
  };
}