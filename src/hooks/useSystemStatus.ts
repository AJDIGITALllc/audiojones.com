/**
 * System Status Hook
 * 
 * Provides real-time system status information by fetching from the public incidents API.
 * Used across admin and client portals to show current system health.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { IncidentFeedItem } from '@/types/incidents';

export interface SystemStatus {
  loading: boolean;
  error?: string;
  overallStatus: 'operational' | 'degraded' | 'outage';
  incidents: IncidentFeedItem[];
  activeIncidents: IncidentFeedItem[];
  lastUpdated?: string;
  refresh: () => void;
}

/**
 * Hook to fetch and monitor system status
 * 
 * @param options.autoRefresh - Whether to auto-refresh every 5 minutes (default: true)
 * @param options.endpoint - API endpoint to use (default: /api/public/incidents)
 * @returns SystemStatus object with current state and refresh function
 */
export function useSystemStatus(options: {
  autoRefresh?: boolean;
  endpoint?: string;
} = {}): SystemStatus {
  const { autoRefresh = true, endpoint = '/api/public/incidents' } = options;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [incidents, setIncidents] = useState<IncidentFeedItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>();

  // Determine overall status from incidents
  const getOverallStatus = useCallback((incidents: IncidentFeedItem[]): SystemStatus['overallStatus'] => {
    const activeIncidents = incidents.filter(incident => 
      incident.status === 'open' || 
      incident.status === 'investigating' || 
      incident.status === 'monitoring'
    );

    if (activeIncidents.length === 0) {
      return 'operational';
    }

    // Check for critical or high severity incidents
    const hasCritical = activeIncidents.some(i => i.severity === 'critical');
    const hasHigh = activeIncidents.some(i => i.severity === 'high');
    
    if (hasCritical) {
      return 'outage';
    } else if (hasHigh || activeIncidents.length > 2) {
      return 'outage';
    } else {
      return 'degraded';
    }
  }, []);

  // Fetch status data
  const fetchStatus = useCallback(async () => {
    try {
      setError(undefined);
      
      const response = await fetch(endpoint, {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.ok || !Array.isArray(data.incidents)) {
        throw new Error('Invalid response format');
      }

      setIncidents(data.incidents);
      setLastUpdated(new Date().toISOString());
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch status';
      setError(errorMessage);
      console.warn('Failed to fetch system status:', errorMessage);
      
      // On error, maintain existing incidents but mark as stale
      // This provides graceful degradation
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // Auto-refresh effect
  useEffect(() => {
    // Initial fetch
    fetchStatus();

    if (!autoRefresh) return;

    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchStatus, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchStatus, autoRefresh]);

  // Calculate derived state
  const overallStatus = getOverallStatus(incidents);
  const activeIncidents = incidents.filter(incident => 
    incident.status === 'open' || 
    incident.status === 'investigating' || 
    incident.status === 'monitoring'
  );

  return {
    loading,
    error,
    overallStatus,
    incidents,
    activeIncidents,
    lastUpdated,
    refresh: fetchStatus,
  };
}

/**
 * Lightweight hook for just the overall status indicator
 * Useful for header components that only need the status color
 */
export function useSystemStatusIndicator(): {
  status: SystemStatus['overallStatus'];
  loading: boolean;
  hasActiveIncidents: boolean;
} {
  const { overallStatus, loading, activeIncidents } = useSystemStatus({
    autoRefresh: true,
  });

  return {
    status: overallStatus,
    loading,
    hasActiveIncidents: activeIncidents.length > 0,
  };
}