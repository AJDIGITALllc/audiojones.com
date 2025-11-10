#!/usr/bin/env node

/**
 * Automated Database Backup System
 * 
 * This script performs automated daily backups of critical Firestore collections
 * and uploads them to Google Cloud Storage with retention policies.
 * 
 * Usage:
 * node scripts/infrastructure/automated-backup.js
 * 
 * Environment Variables Required:
 * - GOOGLE_APPLICATION_CREDENTIALS (service account key path)
 * - BACKUP_BUCKET_NAME (GCS bucket for backups)
 * - FIREBASE_PROJECT_ID (Firebase project ID)
 */

const { getFirestore } = require('firebase-admin/firestore');
const { Storage } = require('@google-cloud/storage');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS 
    ? require(process.env.GOOGLE_APPLICATION_CREDENTIALS)
    : null;

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID
    });
  } else {
    // Use default credentials in Cloud environment
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID
    });
  }
}

const db = getFirestore();
const storage = new Storage();

// Configuration
const BACKUP_CONFIG = {
  bucket: process.env.BACKUP_BUCKET_NAME || 'audiojones-backups',
  retentionDays: 30,
  collections: [
    'customers',
    'subscription_events', 
    'pricing_skus',
    'admin_alerts',
    'admin_audit_log',
    'infrastructure_config'
  ],
  compressionEnabled: true
};

async function performBackup() {
  console.log('🔄 Starting automated database backup...');
  console.log(`📅 Timestamp: ${new Date().toISOString()}`);
  
  const backupTimestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const backupResults = [];

  try {
    // Ensure backup bucket exists
    const bucket = storage.bucket(BACKUP_CONFIG.bucket);
    const [bucketExists] = await bucket.exists();
    
    if (!bucketExists) {
      console.log(`📦 Creating backup bucket: ${BACKUP_CONFIG.bucket}`);
      await bucket.create({
        location: 'US',
        storageClass: 'COLDLINE' // Cost-effective for backups
      });
    }

    // Backup each collection
    for (const collectionName of BACKUP_CONFIG.collections) {
      console.log(`💾 Backing up collection: ${collectionName}`);
      
      try {
        const collectionSnapshot = await db.collection(collectionName).get();
        const documents = [];
        
        collectionSnapshot.forEach(doc => {
          documents.push({
            id: doc.id,
            data: doc.data(),
            path: doc.ref.path
          });
        });

        const backupData = {
          collection: collectionName,
          timestamp: new Date().toISOString(),
          document_count: documents.length,
          documents: documents,
          metadata: {
            backup_version: '1.0',
            firebase_project: process.env.FIREBASE_PROJECT_ID,
            backup_method: 'firestore_admin_sdk'
          }
        };

        // Upload to Cloud Storage
        const fileName = `${backupTimestamp}/${collectionName}.json`;
        const file = bucket.file(fileName);
        
        await file.save(JSON.stringify(backupData, null, 2), {
          metadata: {
            contentType: 'application/json',
            customMetadata: {
              collection: collectionName,
              documentCount: documents.length.toString(),
              backupDate: backupTimestamp
            }
          }
        });

        console.log(`✅ ${collectionName}: ${documents.length} documents backed up to ${fileName}`);
        
        backupResults.push({
          collection: collectionName,
          document_count: documents.length,
          file_path: fileName,
          status: 'success'
        });

      } catch (error) {
        console.error(`❌ Failed to backup ${collectionName}:`, error.message);
        backupResults.push({
          collection: collectionName,
          document_count: 0,
          file_path: null,
          status: 'failed',
          error: error.message
        });
      }
    }

    // Create backup manifest
    const manifest = {
      backup_id: `backup-${backupTimestamp}`,
      timestamp: new Date().toISOString(),
      collections: backupResults,
      total_documents: backupResults.reduce((sum, result) => sum + result.document_count, 0),
      success_count: backupResults.filter(r => r.status === 'success').length,
      failed_count: backupResults.filter(r => r.status === 'failed').length,
      retention_expires: new Date(Date.now() + BACKUP_CONFIG.retentionDays * 24 * 60 * 60 * 1000).toISOString()
    };

    // Upload manifest
    const manifestFile = bucket.file(`${backupTimestamp}/manifest.json`);
    await manifestFile.save(JSON.stringify(manifest, null, 2), {
      metadata: { contentType: 'application/json' }
    });

    // Log backup completion to Firestore
    await db.collection('backup_logs').add({
      backup_id: manifest.backup_id,
      timestamp: manifest.timestamp,
      status: manifest.failed_count === 0 ? 'success' : 'partial_failure',
      total_documents: manifest.total_documents,
      collections_backed_up: manifest.success_count,
      collections_failed: manifest.failed_count,
      retention_expires: manifest.retention_expires,
      storage_location: `gs://${BACKUP_CONFIG.bucket}/${backupTimestamp}/`
    });

    console.log('🎉 Backup completed successfully!');
    console.log(`📊 Summary: ${manifest.total_documents} documents across ${manifest.success_count} collections`);
    console.log(`🗂️ Location: gs://${BACKUP_CONFIG.bucket}/${backupTimestamp}/`);

    return manifest;

  } catch (error) {
    console.error('❌ Backup failed:', error);
    
    // Log failure to Firestore
    await db.collection('backup_logs').add({
      backup_id: `failed-backup-${backupTimestamp}`,
      timestamp: new Date().toISOString(),
      status: 'failed',
      error_message: error.message,
      total_documents: 0,
      collections_backed_up: 0,
      collections_failed: BACKUP_CONFIG.collections.length
    });

    throw error;
  }
}

async function cleanupOldBackups() {
  console.log('🧹 Cleaning up old backups...');
  
  const bucket = storage.bucket(BACKUP_CONFIG.bucket);
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - BACKUP_CONFIG.retentionDays);
  
  try {
    const [files] = await bucket.getFiles();
    let deletedCount = 0;
    
    for (const file of files) {
      const [metadata] = await file.getMetadata();
      const createdDate = new Date(metadata.timeCreated);
      
      if (createdDate < cutoffDate) {
        await file.delete();
        console.log(`🗑️ Deleted old backup: ${file.name}`);
        deletedCount++;
      }
    }
    
    console.log(`✅ Cleanup complete: ${deletedCount} old backup files removed`);
    
  } catch (error) {
    console.error('❌ Backup cleanup failed:', error);
  }
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting automated backup system...');
    
    // Perform backup
    const manifest = await performBackup();
    
    // Cleanup old backups
    await cleanupOldBackups();
    
    console.log('✅ Automated backup system completed successfully');
    process.exit(0);
    
  } catch (error) {
    console.error('💥 Automated backup system failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  performBackup,
  cleanupOldBackups,
  BACKUP_CONFIG
};