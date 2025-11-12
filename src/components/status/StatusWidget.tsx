/**
 * Status Widget Component
 * 
 * Reusable status display widget that can be embedded in status pages,
 * homepage, client portal, or anywhere system status needs to be shown.
 */

import { IncidentFeedItem } from '@/types/incidents';
import { getSystemStatus, formatIncidentTime } from '@/lib/publicIncidents';

interface StatusWidgetProps {
  incidents: IncidentFeedItem[];
  title?: string;
  compact?: boolean;
  showDescription?: boolean;
  maxIncidents?: number;
}

export default function StatusWidget({ 
  incidents, 
  title = "System Status", 
  compact = false,
  showDescription = true,
  maxIncidents = 3
}: StatusWidgetProps) {
  const systemStatus = getSystemStatus(incidents);
  
  // Get active incidents for display
  const activeIncidents = incidents
    .filter(incident => 
      incident.status === 'open' || 
      incident.status === 'investigating' || 
      incident.status === 'monitoring'
    )
    .slice(0, maxIncidents);
  
  const statusColors = {
    green: 'bg-green-500 border-green-600 text-green-50',
    amber: 'bg-amber-500 border-amber-600 text-amber-50',
    red: 'bg-red-500 border-red-600 text-red-50',
  };
  
  const statusBadgeColors = {
    open: 'bg-red-100 text-red-800 border-red-200',
    investigating: 'bg-amber-100 text-amber-800 border-amber-200',
    monitoring: 'bg-blue-100 text-blue-800 border-blue-200',
    resolved: 'bg-green-100 text-green-800 border-green-200',
  };
  
  const severityColors = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-amber-100 text-amber-800',
    low: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className={`${compact ? 'p-4' : 'p-6'} bg-white border border-gray-200 rounded-lg shadow-sm`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-semibold text-gray-900`}>
          {title}
        </h3>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusColors[systemStatus.color]}`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${systemStatus.color === 'green' ? 'bg-green-200' : systemStatus.color === 'amber' ? 'bg-amber-200' : 'bg-red-200'}`} />
          {systemStatus.message}
        </div>
      </div>
      
      {/* Active Incidents */}
      {activeIncidents.length > 0 ? (
        <div className="space-y-3">
          {activeIncidents.map((incident) => (
            <div key={incident.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 text-sm">
                  {incident.title}
                </h4>
                <div className="flex gap-2 ml-3">
                  {incident.severity && (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${severityColors[incident.severity]}`}>
                      {incident.severity}
                    </span>
                  )}
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusBadgeColors[incident.status]}`}>
                    {incident.status}
                  </span>
                </div>
              </div>
              
              {showDescription && incident.short_description && !compact && (
                <p className="text-sm text-gray-600 mb-2">
                  {incident.short_description}
                </p>
              )}
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  Started {formatIncidentTime(incident.started_at)}
                </span>
                <span>
                  Updated {formatIncidentTime(incident.updated_at)}
                </span>
              </div>
              
              {incident.affected_components && incident.affected_components.length > 0 && (
                <div className="mt-2">
                  <span className="text-xs text-gray-500">Affected: </span>
                  <span className="text-xs text-gray-700">
                    {incident.affected_components.join(', ')}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            No active incidents reported
          </p>
        </div>
      )}
      
      {/* Show count if there are more incidents */}
      {activeIncidents.length >= maxIncidents && incidents.filter(i => i.status !== 'resolved').length > maxIncidents && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            +{incidents.filter(i => i.status !== 'resolved').length - maxIncidents} more active incidents
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Compact status indicator for inline use
 */
export function StatusIndicator({ incidents }: { incidents: IncidentFeedItem[] }) {
  const systemStatus = getSystemStatus(incidents);
  
  const statusColors = {
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  };
  
  return (
    <div className="inline-flex items-center">
      <div className={`w-2 h-2 rounded-full mr-2 ${statusColors[systemStatus.color]}`} />
      <span className="text-sm text-gray-700">{systemStatus.message}</span>
    </div>
  );
}

/**
 * Minimal status bar for headers/footers
 */
export function StatusBar({ incidents }: { incidents: IncidentFeedItem[] }) {
  const systemStatus = getSystemStatus(incidents);
  const activeCount = incidents.filter(i => 
    i.status === 'open' || i.status === 'investigating' || i.status === 'monitoring'
  ).length;
  
  const bgColors = {
    green: 'bg-green-50 border-green-200',
    amber: 'bg-amber-50 border-amber-200',
    red: 'bg-red-50 border-red-200',
  };
  
  const textColors = {
    green: 'text-green-800',
    amber: 'text-amber-800',
    red: 'text-red-800',
  };
  
  return (
    <div className={`px-4 py-2 border-l-4 ${bgColors[systemStatus.color]}`}>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${textColors[systemStatus.color]}`}>
          {systemStatus.message}
        </span>
        {activeCount > 0 && (
          <span className={`text-xs ${textColors[systemStatus.color]}`}>
            {activeCount} active incident{activeCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
}