/**
 * Incident Feed Types
 * 
 * Types for the public/external incident feed API.
 * These are SAFE types that exclude admin-only fields.
 */

/**
 * Safe incident shape for external consumption
 * Excludes admin-only fields like internal_notes, processing_logs, etc.
 */
export interface IncidentFeedItem {
  id: string;
  title: string;
  status: "open" | "investigating" | "monitoring" | "resolved";
  severity?: "low" | "medium" | "high" | "critical";
  source?: string;             // e.g. "webhook", "capacity", "predictive"
  started_at?: string;         // ISO timestamp
  updated_at?: string;         // ISO timestamp
  short_description?: string;  // Latest timeline entry or incident description
  affected_components?: string[];
}

/**
 * Timeline entry for expanded feed responses
 * Safe subset of incident timeline data
 */
export interface IncidentFeedTimelineItem {
  timestamp: string;           // ISO timestamp
  type: "status_change" | "update" | "resolution";
  message: string;
}

/**
 * API response structure for incident feed
 */
export interface IncidentFeedResponse {
  ok: true;
  incidents: IncidentFeedItem[];
  count: number;
  timestamp: string;           // ISO timestamp of response
  filters_applied?: {
    status?: string[];
    since?: string;
    limit?: number;
  };
}

/**
 * Error response structure
 */
export interface IncidentFeedErrorResponse {
  ok: false;
  error: "unauthorized" | "invalid-parameters" | "internal-error";
  message?: string;
}

/**
 * Query parameters for incident feed API
 */
export interface IncidentFeedQuery {
  status?: string;             // comma-separated: "open,investigating"
  limit?: string;              // number as string
  since?: string;              // ISO timestamp
  token?: string;              // optional auth token
  include?: string;            // comma-separated: "timeline,components"
}