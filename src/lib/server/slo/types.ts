/**
 * SLO Types and Interfaces
 * 
 * Service Level Objective definitions, burn rate calculations,
 * and credit issuance interfaces for reliability enforcement.
 */

export interface SLODefinition {
  id: string;
  name: string;
  description: string;
  type: 'latency' | 'availability' | 'error_rate' | 'throughput';
  target: number; // percentage (0-100) or milliseconds for latency
  window: 'rolling_24h' | 'rolling_7d' | 'rolling_30d' | 'calendar_month';
  burn_rate_thresholds: {
    alert: number; // percentage of error budget consumed
    critical: number; // percentage of error budget consumed
  };
  credit_policy: {
    enabled: boolean;
    credit_per_breach: number; // dollars
    max_credits_per_month: number;
    qualifying_breach_duration: number; // minutes
  };
  measurement: {
    metric_source: 'firestore' | 'logs' | 'synthetic';
    query_config: Record<string, any>;
  };
  organization_id?: string;
  enabled: boolean;
  created_at: number;
  updated_at: number;
}

export interface SLOMeasurement {
  id: string;
  slo_id: string;
  timestamp: number;
  value: number; // actual measurement (latency in ms, percentage for others)
  success: boolean; // whether this measurement meets the SLO target
  metadata: Record<string, any>;
}

export interface SLOBurnRate {
  slo_id: string;
  window_start: number;
  window_end: number;
  total_requests: number;
  failed_requests: number;
  error_budget_consumed: number; // percentage (0-100)
  burn_rate: number; // rate of error budget consumption
  projection: {
    budget_exhausted_at?: number;
    days_remaining?: number;
  };
  status: 'healthy' | 'warning' | 'critical';
  calculated_at: number;
}

export interface SLOViolation {
  id: string;
  slo_id: string;
  started_at: number;
  ended_at?: number;
  duration_minutes?: number;
  severity: 'warning' | 'critical';
  burn_rate_peak: number;
  error_budget_consumed: number;
  impact_description: string;
  root_cause?: string;
  credit_issued: boolean;
  credit_amount?: number;
  organization_id?: string;
  status: 'active' | 'resolved' | 'acknowledged';
  created_at: number;
}

export interface BillingCredit {
  id: string;
  organization_id: string;
  customer_email?: string;
  amount: number; // dollars
  reason: 'slo_breach' | 'service_issue' | 'manual_adjustment';
  reference_id: string; // slo_violation_id or incident_id
  reference_type: 'slo_violation' | 'incident' | 'manual';
  description: string;
  issued_at: number;
  issued_by: 'system' | string; // 'system' for automated, email for manual
  applied_to_invoice?: boolean;
  invoice_id?: string;
  expires_at?: number;
  status: 'pending' | 'applied' | 'expired' | 'cancelled';
  metadata: Record<string, any>;
}

export interface SLODashboardData {
  overall_health: 'healthy' | 'warning' | 'critical';
  total_slos: number;
  active_violations: number;
  credits_issued_this_month: number;
  error_budget_summary: {
    consumed_percentage: number;
    remaining_days: number;
    burn_rate_trend: 'improving' | 'stable' | 'degrading';
  };
  slo_performance: Array<{
    slo_id: string;
    name: string;
    current_availability: number;
    target: number;
    status: 'healthy' | 'warning' | 'critical';
    burn_rate: number;
    time_to_exhaustion?: number;
  }>;
}

export interface SLOConfiguration {
  global_settings: {
    default_window: SLODefinition['window'];
    auto_credit_enabled: boolean;
    max_monthly_credits: number;
    notification_channels: string[];
  };
  burn_rate_windows: {
    short: number; // minutes for short-term burn rate
    long: number; // minutes for long-term burn rate
  };
  credit_policies: {
    minimum_violation_duration: number; // minutes
    credit_calculation_method: 'fixed' | 'proportional' | 'tiered';
    approval_required_above: number; // dollar amount
  };
}