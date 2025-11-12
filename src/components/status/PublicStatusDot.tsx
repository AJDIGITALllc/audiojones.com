/**
 * Public Status Dot
 * 
 * Minimal status indicator for the main site header.
 * Shows just a colored dot with status text and links to full status page.
 */

'use client';

import Link from 'next/link';
import { useSystemStatusIndicator } from '@/hooks/useSystemStatus';
import { getStatusIndicatorStyles } from '@/lib/statusToTone';

export function PublicStatusDot() {
  const { status, loading } = useSystemStatusIndicator();
  
  if (loading) {
    return (
      <Link 
        href="/status" 
        className="flex items-center text-sm text-white/60 hover:text-white/80 transition no-underline"
      >
        <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse mr-2" />
        Status
      </Link>
    );
  }
  
  const styles = getStatusIndicatorStyles(status);
  
  return (
    <Link 
      href="/status"
      className="flex items-center text-sm text-white/80 hover:text-white transition no-underline"
      title={`System status: ${status}. Click to view details.`}
    >
      <div className={`w-2 h-2 rounded-full mr-2 ${
        status === 'operational' ? 'bg-green-400' :
        status === 'degraded' ? 'bg-amber-400' :
        'bg-red-400'
      }`} />
      Status
    </Link>
  );
}