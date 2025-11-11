/**
 * Capacity Intelligence & Forecasting Types
 * 
 * TypeScript interfaces for the capacity forecasting system,
 * including API responses, Firestore documents, and UI components.
 */

// Core capacity configuration from Firestore
export interface CapacitySettings {
  slots_total: number;
  min_retainers: number;
  min_mrr: number;
  max_hours: number;
  max_podcast_clients: number;
  preopen_window_days: number;
  updated_at: string;
}

// Client contract data structure
export interface ClientContract {
  id: string;
  client_id: string;
  plan_tier?: string;
  plan_type?: 'retainer' | 'podcast' | 'project';
  monthly_fee?: number;
  hours_committed?: number;
  status: 'active' | 'offboarding' | 'pending_renewal' | 'paused';
  next_open_date?: string;
  updated_at: string;
}

// Current capacity metrics snapshot
export interface CapacityMetrics {
  mrr: number;
  hours: number;
  retainers: number;
  podcast_clients?: number;
  slots_filled?: number;
  status: 'open' | 'limited' | 'full';
}

// Forecast projections and risk assessment
export interface CapacityForecast {
  projected_status: 'open' | 'limited' | 'full';
  projected_open_date: string | null;
  projected_hours_in_7d: number;
  projected_mrr_in_7d: number;
  projected_hours_in_30d?: number;
  projected_mrr_in_30d?: number;
  risk: 'low' | 'medium' | 'high';
  risk_factors?: string[];
}

// Complete forecast API response
export interface ForecastResponse {
  ok: boolean;
  current: CapacityMetrics;
  forecast: CapacityForecast;
  meta: {
    generated_at: string;
    source: string;
    version?: string;
  };
  error?: string;
  message?: string;
}

// Historical capacity snapshot for Firestore
export interface CapacitySnapshot {
  // Copy of forecast data
  current: CapacityMetrics;
  forecast: CapacityForecast;
  meta: {
    generated_at: string;
    source: string;
  };
  // Snapshot metadata
  snapshot_date: string; // YYYY-MM-DD
  saved_at: string;
}

// Capacity alert document structure
export interface CapacityAlert {
  type: 'capacity';
  severity: 'info' | 'warning' | 'error';
  message: string;
  created_at: string;
  source: string;
  resolved?: boolean;
  resolved_at?: string;
  metadata?: {
    current_hours?: number;
    max_hours?: number;
    utilization_percent?: number;
    risk_level?: 'low' | 'medium' | 'high';
  };
}

// UI component props for forecast display
export interface ForecastDisplayProps {
  forecast: ForecastResponse;
  loading?: boolean;
  onRefresh?: () => void;
  compact?: boolean;
}

// Risk assessment calculation result
export interface RiskAssessment {
  level: 'low' | 'medium' | 'high';
  score: number; // 0-100
  factors: Array<{
    factor: string;
    impact: 'positive' | 'negative';
    weight: number;
  }>;
  recommendations?: string[];
}

// Capacity utilization breakdown
export interface UtilizationBreakdown {
  hours: {
    current: number;
    maximum: number;
    percentage: number;
    status: 'healthy' | 'warning' | 'critical';
  };
  mrr: {
    current: number;
    target: number;
    percentage: number;
    status: 'healthy' | 'warning' | 'critical';
  };
  clients: {
    retainers: number;
    podcasts: number;
    total: number;
    capacity_remaining: number;
  };
}

// Historical trend analysis
export interface CapacityTrend {
  period: 'daily' | 'weekly' | 'monthly';
  data_points: Array<{
    date: string;
    hours: number;
    mrr: number;
    risk: 'low' | 'medium' | 'high';
    status: 'open' | 'limited' | 'full';
  }>;
  trend_direction: 'increasing' | 'decreasing' | 'stable';
  growth_rate?: number; // percentage
}

// Configuration for forecast calculations
export interface ForecastConfig {
  risk_thresholds: {
    hours_warning: number; // percentage of max_hours
    hours_critical: number; // percentage of max_hours
    mrr_minimum: number; // absolute value
  };
  projection_days: number[];
  alert_enabled: boolean;
  alert_cooldown_hours: number;
}

// API error response structure
export interface ForecastError {
  ok: false;
  error: string;
  message: string;
  details?: any;
  timestamp: string;
}