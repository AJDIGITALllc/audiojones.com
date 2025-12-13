/**
 * Test Agent Core System
 * Demonstrates the new architecture with DSL, connectors, and execution engine
 */

import { planFromPrompt, ExecutionEngine, ConnectorRegistry } from './packages/agent-core/dist/index.js';
import { WhopConnector } from './packages/connectors/whop/dist/index.js';
import { GumroadConnector } from './packages/connectors/gumroad/dist/index.js';

async function testAgentSystem() {
  console.log('🤖 Testing Agent Core System\n');
  console.log('=' .repeat(60));

  // Test 1: Plan Generation
  console.log('\n📋 Test 1: Plan Generation');
  console.log('-'.repeat(60));
  
  const planResult = await planFromPrompt({
    prompt: 'List the last 10 payments',
    context: {
      platform: 'whop',
    },
  });

  if (planResult.success && planResult.plan) {
    console.log('✅ Plan generated successfully');
    console.log(`   Plan ID: ${planResult.plan.id}`);
    console.log(`   Actions: ${planResult.plan.actions.length}`);
    console.log(`   Description: ${planResult.plan.description}`);
    console.log('\n   Actions:');
    planResult.plan.actions.forEach((action, i) => {
      console.log(`   ${i + 1}. [${action.platform}] ${action.type}`);
    });
  } else {
    console.log('❌ Plan generation failed');
    console.log(`   Error: ${planResult.error}`);
    if (planResult.validationErrors) {
      planResult.validationErrors.forEach(err => console.log(`   - ${err}`));
    }
  }

  // Test 2: Connector Registry
  console.log('\n\n🔌 Test 2: Connector Registry');
  console.log('-'.repeat(60));
  
  const registry = new ConnectorRegistry();
  
  // Register Whop connector (stub mode - no API key)
  const whopConnector = new WhopConnector();
  await whopConnector.initialize({});
  registry.register('whop', whopConnector);
  console.log('✅ Registered Whop connector (STUB mode)');
  
  // Register Gumroad connector
  const gumroadConnector = new GumroadConnector();
  await gumroadConnector.initialize({});
  registry.register('gumroad', gumroadConnector);
  console.log('✅ Registered Gumroad connector (STUB - not implemented)');
  
  console.log(`\n   Available platforms: ${registry.list().join(', ')}`);

  // Test 3: Connector Health Checks
  console.log('\n\n🏥 Test 3: Connector Health Checks');
  console.log('-'.repeat(60));
  
  const whopHealth = await whopConnector.healthCheck();
  console.log(`   Whop: ${whopHealth.healthy ? '✅' : '❌'} ${whopHealth.message}`);
  console.log(`         Mode: ${whopHealth.details?.mode}`);
  
  const gumroadHealth = await gumroadConnector.healthCheck();
  console.log(`   Gumroad: ${gumroadHealth.healthy ? '✅' : '❌'} ${gumroadHealth.message}`);
  console.log(`            Status: ${gumroadHealth.details?.status}`);

  // Test 4: Connector Metadata
  console.log('\n\n📊 Test 4: Connector Metadata');
  console.log('-'.repeat(60));
  
  const whopMeta = whopConnector.getMetadata();
  console.log(`   ${whopMeta.name}`);
  console.log(`   Version: ${whopMeta.version}`);
  console.log(`   Configured: ${whopMeta.configured ? '✅' : '❌'}`);
  console.log(`   Capabilities: ${whopMeta.capabilities.join(', ')}`);
  
  const gumroadMeta = gumroadConnector.getMetadata();
  console.log(`\n   ${gumroadMeta.name}`);
  console.log(`   Version: ${gumroadMeta.version}`);
  console.log(`   Configured: ${gumroadMeta.configured ? '✅' : '❌'}`);
  console.log(`   Capabilities: ${gumroadMeta.capabilities.length > 0 ? gumroadMeta.capabilities.join(', ') : 'None (stub)'}`);

  // Test 5: Plan Execution
  if (planResult.success && planResult.plan) {
    console.log('\n\n⚡ Test 5: Plan Execution (STUB mode)');
    console.log('-'.repeat(60));
    
    const engine = new ExecutionEngine(registry);
    const executionResult = await engine.executePlan(planResult.plan);
    
    console.log(`   Plan ID: ${executionResult.planId}`);
    console.log(`   Success: ${executionResult.success ? '✅' : '❌'}`);
    console.log(`   Duration: ${executionResult.duration}ms`);
    console.log(`   Results: ${executionResult.results.length}`);
    
    executionResult.results.forEach((result, i) => {
      const status = result.success ? '✅' : '❌';
      console.log(`\n   ${i + 1}. ${status} [${result.action.platform}] ${result.action.type}`);
      if (result.data?.stub) {
        console.log(`      Mode: STUB (no real API call)`);
      }
      if (result.error) {
        console.log(`      Error: ${result.error}`);
      }
    });
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Agent Core System test complete!\n');
}

// Run tests
testAgentSystem().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
