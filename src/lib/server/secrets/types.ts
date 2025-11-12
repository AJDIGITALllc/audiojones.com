/**
 * Secrets Rotation System Types
 * 
 * Type definitions for automated secrets rotation with secure key management,
 * rotation scheduling, emergency rotation, and integration verification.
 */

export interface SecretConfiguration {
  id: string;
  name: string;
  description: string;
  secret_type: 'api_key' | 'database_password' | 'encryption_key' | 'certificate' | 'oauth_token' | 'webhook_secret';
  provider: 'manual' | 'aws_kms' | 'gcp_kms' | 'azure_key_vault' | 'hashicorp_vault';
  storage_location: {
    type: 'environment_variable' | 'key_vault' | 'database' | 'config_file';
    path: string;
    encrypted: boolean;
  };
  rotation_policy: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'on_demand';
    max_age_days: number;
    grace_period_hours: number; // Time both old and new secrets are valid
    auto_rotate: boolean;
    require_approval: boolean;
  };
  dependencies: Array<{
    service_name: string;
    endpoint: string;
    health_check_path?: string;
    restart_required: boolean;
    update_method: 'api_call' | 'config_reload' | 'service_restart' | 'manual';
  }>;
  validation: {
    test_endpoint?: string;
    test_method?: 'GET' | 'POST' | 'PUT';
    test_payload?: Record<string, any>;
    expected_response?: Record<string, any>;
    custom_validator?: string; // Function name for custom validation
  };
  emergency_contact: {
    primary_owner: string;
    escalation_chain: string[];
    notification_channels: ('email' | 'slack' | 'sms')[];
  };
  compliance_requirements: {
    encryption_at_rest: boolean;
    encryption_in_transit: boolean;
    audit_log_retention_days: number;
    access_log_required: boolean;
  };
  active: boolean;
  created_at: number;
  updated_at: number;
  created_by: string;
}

export interface SecretRotationExecution {
  id: string;
  configuration_id: string;
  trigger_type: 'scheduled' | 'manual' | 'emergency' | 'compliance';
  trigger_reason: string;
  status: 'pending' | 'generating' | 'validating' | 'deploying' | 'verifying' | 'completed' | 'failed' | 'rolled_back';
  started_at: number;
  completed_at?: number;
  duration_ms?: number;
  old_secret_metadata: {
    created_at: number;
    age_days: number;
    last_used?: number;
    usage_count?: number;
  };
  new_secret_metadata: {
    generated_at: number;
    algorithm?: string;
    strength_score?: number;
    entropy_bits?: number;
  };
  rotation_steps: Array<{
    step_id: string;
    name: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
    started_at: number;
    completed_at?: number;
    duration_ms?: number;
    output?: string;
    error_message?: string;
    rollback_possible: boolean;
  }>;
  validation_results: {
    pre_rotation_check: boolean;
    secret_generation_valid: boolean;
    deployment_successful: boolean;
    post_rotation_verification: boolean;
    dependent_services_healthy: boolean;
  };
  rollback_info?: {
    rollback_executed: boolean;
    rollback_successful: boolean;
    rollback_reason: string;
    rollback_completed_at: number;
  };
  initiated_by: string;
  approved_by?: string;
  created_at: number;
}

export interface SecretUsageLog {
  id: string;
  secret_configuration_id: string;
  secret_version: string;
  accessed_at: number;
  accessed_by: string; // Service or user ID
  access_method: 'api_call' | 'environment_read' | 'config_load' | 'direct_access';
  client_ip?: string;
  user_agent?: string;
  success: boolean;
  failure_reason?: string;
  trace_id?: string;
}

export interface SecretHealthMetrics {
  total_secrets: number;
  active_secrets: number;
  expired_secrets: number;
  expiring_soon: number; // Within 7 days
  successful_rotations_30d: number;
  failed_rotations_30d: number;
  average_rotation_duration_minutes: number;
  rotation_success_rate: number;
  secrets_by_type: Record<string, number>;
  secrets_by_age: {
    '0_30_days': number;
    '31_90_days': number;
    '91_180_days': number;
    '180_plus_days': number;
  };
  compliance_status: {
    compliant_secrets: number;
    non_compliant_secrets: number;
    violations: Array<{
      secret_id: string;
      violation_type: 'expired' | 'weak' | 'unencrypted' | 'access_violation';
      severity: 'low' | 'medium' | 'high' | 'critical';
      description: string;
      detected_at: number;
    }>;
  };
  recent_activity: Array<{
    timestamp: number;
    action: 'rotation_started' | 'rotation_completed' | 'rotation_failed' | 'access_denied' | 'emergency_rotation';
    secret_name: string;
    details: string;
  }>;
}

export interface EmergencyRotationRequest {
  id: string;
  secret_configuration_id: string;
  reason: 'compromise_suspected' | 'security_incident' | 'compliance_requirement' | 'service_outage' | 'other';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  skip_approval: boolean;
  skip_grace_period: boolean;
  force_immediate_cutover: boolean;
  requested_by: string;
  approved_by?: string;
  approval_required: boolean;
  status: 'pending_approval' | 'approved' | 'rejected' | 'executing' | 'completed' | 'failed';
  execution_id?: string;
  created_at: number;
  approved_at?: number;
  completed_at?: number;
}

export interface SecretRotationPolicy {
  id: string;
  name: string;
  description: string;
  applies_to: {
    secret_types: string[];
    providers: string[];
    environments: string[];
  };
  rules: {
    max_age_days: number;
    min_rotation_frequency_days: number;
    require_approval_for_types: string[];
    emergency_rotation_allowed: boolean;
    grace_period_hours: number;
    validation_required: boolean;
  };
  notification_settings: {
    notify_before_expiry_days: number[];
    notify_on_rotation_start: boolean;
    notify_on_rotation_complete: boolean;
    notify_on_failure: boolean;
    channels: string[];
  };
  compliance_mappings: {
    soc2_controls: string[];
    gdpr_requirements: string[];
    hipaa_safeguards: string[];
  };
  active: boolean;
  created_at: number;
  updated_at: number;
  created_by: string;
}

export interface SecretIntegrationHealth {
  integration_name: string;
  secret_configuration_id: string;
  last_health_check: number;
  status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  response_time_ms?: number;
  error_rate_percentage: number;
  last_successful_auth: number;
  consecutive_failures: number;
  health_check_details: {
    endpoint_reachable: boolean;
    authentication_valid: boolean;
    authorization_sufficient: boolean;
    rate_limits_ok: boolean;
    custom_checks: Record<string, boolean>;
  };
  issues: Array<{
    type: 'auth_failure' | 'network_error' | 'rate_limit' | 'permission_denied' | 'service_unavailable';
    description: string;
    first_seen: number;
    last_seen: number;
    occurrence_count: number;
  }>;
}