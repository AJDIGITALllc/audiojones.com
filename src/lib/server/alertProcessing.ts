/**
 * Alert Processing Helper
 * 
 * Utilities for enqueuing alert processing after alert creation.
 */

import 'server-only';

/**
 * Enqueue alert for auto-processing
 * 
 * This is a best-effort helper that triggers alert processing
 * without failing the original request if processing fails.
 * 
 * @param alertId - The Firestore document ID of the alert
 */
export async function enqueueAlertProcessing(alertId: string): Promise<void> {
  try {
    console.log(`🔄 Enqueuing alert processing for: ${alertId}`);
    
    // For now, we'll make an internal API call
    // In a production system, you might use a queue like Cloud Tasks
    const adminKey = process.env.ADMIN_KEY;
    
    if (!adminKey) {
      console.warn('⚠️ ADMIN_KEY not configured, cannot enqueue alert processing');
      return;
    }

    // Make internal API call to process the alert
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/admin/alerts/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'admin-key': adminKey
      },
      body: JSON.stringify({ alertId })
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Alert processing queued successfully:`, {
        alertId,
        actionsRun: result.actionsRun?.length || 0
      });
    } else {
      const error = await response.text();
      console.warn(`⚠️ Alert processing failed:`, error);
    }
    
  } catch (error) {
    // Best effort - don't fail the original request
    console.warn('⚠️ Failed to enqueue alert processing:', error instanceof Error ? error.message : 'Unknown error');
  }
}

/**
 * Simplified version that just logs for now
 * Use this if you want to implement queue-based processing later
 */
export function logAlertForProcessing(alertId: string, alertType: string): void {
  console.log(`📝 Alert ready for processing: ${alertId} (type: ${alertType})`);
  // TODO: Implement proper queue integration (Cloud Tasks, Redis, etc.)
}