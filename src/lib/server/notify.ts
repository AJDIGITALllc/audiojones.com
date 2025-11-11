/**
 * Alert Notification System
 * 
 * Server-side utility for sending outbound notifications when alerts are created.
 * Supports Slack, Discord, Zapier, or any webhook that accepts JSON.
 */

import 'server-only';

// Generic alert interface for notifications
export interface AlertNotification {
  type: string;
  severity: 'info' | 'warning' | 'critical';
  message?: string;
  title?: string;
  created_at?: string;
  meta?: Record<string, any>;
  source?: string;
  email?: string;
  event_id?: string;
}

// Outbound webhook payload format
interface WebhookPayload {
  source: string;
  type: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  created_at: string;
  meta: Record<string, any>;
}

/**
 * Sends alert notification to configured webhook URL
 * 
 * @param alert - Alert data to send
 * @returns Promise<boolean> - true if sent successfully, false otherwise
 * 
 * @example
 * ```typescript
 * const alert = {
 *   type: 'capacity',
 *   severity: 'warning',
 *   message: 'Capacity utilization above 90%',
 *   created_at: new Date().toISOString(),
 *   source: 'capacity-forecast'
 * };
 * 
 * await sendAlertNotification(alert);
 * ```
 */
export async function sendAlertNotification(alert: AlertNotification): Promise<boolean> {
  const webhookUrl = process.env.ALERT_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('⚠️ ALERT_WEBHOOK_URL not configured, skipping notification');
    return false;
  }

  try {
    console.log(`📨 Sending ${alert.severity} alert notification:`, alert.type);
    
    // Build standardized webhook payload
    const payload: WebhookPayload = {
      source: 'audiojones',
      type: alert.type,
      severity: alert.severity,
      message: alert.message || alert.title || 'New alert',
      created_at: alert.created_at || new Date().toISOString(),
      meta: {
        ...alert.meta,
        // Include additional context if available
        ...(alert.source && { alert_source: alert.source }),
        ...(alert.email && { customer_email: alert.email }),
        ...(alert.event_id && { event_id: alert.event_id })
      }
    };

    // Send notification to webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AudioJones-Alert-System/1.0'
      },
      body: JSON.stringify(payload),
      // Timeout after 10 seconds
      signal: AbortSignal.timeout(10000)
    });

    if (response.ok) {
      console.log(`✅ Alert notification sent successfully (${response.status})`);
      return true;
    } else {
      console.error(`❌ Webhook responded with ${response.status}: ${response.statusText}`);
      const responseText = await response.text().catch(() => 'Unable to read response');
      console.error('Response body:', responseText);
      return false;
    }

  } catch (error) {
    // Never throw from notification function - it should be best-effort
    console.error('❌ Failed to send alert notification:', error);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('❌ Notification timeout after 10 seconds');
      } else if (error.message.includes('fetch')) {
        console.error('❌ Network error sending notification');
      }
    }
    
    return false;
  }
}

/**
 * Formats alert for Slack-specific webhook (optional enhancement)
 * 
 * @param alert - Alert data
 * @returns Slack-formatted payload
 */
export function formatSlackAlert(alert: AlertNotification): any {
  const severityColors = {
    'info': '#36a64f',      // Green
    'warning': '#ff9500',   // Orange  
    'critical': '#ff0000'   // Red
  };

  const severityEmojis = {
    'info': ':information_source:',
    'warning': ':warning:',
    'critical': ':rotating_light:'
  };

  return {
    text: `${severityEmojis[alert.severity]} Audio Jones Alert`,
    attachments: [
      {
        color: severityColors[alert.severity],
        fields: [
          {
            title: 'Alert Type',
            value: alert.type,
            short: true
          },
          {
            title: 'Severity',
            value: alert.severity.toUpperCase(),
            short: true
          },
          {
            title: 'Message',
            value: alert.message || alert.title || 'No message provided',
            short: false
          },
          ...(alert.email ? [{
            title: 'Customer',
            value: alert.email,
            short: true
          }] : []),
          ...(alert.source ? [{
            title: 'Source',
            value: alert.source,
            short: true
          }] : [])
        ],
        footer: 'Audio Jones Alert System',
        ts: Math.floor(new Date(alert.created_at || Date.now()).getTime() / 1000)
      }
    ]
  };
}

/**
 * Sends Slack-formatted alert notification
 * 
 * @param alert - Alert data
 * @returns Promise<boolean>
 */
export async function sendSlackAlert(alert: AlertNotification): Promise<boolean> {
  const webhookUrl = process.env.ALERT_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('⚠️ ALERT_WEBHOOK_URL not configured for Slack notifications');
    return false;
  }

  try {
    const slackPayload = formatSlackAlert(alert);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(slackPayload),
      signal: AbortSignal.timeout(10000)
    });

    return response.ok;
  } catch (error) {
    console.error('❌ Failed to send Slack notification:', error);
    return false;
  }
}