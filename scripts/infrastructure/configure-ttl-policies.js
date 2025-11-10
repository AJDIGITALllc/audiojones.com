#!/usr/bin/env node

/**
 * Firestore TTL Policy Configuration
 * 
 * This script configures Time-To-Live (TTL) policies for Firestore collections
 * to automatically delete old documents and reduce storage costs.
 * 
 * Usage:
 * node scripts/infrastructure/configure-ttl-policies.js
 * 
 * Environment Variables Required:
 * - GOOGLE_APPLICATION_CREDENTIALS (service account key path)
 * - FIREBASE_PROJECT_ID (Firebase project ID)
 */

const { getFirestore } = require('firebase-admin/firestore');
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

// TTL Policy Configuration
const TTL_POLICIES = [
  {
    collection: 'events',
    field: 'timestamp',
    ttl_seconds: 90 * 24 * 60 * 60, // 90 days
    description: 'System events auto-expire after 90 days to manage storage costs',
    justification: 'Events older than 90 days are rarely accessed and can be safely deleted'
  },
  {
    collection: 'admin_alerts',
    field: 'auto_dismiss_at',
    ttl_seconds: 30 * 24 * 60 * 60, // 30 days
    description: 'Auto-dismissed alerts expire after 30 days',
    justification: 'Dismissed alerts are archived for compliance, then auto-deleted'
  },
  {
    collection: 'admin_audit_log',
    field: 'timestamp',
    ttl_seconds: 365 * 24 * 60 * 60, // 1 year
    description: 'Audit logs retained for 1 year for compliance requirements',
    justification: 'Regulatory compliance requires 1-year audit trail retention'
  },
  {
    collection: 'subscription_events',
    field: 'received_at',
    ttl_seconds: 180 * 24 * 60 * 60, // 180 days (6 months)
    description: 'Webhook events retained for 6 months for debugging and analysis',
    justification: 'Historical webhook data useful for 6 months, then becomes obsolete'
  },
  {
    collection: 'backup_logs',
    field: 'timestamp',
    ttl_seconds: 90 * 24 * 60 * 60, // 90 days
    description: 'Backup operation logs retained for 90 days',
    justification: 'Backup logs needed for troubleshooting, then can be auto-deleted'
  },
  {
    collection: 'infrastructure_health_checks',
    field: 'timestamp',
    ttl_seconds: 30 * 24 * 60 * 60, // 30 days
    description: 'Health check logs retained for 30 days',
    justification: 'Health check history useful for trend analysis, then auto-expire'
  }
];

async function documentCurrentCollections() {
  console.log('📋 Documenting current Firestore collections...');
  
  try {
    const collections = await db.listCollections();
    const collectionInfo = [];
    
    for (const collection of collections) {
      try {
        const snapshot = await collection.limit(1).get();
        const docCount = (await collection.count().get()).data().count;
        
        let sampleDoc = null;
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          sampleDoc = {
            id: doc.id,
            fields: Object.keys(doc.data()),
            hasTimestamp: doc.data().timestamp ? true : false,
            hasReceivedAt: doc.data().received_at ? true : false,
            hasCreatedAt: doc.data().created_at ? true : false
          };
        }
        
        collectionInfo.push({
          name: collection.id,
          document_count: docCount,
          sample_document: sampleDoc
        });
        
        console.log(`📁 ${collection.id}: ${docCount} documents`);
        
      } catch (error) {
        console.warn(`⚠️ Could not analyze collection ${collection.id}:`, error.message);
        collectionInfo.push({
          name: collection.id,
          document_count: 'unknown',
          error: error.message
        });
      }
    }
    
    return collectionInfo;
    
  } catch (error) {
    console.error('❌ Failed to document collections:', error);
    throw error;
  }
}

