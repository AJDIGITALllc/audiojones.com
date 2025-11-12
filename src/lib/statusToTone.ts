/**
 * Status Styling Utilities
 * 
 * Provides consistent visual styling for system status across admin and client views.
 * Maps status states to UI colors, badges, and messaging.
 */

export type StatusTone = 'success' | 'warning' | 'destructive';
export type SystemStatusType = 'operational' | 'degraded' | 'outage';

export interface StatusStyling {
  tone: StatusTone;
  badge: string;
  message: string;
  color: {
    bg: string;
    border: string;
    text: string;
    indicator: string;
  };
  icon: 'check' | 'alert' | 'warning';
}

/**
 * Convert system status to consistent UI styling
 */
export function statusToTone(status: SystemStatusType): StatusStyling {
  switch (status) {
    case 'operational':
      return {
        tone: 'success',
        badge: 'All systems operational',
        message: 'All services are running normally',
        color: {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-800 dark:text-green-200',
          indicator: 'bg-green-500',
        },
        icon: 'check',
      };
      
    case 'degraded':
      return {
        tone: 'warning',
        badge: 'Some systems degraded',
        message: 'Some services may be experiencing issues',
        color: {
          bg: 'bg-amber-50 dark:bg-amber-900/20',
          border: 'border-amber-200 dark:border-amber-800',
          text: 'text-amber-800 dark:text-amber-200',
          indicator: 'bg-amber-500',
        },
        icon: 'alert',
      };
      
    case 'outage':
      return {
        tone: 'destructive',
        badge: 'Service interruption',
        message: 'One or more services are currently unavailable',
        color: {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-800 dark:text-red-200',
          indicator: 'bg-red-500',
        },
        icon: 'warning',
      };
      
    default:
      // Fallback to operational
      return statusToTone('operational');
  }
}

/**
 * Get compact status indicator styles for headers/pills
 */
export function getStatusIndicatorStyles(status: SystemStatusType) {
  const styling = statusToTone(status);
  
  return {
    pill: `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styling.color.bg} ${styling.color.text} ${styling.color.border} border`,
    dot: `w-2 h-2 rounded-full ${styling.color.indicator}`,
    text: `text-sm ${styling.color.text}`,
  };
}

/**
 * Get full status card styles for detailed views
 */
export function getStatusCardStyles(status: SystemStatusType) {
  const styling = statusToTone(status);
  
  return {
    card: `p-4 rounded-lg border ${styling.color.bg} ${styling.color.border}`,
    header: `flex items-center space-x-2 mb-2`,
    title: `font-medium ${styling.color.text}`,
    message: `text-sm ${styling.color.text} opacity-80`,
    indicator: `w-3 h-3 rounded-full ${styling.color.indicator}`,
  };
}

/**
 * Get icon path data for status
 */
export function getStatusIconPath(status: SystemStatusType): {
  viewBox: string;
  path: string;
} {
  const styling = statusToTone(status);
  
  switch (styling.icon) {
    case 'check':
      return {
        viewBox: "0 0 24 24",
        path: "M5 13l4 4L19 7"
      };
      
    case 'alert':
      return {
        viewBox: "0 0 24 24", 
        path: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
      };
      
    case 'warning':
      return {
        viewBox: "0 0 24 24",
        path: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      };
      
    default:
      return {
        viewBox: "0 0 24 24",
        path: "M5 13l4 4L19 7"
      };
  }
}

/**
 * Format time since last update for status displays
 */
export function formatStatusTime(timestamp?: string): string {
  if (!timestamp) return 'Never';
  
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleDateString();
  } catch (error) {
    return 'Unknown';
  }
}