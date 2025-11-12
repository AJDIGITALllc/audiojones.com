'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, TrendingUp, TrendingDown, Activity, BarChart3, RefreshCw } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock data for now - replace with actual API call
      const mockData = {
        performance: {
          totalQueries: 12543,
          avgResponseTime: 145.2,
          cacheHitRate: 78.5,
          activeConnections: 42
        },
        insights: [
          {
            id: '1',
            metric: 'user_growth',
            severity: 'info' as const,
            description: 'User growth trending upward by 15% this week',
            timestamp: Date.now() - 3600000,
            type: 'trend_analysis'
          },
          {
            id: '2',
            metric: 'response_time',
            severity: 'warning' as const,
            description: 'Response times increased by 8% in the last hour',
            timestamp: Date.now() - 1800000,
            type: 'performance_alert'
          },
          {
            id: '3',
            metric: 'cache_performance',
            severity: 'critical' as const,
            description: 'Cache hit rate dropped below 75% threshold',
            timestamp: Date.now() - 900000,
            type: 'anomaly_detection'
          }
        ],
        metrics: [
          {
            id: '1',
            name: 'Active Users',
            value: 1247,
            timestamp: Date.now()
          },
          {
            id: '2',
            name: 'API Requests/min',
            value: 234,
            timestamp: Date.now()
          },
          {
            id: '3',
            name: 'Error Rate %',
            value: 2.3,
            timestamp: Date.now()
          }
        ]
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalyticsData(mockData);
    } catch (err) {
      console.error('Failed to fetch analytics data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const handleRefresh = () => {
    fetchAnalyticsData();
  };

  if (loading && !analyticsData) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Activity className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-600">Loading analytics data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Analytics Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={handleRefresh} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Analytics</h1>
          <p className="text-gray-600">Real-time insights and predictive analytics for your business</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md flex items-center"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {analyticsData?.performance.totalQueries.toLocaleString() || '0'}
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+12.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {analyticsData?.performance.avgResponseTime.toFixed(1) || '0'}ms
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs text-green-600">-8.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Cache Hit Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {analyticsData?.performance.cacheHitRate.toFixed(1) || '0'}%
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+3.1%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {analyticsData?.performance.activeConnections || '0'}
            </div>
            <div className="flex items-center mt-2">
              <Activity className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-xs text-blue-600">Real-time</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Recent Insights
            </CardTitle>
            <CardDescription>
              Latest AI-powered insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData?.insights.map((insight: any) => (
                <div key={insight.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {insight.severity === 'critical' && (
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    )}
                    {insight.severity === 'warning' && (
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    )}
                    {insight.severity === 'info' && (
                      <Activity className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {insight.metric.replace('_', ' ')}
                      </p>
                      <Badge 
                        className={`ml-2 ${
                          insight.severity === 'critical' ? 'bg-red-100 text-red-800' :
                          insight.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {insight.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(insight.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Live Metrics
            </CardTitle>
            <CardDescription>
              Real-time system metrics and performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData?.metrics.map((metric: any) => (
                <div key={metric.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{metric.name}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(metric.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                    </div>
                    <div className="text-xs text-gray-500">
                      Live
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Analytics engine running • Last updated: {new Date().toLocaleTimeString()}</p>
        <p className="mt-1">Phase 3.1: Advanced Analytics Engine • Enterprise Build</p>
      </div>
    </div>
  );
}