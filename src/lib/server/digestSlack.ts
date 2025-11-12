/**
 * Ops Digest Slack Formatter
 * 
 * Formats operational digest data into Slack Block Kit format
 * for rich, readable notifications.
 */

import 'server-only';
import type { OpsDigest, OpsDigestSLO, OpsDigestIncident } from './digest';
import { sendSlackWebApiNotification } from './notify';

interface SlackBlock {
  type: string;
  [key: string]: any;
}

/**
 * Formats the ops digest for Slack using Block Kit
 */
export function formatOpsDigestForSlack(digest: OpsDigest): { text: string; blocks: SlackBlock[] } {
  const blocks: SlackBlock[] = [];
  
  // Header section
  blocks.push({
    type: "header",
    text: {
      type: "plain_text",
      text: "🎯 AudioJones Ops Digest",
      emoji: true
    }
  });

  // Timestamp and overview
  const timestamp = new Date(digest.generatedAt).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  blocks.push({
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `*Generated:* ${timestamp} EST`
      }
    ]
  });

  // Overall status indicator
  const overallStatus = getOverallStatus(digest);
  const statusEmoji = getStatusEmoji(overallStatus);
  
  blocks.push({
    type: "section",
    text: {
      type: "mrkdwn", 
      text: `${statusEmoji} *Overall Status: ${overallStatus.toUpperCase()}*`
    }
  });

  blocks.push({ type: "divider" });

  // SLO Section
  if (digest.slo.length > 0) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*📊 Service Level Objectives*"
      }
    });

    const sloSummary = formatSLOSummary(digest.slo, digest.summary);
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: sloSummary
      }
    });

    // Show problematic SLOs if any
    const problematicSLOs = digest.slo.filter(slo => slo.status !== 'healthy');
    if (problematicSLOs.length > 0) {
      const problemDetails = problematicSLOs
        .slice(0, 3) // Limit to top 3
        .map(slo => {
          const statusEmoji = slo.status === 'violating' ? '❌' : '⚠️';
          return `${statusEmoji} *${slo.service}*: ${slo.achieved.toFixed(1)}% (target: ${slo.target}%)`;
        })
        .join('\n');

      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: problemDetails
        }
      });
    }
  } else {
    blocks.push({
      type: "section", 
      text: {
        type: "mrkdwn",
        text: "*📊 Service Level Objectives*\n_No SLO data available_"
      }
    });
  }

  blocks.push({ type: "divider" });

  // Incidents Section
  blocks.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*🚨 Open Incidents*"
    }
  });

  if (digest.incidents.length > 0) {
    const incidentSummary = `${digest.summary.open_incidents} open incidents`;
    const criticalNote = digest.summary.critical_incidents > 0 
      ? ` (⚠️ *${digest.summary.critical_incidents} critical*)`
      : '';

    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${incidentSummary}${criticalNote}`
      }
    });

    // Show recent incidents (top 5)
    const recentIncidents = digest.incidents
      .slice(0, 5)
      .map(incident => formatIncidentLine(incident))
      .join('\n');

    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: recentIncidents
      }
    });
  } else {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn", 
        text: "✅ No open incidents"
      }
    });
  }

  blocks.push({ type: "divider" });

  // Capacity Section
  blocks.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*📈 Capacity Status*"
    }
  });

  if (digest.capacity) {
    const capacityText = formatCapacityStatus(digest.capacity);
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: capacityText
      }
    });
  } else {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: "_No capacity data available_"
      }
    });
  }

  // Footer with actions
  blocks.push({ type: "divider" });
  blocks.push({
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: "💻 <https://audiojones.com/portal/admin|View Admin Dashboard> • <https://audiojones.com/portal/admin/slo|View SLOs> • <https://audiojones.com/portal/admin/incidents|View Incidents>"
      }
    ]
  });

  // Fallback text for clients that don't support blocks
  const fallbackText = `AudioJones Ops Digest - ${overallStatus.toUpperCase()}: ${digest.summary.slo_healthy}/${digest.slo.length} SLOs healthy, ${digest.summary.open_incidents} open incidents, capacity ${digest.summary.capacity_status}`;

  return {
    text: fallbackText,
    blocks
  };
}

/**
 * Determine overall system status from digest data
 */
function getOverallStatus(digest: OpsDigest): 'healthy' | 'warning' | 'critical' {
  // Critical if any SLOs violating OR critical incidents OR critical capacity
  if (digest.summary.slo_violating > 0 || 
      digest.summary.critical_incidents > 0 || 
      digest.summary.capacity_status === 'critical') {
    return 'critical';
  }
  
  // Warning if any SLOs at-risk OR open incidents OR warning capacity
  if (digest.summary.slo_at_risk > 0 || 
      digest.summary.open_incidents > 0 || 
      digest.summary.capacity_status === 'warning') {
    return 'warning';
  }
  
  return 'healthy';
}

/**
 * Get emoji for status level
 */
function getStatusEmoji(status: string): string {
  switch (status) {
    case 'critical': return '🔴';
    case 'warning': return '🟡';
    case 'healthy': return '🟢';
    default: return '⚪';
  }
}

/**
 * Format SLO summary text
 */
function formatSLOSummary(slos: OpsDigestSLO[], summary: any): string {
  const total = slos.length;
  const healthy = summary.slo_healthy;
  const atRisk = summary.slo_at_risk;
  const violating = summary.slo_violating;

  let text = `${healthy}/${total} SLOs healthy`;
  
  if (violating > 0) {
    text += ` • ❌ ${violating} violating`;
  }
  if (atRisk > 0) {
    text += ` • ⚠️ ${atRisk} at-risk`;
  }
  if (healthy === total) {
    text += ' ✅';
  }

  return text;
}

/**
 * Format individual incident line
 */
function formatIncidentLine(incident: OpsDigestIncident): string {
  const severityEmoji = incident.severity === 'critical' ? '🔥' : 
                       incident.severity === 'warning' ? '⚠️' : 'ℹ️';
  
  const statusEmoji = incident.status === 'open' ? '🆕' :
                     incident.status === 'investigating' ? '🔍' :
                     incident.status === 'monitoring' ? '👀' : '✅';

  const ageText = incident.age_hours < 1 ? 'Just now' :
                 incident.age_hours < 24 ? `${incident.age_hours}h ago` :
                 `${Math.floor(incident.age_hours / 24)}d ago`;

  return `${severityEmoji}${statusEmoji} *${incident.title}* (${incident.source}) - ${ageText}`;
}

/**
 * Format capacity status text
 */
function formatCapacityStatus(capacity: NonNullable<OpsDigest['capacity']>): string {
  const statusEmoji = getStatusEmoji(capacity.status);
  let text = `${statusEmoji} ${capacity.status.toUpperCase()}`;

  if (capacity.utilization_pct !== undefined) {
    text += ` • ${capacity.utilization_pct.toFixed(1)}% utilized`;
  }

  if (capacity.hours_remaining !== undefined && capacity.hours_remaining > 0) {
    const timeText = capacity.hours_remaining < 24 
      ? `${capacity.hours_remaining}h`
      : `${Math.floor(capacity.hours_remaining / 24)}d`;
    text += ` • ${timeText} until ${capacity.next_threshold || 'threshold'}`;
  }

  if (capacity.risk_level && capacity.risk_level !== 'low') {
    const riskEmoji = capacity.risk_level === 'high' ? '🔥' : '⚠️';
    text += ` ${riskEmoji} ${capacity.risk_level} risk`;
  }

  return text;
}

/**
 * Send ops digest to Slack using webhook
 */
export async function sendOpsDigestToSlack(digest: OpsDigest): Promise<{ success: boolean; error?: string }> {
  try {
    const slackPayload = formatOpsDigestForSlack(digest);
    
    // Check if Slack webhook is configured
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error('SLACK_WEBHOOK_URL not configured');
    }

    // Send to Slack webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: slackPayload.text,
        blocks: slackPayload.blocks,
        username: 'AudioJones Ops',
        icon_emoji: ':chart_with_upwards_trend:'
      }),
    });

    if (!response.ok) {
      throw new Error(`Slack webhook failed: ${response.status} ${response.statusText}`);
    }

    console.log('✅ Ops digest sent to Slack successfully');
    return { success: true };
    
  } catch (error) {
    console.error('❌ Failed to send ops digest to Slack:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Create a preview of the Slack message without sending
 */
export function previewOpsDigestSlack(digest: OpsDigest) {
  const formatted = formatOpsDigestForSlack(digest);
  
  return {
    preview: {
      text: formatted.text,
      blocks_count: formatted.blocks.length,
      sections: formatted.blocks
        .filter(block => block.type === 'section')
        .map(block => block.text?.text || '')
        .filter(Boolean)
    },
    slack_payload: formatted
  };
}