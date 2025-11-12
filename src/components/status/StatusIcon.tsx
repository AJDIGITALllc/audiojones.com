/**
 * Status Icon Component
 * 
 * Reusable icon component for system status indicators.
 */

'use client';

import { SystemStatusType, getStatusIconPath } from '@/lib/statusToTone';

interface StatusIconProps {
  status: SystemStatusType;
  className?: string;
}

export function StatusIcon({ status, className = "w-4 h-4" }: StatusIconProps) {
  const iconData = getStatusIconPath(status);
  
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox={iconData.viewBox}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d={iconData.path} 
      />
    </svg>
  );
}