async function validateTTLPolicies(collectionInfo) {
  console.log('🔍 Validating TTL policy configurations...');
  
  const validationResults = [];
  
  for (const policy of TTL_POLICIES) {
    const collection = collectionInfo.find(c => c.name === policy.collection);
    
    if (!collection) {
      validationResults.push({
        collection: policy.collection,
        status: 'collection_not_found',
        message: `Collection '${policy.collection}' does not exist`
      });
      continue;
    }
    
    if (!collection.sample_document) {
      validationResults.push({
        collection: policy.collection,
        status: 'empty_collection',
        message: `Collection '${policy.collection}' has no documents to validate field`
      });
      continue;
    }
    
    const hasField = collection.sample_document.fields.includes(policy.field);
    
    if (hasField) {
      validationResults.push({
        collection: policy.collection,
        field: policy.field,
        status: 'valid',
        message: `TTL field '${policy.field}' exists in collection`,
        ttl_days: Math.round(policy.ttl_seconds / (24 * 60 * 60))
      });
    } else {
      validationResults.push({
        collection: policy.collection,
        field: policy.field,
        status: 'field_not_found',
        message: `TTL field '${policy.field}' not found in collection. Available fields: ${collection.sample_document.fields.join(', ')}`
      });
    }
  }
  
  return validationResults;
}

async function createTTLConfiguration() {
  console.log('⚙️ Creating TTL configuration document...');
  
  const ttlConfig = {
    configured_at: new Date().toISOString(),
    configured_by: 'infrastructure-hardening-system',
    policies: TTL_POLICIES,
    status: 'configured',
    implementation_notes: [
      'TTL policies must be manually enabled in Firebase Console',
      'Each policy requires individual activation in Firestore settings',
      'TTL deletion runs daily and may take up to 72 hours for initial cleanup',
      'TTL policies are collection-wide and apply to all documents'
    ],
    firebase_console_steps: [
      '1. Go to Firebase Console > Firestore Database',
      '2. Navigate to each collection specified in policies',
      '3. Click "Manage TTL" or "Enable TTL"',
      '4. Select the appropriate timestamp field',
      '5. Set the TTL duration as specified in policy',
      '6. Save and activate the policy'
    ],
    monitoring: {
      storage_usage_before: 'Track in Firebase Console',
      storage_usage_after: 'Monitor for reduction over 7-30 days',
      document_deletion_logs: 'Available in Firebase Console audit logs'
    }
  };
  
  try {
    await db.collection('infrastructure_config').doc('ttl_policies').set(ttlConfig);
    console.log('✅ TTL configuration saved to Firestore');
    return ttlConfig;
  } catch (error) {
    console.error('❌ Failed to save TTL configuration:', error);
    throw error;
  }
}

async function generateImplementationGuide() {
  console.log('📖 Generating TTL implementation guide...');
  
  const guide = {
    title: 'Firestore TTL Policy Implementation Guide',
    overview: 'Time-To-Live (TTL) policies automatically delete documents after a specified time period, reducing storage costs and improving database performance.',
    
    policies_to_implement: TTL_POLICIES.map(policy => ({
      collection: policy.collection,
      field: policy.field,
      retention_period: `${Math.round(policy.ttl_seconds / (24 * 60 * 60))} days`,
      description: policy.description,
      business_justification: policy.justification
    })),
    
    implementation_steps: [
      {
        step: 1,
        title: 'Access Firebase Console',
        action: 'Navigate to Firebase Console > Project > Firestore Database'
      },
      {
        step: 2,
        title: 'Enable TTL for Each Collection',
        action: 'For each collection in the policy list, click the collection name, then "Manage TTL"'
      },
      {
        step: 3,
        title: 'Configure TTL Settings',
        action: 'Select the timestamp field and set the retention period as specified'
      },
      {
        step: 4,
        title: 'Activate Policies',
        action: 'Save and activate each TTL policy'
      },
      {
        step: 5,
        title: 'Monitor Implementation',
        action: 'Track storage usage reduction over the following weeks'
      }
    ],
    
    expected_benefits: [
      '📉 Reduced Firestore storage costs (estimated 20-40% reduction)',
      '⚡ Improved query performance on large collections',
      '🧹 Automated data lifecycle management',
      '📊 Better compliance with data retention policies',
      '🔧 Reduced manual database maintenance'
    ],
    
    monitoring_metrics: [
      'Storage usage trends (Firebase Console)',
      'Document count changes over time',
      'Query performance improvements',
      'Cost reduction in Firebase billing'
    ],
    
    rollback_plan: [
      'TTL policies can be disabled in Firebase Console',
      'Deleted documents cannot be recovered',
      'Backup critical data before enabling TTL',
      'Test with non-critical collections first'
    ]
  };
  
  return guide;
}

