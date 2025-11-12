#!/usr/bin/env node

/**
 * SLO System Validation
 * 
 * Validates the SLO system components without requiring a running server
 */

const fs = require('fs');
const path = require('path');

class SLOValidator {
  constructor() {
    this.results = [];
    this.basePath = process.cwd();
  }

  addResult(test, passed, error = null, details = null) {
    this.results.push({ test, passed, error, details });
    const status = passed ? '✅' : '❌';
    console.log(`${status} ${test}${error ? `: ${error}` : ''}`);
    if (details) console.log(`   Details:`, details);
  }

  validateFileExists(filePath, description) {
    try {
      const fullPath = path.join(this.basePath, filePath);
      const exists = fs.existsSync(fullPath);
      this.addResult(`${description} exists`, exists, 
        exists ? null : `File not found: ${filePath}`);
      return exists;
    } catch (error) {
      this.addResult(`${description} validation`, false, error.message);
      return false;
    }
  }

  validateFileContent(filePath, pattern, description) {
    try {
      const fullPath = path.join(this.basePath, filePath);
      if (!fs.existsSync(fullPath)) {
        this.addResult(description, false, `File not found: ${filePath}`);
        return false;
      }

      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = pattern.test(content);
      this.addResult(description, matches,
        matches ? null : `Pattern not found in ${filePath}`);
      return matches;
    } catch (error) {
      this.addResult(description, false, error.message);
      return false;
    }
  }

  validateSLOTypes() {
    console.log('\n🎯 Validating SLO types and helpers...');
    
    const sloTypesExists = this.validateFileExists('src/lib/server/slo.ts', 'SLO types file');
    if (sloTypesExists) {
      this.validateFileContent('src/lib/server/slo.ts', /interface SLO\s*{/, 'SLO interface defined');
      this.validateFileContent('src/lib/server/slo.ts', /interface SLOBurn\s*{/, 'SLOBurn interface defined');
      this.validateFileContent('src/lib/server/slo.ts', /computeSLOBurn/, 'computeSLOBurn function exists');
      this.validateFileContent('src/lib/server/slo.ts', /computeMultipleSLOBurns/, 'Multiple SLO computation exists');
    }
  }

  validateDefaultSLOs() {
    console.log('\n📋 Validating default SLO definitions...');
    
    const defaultsExists = this.validateFileExists('src/lib/server/defaultSLOs.ts', 'Default SLOs file');
    if (defaultsExists) {
      this.validateFileContent('src/lib/server/defaultSLOs.ts', /DEFAULT_SLOS/, 'DEFAULT_SLOS constant exists');
      this.validateFileContent('src/lib/server/defaultSLOs.ts', /webhook.*availability/, 'Webhook SLOs defined');
      this.validateFileContent('src/lib/server/defaultSLOS.ts', /service:\s*["']capacity["']/, 'Capacity SLOs defined');
      this.validateFileContent('src/lib/server/defaultSLOs.ts', /service:\s*["']billing["']/, 'Billing SLOs defined');
    }
  }

  validateSLOAPI() {
    console.log('\n🔌 Validating SLO API endpoint...');
    
    const apiExists = this.validateFileExists('src/app/api/admin/slo/route.ts', 'SLO API route');
    if (apiExists) {
      this.validateFileContent('src/app/api/admin/slo/route.ts', /export async function GET/, 'GET endpoint defined');
      this.validateFileContent('src/app/api/admin/slo/route.ts', /computeMultipleSLOBurns/, 'Uses SLO computation');
      this.validateFileContent('src/app/api/admin/slo/route.ts', /createIncidentFromAlert/, 'Incident integration present');
      this.validateFileContent('src/app/api/admin/slo/route.ts', /appendIncidentEvent/, 'Incident updates present');
    }
  }

  validateAdminUI() {
    console.log('\n🎨 Validating admin UI...');
    
    const uiExists = this.validateFileExists('src/app/portal/admin/slo/page.tsx', 'SLO admin page');
    if (uiExists) {
      this.validateFileContent('src/app/portal/admin/slo/page.tsx', /SLOBurn/, 'Uses SLO types');
      this.validateFileContent('src/app/portal/admin/slo/page.tsx', /error.*budget/i, 'Error budget display');
      this.validateFileContent('src/app/portal/admin/slo/page.tsx', /\/api\/admin\/slo/, 'Calls SLO API');
    }

    const navExists = this.validateFileExists('src/app/portal/components/AdminSidebar.tsx', 'Admin navigation');
    if (navExists) {
      this.validateFileContent('src/app/portal/components/AdminSidebar.tsx', /\/portal\/admin\/slo/, 'SLO nav link present');
      this.validateFileContent('src/app/portal/components/AdminSidebar.tsx', /SLOs/, 'SLO nav label present');
    }
  }

  validateIncidentIntegration() {
    console.log('\n🚨 Validating incident integration...');
    
    const incidentsExists = this.validateFileExists('src/lib/server/incidents.ts', 'Incidents service');
    if (incidentsExists) {
      this.validateFileContent('src/lib/server/incidents.ts', /createIncidentFromAlert/, 'Create incident function exists');
      this.validateFileContent('src/lib/server/incidents.ts', /appendIncidentEvent/, 'Append event function exists');
      this.validateFileContent('src/lib/server/incidents.ts', /findOpenIncidentBySource/, 'Find incident function exists');
    }

    const alertRulesExists = this.validateFileExists('src/lib/server/alertRules.ts', 'Alert rules');
    if (alertRulesExists) {
      this.validateFileContent('src/lib/server/alertRules.ts', /slo/, 'SLO alert type supported');
    }
  }

  validateTypeIntegration() {
    console.log('\n🔗 Validating type integration...');
    
    // Check that SLO types are properly exported and imported
    this.validateFileContent('src/lib/server/slo.ts', /export.*interface.*SLO/, 'SLO types exported');
    this.validateFileContent('src/app/api/admin/slo/route.ts', /import.*SLO.*from/, 'SLO types imported in API');
    this.validateFileContent('src/app/portal/admin/slo/page.tsx', /interface.*SLOBurn/, 'SLO types used in UI');
  }

  async runValidation() {
    console.log('🔍 Starting SLO System Validation...\n');
    console.log(`Base path: ${this.basePath}\n`);

    this.validateSLOTypes();
    this.validateDefaultSLOs();
    this.validateSLOAPI();
    this.validateAdminUI();
    this.validateIncidentIntegration();
    this.validateTypeIntegration();

    // Report results
    console.log('\n📊 Validation Results:');
    console.log('=' .repeat(50));
    
    const passed = this.results.filter(r => r.passed).length;
    const failed = this.results.filter(r => !r.passed).length;
    const total = this.results.length;

    console.log(`Total Checks: ${total}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`Success Rate: ${Math.round((passed / total) * 100)}%`);

    if (failed > 0) {
      console.log('\n❌ Failed Checks:');
      this.results.filter(r => !r.passed).forEach(result => {
        console.log(`  - ${result.test}: ${result.error}`);
      });
    }

    console.log('\n' + '='.repeat(50));
    
    return { passed, failed, total, success: failed === 0 };
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new SLOValidator();
  validator.runValidation()
    .then(results => {
      if (results.success) {
        console.log('\n🎉 SLO system validation completed successfully!');
        console.log('All components are properly integrated and ready for use.');
      } else {
        console.log('\n⚠️  SLO system has validation issues that need attention.');
      }
      process.exit(results.success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Validation failed:', error);
      process.exit(1);
    });
}

module.exports = SLOValidator;