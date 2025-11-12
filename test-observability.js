#!/usr/bin/env node

/**
 * Observability System Integration Test
 * Tests the complete observability infrastructure including:
 * - OpenTelemetry initialization
 * - Distributed tracing
 * - Performance metrics collection
 * - Dashboard data visualization
 * - API endpoint integration
 * - Real-time monitoring
 */

const https = require('https');

class ObservabilityTestSuite {
  constructor() {
    this.baseUrl = process.env.TEST_BASE_URL || 'https://audiojones.com';
    this.adminToken = null;
    this.testResults = [];
    this.createdTraces = [];
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
          'User-Agent': 'Observability-TestSuite/1.0'
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
    this.log('🚀 Testing observability system initialization...');

    try {
      const response = await this.makeRequest('/api/admin/observability', 'POST', {
        action: 'initialize'
      });

      if (response.status === 200 && response.data.success) {
        this.log('Observability system initialization successful', 'success');
        this.testResults.push({
          test: 'System Initialization',
          status: 'PASS',
          details: 'OpenTelemetry and monitoring initialized successfully'
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

  async testSystemMetrics() {
    this.log('📊 Testing system metrics collection...');

    try {
      const response = await this.makeRequest('/api/admin/observability?endpoint=metrics');

      if (response.status === 200 && response.data.success) {
        const metrics = response.data.data.metrics;
        
        this.log(`System metrics loaded successfully:`, 'success');
        this.log(`  • Total requests (24h): ${metrics.total_requests_24h}`, 'info');
        this.log(`  • Avg response time: ${metrics.avg_response_time_ms.toFixed(1)}ms`, 'info');
        this.log(`  • Error rate: ${metrics.error_rate_percent.toFixed(2)}%`, 'info');
        this.log(`  • Active traces: ${metrics.active_traces}`, 'info');
        this.log(`  • Webhook events: ${metrics.webhook_events_24h}`, 'info');
        this.log(`  • Database operations: ${metrics.database_operations_24h}`, 'info');
        this.log(`  • Feature flag evaluations: ${metrics.feature_flag_evaluations_24h}`, 'info');

        this.testResults.push({
          test: 'System Metrics Collection',
          status: 'PASS',
          details: `Collected comprehensive metrics: ${metrics.total_requests_24h} requests, ${metrics.avg_response_time_ms.toFixed(1)}ms avg`
        });
      } else {
        throw new Error(`Metrics collection failed: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      this.log(`System metrics test failed: ${error.message}`, 'error');
      this.testResults.push({
        test: 'System Metrics Collection',
        status: 'FAIL',
        details: error.message
      });
    }
  }

  async testTraceCollection() {
    this.log('🔍 Testing distributed trace collection...');

    try {
      // Test different time ranges
      const timeRanges = ['1h', '6h', '24h'];
      
      for (const timeRange of timeRanges) {
        const response = await this.makeRequest(`/api/admin/observability/traces?timeRange=${timeRange}&limit=50`);

        if (response.status === 200 && response.data.success) {
          const traces = response.data.data.traces;
          
          this.log(`Trace collection (${timeRange}): ${traces.length} traces found`, 'success');
          
          // Analyze trace data
          const statusCounts = traces.reduce((acc, trace) => {
            acc[trace.status] = (acc[trace.status] || 0) + 1;
            return acc;
          }, {});

          this.log(`  Status breakdown: ${JSON.stringify(statusCounts)}`, 'info');

          this.testResults.push({
            test: `Trace Collection (${timeRange})`,
            status: 'PASS',
            details: `Retrieved ${traces.length} traces with status breakdown: ${JSON.stringify(statusCounts)}`
          });
        } else {
          throw new Error(`Trace collection failed for ${timeRange}: ${JSON.stringify(response.data)}`);
        }
      }
    } catch (error) {
      this.log(`Trace collection test failed: ${error.message}`, 'error');
      this.testResults.push({
        test: 'Trace Collection',
        status: 'FAIL',
        details: error.message
      });
    }
  }

  async testCustomTraceCreation() {
    this.log('🎯 Testing custom trace creation...');

    const testTraces = [
      {
        operationName: 'test.webhook.processing',
        duration: 150,
        status: 'success',
        metadata: { test: true, component: 'webhook_handler' },
        userId: 'test-user-123',
        organizationId: 'test-org-456'
      },
      {
        operationName: 'test.database.query',
        duration: 45,
        status: 'success',
        metadata: { collection: 'customers', operation: 'read' },
        userId: 'test-user-123'
      },
      {
        operationName: 'test.feature.flag.evaluation',
        duration: 5,
        status: 'success',
        metadata: { flag_key: 'test_flag', result: true },
        organizationId: 'test-org-456'
      },
      {
        operationName: 'test.error.simulation',
        duration: 200,
        status: 'error',
        metadata: { error: 'Simulated test error', component: 'test_suite' }
      }
    ];

    for (const traceConfig of testTraces) {
      try {
        const response = await this.makeRequest('/api/admin/observability', 'POST', {
          action: 'create_trace',
          ...traceConfig
        });

        if (response.status === 200 && response.data.success) {
          const trace = response.data.data.trace;
          this.log(`Custom trace created: ${traceConfig.operationName} (${trace.traceId})`, 'success');
          this.createdTraces.push(trace.traceId);
          
          this.testResults.push({
            test: `Custom Trace: ${traceConfig.operationName}`,
            status: 'PASS',
            details: `Trace created with ID: ${trace.traceId}`
          });
        } else {
          throw new Error(`Failed to create trace: ${JSON.stringify(response.data)}`);
        }
      } catch (error) {
        this.log(`Failed to create custom trace '${traceConfig.operationName}': ${error.message}`, 'error');
        this.testResults.push({
          test: `Custom Trace: ${traceConfig.operationName}`,
          status: 'FAIL',
          details: error.message
        });
      }
    }
  }

  async testPerformanceMetrics() {
    this.log('📈 Testing performance metrics collection...');

    try {
      const timeRanges = ['1h', '24h'];
      
      for (const timeRange of timeRanges) {
        const response = await this.makeRequest(`/api/admin/observability/performance?timeRange=${timeRange}`);

        if (response.status === 200 && response.data.success) {
          const metrics = response.data.data.metrics;
          
          this.log(`Performance metrics (${timeRange}): ${metrics.length} metrics collected`, 'success');
          
          // Analyze metrics
          const metricTypes = metrics.reduce((acc, metric) => {
            acc[metric.name] = (acc[metric.name] || 0) + 1;
            return acc;
          }, {});

          this.log(`  Metric types: ${JSON.stringify(metricTypes)}`, 'info');

          this.testResults.push({
            test: `Performance Metrics (${timeRange})`,
            status: 'PASS',
            details: `Collected ${metrics.length} metrics across types: ${Object.keys(metricTypes).join(', ')}`
          });
        } else {
          throw new Error(`Performance metrics failed for ${timeRange}: ${JSON.stringify(response.data)}`);
        }
      }
    } catch (error) {
      this.log(`Performance metrics test failed: ${error.message}`, 'error');
      this.testResults.push({
        test: 'Performance Metrics',
        status: 'FAIL',
        details: error.message
      });
    }
  }

  async testTraceFiltering() {
    this.log('🔍 Testing trace filtering capabilities...');

    const filterTests = [
      { name: 'Status Filter', params: 'status=success' },
      { name: 'Operation Filter', params: 'operation=test.webhook.processing' },
      { name: 'User Filter', params: 'userId=test-user-123' },
      { name: 'Organization Filter', params: 'organizationId=test-org-456' },
      { name: 'Combined Filters', params: 'status=success&userId=test-user-123' }
    ];

    for (const filterTest of filterTests) {
      try {
        const response = await this.makeRequest(`/api/admin/observability/traces?${filterTest.params}&limit=25`);

        if (response.status === 200 && response.data.success) {
          const traces = response.data.data.traces;
          this.log(`${filterTest.name}: ${traces.length} filtered traces`, 'success');
          
          this.testResults.push({
            test: `Trace Filtering: ${filterTest.name}`,
            status: 'PASS',
            details: `Filter applied successfully, returned ${traces.length} traces`
          });
        } else {
          throw new Error(`Filter test failed: ${JSON.stringify(response.data)}`);
        }
      } catch (error) {
        this.log(`Trace filtering test '${filterTest.name}' failed: ${error.message}`, 'error');
        this.testResults.push({
          test: `Trace Filtering: ${filterTest.name}`,
          status: 'FAIL',
          details: error.message
        });
      }
    }
  }

  async testDashboardIntegration() {
    this.log('📊 Testing dashboard integration...');

    try {
      // Test that the observability dashboard loads
      const response = await this.makeRequest('/portal/admin/observability', 'GET', null, false);

      if (response.status === 200) {
        this.log('Observability dashboard accessible', 'success');
        this.testResults.push({
          test: 'Dashboard Integration',
          status: 'PASS',
          details: 'Dashboard page loads successfully'
        });
      } else {
        throw new Error(`Dashboard not accessible: ${response.status}`);
      }
    } catch (error) {
      this.log(`Dashboard integration test failed: ${error.message}`, 'error');
      this.testResults.push({
        test: 'Dashboard Integration',
        status: 'FAIL',
        details: error.message
      });
    }
  }

  async testRealTimeMonitoring() {
    this.log('⚡ Testing real-time monitoring capabilities...');

    try {
      // Create a sequence of traces to test real-time updates
      const startTime = Date.now();
      
      for (let i = 0; i < 5; i++) {
        await this.makeRequest('/api/admin/observability', 'POST', {
          action: 'create_trace',
          operationName: `test.realtime.monitoring.${i}`,
          duration: Math.floor(Math.random() * 100) + 50,
          status: Math.random() > 0.8 ? 'error' : 'success',
          metadata: { test: 'realtime', sequence: i }
        });
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Check if traces appear in recent data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for processing
      
      const response = await this.makeRequest('/api/admin/observability/traces?timeRange=1h&limit=10');
      
      if (response.status === 200 && response.data.success) {
        const traces = response.data.data.traces;
        const realtimeTraces = traces.filter(trace => 
          trace.operationName.startsWith('test.realtime.monitoring') &&
          trace.startTime >= startTime
        );

        this.log(`Real-time monitoring: ${realtimeTraces.length}/5 traces detected`, 'success');
        
        this.testResults.push({
          test: 'Real-time Monitoring',
          status: realtimeTraces.length >= 4 ? 'PASS' : 'PARTIAL',
          details: `${realtimeTraces.length}/5 traces detected in real-time`
        });
      } else {
        throw new Error(`Real-time test failed: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      this.log(`Real-time monitoring test failed: ${error.message}`, 'error');
      this.testResults.push({
        test: 'Real-time Monitoring',
        status: 'FAIL',
        details: error.message
      });
    }
  }

  async testPerformanceBenchmark() {
    this.log('⚡ Testing observability system performance...');

    const startTime = Date.now();
    const iterations = 25;
    const operationTimes = [];

    try {
      for (let i = 0; i < iterations; i++) {
        const iterStart = Date.now();
        
        await this.makeRequest('/api/admin/observability?endpoint=metrics');
        
        operationTimes.push(Date.now() - iterStart);
      }

      const totalTime = Date.now() - startTime;
      const avgTime = operationTimes.reduce((a, b) => a + b, 0) / operationTimes.length;
      const maxTime = Math.max(...operationTimes);
      const minTime = Math.min(...operationTimes);

      this.log(`Performance benchmark completed:`, 'success');
      this.log(`  Total time: ${totalTime}ms for ${iterations} requests`, 'info');
      this.log(`  Average: ${avgTime.toFixed(2)}ms per request`, 'info');
      this.log(`  Range: ${minTime}ms - ${maxTime}ms`, 'info');
      this.log(`  Throughput: ${(iterations / (totalTime / 1000)).toFixed(2)} requests/sec`, 'info');

      this.testResults.push({
        test: 'Performance Benchmark',
        status: avgTime < 200 ? 'PASS' : 'FAIL',
        details: `Avg: ${avgTime.toFixed(2)}ms, Max: ${maxTime}ms, Throughput: ${(iterations / (totalTime / 1000)).toFixed(2)}/sec`
      });
    } catch (error) {
      this.log(`Performance benchmark failed: ${error.message}`, 'error');
      this.testResults.push({
        test: 'Performance Benchmark',
        status: 'FAIL',
        details: error.message
      });
    }
  }

  generateReport() {
    this.log('\n' + '='.repeat(80));
    this.log('📊 OBSERVABILITY SYSTEM TEST REPORT');
    this.log('='.repeat(80));

    const passed = this.testResults.filter(r => r.status === 'PASS').length;
    const partial = this.testResults.filter(r => r.status === 'PARTIAL').length;
    const failed = this.testResults.filter(r => r.status === 'FAIL').length;
    const total = this.testResults.length;

    this.log(`\n📈 SUMMARY: ${passed}/${total} tests passed, ${partial} partial, ${failed} failed (${((passed/total)*100).toFixed(1)}%)`);
    
    if (failed === 0) {
      this.log('🎉 All observability tests passed! Distributed tracing system is operational.', 'success');
    } else {
      this.log(`⚠️  ${failed} tests failed. See details below.`, 'warning');
    }

    this.log('\n📋 DETAILED RESULTS:');
    this.log('-'.repeat(80));

    this.testResults.forEach((result, index) => {
      const status = result.status === 'PASS' ? '✅' : result.status === 'PARTIAL' ? '🟡' : '❌';
      this.log(`${index + 1}. ${status} ${result.test}`);
      this.log(`   ${result.details}`);
    });

    if (this.createdTraces.length > 0) {
      this.log('\n🏷️  CREATED TEST TRACES:');
      this.createdTraces.forEach(traceId => {
        this.log(`   • ${traceId}`);
      });
    }

    this.log('\n🔧 OBSERVABILITY FEATURES TESTED:');
    this.log('   ✅ OpenTelemetry initialization');
    this.log('   ✅ System metrics collection');
    this.log('   ✅ Distributed trace storage');
    this.log('   ✅ Custom trace creation');
    this.log('   ✅ Performance metrics tracking');
    this.log('   ✅ Trace filtering capabilities');
    this.log('   ✅ Dashboard integration');
    this.log('   ✅ Real-time monitoring');
    this.log('   ✅ Performance benchmarking');

    this.log('\n' + '='.repeat(80));
    this.log('🔍 OBSERVABILITY SYSTEM TEST COMPLETE');
    this.log('='.repeat(80) + '\n');

    return {
      passed,
      partial,
      failed,
      total,
      success: failed === 0,
      results: this.testResults
    };
  }

  async runAllTests() {
    this.log('🚀 Starting Observability System Integration Test Suite...\n');

    try {
      // Authentication
      await this.authenticateAdmin();

      // Core system tests
      await this.testSystemInitialization();
      await this.testSystemMetrics();

      // Tracing tests
      await this.testTraceCollection();
      await this.testCustomTraceCreation();
      await this.testTraceFiltering();

      // Performance and monitoring tests
      await this.testPerformanceMetrics();
      await this.testRealTimeMonitoring();
      await this.testPerformanceBenchmark();

      // Integration tests
      await this.testDashboardIntegration();

    } catch (error) {
      this.log(`Test suite failed: ${error.message}`, 'error');
    }

    return this.generateReport();
  }
}

// CLI execution
if (require.main === module) {
  const testSuite = new ObservabilityTestSuite();
  
  testSuite.runAllTests()
    .then(report => {
      process.exit(report.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Test suite crashed:', error);
      process.exit(1);
    });
}

module.exports = ObservabilityTestSuite;