async function estimateStorageImpact(collectionInfo, validationResults) {
  console.log('📊 Estimating storage impact of TTL policies...');
  
  const estimates = [];
  let totalEstimatedSavings = 0;
  
  for (const validation of validationResults) {
    if (validation.status === 'valid') {
      const collection = collectionInfo.find(c => c.name === validation.collection);
      const policy = TTL_POLICIES.find(p => p.collection === validation.collection);
      
      if (collection && collection.document_count !== 'unknown') {
        // Rough estimate: assume 20-50% of documents will be eligible for deletion
        const estimatedDeletionRate = 0.3; // 30% average
        const documentsToDelete = Math.round(collection.document_count * estimatedDeletionRate);
        const avgDocSizeKB = 2; // Rough estimate of 2KB per document
        const estimatedSavingsKB = documentsToDelete * avgDocSizeKB;
        
        estimates.push({
          collection: validation.collection,
          current_documents: collection.document_count,
          estimated_deletions: documentsToDelete,
          estimated_savings_kb: estimatedSavingsKB,
          retention_period: `${Math.round(policy.ttl_seconds / (24 * 60 * 60))} days`
        });
        
        totalEstimatedSavings += estimatedSavingsKB;
      }
    }
  }
  
  const impact = {
    total_estimated_savings_kb: totalEstimatedSavings,
    total_estimated_savings_mb: Math.round(totalEstimatedSavings / 1024),
    collection_estimates: estimates,
    cost_savings_estimate: `$${(totalEstimatedSavings * 0.00018).toFixed(2)}/month`, // Rough Firestore pricing
    implementation_timeline: '7-30 days for full effect'
  };
  
  console.log(`💰 Estimated storage savings: ${impact.total_estimated_savings_mb} MB`);
  console.log(`💵 Estimated cost savings: ${impact.cost_savings_estimate}`);
  
  return impact;
}

async function main() {
  console.log('🚀 Configuring Firestore TTL policies for Audio Jones...');
  console.log(`📅 Timestamp: ${new Date().toISOString()}`);
  
  try {
    // Document current collections
    const collectionInfo = await documentCurrentCollections();
    
    // Validate TTL policies
    const validationResults = await validateTTLPolicies(collectionInfo);
    
    // Show validation results
    console.log('\n🔍 TTL Policy Validation Results:');
    validationResults.forEach(result => {
      const status = result.status === 'valid' ? '✅' : '⚠️';
      console.log(`${status} ${result.collection}: ${result.message}`);
    });
    
    // Create TTL configuration
    const ttlConfig = await createTTLConfiguration();
    
    // Generate implementation guide
    const guide = await generateImplementationGuide();
    
    // Estimate storage impact
    const impact = await estimateStorageImpact(collectionInfo, validationResults);
    
    // Generate summary
    const summary = {
      configured_at: new Date().toISOString(),
      total_policies: TTL_POLICIES.length,
      valid_policies: validationResults.filter(r => r.status === 'valid').length,
      invalid_policies: validationResults.filter(r => r.status !== 'valid').length,
      estimated_storage_savings: impact,
      next_steps: [
        'Implement TTL policies manually in Firebase Console',
        'Monitor storage usage reduction over 30 days',
        'Track cost savings in Firebase billing',
        'Document actual vs estimated impact'
      ]
    };
    
    console.log('\n🎉 TTL policy configuration completed!');
    console.log(`📊 ${summary.valid_policies}/${summary.total_policies} policies validated successfully`);
    console.log(`💾 Estimated savings: ${impact.total_estimated_savings_mb} MB`);
    console.log(`💰 Estimated cost reduction: ${impact.cost_savings_estimate}`);
    
    console.log('\n📋 Summary:');
    console.log(JSON.stringify(summary, null, 2));
    
    process.exit(0);
    
  } catch (error) {
    console.error('💥 TTL policy configuration failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  documentCurrentCollections,
  validateTTLPolicies,
  createTTLConfiguration,
  generateImplementationGuide,
  TTL_POLICIES
};