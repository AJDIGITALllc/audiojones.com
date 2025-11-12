'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Activity, 
  Zap, 
  GitBranch, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  RefreshCw,
  Play,
  Pause,
  Settings
} from 'lucide-react';

interface StreamEvent {
  id: string;
  type: string;
  source: string;
  timestamp: number;
  data: Record<string, any>;
  metadata: {
    correlationId?: string;
    causationId?: string;
    organizationId?: string;
    version: number;
  };
}

interface StreamMetrics {
  eventsProcessed: number;
  eventsPerSecond: number;
  correlationsActive: number;
  workflowsTriggered: number;
  avgProcessingTime: number;
  errorRate: number;
  uptime: number;
  bufferedEvents: number;
  activeCorrelations: number;
  registeredPatterns: number;
}

interface EventPattern {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  actionsCount: number;
  lastTriggered?: number;
}

export default function EventStreamingDashboard() {
  const [metrics, setMetrics] = useState<StreamMetrics | null>(null);
  const [recentEvents, setRecentEvents] = useState<StreamEvent[]>([]);
  const [patterns, setPatterns] = useState<EventPattern[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  // Fetch metrics and patterns
  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null);

      // Fetch metrics
      const metricsResponse = await fetch('/api/admin/streaming?action=metrics');
      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json();
        setMetrics(metricsData.metrics);
      }

      // Fetch recent events
      const eventsResponse = await fetch('/api/admin/streaming?action=query_events&limit=20');
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        setRecentEvents(eventsData.events || []);
      }

      // Mock patterns data (replace with actual API call)
      const mockPatterns: EventPattern[] = [
        {
          id: 'pattern_user_signup_welcome',
          name: 'User Signup Welcome Flow',
          description: 'Trigger welcome email and analytics when user signs up',
          enabled: true,
          actionsCount: 2,
          lastTriggered: Date.now() - 3600000,
        },
        {
          id: 'pattern_payment_failure_recovery',
          name: 'Payment Failure Recovery',
          description: 'Handle payment failures with retry and notification',
          enabled: true,
          actionsCount: 2,
          lastTriggered: Date.now() - 7200000,
        },
        {
          id: 'pattern_order_completion',
          name: 'Order Completion Workflow',
          description: 'Process completed orders with notifications and analytics',
          enabled: false,
          actionsCount: 3,
        },
      ];
      setPatterns(mockPatterns);

    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Start/stop real-time streaming
  const toggleStreaming = useCallback(() => {
    if (isStreaming && eventSource) {
      eventSource.close();
      setEventSource(null);
      setIsStreaming(false);
    } else {
      const newEventSource = new EventSource('/api/admin/streaming/events?includeMetrics=true');
      
      newEventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'event') {
            setRecentEvents(prev => [data.event, ...prev.slice(0, 19)]);
          } else if (data.type === 'metrics') {
            setMetrics(data.metrics);
          }
        } catch (error) {
          console.error('Failed to parse streaming data:', error);
        }
      };

      newEventSource.onerror = (error) => {
        console.error('Event streaming error:', error);
        setError('Real-time streaming connection lost');
        setIsStreaming(false);
      };

      setEventSource(newEventSource);
      setIsStreaming(true);
    }
  }, [isStreaming, eventSource]);

  // Test event publishing
  const publishTestEvent = async () => {
    try {
      const response = await fetch('/api/admin/streaming', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'publish_event',
          data: {
            type: 'test.event',
            source: 'dashboard',
            data: {
              message: 'Test event from dashboard',
              timestamp: Date.now(),
            },
            metadata: {
              version: 1,
            },
          },
        }),
      });

      if (response.ok) {
        console.log('Test event published successfully');
      }
    } catch (error) {
      console.error('Failed to publish test event:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh every 30 seconds if not streaming
    const interval = setInterval(() => {
      if (!isStreaming) {
        fetchDashboardData();
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [fetchDashboardData, isStreaming, eventSource]);

  if (loading && !metrics) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Activity className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-600">Loading event streaming dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !metrics) {
    return (
      <div className="p-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              Streaming Dashboard Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={fetchDashboardData} 
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

  const formatUptime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Streaming & Processing</h1>
          <p className="text-gray-600">Real-time event correlation and automated workflow triggers</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button 
            onClick={toggleStreaming}
            className={`px-4 py-2 rounded-md flex items-center ${
              isStreaming 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isStreaming ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Stop Stream
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Stream
              </>
            )}
          </button>
          
          <button 
            onClick={publishTestEvent}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Zap className="w-4 h-4 mr-2" />
            Test Event
          </button>
          
          <button 
            onClick={fetchDashboardData}
            disabled={loading}
            className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md flex items-center"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Events Processed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {metrics?.eventsProcessed?.toLocaleString() || '0'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {metrics?.eventsPerSecond?.toFixed(2) || '0'} events/sec
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <GitBranch className="w-4 h-4 mr-2" />
              Active Correlations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {metrics?.activeCorrelations || '0'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {metrics?.registeredPatterns || '0'} patterns registered
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Workflows Triggered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {metrics?.workflowsTriggered || '0'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {metrics?.errorRate?.toFixed(2) || '0'}% error rate
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              System Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {metrics?.uptime ? formatUptime(metrics.uptime) : '0s'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {metrics?.bufferedEvents || '0'} buffered events
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Recent Events
              </span>
              {isStreaming && (
                <Badge className="bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Live
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Latest events in the stream ({recentEvents.length} shown)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Badge className="bg-blue-100 text-blue-800 mr-2">
                        {event.type}
                      </Badge>
                      <span className="text-sm text-gray-600">{event.source}</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  {event.metadata.correlationId && (
                    <div className="text-xs text-gray-500 mb-2">
                      Correlation: {event.metadata.correlationId}
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-700">
                    {JSON.stringify(event.data).length > 100 
                      ? JSON.stringify(event.data).substring(0, 100) + '...'
                      : JSON.stringify(event.data)
                    }
                  </div>
                </div>
              ))}
              
              {recentEvents.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No recent events available
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Event Patterns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Event Patterns
            </CardTitle>
            <CardDescription>
              Configured event correlation patterns and workflows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patterns.map((pattern) => (
                <div key={pattern.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{pattern.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${
                        pattern.enabled 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {pattern.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                      {pattern.enabled ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{pattern.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{pattern.actionsCount} actions configured</span>
                    {pattern.lastTriggered && (
                      <span>
                        Last triggered: {new Date(pattern.lastTriggered).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              
              {patterns.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No event patterns configured
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Event Streaming Engine active • Last updated: {new Date().toLocaleTimeString()}</p>
        <p className="mt-1">Phase 3.2: Event Streaming & Processing • Enterprise Build</p>
      </div>
    </div>
  );
}