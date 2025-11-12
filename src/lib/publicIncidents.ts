/**
 * Public Incidents Helper
 * 
 * Client-side helper for fetching incident data from our existing
 * /api/incidents endpoint. Used by public status page and widgets.
 */

import { IncidentFeedItem, IncidentFeedResponse } from '@/types/incidents';

/**
 * Fetch public incidents from our external incident feed
 * 
 * @param options.limit - Maximum number of incidents to return (default 25)
 * @param options.status - Filter by status (e.g. ["open", "investigating"])
 * @param options.since - ISO timestamp to fetch incidents since
 * @param options.baseUrl - Base URL for API calls (for SSR)
 * @returns Array of sanitized incident feed items
 */
export async function fetchPublicIncidents(options: {
  limit?: number;
  status?: string[];
  since?: string;
  baseUrl?: string;
} = {}): Promise<IncidentFeedItem[]> {
  const { limit = 25, status, since, baseUrl = '' } = options;
  
  try {
    const params = new URLSearchParams();
    if (limit) params.set('limit', limit.toString());
    if (status?.length) params.set('status', status.join(','));
    if (since) params.set('since', since);
    
    const url = `${baseUrl}/api/incidents?${params.toString()}`;
    
    const response = await fetch(url, {
      cache: 'no-store', // Always get fresh data for status
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch incidents: ${response.status} ${response.statusText}`);
      return [];
    }
    
    const data: IncidentFeedResponse = await response.json();
    
    if (!data.ok || !Array.isArray(data.incidents)) {
      console.error('Invalid incident feed response:', data);
      return [];
    }
    
    return data.incidents;
  } catch (error) {
    console.error('Error fetching public incidents:', error);
    return [];
  }
}

/**
 * Get current system status based on active incidents
 * 
 * @param incidents - Array of incident feed items
 * @returns Object with overall status and messaging
 */
export function getSystemStatus(incidents: IncidentFeedItem[]) {
  const activeIncidents = incidents.filter(incident => 
    incident.status === 'open' || 
    incident.status === 'investigating' || 
    incident.status === 'monitoring'
  );
  
  if (activeIncidents.length === 0) {
    return {
      status: 'operational' as const,
      message: 'All systems operational',
      color: 'green' as const,
      severity: 'none' as const,
    };
  }
  
  // Determine worst severity among active incidents
  const hasCritical = activeIncidents.some(i => i.severity === 'critical');
  const hasHigh = activeIncidents.some(i => i.severity === 'high');
  const hasMedium = activeIncidents.some(i => i.severity === 'medium');
  
  if (hasCritical) {
    return {
      status: 'major_outage' as const,
      message: 'Major service disruption',
      color: 'red' as const,
      severity: 'critical' as const,
    };
  } else if (hasHigh) {
    return {
      status: 'partial_outage' as const,
      message: 'Service disruption',
      color: 'red' as const,
      severity: 'high' as const,
    };
  } else if (hasMedium) {
    return {
      status: 'degraded' as const,
      message: 'Degraded service',
      color: 'amber' as const,
      severity: 'medium' as const,
    };
  } else {
    return {
      status: 'minor_issues' as const,
      message: 'Minor issues detected',
      color: 'amber' as const,
      severity: 'low' as const,
    };
  }
}

/**
 * Filter incidents to only recent ones (last N days)
 * 
 * @param incidents - Array of incident feed items
 * @param days - Number of days to look back (default 7)
 * @returns Filtered incidents array
 */
export function getRecentIncidents(incidents: IncidentFeedItem[], days: number = 7): IncidentFeedItem[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  const cutoffTimestamp = cutoffDate.toISOString();
  
  return incidents.filter(incident => {
    const incidentTime = incident.updated_at || incident.started_at;
    return incidentTime && incidentTime >= cutoffTimestamp;
  });
}

/**
 * Format incident timestamp for display
 * 
 * @param timestamp - ISO timestamp string
 * @returns Human readable time string
 */
export function formatIncidentTime(timestamp?: string): string {
  if (!timestamp) return 'Unknown time';
  
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  } catch (error) {
    return 'Invalid date';
  }
}