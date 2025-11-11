/**
 * Alert Auto-Remediation Rules Engine
 * 
 * Pure functions that determine what actions to take for alerts.
 * No Firestore operations here - just business logic.
 */

export type AlertAction = 
  | 'notify-team'
  | 'mark-needs-review'
  | 'queue-replay'
  | 'create-ticket'
  | 'escalate';

export interface Alert {
  id?: string;
  type: 'capacity' | 'webhook' | 'billing' | 'system' | 'discord';
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  created_at: string;
  source?: string;
  meta?: Record<string, any>;
  needs_review?: boolean;
  reviewed?: boolean;
  auto_process?: boolean;
  auto_processed_at?: string;
  escalated?: boolean;
  escalated_at?: string;
}

export interface AlertRule {
  name: string;
  condition: (alert: Alert) => boolean;
  actions: AlertAction[];
  description: string;
}

/**
 * Core alert rules - start small and expand
 */
export const alertRules: AlertRule[] = [
  {
    name: 'capacity-warning',
    condition: (alert) => alert.type === 'capacity' && alert.severity === 'warning',
    actions: ['notify-team', 'mark-needs-review'],
    description: 'Capacity utilization warnings need team notification and review'
  },
  {
    name: 'capacity-critical',
    condition: (alert) => alert.type === 'capacity' && alert.severity === 'critical',
    actions: ['notify-team', 'mark-needs-review', 'escalate'],
    description: 'Critical capacity issues require immediate escalation'
  },
  {
    name: 'webhook-critical',
    condition: (alert) => alert.type === 'webhook' && alert.severity === 'critical',
    actions: ['notify-team', 'queue-replay'],
    description: 'Critical webhook failures should be replayed'
  },
  {
    name: 'webhook-error',
    condition: (alert) => alert.type === 'webhook' && alert.severity === 'error',
    actions: ['notify-team', 'mark-needs-review'],
    description: 'Webhook errors need team review'
  },
  {
    name: 'billing-alerts',
    condition: (alert) => alert.type === 'billing',
    actions: ['notify-team', 'mark-needs-review'],
    description: 'All billing alerts require team attention'
  },
  {
    name: 'system-critical',
    condition: (alert) => alert.type === 'system' && alert.severity === 'critical',
    actions: ['notify-team', 'escalate'],
    description: 'Critical system alerts need immediate escalation'
  }
];

/**
 * Main function: determine what actions to take for an alert
 * 
 * @param alert The alert to process
 * @returns Array of actions to execute
 */
export function getAlertActions(alert: Alert): AlertAction[] {
  const actions = new Set<AlertAction>();
  
  // Apply all matching rules
  for (const rule of alertRules) {
    if (rule.condition(alert)) {
      console.log(`Alert ${alert.id || 'unknown'} matches rule: ${rule.name}`);
      rule.actions.forEach(action => actions.add(action));
    }
  }

  const result = Array.from(actions);
  console.log(`Alert ${alert.id || 'unknown'} will trigger actions:`, result);
  
  return result;
}

/**
 * Get human-readable description of what actions will do
 */
export function getActionDescriptions(actions: AlertAction[]): string[] {
  const descriptions: Record<AlertAction, string> = {
    'notify-team': 'Send notification to team via Slack/webhook',
    'mark-needs-review': 'Flag alert as needing manual review',
    'queue-replay': 'Queue webhook event for replay',
    'create-ticket': 'Create support ticket',
    'escalate': 'Escalate to on-call team'
  };

  return actions.map(action => descriptions[action]);
}

/**
 * Utility: check if alert should be auto-processed
 */
export function shouldAutoProcess(alert: Alert): boolean {
  return alert.auto_process === true && getAlertActions(alert).length > 0;
}