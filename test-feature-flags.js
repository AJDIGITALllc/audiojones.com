#!/usr/bin/env node

/**
 * Feature Flags System Integration Test
 * Tests the complete feature flags system including:
 * - System initialization
 * - Flag creation and management
 * - Rollout controls
 * - Kill switches
 * - A/B testing
 * - Client evaluation
 * - Admin UI integration
 */

const https = require('https');

class FeatureFlagsTestSuite {
  constructor() {
    this.baseUrl = process.env.TEST_BASE_URL || 'https://audiojones.com';
    this.adminToken = null;
    this.testResults = [];
    this.createdFlags = [];
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const emoji = level === 'success' ? '✅' : level === 'error' ? '❌' : level === 'warning' ? '⚠️' : 'ℹ️';
    console.log(`${timestamp} ${emoji} ${message}`);
  }

  async makeRequest(endpoint, method = 'GET', body = null, useAuth = true) {
    return new Promise((resolve, reject) => {
      const url = new URL(endpoint, this.baseUrl);
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'FeatureFlags-TestSuite/1.0'
        }
      };

      if (useAuth && this.adminToken) {
        options.headers['Authorization'] = `Bearer ${this.adminToken}`;
      }

      const req = https.request(url, options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            resolve({
              status: res.statusCode,
              headers: res.headers,
              data: response
            });
          } catch (error) {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              data: data
            });
          }
        });
      });

      req.on('error', reject);

      if (body) {
        req.write(JSON.stringify(body));
      }

      req.end();
    });
  }

  async authenticateAdmin() {
    this.log('🔐 Authenticating as admin...');
    
    // In a real test, you'd authenticate with Firebase
    // For this test, we'll simulate having an admin token
    this.adminToken = process.env.ADMIN_TEST_TOKEN;
    
    if (!this.adminToken) {
      throw new Error('ADMIN_TEST_TOKEN environment variable required');
    }

    // Verify admin access
    const response = await this.makeRequest('/api/admin/ping');
    if (response.status !== 200) {
      throw new Error(`Admin authentication failed: ${response.status}`);
    }

    this.log('Admin authentication successful', 'success');
    return true;
  }

  async testSystemInitialization() {
    this.log('🚀 Testing feature flags system initialization...');

    try {
      const response = await this.makeRequest('/api/admin/feature-flags', 'POST', {
        action: 'initialize'
      });

      if (response.status === 200 && response.data.success) {
        this.log('System initialization successful', 'success');
        this.testResults.push({
          test: 'System Initialization',
          status: 'PASS',
          details: 'System initialized successfully'
        });
      } else {
        throw new Error(`Initialization failed: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      this.log(`System initialization failed: ${error.message}`, 'error');
      this.testResults.push({
        test: 'System Initialization',
        status: 'FAIL',
        details: error.message
      });
      throw error;
    }
  }

  async testFlagCreation() {
    this.log('🏗️ Testing feature flag creation...');

    const testFlags = [
      {
        name: 'Enhanced Analytics Dashboard',
        key: 'enhanced_analytics_dashboard',
        description: 'Advanced analytics and reporting features for enterprise users',
        flag_type: 'rollout',
        rollout_strategy: 'random',
        environments: ['development', 'staging', 'production']
      },
      {
        name: 'Dark Mode UI',
        key: 'dark_mode_ui',
        description: 'Dark theme user interface option',
        flag_type: 'boolean',
        rollout_strategy: 'user_id',
        environments: ['development']
      },
      {
        name: 'A/B Test Checkout',
        key: 'ab_test_checkout',
        description: 'A/B test for new checkout flow',
        flag_type: 'multivariate',
        rollout_strategy: 'random',
        environments: ['production']
      },
      {
        name: 'Emergency Circuit Breaker',
        key: 'emergency_circuit_breaker',
        description: 'Emergency kill switch for critical system shutdown',
        flag_type: 'kill_switch',
        rollout_strategy: 'random',
        environments: ['production']
      }
    ];

    for (const flagConfig of testFlags) {
      try {
        const config = {
          flag_type: flagConfig.flag_type,
          rollout: {
            enabled: false,
            percentage: 0,
            strategy: flagConfig.rollout_strategy
          },
          targeting: {
            organizations: [],
            user_segments: []
          },
          integration: {
            environments: flagConfig.environments
          }
        };

        const response = await this.makeRequest('/api/admin/feature-flags', 'POST', {
          action: 'create_flag',
          name: flagConfig.name,
          key: flagConfig.key,
          description: flagConfig.description,
          config
        });

        if (response.status === 200 && response.data.success) {
          this.log(`Flag '${flagConfig.name}' created successfully`, 'success');
          this.createdFlags.push(flagConfig.key);
          this.testResults.push({
            test: `Flag Creation: ${flagConfig.name}`,
            status: 'PASS',
            details: `Flag created with key: ${flagConfig.key}`
          });
        } else {
          throw new Error(`Failed to create flag: ${JSON.stringify(response.data)}`);
        }
      } catch (error) {
        this.log(`Failed to create flag '${flagConfig.name}': ${error.message}`, 'error');
        this.testResults.push({
          test: `Flag Creation: ${flagConfig.name}`,
          status: 'FAIL',
          details: error.message
        });
      }
    }
  }

  async testRolloutControls() {
    this.log('📈 Testing rollout controls...');

    const testFlag = 'enhanced_analytics_dashboard';
    const rolloutSteps = [0, 25, 50, 75, 100];

    for (const percentage of rolloutSteps) {
      try {
        const response = await this.makeRequest('/api/admin/feature-flags', 'POST', {
          action: 'update_rollout',
          flag_key: testFlag,
          percentage
        });

        if (response.status === 200 && response.data.success) {
          this.log(`Rollout updated to ${percentage}% for ${testFlag}`, 'success');
          this.testResults.push({
            test: `Rollout Control: ${percentage}%`,
            status: 'PASS',
            details: `Successfully updated rollout to ${percentage}%`
          });

          // Wait a moment between rollout changes
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          throw new Error(`Rollout update failed: ${JSON.stringify(response.data)}`);
        }
      } catch (error) {
        this.log(`Rollout update to ${percentage}% failed: ${error.message}`, 'error');
        this.testResults.push({
          test: `Rollout Control: ${percentage}%`,
          status: 'FAIL',
          details: error.message
        });
      }
    }
  }

  async testKillSwitch() {
    this.log('🔴 Testing kill switch functionality...');

    const testFlag = 'emergency_circuit_breaker';
    const killReason = 'Automated test - simulating emergency shutdown';

    try {
      // First activate the flag
      await this.makeRequest('/api/admin/feature-flags', 'POST', {
        action: 'update_flag',
        flag_key: testFlag,
        updates: { status: 'active' }
      });

      // Trigger kill switch
      const killResponse = await this.makeRequest('/api/admin/feature-flags', 'POST', {
        action: 'trigger_kill_switch',
        flag_key: testFlag,
        reason: killReason
      });

      if (killResponse.status === 200 && killResponse.data.success) {
        this.log(`Kill switch activated for ${testFlag}`, 'success');
        this.testResults.push({
          test: 'Kill Switch Activation',
          status: 'PASS',
          details: `Kill switch triggered with reason: ${killReason}`
        });

        // Wait a moment
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Disable kill switch
        const disableResponse = await this.makeRequest('/api/admin/feature-flags', 'POST', {
          action: 'disable_kill_switch',
          flag_key: testFlag
        });

        if (disableResponse.status === 200 && disableResponse.data.success) {
          this.log(`Kill switch disabled for ${testFlag}`, 'success');
          this.testResults.push({
            test: 'Kill Switch Deactivation',
            status: 'PASS',
            details: 'Kill switch successfully disabled'
          });
        } else {
          throw new Error(`Kill switch disable failed: ${JSON.stringify(disableResponse.data)}`);
        }
      } else {
        throw new Error(`Kill switch activation failed: ${JSON.stringify(killResponse.data)}`);
      }
    } catch (error) {
      this.log(`Kill switch test failed: ${error.message}`, 'error');
      this.testResults.push({
        test: 'Kill Switch',
        status: 'FAIL',
        details: error.message
      });
    }
  }

  async testClientEvaluation() {
    this.log('🔍 Testing client-side flag evaluation...');

    const testFlags = ['enhanced_analytics_dashboard', 'dark_mode_ui', 'ab_test_checkout'];

    for (const flagKey of testFlags) {
      try {
        // Test GET evaluation
        const getResponse = await this.makeRequest(`/api/feature-flags/evaluate?flags=${flagKey}`);
        
        if (getResponse.status === 200 && getResponse.data.success) {
          this.log(`GET evaluation successful for ${flagKey}`, 'success');
          this.testResults.push({
            test: `Client Evaluation (GET): ${flagKey}`,
            status: 'PASS',
            details: `Flag evaluated: ${JSON.stringify(getResponse.data.evaluations[flagKey])}`
          });
        }

        // Test POST evaluation with context
        const postResponse = await this.makeRequest('/api/feature-flags/evaluate', 'POST', {
          flags: [flagKey],
          context: {
            user_id: 'test-user-123',
            organization_id: 'test-org-456',
            environment: 'development',
            user_properties: {
              plan: 'enterprise',
              signup_date: '2024-01-15'
            }
          }
        });

        if (postResponse.status === 200 && postResponse.data.success) {
          this.log(`POST evaluation successful for ${flagKey}`, 'success');
          this.testResults.push({
            test: `Client Evaluation (POST): ${flagKey}`,
            status: 'PASS',
            details: `Flag evaluated with context: ${JSON.stringify(postResponse.data.evaluations[flagKey])}`
          });
        }
      } catch (error) {
        this.log(`Client evaluation failed for ${flagKey}: ${error.message}`, 'error');
        this.testResults.push({
          test: `Client Evaluation: ${flagKey}`,
          status: 'FAIL',
          details: error.message
        });
      }
    }
  }

  async testDashboardMetrics() {
    this.log('📊 Testing dashboard metrics...');

    try {
      const response = await this.makeRequest('/api/admin/feature-flags?action=dashboard');

      if (response.status === 200 && response.data.success) {
        const metrics = response.data.data.metrics;
        
        this.log(`Dashboard loaded: ${metrics.total_flags} total flags`, 'success');
        this.log(`Active flags: ${metrics.active_flags}`, 'info');
        this.log(`Flags with kill switches: ${metrics.flags_with_kill_switch}`, 'info');
        this.log(`24h evaluations: ${metrics.total_evaluations_24h}`, 'info');

        this.testResults.push({
          test: 'Dashboard Metrics',
          status: 'PASS',
          details: `Loaded metrics: ${metrics.total_flags} flags, ${metrics.active_flags} active`
        });
      } else {
        throw new Error(`Dashboard load failed: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      this.log(`Dashboard metrics test failed: ${error.message}`, 'error');
      this.testResults.push({
        test: 'Dashboard Metrics',
        status: 'FAIL',
        details: error.message
      });
    }
  }

  async testFlagsList() {
    this.log('📋 Testing flags list...');

    try {
      const response = await this.makeRequest('/api/admin/feature-flags?action=flags');

      if (response.status === 200 && response.data.success) {
        const flags = response.data.data.flags;
        
        this.log(`Flags list loaded: ${flags.length} flags`, 'success');
        
        // Verify our created flags are in the list
        for (const createdFlag of this.createdFlags) {
          const found = flags.find(flag => flag.key === createdFlag);
          if (found) {
            this.log(`Created flag '${createdFlag}' found in list`, 'success');
          } else {
            this.log(`Created flag '${createdFlag}' NOT found in list`, 'warning');
          }
        }

        this.testResults.push({
          test: 'Flags List',
          status: 'PASS',
          details: `Retrieved ${flags.length} flags`
        });
      } else {
        throw new Error(`Flags list failed: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      this.log(`Flags list test failed: ${error.message}`, 'error');
      this.testResults.push({
        test: 'Flags List',
        status: 'FAIL',
        details: error.message
      });
    }
  }

  async testPerformanceMetrics() {
    this.log('⚡ Testing performance metrics...');

    const startTime = Date.now();
    const iterations = 50;
    const flagKey = 'enhanced_analytics_dashboard';

    try {
      const evaluationTimes = [];

      for (let i = 0; i < iterations; i++) {
        const iterStart = Date.now();
        
        await this.makeRequest('/api/feature-flags/evaluate', 'POST', {
          flags: [flagKey],
          context: {
            user_id: `perf-test-user-${i}`,
            organization_id: 'perf-test-org',
            environment: 'development'
          }
        });

        evaluationTimes.push(Date.now() - iterStart);
      }

      const totalTime = Date.now() - startTime;
      const avgTime = evaluationTimes.reduce((a, b) => a + b, 0) / evaluationTimes.length;
      const maxTime = Math.max(...evaluationTimes);
      const minTime = Math.min(...evaluationTimes);

      this.log(`Performance test completed:`, 'success');
      this.log(`  Total time: ${totalTime}ms for ${iterations} evaluations`, 'info');
      this.log(`  Average: ${avgTime.toFixed(2)}ms per evaluation`, 'info');
      this.log(`  Range: ${minTime}ms - ${maxTime}ms`, 'info');
      this.log(`  Throughput: ${(iterations / (totalTime / 1000)).toFixed(2)} evaluations/sec`, 'info');

      this.testResults.push({
        test: 'Performance Metrics',
        status: avgTime < 100 ? 'PASS' : 'FAIL',
        details: `Avg: ${avgTime.toFixed(2)}ms, Max: ${maxTime}ms, Throughput: ${(iterations / (totalTime / 1000)).toFixed(2)}/sec`
      });
    } catch (error) {
      this.log(`Performance test failed: ${error.message}`, 'error');
      this.testResults.push({
        test: 'Performance Metrics',
        status: 'FAIL',
        details: error.message
      });
    }
  }

  async testErrorHandling() {
    this.log('🚨 Testing error handling...');

    const errorTests = [
      {
        name: 'Invalid Flag Key',
        request: () => this.makeRequest('/api/feature-flags/evaluate?flags=nonexistent_flag'),
        expectedStatus: 404
      },
      {
        name: 'Malformed Request',
        request: () => this.makeRequest('/api/feature-flags/evaluate', 'POST', { invalid: 'data' }),
        expectedStatus: 400
      },
      {
        name: 'Unauthorized Admin Access',
        request: () => this.makeRequest('/api/admin/feature-flags', 'POST', { action: 'dashboard' }, false),
        expectedStatus: 401
      }
    ];

    for (const test of errorTests) {
      try {
        const response = await test.request();
        
        if (response.status === test.expectedStatus) {
          this.log(`Error handling test '${test.name}' passed (${response.status})`, 'success');
          this.testResults.push({
            test: `Error Handling: ${test.name}`,
            status: 'PASS',
            details: `Correctly returned ${response.status} status`
          });
        } else {
          this.log(`Error handling test '${test.name}' failed - expected ${test.expectedStatus}, got ${response.status}`, 'error');
          this.testResults.push({
            test: `Error Handling: ${test.name}`,
            status: 'FAIL',
            details: `Expected ${test.expectedStatus}, got ${response.status}`
          });
        }
      } catch (error) {
        this.log(`Error handling test '${test.name}' failed: ${error.message}`, 'error');
        this.testResults.push({
          test: `Error Handling: ${test.name}`,
          status: 'FAIL',
          details: error.message
        });
      }
    }
  }

  generateReport() {
    this.log('\n' + '='.repeat(80));
    this.log('📊 FEATURE FLAGS SYSTEM TEST REPORT');
    this.log('='.repeat(80));

    const passed = this.testResults.filter(r => r.status === 'PASS').length;
    const failed = this.testResults.filter(r => r.status === 'FAIL').length;
    const total = this.testResults.length;

    this.log(`\n📈 SUMMARY: ${passed}/${total} tests passed (${((passed/total)*100).toFixed(1)}%)`);
    
    if (failed === 0) {
      this.log('🎉 All tests passed! Feature flags system is working correctly.', 'success');
    } else {
      this.log(`⚠️  ${failed} tests failed. See details below.`, 'warning');
    }

    this.log('\n📋 DETAILED RESULTS:');
    this.log('-'.repeat(80));

    this.testResults.forEach((result, index) => {
      const status = result.status === 'PASS' ? '✅' : '❌';
      this.log(`${index + 1}. ${status} ${result.test}`);
      this.log(`   ${result.details}`);
    });

    this.log('\n🏷️  CREATED TEST FLAGS:');
    this.createdFlags.forEach(flag => {
      this.log(`   • ${flag}`);
    });

    this.log('\n' + '='.repeat(80));
    this.log('🔧 FEATURE FLAGS SYSTEM TEST COMPLETE');
    this.log('='.repeat(80) + '\n');

    return {
      passed,
      failed,
      total,
      success: failed === 0,
      results: this.testResults
    };
  }

  async runAllTests() {
    this.log('🚀 Starting Feature Flags System Integration Test Suite...\n');

    try {
      // Authentication
      await this.authenticateAdmin();

      // Core system tests
      await this.testSystemInitialization();
      await this.testFlagCreation();
      await this.testRolloutControls();
      await this.testKillSwitch();

      // Client integration tests
      await this.testClientEvaluation();

      // Admin interface tests
      await this.testDashboardMetrics();
      await this.testFlagsList();

      // Performance and reliability tests
      await this.testPerformanceMetrics();
      await this.testErrorHandling();

    } catch (error) {
      this.log(`Test suite failed: ${error.message}`, 'error');
    }

    return this.generateReport();
  }
}

// CLI execution
if (require.main === module) {
  const testSuite = new FeatureFlagsTestSuite();
  
  testSuite.runAllTests()
    .then(report => {
      process.exit(report.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Test suite crashed:', error);
      process.exit(1);
    });
}

module.exports = FeatureFlagsTestSuite;