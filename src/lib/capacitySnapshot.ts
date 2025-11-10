/**
 * Capacity Snapshot Writer
 * 
 * Server-side helper for writing capacity history to Firestore.
 * Used by cron jobs and schedulers to maintain historical capacity data.
 */

import 'server-only';
import { Firestore } from 'firebase-admin/firestore';

interface CapacitySnapshot {
  current: {
    mrr: number;
    hours: number;
    retainers: number;
    status: 'open' | 'limited' | 'full';
  };
  forecast: {
    projected_status: 'open' | 'limited' | 'full';
    projected_open_date: string | null;
    projected_hours_in_7d: number;
    projected_mrr_in_7d: number;
    risk: 'low' | 'medium' | 'high';
  };
  meta: {
    generated_at: string;
    source: string;
  };
}

/**
 * Saves a capacity snapshot to Firestore history collection
 * 
 * @param db - Firebase Firestore instance
 * @param snapshot - Capacity snapshot data from forecast endpoint
 * @returns Promise<void>
 * 
 * @example
 * ```typescript
 * import { db } from '@/lib/server/firebaseAdmin';
 * import { saveCapacitySnapshot } from '@/lib/capacitySnapshot';
 * 
 * const forecast = await fetch('/api/capacity/forecast').then(r => r.json());
 * await saveCapacitySnapshot(db, forecast);
 * ```
 */
export async function saveCapacitySnapshot(
  db: Firestore, 
  snapshot: CapacitySnapshot
): Promise<void> {
  try {
    console.log('💾 Saving capacity snapshot to history...');
    
    // Use today's date as document ID (YYYY-MM-DD format)
    const today = new Date().toISOString().split('T')[0];
    
    // Prepare snapshot document with timestamp
    const historyDoc = {
      ...snapshot,
      snapshot_date: today,
      saved_at: new Date().toISOString(),
    };
    
    // Write to capacity_history collection (idempotent - will merge/overwrite)
    await db
      .collection('capacity_history')
      .doc(today)
      .set(historyDoc, { merge: true });
    
    console.log(`✅ Capacity snapshot saved for ${today}`);
    
  } catch (error) {
    console.error('❌ Failed to save capacity snapshot:', error);
    throw new Error(`Capacity snapshot write failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Retrieves capacity history for a specific date range
 * 
 * @param db - Firebase Firestore instance
 * @param startDate - Start date in YYYY-MM-DD format
 * @param endDate - End date in YYYY-MM-DD format (optional, defaults to today)
 * @returns Promise<CapacitySnapshot[]>
 */
export async function getCapacityHistory(
  db: Firestore,
  startDate: string,
  endDate?: string
): Promise<CapacitySnapshot[]> {
  try {
    const end = endDate || new Date().toISOString().split('T')[0];
    
    console.log(`📊 Retrieving capacity history from ${startDate} to ${end}`);
    
    const snapshot = await db
      .collection('capacity_history')
      .where('snapshot_date', '>=', startDate)
      .where('snapshot_date', '<=', end)
      .orderBy('snapshot_date', 'desc')
      .get();
    
    const history = snapshot.docs.map(doc => ({
      ...doc.data()
    })) as CapacitySnapshot[];
    
    console.log(`✅ Retrieved ${history.length} capacity snapshots`);
    
    return history;
    
  } catch (error) {
    console.error('❌ Failed to retrieve capacity history:', error);
    throw new Error(`Capacity history retrieval failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Gets the most recent capacity snapshot from history
 * 
 * @param db - Firebase Firestore instance
 * @returns Promise<CapacitySnapshot | null>
 */
export async function getLatestCapacitySnapshot(db: Firestore): Promise<CapacitySnapshot | null> {
  try {
    console.log('🕐 Retrieving latest capacity snapshot...');
    
    const snapshot = await db
      .collection('capacity_history')
      .orderBy('snapshot_date', 'desc')
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      console.log('📭 No capacity history found');
      return null;
    }
    
    const latest = snapshot.docs[0].data() as CapacitySnapshot;
    console.log(`✅ Latest snapshot from ${snapshot.docs[0].id}`);
    
    return latest;
    
  } catch (error) {
    console.error('❌ Failed to retrieve latest capacity snapshot:', error);
    throw new Error(`Latest capacity snapshot retrieval failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}