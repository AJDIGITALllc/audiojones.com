#!/usr/bin/env tsx

/**
 * SLO Credit System Test Script
 * Tests automatic credit processing and SLO monitoring
 */

import { sloCreditEngine } from '../src/lib/slo/SLOCreditEngine';
import { sloEngine } from '../src/lib/slo/SloEngine';
import { computeMultipleSLOBurns } from '../src/lib/server/slo';
import { DEFAULT_SLOS } from '../src/lib/server/defaultSLOs';

async function main() {
  console.log('🔄 Testing SLO Credit System...\n');

  try {
    // 1. Initialize credit rules
    console.log('1️⃣ Initializing SLO credit rules...');
    await sloCreditEngine.initializeCreditRules();
    console.log('✅ Credit rules initialized\n');

    // 2. Get current SLO performance
    console.log('2️⃣ Computing current SLO performance...');
    const sloResults = await computeMultipleSLOBurns(DEFAULT_SLOS);
    
    console.log('SLO Results:');
    sloResults.forEach(slo => {
      const status = slo.status === 'healthy' ? '✅' : 
                    slo.status === 'at-risk' ? '⚠️' : '🚨';
      console.log(`  ${status} ${slo.sloId}: ${slo.achieved.toFixed(2)}% (target: ${slo.target}%)`);
    });
    console.log('');

    // 3. Simulate some SLO violations by recording bad metrics
    console.log('3️⃣ Simulating SLO violations...');
    
    // Simulate webhook failures for test client
    const testMetrics = [
      {
        service_id: 'webhook',
        client_id: 'test-client-001',
        metric_type: 'availability',
        value: 95.0, // Below 99% target
        threshold: 99.0,
        success: false,
        timestamp: new Date(),
      },
      {
        service_id: 'billing',
        client_id: 'test-client-002', 
        metric_type: 'processing',
        value: 96.5, // Below 99% target
        threshold: 99.0,
        success: false,
        timestamp: new Date(),
      },
      {
        service_id: 'capacity',
        client_id: 'test-client-001',
        metric_type: 'forecasting',
        value: 97.0, // Low but maybe acceptable
        threshold: 98.5,
        success: false,
        timestamp: new Date(),
      }
    ];

    // Record metrics using the old engine for compatibility
    for (const metric of testMetrics) {
      await sloEngine.recordMetric(metric);
      console.log(`  📊 Recorded metric: ${metric.service_id}/${metric.client_id} = ${metric.value}%`);
    }
    console.log('');

    // 4. Process automatic credits
    console.log('4️⃣ Processing automatic credits...');
    const creditSummary = await sloCreditEngine.processAutomaticCredits();
    
    console.log('Credit Processing Summary:');
    console.log(`  💰 Total credits applied: ${creditSummary.credits_applied}`);
    console.log(`  💵 Total credit amount: $${creditSummary.total_credits_month}`);
    console.log(`  👥 Clients affected: ${creditSummary.clients_affected}`);
    console.log(`  🚨 Violations detected: ${creditSummary.violations_detected}`);
    console.log(`  📋 Rules processed: ${creditSummary.rules_processed}`);
    console.log('');

    // 5. Get dashboard data
    console.log('5️⃣ Fetching dashboard data...');
    const dashboardData = await sloCreditEngine.getCreditDashboardData();
    
    console.log('Dashboard Summary:');
    console.log(`  📊 Current month credits: $${dashboardData.current_month_credits}`);
    console.log(`  📈 Credits this week: $${dashboardData.credits_this_week}`);
    console.log(`  👥 Total clients credited: ${dashboardData.total_clients_credited}`);
    console.log(`  ⚙️  Active rules: ${dashboardData.active_rules}`);
    console.log('');

    // 6. Show recent applications
    if (dashboardData.recent_applications.length > 0) {
      console.log('6️⃣ Recent Credit Applications:');
      dashboardData.recent_applications.slice(0, 5).forEach((app, i) => {
        console.log(`  ${i + 1}. ${app.client_id}: $${app.credit_amount} (${app.service}/${app.slo_id})`);
        console.log(`     Reason: ${app.reason}`);
      });
      console.log('');
    }

    // 7. Test credit rules
    console.log('7️⃣ Testing credit rules...');
    const creditRules = await sloCreditEngine.getCreditRules();
    
    console.log('Active Credit Rules:');
    creditRules.forEach(rule => {
      const status = rule.enabled ? '✅' : '❌';
      console.log(`  ${status} ${rule.slo_id}: ${rule.credit_percentage}% credit, max $${rule.max_credits_per_month}/month`);
    });
    console.log('');

    console.log('🎉 SLO Credit System test completed successfully!');
    console.log('\n📝 Next Steps:');
    console.log('   • Set up cron job for automatic credit processing');
    console.log('   • Configure real client contracts for testing');
    console.log('   • Set up monitoring alerts for credit applications');
    console.log('   • Test manual credit application via API');

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export default main;