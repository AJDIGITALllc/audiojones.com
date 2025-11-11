/**
 * Incident Management System
 * 
 * Groups related alerts into incidents with chronological timeline.
 * Provides runbook attachment and status management.
 */

import 'server-only';
import { db } from '@/lib/server/firebaseAdmin';
import type { Alert } from '@/lib/server/alertRules';

export interface IncidentTimelineEvent {
  ts: string;
  type: 'alert' | 'action' | 'note' | 'auto';
  message: string;
  meta?: any;
}

export interface Incident {
  id?: string;
  title: string;
  status: 'open' | 'investigating' | 'monitoring' | 'resolved';
  severity: 'info' | 'warning' | 'critical';
  source: string; // e.g. "capacity", "webhook", "billing"
  related_alert_ids: string[];
  timeline: IncidentTimelineEvent[];
  created_at: string;
  updated_at: string;
  runbook_id?: string;
}

export interface Runbook {
  id?: string;
  name: string;
  source: string; // matches incident.source for auto-attachment
  steps: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Create a new incident from an alert
 * 
 * @param alert - The alert that triggered the incident
 * @returns Promise with the created incident ID
 */
export async function createIncidentFromAlert(alert: Alert): Promise<string> {
  const now = new Date().toISOString();
  const alertId = alert.id || 'unknown';
  
  // Generate incident title based on alert
  const title = generateIncidentTitle(alert);
  
  // Create initial timeline event
  const initialEvent: IncidentTimelineEvent = {
    ts: now,
    type: 'alert',
    message: alert.message || 'Alert received',
    meta: {
      alert_id: alertId,
      alert_type: alert.type,
      alert_severity: alert.severity,
      source: alert.source
    }
  };

  // Map alert severity to incident severity
  const mapSeverity = (alertSeverity: string): 'info' | 'warning' | 'critical' => {
    switch (alertSeverity) {
      case 'critical': return 'critical';
      case 'error': return 'critical'; // Map error to critical
      case 'warning': return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  const incident: Omit<Incident, 'id'> = {
    title,
    status: 'open',
    severity: mapSeverity(alert.severity || 'info'),
    source: alert.source || alert.type || 'system',
    related_alert_ids: [alertId],
    timeline: [initialEvent],
    created_at: now,
    updated_at: now
  };

  console.log(`🚨 Creating new incident for alert ${alertId}:`, {
    title: incident.title,
    source: incident.source,
    severity: incident.severity
  });

  try {
    // Save to Firestore
    const docRef = await db.collection('incidents').add(incident);
    const incidentId = docRef.id;

    // Try to attach runbook if available
    await attachRunbookIfExists(incidentId, incident.source);

    console.log(`✅ Incident created successfully: ${incidentId}`);
    return incidentId;
    
  } catch (error) {
    console.error('❌ Failed to create incident:', error);
    throw new Error(`Failed to create incident: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Append an event to an incident's timeline
 * 
 * @param incidentId - The incident to update
 * @param event - The timeline event to add
 */
export async function appendIncidentEvent(
  incidentId: string, 
  event: Omit<IncidentTimelineEvent, 'ts'>
): Promise<void> {
  const now = new Date().toISOString();
  const fullEvent: IncidentTimelineEvent = {
    ...event,
    ts: now
  };

  try {
    const incidentRef = db.collection('incidents').doc(incidentId);
    const incidentDoc = await incidentRef.get();
    
    if (!incidentDoc.exists) {
      console.warn(`⚠️ Incident ${incidentId} not found, cannot append event`);
      return;
    }

    const incident = incidentDoc.data() as Incident;
    let timeline = incident.timeline || [];
    
    // Add new event
    timeline.push(fullEvent);
    
    // Cap timeline at 50 entries (keep most recent)
    if (timeline.length > 50) {
      timeline = timeline.slice(-50);
    }

    // Update incident with new timeline and updated_at
    await incidentRef.update({
      timeline,
      updated_at: now
    });

    console.log(`📝 Event appended to incident ${incidentId}:`, {
      type: event.type,
      message: event.message?.substring(0, 100)
    });

  } catch (error) {
    console.error(`❌ Failed to append event to incident ${incidentId}:`, error);
    // Don't throw - this is often called in background processing
  }
}

/**
 * Find the most recent open incident for a given source
 * 
 * @param source - The incident source to search for
 * @returns Promise with the incident document or null if none found
 */
export async function findOpenIncidentBySource(source: string): Promise<Incident | null> {
  try {
    const query = db.collection('incidents')
      .where('source', '==', source)
      .where('status', '!=', 'resolved')
      .orderBy('status')
      .orderBy('created_at', 'desc')
      .limit(1);

    const snapshot = await query.get();
    
    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as Incident;

  } catch (error) {
    console.error(`❌ Failed to find open incident for source ${source}:`, error);
    return null;
  }
}

/**
 * Attach a runbook to an incident if one exists for the source
 * 
 * @param incidentId - The incident to update
 * @param source - The source to match against runbooks
 */
export async function attachRunbookIfExists(incidentId: string, source: string): Promise<void> {
  try {
    const runbookQuery = db.collection('runbooks')
      .where('source', '==', source)
      .where('active', '==', true)
      .limit(1);

    const runbookSnapshot = await runbookQuery.get();
    
    if (!runbookSnapshot.empty) {
      const runbookDoc = runbookSnapshot.docs[0];
      const runbookId = runbookDoc.id;
      const runbookData = runbookDoc.data() as Runbook;

      // Update incident with runbook_id
      await db.collection('incidents').doc(incidentId).update({
        runbook_id: runbookId,
        updated_at: new Date().toISOString()
      });

      // Add timeline event about runbook attachment
      await appendIncidentEvent(incidentId, {
        type: 'auto',
        message: `Runbook attached: ${runbookData.name}`,
        meta: {
          runbook_id: runbookId,
          runbook_name: runbookData.name,
          steps_count: runbookData.steps.length
        }
      });

      console.log(`📚 Runbook ${runbookId} attached to incident ${incidentId}`);
    }

  } catch (error) {
    console.error(`❌ Failed to attach runbook to incident ${incidentId}:`, error);
    // Don't throw - this is optional functionality
  }
}

/**
 * Update incident status and log the change
 * 
 * @param incidentId - The incident to update
 * @param newStatus - The new status
 * @param actor - Who made the change (e.g., "admin", "system")
 */
export async function updateIncidentStatus(
  incidentId: string, 
  newStatus: Incident['status'],
  actor: string = 'system'
): Promise<void> {
  const now = new Date().toISOString();

  try {
    // Update the incident
    await db.collection('incidents').doc(incidentId).update({
      status: newStatus,
      updated_at: now
    });

    // Log the status change in timeline
    await appendIncidentEvent(incidentId, {
      type: 'action',
      message: `Status changed to ${newStatus}`,
      meta: {
        actor,
        previous_status: 'unknown', // Could query first if needed
        new_status: newStatus
      }
    });

    console.log(`🔄 Incident ${incidentId} status updated to ${newStatus} by ${actor}`);

  } catch (error) {
    console.error(`❌ Failed to update incident ${incidentId} status:`, error);
    throw error;
  }
}

/**
 * Get incident with related alerts populated
 * 
 * @param incidentId - The incident to fetch
 * @returns Promise with incident and related alerts
 */
export async function getIncidentWithAlerts(incidentId: string): Promise<{
  incident: Incident;
  alerts: Alert[];
} | null> {
  try {
    const incidentDoc = await db.collection('incidents').doc(incidentId).get();
    
    if (!incidentDoc.exists) {
      return null;
    }

    const incident = {
      id: incidentDoc.id,
      ...incidentDoc.data()
    } as Incident;

    // Fetch related alerts
    const alerts: Alert[] = [];
    
    if (incident.related_alert_ids.length > 0) {
      // Batch fetch alerts (Firestore supports up to 10 in a single `in` query)
      const alertIds = incident.related_alert_ids.slice(0, 10); // Limit for safety
      
      if (alertIds.length > 0) {
        const alertsQuery = db.collection('alerts').where('__name__', 'in', alertIds);
        const alertsSnapshot = await alertsQuery.get();
        
        alertsSnapshot.forEach(doc => {
          alerts.push({
            id: doc.id,
            ...doc.data()
          } as Alert);
        });
      }
    }

    return { incident, alerts };

  } catch (error) {
    console.error(`❌ Failed to get incident ${incidentId} with alerts:`, error);
    return null;
  }
}

/**
 * List incidents with optional filtering
 * 
 * @param options - Query options
 * @returns Promise with incidents array
 */
export async function listIncidents(options: {
  status?: Incident['status'];
  source?: string;
  limit?: number;
} = {}): Promise<Incident[]> {
  try {
    let query = db.collection('incidents').orderBy('updated_at', 'desc');

    if (options.status) {
      query = query.where('status', '==', options.status);
    }

    if (options.source) {
      query = query.where('source', '==', options.source);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    } else {
      query = query.limit(50); // Default limit
    }

    const snapshot = await query.get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Incident[];

  } catch (error) {
    console.error('❌ Failed to list incidents:', error);
    return [];
  }
}

/**
 * Generate a human-readable incident title from an alert
 */
function generateIncidentTitle(alert: Alert): string {
  const source = alert.source || alert.type || 'system';
  const severity = alert.severity || 'unknown';
  
  // Generate title based on alert type and severity
  if (alert.type === 'capacity') {
    if (severity === 'critical') {
      return `Critical Capacity Issue - ${source}`;
    } else if (severity === 'warning') {
      return `Capacity Warning - ${source}`;
    } else {
      return `Capacity Alert - ${source}`;
    }
  } else if (alert.type === 'webhook') {
    return `Webhook ${severity} - ${source}`;
  } else if (alert.type === 'billing') {
    return `Billing Issue - ${source}`;
  } else if (alert.type === 'predictive') {
    return `Predictive Alert - ${source}`;
  } else {
    return `${alert.type || 'System'} ${severity} - ${source}`;
  }
}