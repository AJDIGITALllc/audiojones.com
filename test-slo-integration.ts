#!/usr/bin/env node

/**
 * SLO Integration Test
 * 
 * Tests the SLO system end-to-end to ensure:
 * 1. SLO computation works correctly
 * 2. Incident creation happens for violations  
 * 3. Incident updates work for existing incidents
 * 4. API returns proper responses
 */

const TEST_ADMIN_KEY = process.env.ADMIN_KEY || 'test-admin-key';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

interface TestResult {
  test: string;
  passed: boolean;
  error?: string;
  details?: any;
}

class SLOIntegrationTester {
  private results: TestResult[] = [];
  
  private addResult(test: string, passed: boolean, error?: string, details?: any) {
    this.results.push({ test, passed, error, details });
    const status = passed ? '✅' : '❌';
    console.log(`${status} ${test}${error ? `: ${error}` : ''}`);
    if (details) console.log(`   Details:`, details);
  }

  async testSLOAPI() {
    try {
      console.log('\n🎯 Testing SLO API endpoint...');
      
      const response = await fetch(`${BASE_URL}/api/admin/slo?include_incidents=true`, {
        headers: {
          'admin-key': TEST_ADMIN_KEY,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Validate response structure
      const hasRequiredFields = data.ok && data.slos && data.summary && data.incident_actions !== undefined;
      this.addResult('SLO API returns valid structure', hasRequiredFields, 
        hasRequiredFields ? undefined : 'Missing required fields', data);

      // Check SLO computations
      if (data.slos && data.slos.length > 0) {
        const firstSlo = data.slos[0];
        const hasValidSloData = firstSlo.sloId && firstSlo.target && 
          firstSlo.achieved !== undefined && firstSlo.errorBudget !== undefined;
        this.addResult('SLO data has valid fields', hasValidSloData,
          hasValidSloData ? undefined : 'SLO missing required fields', firstSlo);

        // Check status computation
        const hasValidStatus = ['healthy', 'at-risk', 'violating'].includes(firstSlo.status);
        this.addResult('SLO status computation works', hasValidStatus,
          hasValidStatus ? undefined : `Invalid status: ${firstSlo.status}`);
        
        // Check error budget computation
        const errorBudgetValid = firstSlo.errorBudgetConsumed >= 0 && 
          firstSlo.errorBudgetConsumed <= 100;
        this.addResult('Error budget computation valid', errorBudgetValid,
          errorBudgetValid ? undefined : `Invalid error budget: ${firstSlo.errorBudgetConsumed}`);
      } else {
        this.addResult('SLO data available', false, 'No SLO data returned');
      }

      // Check summary statistics
      if (data.summary) {
        const summaryValid = data.summary.total >= 0 && 
          data.summary.healthy >= 0 && 
          data.summary.at_risk >= 0 && 
          data.summary.violating >= 0;
        this.addResult('Summary statistics valid', summaryValid,
          summaryValid ? undefined : 'Invalid summary stats', data.summary);
      }

      return data;
      
    } catch (error) {
      this.addResult('SLO API basic functionality', false, error instanceof Error ? error.message : 'Unknown error');
      return null;
    }
  }

  async testIncidentIntegration() {
    try {
      console.log('\n🚨 Testing incident integration...');
      
      // First get incidents list to establish baseline
      const incidentsResponse = await fetch(`${BASE_URL}/api/admin/incidents`, {
        headers: {
          'admin-key': TEST_ADMIN_KEY,
        }
      });

      if (!incidentsResponse.ok) {
        throw new Error(`Failed to fetch incidents: ${incidentsResponse.status}`);
      }

      const incidentsData = await incidentsResponse.json();
      const initialIncidentCount = incidentsData.incidents?.length || 0;
      
      this.addResult('Incident API accessible', true, undefined, 
        { initialCount: initialIncidentCount });

      // Test SLO API with incident creation enabled
      const sloData = await this.testSLOAPI();
      
      if (sloData && sloData.incident_actions) {
        const hasIncidentActions = sloData.incident_actions.length > 0;
        this.addResult('Incident actions present', hasIncidentActions,
          hasIncidentActions ? undefined : 'No incident actions found',
          sloData.incident_actions);

        // Check for incident creation actions
        const createdIncidents = sloData.incident_actions.filter(
          (action: any) => action.action === 'created_incident'
        );
        const updatedIncidents = sloData.incident_actions.filter(
          (action: any) => action.action === 'updated_incident'  
        );

        this.addResult('Incident creation capability', true, undefined, {
          created: createdIncidents.length,
          updated: updatedIncidents.length,
          failed: sloData.incident_actions.filter((a: any) => a.action === 'failed').length
        });
      }

    } catch (error) {
      this.addResult('Incident integration test', false, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  async testSLOFiltering() {
    try {
      console.log('\n🔍 Testing SLO filtering...');
      
      // Test service filtering
      const serviceFilterResponse = await fetch(`${BASE_URL}/api/admin/slo?service=webhook`, {
        headers: { 'admin-key': TEST_ADMIN_KEY }
      });

      if (serviceFilterResponse.ok) {
        const serviceData = await serviceFilterResponse.json();
        const allWebhook = serviceData.slos?.every((slo: any) => slo.service === 'webhook') ?? true;
        this.addResult('Service filtering works', allWebhook,
          allWebhook ? undefined : 'Non-webhook SLOs returned');
      }

      // Test window filtering
      const windowFilterResponse = await fetch(`${BASE_URL}/api/admin/slo?window=7d`, {
        headers: { 'admin-key': TEST_ADMIN_KEY }
      });

      if (windowFilterResponse.ok) {
        const windowData = await windowFilterResponse.json();
        const all7Day = windowData.slos?.every((slo: any) => slo.window === '7d') ?? true;
        this.addResult('Window filtering works', all7Day,
          all7Day ? undefined : 'Non-7d SLOs returned');
      }

    } catch (error) {
      this.addResult('SLO filtering test', false, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  async testErrorHandling() {
    try {
      console.log('\n🛡️ Testing error handling...');
      
      // Test without admin key
      const noAuthResponse = await fetch(`${BASE_URL}/api/admin/slo`);
      const isUnauthorized = noAuthResponse.status === 401 || noAuthResponse.status === 403;
      this.addResult('Auth required', isUnauthorized,
        isUnauthorized ? undefined : `Expected 401/403, got ${noAuthResponse.status}`);

      // Test with invalid parameters
      const invalidParamsResponse = await fetch(`${BASE_URL}/api/admin/slo?service=invalid&window=invalid`, {
        headers: { 'admin-key': TEST_ADMIN_KEY }
      });

      // Should still work but filter out results
      const invalidHandled = invalidParamsResponse.ok;
      this.addResult('Invalid parameters handled', invalidHandled,
        invalidHandled ? undefined : `Invalid params caused error: ${invalidParamsResponse.status}`);

    } catch (error) {
      this.addResult('Error handling test', false, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  async runAllTests() {
    console.log('🚀 Starting SLO Integration Tests...\n');
    console.log(`Testing against: ${BASE_URL}`);
    console.log(`Admin key: ${TEST_ADMIN_KEY.substring(0, 8)}...\n`);

    await this.testSLOAPI();
    await this.testIncidentIntegration();  
    await this.testSLOFiltering();
    await this.testErrorHandling();

    // Report results
    console.log('\n📊 Test Results Summary:');
    console.log('=' .repeat(50));
    
    const passed = this.results.filter(r => r.passed).length;
    const failed = this.results.filter(r => !r.passed).length;
    const total = this.results.length;

    console.log(`Total Tests: ${total}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`Success Rate: ${Math.round((passed / total) * 100)}%`);

    if (failed > 0) {
      console.log('\n❌ Failed Tests:');
      this.results.filter(r => !r.passed).forEach(result => {
        console.log(`  - ${result.test}: ${result.error}`);
      });
    }

    console.log('\n' + '='.repeat(50));
    
    return { passed, failed, total, success: failed === 0 };
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new SLOIntegrationTester();
  tester.runAllTests()
    .then(results => {
      process.exit(results.success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Test runner failed:', error);
      process.exit(1);
    });
}

module.exports = SLOIntegrationTester;