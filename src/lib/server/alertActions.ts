/**
 * Automated Alert Actions Handler
 * 
 * Server-only automation that responds to alerts with predefined actions.
 * Triggered manually or via cron jobs for automated remediation.
 */

import 'server-only';
import { sendSlackWebApiNotification } from '@/lib/server/notify';
import type { AlertNotification } from '@/lib/server/notify';

export interface AlertAction {
  type: 'slack_notification' | 'webhook_enqueue' | 'log_only';
  description: string;
  executed_at: string;
  success: boolean;
  details?: any;
  error?: string;
}

export interface Alert {
  id?: string;
  type: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  created_at: string;
  source?: string;
  meta?: Record<string, any>;
}

/**
 * Main handler that processes alerts and executes automation based on type/severity
 * 
 * @param alert - The alert to process
 * @returns Array of actions that were executed
 */
export async function handleAlert(alert: Alert): Promise<AlertAction[]> {
  console.log(`🤖 Processing alert automation for: ${alert.id} (${alert.type}/${alert.severity})`);
  
  const actions: AlertAction[] = [];
  const timestamp = new Date().toISOString();

  try {
    // Capacity alerts automation
    if (alert.type === 'capacity' && alert.severity === 'warning') {
      const action = await executeSlackNotification(
        'Capacity near limit — check forecast dashboard',
        'warning',
        {
          alert_id: alert.id,
          original_message: alert.message,
          action: 'capacity_warning_notification'
        }
      );
      actions.push(action);
    }
    
    else if (alert.type === 'capacity' && alert.severity === 'critical') {
      const action = await executeWebhookEnqueue(
        'https://audiojones.com/api/admin/capacity/recalculate',
        {
          trigger: 'critical_capacity_alert',
          alert_id: alert.id,
          timestamp: timestamp
        }
      );
      actions.push(action);
    }
    
    // Billing alerts automation
    else if (alert.type === 'billing' && alert.severity === 'error') {
      const action = await executeSlackNotification(
        'Billing error detected — check Whop logs',
        'error',
        {
          alert_id: alert.id,
          original_message: alert.message,
          action: 'billing_error_notification'
        }
      );
      actions.push(action);
    }
    
    // Webhook alerts automation
    else if (alert.type === 'webhook' && alert.severity === 'critical') {
      const action = await executeSlackNotification(
        `Critical webhook failure: ${alert.message}`,
        'critical',
        {
          alert_id: alert.id,
          webhook_source: alert.source,
          action: 'webhook_critical_notification'
        }
      );
      actions.push(action);
    }
    
    // System alerts automation
    else if (alert.type === 'system' && alert.severity === 'critical') {
      const slackAction = await executeSlackNotification(
        `🚨 CRITICAL SYSTEM ALERT: ${alert.message}`,
        'critical',
        {
          alert_id: alert.id,
          system_component: alert.source,
          action: 'system_critical_escalation'
        }
      );
      actions.push(slackAction);
      
      // Also trigger system health check
      const webhookAction = await executeWebhookEnqueue(
        'https://audiojones.com/api/admin/health',
        {
          trigger: 'critical_system_alert',
          alert_id: alert.id,
          check_type: 'full_system_health'
        }
      );
      actions.push(webhookAction);
    }
    
    // Default case - no specific automation
    else {
      const action: AlertAction = {
        type: 'log_only',
        description: `No automation configured for ${alert.type}/${alert.severity}`,
        executed_at: timestamp,
        success: true,
        details: {
          alert_type: alert.type,
          alert_severity: alert.severity,
          reason: 'no_matching_automation_rule'
        }
      };
      actions.push(action);
      console.log(`ℹ️ No action configured for alert ${alert.id}: ${alert.type}/${alert.severity}`);
    }

  } catch (error) {
    const errorAction: AlertAction = {
      type: 'log_only',
      description: 'Alert automation processing failed',
      executed_at: timestamp,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: {
        alert_id: alert.id,
        alert_type: alert.type,
        alert_severity: alert.severity
      }
    };
    actions.push(errorAction);
    console.error(`❌ Alert automation failed for ${alert.id}:`, error);
  }

  console.log(`✅ Alert automation complete for ${alert.id}: ${actions.length} actions executed`);
  return actions;
}

/**
 * Execute Slack notification action
 */
async function executeSlackNotification(
  message: string,
  severity: 'info' | 'warning' | 'error' | 'critical',
  metadata: any
): Promise<AlertAction> {
  const timestamp = new Date().toISOString();
  
  try {
    // Use existing Slack Web API integration
    const notification: AlertNotification = {
      type: 'automation',
      severity: severity === 'error' ? 'critical' : severity,
      message: message,
      title: `🤖 Automated Alert Response`,
      created_at: timestamp,
      meta: {
        ...metadata,
        automated: true,
        automation_trigger: 'alert_action_handler'
      },
      source: 'alert-automation'
    };

    // Get Slack token and channel from environment
    const slackToken = process.env.SLACK_BOT_TOKEN || process.env.SLACK_ACCESS_TOKEN;
    const slackChannel = process.env.SLACK_CHANNEL || '#alerts';

    if (!slackToken) {
      throw new Error('Slack token not configured');
    }

    const success = await sendSlackWebApiNotification(notification, slackToken, slackChannel);
    
    if (!success) {
      throw new Error('Slack notification failed');
    }

    return {
      type: 'slack_notification',
      description: `Sent Slack notification: ${message}`,
      executed_at: timestamp,
      success: true,
      details: {
        message,
        severity,
        channel: slackChannel,
        metadata
      }
    };

  } catch (error) {
    return {
      type: 'slack_notification',
      description: `Failed to send Slack notification: ${message}`,
      executed_at: timestamp,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: { message, severity, metadata }
    };
  }
}

/**
 * Execute webhook enqueue action
 */
async function executeWebhookEnqueue(url: string, payload?: any): Promise<AlertAction> {
  const timestamp = new Date().toISOString();
  
  try {
    // Import the enqueueWebhook function that we'll add to notify.ts
    const { enqueueWebhook } = await import('@/lib/server/notify');
    
    const success = await enqueueWebhook(url, payload);
    
    if (!success) {
      throw new Error('Webhook enqueue failed');
    }

    return {
      type: 'webhook_enqueue',
      description: `Enqueued webhook: ${url}`,
      executed_at: timestamp,
      success: true,
      details: {
        url,
        payload,
        timeout: '5s'
      }
    };

  } catch (error) {
    return {
      type: 'webhook_enqueue',
      description: `Failed to enqueue webhook: ${url}`,
      executed_at: timestamp,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: { url, payload }
    };
  }
}

/**
 * Get human-readable summary of actions
 */
export function getActionsSummary(actions: AlertAction[]): string {
  const successful = actions.filter(a => a.success);
  const failed = actions.filter(a => !a.success);
  
  let summary = `Executed ${actions.length} action(s): ${successful.length} successful, ${failed.length} failed`;
  
  if (successful.length > 0) {
    summary += `\n\nSuccessful actions:\n${successful.map(a => `• ${a.description}`).join('\n')}`;
  }
  
  if (failed.length > 0) {
    summary += `\n\nFailed actions:\n${failed.map(a => `• ${a.description}: ${a.error}`).join('\n')}`;
  }
  
  return summary;
}