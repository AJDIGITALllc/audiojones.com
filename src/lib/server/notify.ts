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
 * Sends alert notification via Slack Web API or webhook URL
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
  // Check for Slack App token first
  const slackToken = process.env.SLACK_BOT_TOKEN || process.env.SLACK_ACCESS_TOKEN;
  const slackChannel = process.env.SLACK_CHANNEL || '#alerts';
  
  if (slackToken) {
    console.log('📱 Using Slack Web API for notification');
    return await sendSlackWebApiNotification(alert, slackToken, slackChannel);
  }

  // Fallback to webhook URL
  const webhookUrl = process.env.ALERT_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('⚠️ Neither SLACK_BOT_TOKEN nor ALERT_WEBHOOK_URL configured, skipping notification');
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
 * Sends notification via Slack Web API (chat.postMessage)
 * 
 * @param alert - Alert data
 * @param token - Slack bot token
 * @param channel - Slack channel ID or name
 * @returns Promise<boolean>
 */
export async function sendSlackWebApiNotification(
  alert: AlertNotification, 
  token: string, 
  channel: string
): Promise<boolean> {
  try {
    console.log(`📱 Sending Slack notification to ${channel}`);
    
    const severityEmojis = {
      'info': ':information_source:',
      'warning': ':warning:',
      'critical': ':rotating_light:'
    };

    const severityColors = {
      'info': '#36a64f',      // Green
      'warning': '#ff9500',   // Orange  
      'critical': '#ff0000'   // Red
    };

    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${severityEmojis[alert.severity]} Audio Jones Alert`,
          emoji: true
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Type:*\n${alert.type}`
          },
          {
            type: 'mrkdwn',
            text: `*Severity:*\n${alert.severity.toUpperCase()}`
          },
          {
            type: 'mrkdwn',
            text: `*Message:*\n${alert.message || alert.title || 'No message provided'}`
          },
          {
            type: 'mrkdwn',
            text: `*Time:*\n<!date^${Math.floor(new Date(alert.created_at || Date.now()).getTime() / 1000)}^{date_short} {time}|${alert.created_at}>`
          }
        ]
      }
    ];

    // Add metadata fields if available
    if (alert.email || alert.source || alert.meta) {
      const metaFields = [];
      
      if (alert.email) {
        metaFields.push({
          type: 'mrkdwn',
          text: `*Customer:*\n${alert.email}`
        });
      }
      
      if (alert.source) {
        metaFields.push({
          type: 'mrkdwn',
          text: `*Source:*\n${alert.source}`
        });
      }

      if (alert.meta && Object.keys(alert.meta).length > 0) {
        const metaString = Object.entries(alert.meta)
          .slice(0, 3) // Limit to first 3 meta fields
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n');
        
        metaFields.push({
          type: 'mrkdwn',
          text: `*Details:*\n\`\`\`${metaString}\`\`\``
        });
      }

      if (metaFields.length > 0) {
        blocks.push({
          type: 'section',
          fields: metaFields
        });
      }
    }

    // Add context footer
    blocks.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: '🎙️ Audio Jones Alert System'
        }
      ]
    } as any);

    const payload = {
      channel: channel,
      blocks: blocks,
      // Fallback text for notifications
      text: `${severityEmojis[alert.severity]} ${alert.severity.toUpperCase()} Alert: ${alert.message || alert.title}`,
      // Add color to message
      attachments: [
        {
          color: severityColors[alert.severity],
          fallback: `${alert.severity.toUpperCase()} Alert from Audio Jones`
        }
      ]
    };

    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000)
    });

    const result = await response.json();

    if (result.ok) {
      console.log('✅ Slack Web API notification sent successfully');
      return true;
    } else {
      console.error('❌ Slack Web API error:', result.error);
      return false;
    }

  } catch (error) {
    console.error('❌ Failed to send Slack Web API notification:', error);
    return false;
  }
}

/**
 * Sends Slack-formatted alert notification (webhook version)
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

/**
 * Enqueue a webhook request with timeout
 * 
 * Makes a POST request to the specified URL with optional payload.
 * Includes 5-second timeout for reliable automation.
 * 
 * @param url - The webhook URL to POST to
 * @param payload - Optional JSON payload to send
 * @returns Promise<boolean> - true if request succeeded, false otherwise
 * 
 * @example
 * ```typescript
 * const success = await enqueueWebhook(
 *   'https://audiojones.com/api/admin/capacity/recalculate',
 *   { trigger: 'critical_alert', alertId: 'abc123' }
 * );
 * ```
 */
export async function enqueueWebhook(url: string, payload?: any): Promise<boolean> {
  try {
    console.log(`🔗 Enqueuing webhook: ${url}`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AudioJones-Alert-Automation/1.0'
      },
      body: payload ? JSON.stringify(payload) : undefined,
      // 5-second timeout as specified
      signal: AbortSignal.timeout(5000)
    });

    if (response.ok) {
      console.log(`✅ Webhook enqueued successfully: ${url} (${response.status})`);
      return true;
    } else {
      console.warn(`⚠️ Webhook returned non-2xx status: ${url} (${response.status})`);
      return false;
    }

  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error(`⏰ Webhook timeout after 5s: ${url}`);
    } else {
      console.error(`❌ Webhook failed: ${url}`, error);
    }
    return false;
  }
}