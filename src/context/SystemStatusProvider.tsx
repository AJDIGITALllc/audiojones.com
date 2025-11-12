/**
 * System Status Context Provider
 * 
 * Provides shared system status data across the portal application.
 * Uses the existing useSystemStatus hook internally and exposes data via React context.
 * This prevents multiple API calls from different components on the same page.
 */

'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useSystemStatus, SystemStatus } from '@/hooks/useSystemStatus';

// Create the context
const SystemStatusContext = createContext<SystemStatus | undefined>(undefined);

interface SystemStatusProviderProps {
  children: ReactNode;
}

/**
 * Provider component that wraps the portal layout
 * Polls for status updates every 5 minutes
 */
export function SystemStatusProvider({ children }: SystemStatusProviderProps) {
  // Use existing hook with auto-refresh enabled
  const statusData = useSystemStatus({
    autoRefresh: true,
    endpoint: '/api/public/incidents'
  });

  return (
    <SystemStatusContext.Provider value={statusData}>
      {children}
    </SystemStatusContext.Provider>
  );
}

/**
 * Hook to consume system status from context
 * Must be used within a SystemStatusProvider
 */
export function useSystemStatusContext(): SystemStatus {
  const context = useContext(SystemStatusContext);
  
  if (context === undefined) {
    throw new Error(
      'useSystemStatusContext must be used within a SystemStatusProvider. ' +
      'Make sure your component is wrapped with <SystemStatusProvider>.'
    );
  }
  
  return context;
}

/**
 * Hook to get only the status indicator data from context
 * Useful for components that only need the overall status
 */
export function useStatusIndicatorContext(): {
  status: SystemStatus['overallStatus'];
  loading: boolean;
  hasActiveIncidents: boolean;
} {
  const { overallStatus, loading, activeIncidents } = useSystemStatusContext();
  
  return {
    status: overallStatus,
    loading,
    hasActiveIncidents: activeIncidents.length > 0,
  };
}

/**
 * Hook to check if system status should show degraded/outage banners
 */
export function useStatusAlerts(): {
  shouldShowBanner: boolean;
  bannerType: 'degraded' | 'outage' | null;
  primaryIncident?: SystemStatus['activeIncidents'][0];
  incidentCount: number;
} {
  const { overallStatus, activeIncidents } = useSystemStatusContext();
  
  const shouldShowBanner = overallStatus === 'degraded' || overallStatus === 'outage';
  const bannerType = shouldShowBanner ? overallStatus : null;
  const primaryIncident = activeIncidents[0]; // Most recent active incident
  const incidentCount = activeIncidents.length;
  
  return {
    shouldShowBanner,
    bannerType,
    primaryIncident,
    incidentCount,
  };
}