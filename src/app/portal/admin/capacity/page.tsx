'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { RefreshCw, Users, Clock, DollarSign, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { formatOpenDate, calculateUtilization, getCapacityStatusColor } from '@/lib/capacity';

interface CapacityData {
  availability: 'open' | 'limited' | 'full';
  is_full: boolean;
  capacity_metrics: {
    total_mrr: number;
    total_hours: number;
    active_retainers: number;
    active_podcast_clients: number;
    slots_filled: number;
    slots_total: number;
  };
  thresholds: {
    min_mrr: number;
    min_retainers: number;
    max_hours: number;
    max_podcast_clients: number;
  };
  next_open_date?: string;
  timestamp: string;
}

export default function AdminCapacityPage() {
  const [capacity, setCapacity] = useState<CapacityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchCapacity = async () => {
    try {
      setError(null);
      const response = await fetch('/api/capacity');
      const data = await response.json();

      if (data.ok) {
        setCapacity(data);
        setLastUpdated(new Date().toLocaleTimeString());
      } else {
        setError(data.message || 'Failed to load capacity data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapacity();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchCapacity, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (availability: string) => {
    switch (availability) {
      case 'open':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'limited':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'full':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeVariant = (availability: string) => {
    switch (availability) {
      case 'open':
        return 'default';
      case 'limited':
        return 'secondary';
      case 'full':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Capacity Management</h1>
          <div className="h-10 w-24 bg-gray-200 animate-pulse rounded" />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-3 w-32 bg-gray-200 animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Capacity Management</h1>
          <button
            onClick={fetchCapacity}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <AlertCircle className="h-12 w-12 mx-auto mb-4" />
              <p className="font-medium">Failed to load capacity data</p>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!capacity) {
    return <div>No capacity data available</div>;
  }

  const mrrUtilization = calculateUtilization(capacity.capacity_metrics.total_mrr, capacity.thresholds.min_mrr);
  const hourUtilization = calculateUtilization(capacity.capacity_metrics.total_hours, capacity.thresholds.max_hours);
  const slotUtilization = calculateUtilization(capacity.capacity_metrics.slots_filled, capacity.capacity_metrics.slots_total);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Capacity Management</h1>
          <p className="text-muted-foreground">
            Last updated: {lastUpdated} • Auto-refreshes every 5 minutes
          </p>
        </div>
        <button
          onClick={fetchCapacity}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Current Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getStatusIcon(capacity.availability)}
            Current Capacity Status
          </CardTitle>
          <CardDescription>
            Business availability for new client engagements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Badge variant={getStatusBadgeVariant(capacity.availability) as any} className="mb-2">
                {capacity.availability.toUpperCase()}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {capacity.next_open_date 
                  ? `Next opening: ${formatOpenDate(capacity.next_open_date)}`
                  : 'No scheduled openings'
                }
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">
                {capacity.capacity_metrics.slots_filled}/{capacity.capacity_metrics.slots_total}
              </p>
              <p className="text-sm text-muted-foreground">Slots filled</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${capacity.capacity_metrics.total_mrr.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {mrrUtilization}% of ${capacity.thresholds.min_mrr.toLocaleString()} minimum
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full ${mrrUtilization >= 100 ? 'bg-green-500' : 'bg-yellow-500'}`}
                style={{ width: `${Math.min(mrrUtilization, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours Committed</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{capacity.capacity_metrics.total_hours}</div>
            <p className="text-xs text-muted-foreground">
              {hourUtilization}% of {capacity.thresholds.max_hours} maximum
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full ${hourUtilization >= 90 ? 'bg-red-500' : hourUtilization >= 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min(hourUtilization, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Retainer Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{capacity.capacity_metrics.active_retainers}</div>
            <p className="text-xs text-muted-foreground">
              {capacity.thresholds.min_retainers} minimum required
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Podcast Clients</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{capacity.capacity_metrics.active_podcast_clients}</div>
            <p className="text-xs text-muted-foreground">
              {capacity.thresholds.max_podcast_clients} maximum allowed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Thresholds Card */}
      <Card>
        <CardHeader>
          <CardTitle>Capacity Thresholds</CardTitle>
          <CardDescription>
            Business rules that determine availability status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Minimum Requirements (for "Open" status)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• MRR: ${capacity.thresholds.min_mrr.toLocaleString()}</li>
                <li>• Retainer clients: {capacity.thresholds.min_retainers}</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Maximum Capacity (triggers "Full" status)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Total hours: {capacity.thresholds.max_hours}</li>
                <li>• Podcast clients: {capacity.thresholds.max_podcast_clients}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}