/**
 * Service Notices Component
 * 
 * Shows active incidents and service notices in the client portal.
 * Only displays when there are active incidents to avoid clutter.
 */

'use client';

import Link from 'next/link';
import { useSystemStatus } from '@/hooks/useSystemStatus';
import { getStatusCardStyles } from '@/lib/statusToTone';
import { StatusIcon } from '@/components/status/StatusIcon';
import { IncidentFeedItem } from '@/types/incidents';
import { AlertCircle, Clock, ExternalLink } from 'lucide-react';

export function ServiceNotices() {
  const { overallStatus, activeIncidents, loading } = useSystemStatus();
  
  // Don't render anything if no active incidents
  if (loading || activeIncidents.length === 0) {
    return null;
  }
  
  const styles = getStatusCardStyles(overallStatus);
  
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.indicator} />
        <h3 className={styles.title}>
          Current Service Notices
        </h3>
        <Link 
          href="/status"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center"
        >
          View Status Page
          <ExternalLink className="w-3 h-3 ml-1" />
        </Link>
      </div>
      
      <p className={styles.message}>
        {overallStatus === 'degraded' 
          ? 'Some services may be experiencing issues'
          : 'One or more services are affected'}
      </p>
      
      <div className="mt-4 space-y-3">
        {activeIncidents.slice(0, 3).map((incident: IncidentFeedItem) => (
          <IncidentNotice key={incident.id} incident={incident} />
        ))}
        
        {activeIncidents.length > 3 && (
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <Link 
              href="/status"
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View {activeIncidents.length - 3} more incidents →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Individual incident notice
 */
function IncidentNotice({ incident }: { incident: IncidentFeedItem }) {
  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200 border-red-200 dark:border-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200 border-orange-200 dark:border-orange-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200 border-amber-200 dark:border-amber-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200 border-gray-200 dark:border-gray-800';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200 border-red-200 dark:border-red-800';
      case 'investigating':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200 border-amber-200 dark:border-amber-800';
      case 'monitoring':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200 border-gray-200 dark:border-gray-800';
    }
  };
  
  const formatTime = (timestamp?: string) => {
    if (!timestamp) return 'Unknown time';
    
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      
      if (diffHours < 1) {
        const diffMins = Math.floor(diffMs / (1000 * 60));
        return `${diffMins}m ago`;
      } else if (diffHours < 24) {
        return `${diffHours}h ago`;
      } else {
        return date.toLocaleDateString();
      }
    } catch (error) {
      return 'Unknown time';
    }
  };
  
  return (
    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
          {incident.title}
        </h4>
        <div className="flex gap-1 ml-2">
          {incident.severity && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
              {incident.severity}
            </span>
          )}
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(incident.status)}`}>
            {incident.status}
          </span>
        </div>
      </div>
      
      {incident.short_description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {incident.short_description}
        </p>
      )}
      
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          <span>Started {formatTime(incident.started_at)}</span>
        </div>
        <span>Updated {formatTime(incident.updated_at)}</span>
      </div>
      
      {incident.affected_components && incident.affected_components.length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-500">Affected: </span>
          <span className="text-xs text-gray-700 dark:text-gray-300">
            {incident.affected_components.join(', ')}
          </span>
        </div>
      )}
    </div>
  );
}