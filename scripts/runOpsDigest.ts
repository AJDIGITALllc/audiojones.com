#!/usr/bin/env node

/**
 * Ops Digest Runner Script
 * 
 * Standalone script for running ops digest from cron, GitHub Actions, or CLI.
 * 
 * Usage:
 *   npx tsx scripts/runOpsDigest.ts
 *   npx tsx scripts/runOpsDigest.ts --preview
 *   npx tsx scripts/runOpsDigest.ts --env=production
 * 
 * Environment Variables Required:
 *   ADMIN_KEY - Admin API authentication key
 *   BASE_URL - API base URL (defaults to http://localhost:3000)
 *   SLACK_BOT_TOKEN - Slack bot token (optional, for validation)
 *   SLACK_WEBHOOK_URL - Slack webhook URL (optional, for validation)
 */

import { config } from 'dotenv';
import { buildOpsDigest, updateDigestStatus, logDigest } from '../src/lib/server/digest';
import { sendOpsDigestToSlack, previewOpsDigestSlack } from '../src/lib/server/digestSlack';

// Load environment variables
config();

interface RunOptions {
  preview: boolean;
  env: 'development' | 'production';
  verbose: boolean;
}

class OpsDigestRunner {
  private options: RunOptions;
  private baseUrl: string;
  private adminKey: string;

  constructor(options: Partial<RunOptions> = {}) {
    this.options = {
      preview: false,
      env: 'development',
      verbose: true,
      ...options
    };

    this.baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    this.adminKey = process.env.ADMIN_KEY || '';

    if (!this.adminKey) {
      throw new Error('ADMIN_KEY environment variable is required');
    }
  }

  private log(message: string, level: 'info' | 'warn' | 'error' = 'info') {
    if (!this.options.verbose && level === 'info') return;
    
    const timestamp = new Date().toISOString();
    const prefix = level === 'error' ? '❌' : level === 'warn' ? '⚠️' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  private async validateConfiguration(): Promise<boolean> {
    this.log('🔍 Validating configuration...');

    // Check environment variables
    const requiredVars = ['ADMIN_KEY'];
    const optionalVars = ['SLACK_BOT_TOKEN', 'SLACK_WEBHOOK_URL'];
    
    for (const varName of requiredVars) {
      if (!process.env[varName]) {
        this.log(`Missing required environment variable: ${varName}`, 'error');
        return false;
      }
    }

    // Check optional Slack configuration
    const slackConfigured = optionalVars.every(varName => !!process.env[varName]);
    if (!slackConfigured) {
      this.log('Slack not fully configured - digest will be generated but not sent', 'warn');
    } else {
      this.log('✅ Slack configuration detected');
    }

    // Test API endpoint if not in preview mode
    if (!this.options.preview) {
      try {
        const response = await fetch(`${this.baseUrl}/api/admin/digest/run`, {
          method: 'GET',
          headers: {
            'admin-key': this.adminKey,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          this.log(`API endpoint test failed: HTTP ${response.status}`, 'error');
          return false;
        }

        this.log('✅ API endpoint accessible');
      } catch (error) {
        this.log(`API endpoint test failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
        return false;
      }
    }

    this.log('✅ Configuration validation passed');
    return true;
  }

  private async runViaAPI(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const url = new URL(`${this.baseUrl}/api/admin/digest/run`);
      if (this.options.preview) {
        url.searchParams.set('preview', 'true');
      }

      this.log(`📡 Calling API: ${url.toString()}`);

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'admin-key': this.adminKey,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.error || 'API returned ok: false' };
      }

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async runDirectly(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      this.log('🔧 Running digest directly (bypassing API)...');

      // Build digest
      const digest = await buildOpsDigest();
      this.log(`✅ Built digest: ${digest.slo.length} SLOs, ${digest.incidents.length} incidents`);

      if (this.options.preview) {
        // Preview mode
        const preview = previewOpsDigestSlack(digest);
        this.log('📋 Generated preview');
        
        return {
          success: true,
          data: {
            ok: true,
            preview_mode: true,
            sent: false,
            digest: {
              generated_at: digest.generatedAt,
              summary: digest.summary
            },
            preview
          }
        };
      } else {
        // Send to Slack
        const slackResult = await sendOpsDigestToSlack(digest);
        
        if (slackResult.success) {
          // Log successful digest
          await logDigest(digest, ['slack']);
          await updateDigestStatus({
            sent_at: new Date().toISOString(),
            success: true,
            digest_summary: digest.summary
          });
          
          this.log('✅ Digest sent and logged successfully');
        } else {
          // Log failed attempt
          await updateDigestStatus({
            sent_at: new Date().toISOString(),
            success: false,
            error: slackResult.error,
            digest_summary: digest.summary
          });
        }

        return {
          success: slackResult.success,
          data: {
            ok: true,
            preview_mode: false,
            sent: slackResult.success,
            digest: {
              generated_at: digest.generatedAt,
              summary: digest.summary
            },
            slack: slackResult
          },
          error: slackResult.error
        };
      }

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async run(): Promise<number> {
    try {
      this.log(`🚀 Starting ops digest runner (${this.options.env} mode)`);
      this.log(`Preview mode: ${this.options.preview}`);
      this.log(`Base URL: ${this.baseUrl}`);

      // Validate configuration
      const configValid = await this.validateConfiguration();
      if (!configValid) {
        this.log('❌ Configuration validation failed', 'error');
        return 1;
      }

      // Try API first, fall back to direct execution
      let result = await this.runViaAPI();
      
      if (!result.success && result.error?.includes('fetch')) {
        this.log('⚠️ API call failed, trying direct execution...', 'warn');
        result = await this.runDirectly();
      }

      // Report results
      if (result.success) {
        const data = result.data;
        this.log('✅ Ops digest completed successfully');
        
        if (data?.digest) {
          this.log(`📊 Summary: ${JSON.stringify(data.digest.summary, null, 2)}`);
        }
        
        if (this.options.preview) {
          this.log('📋 Preview generated (not sent to Slack)');
        } else if (data?.sent) {
          this.log('📨 Digest sent to Slack successfully');
        } else {
          this.log('⚠️ Digest generated but not sent to Slack', 'warn');
        }
        
        return 0;
      } else {
        this.log(`❌ Ops digest failed: ${result.error}`, 'error');
        return 1;
      }

    } catch (error) {
      this.log(`❌ Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
      return 1;
    }
  }
}

// Parse command line arguments
function parseArgs(): Partial<RunOptions> {
  const args = process.argv.slice(2);
  const options: Partial<RunOptions> = {};

  for (const arg of args) {
    if (arg === '--preview') {
      options.preview = true;
    } else if (arg === '--quiet') {
      options.verbose = false;
    } else if (arg.startsWith('--env=')) {
      const env = arg.split('=')[1] as 'development' | 'production';
      if (env === 'development' || env === 'production') {
        options.env = env;
      }
    }
  }

  return options;
}

// Run script if called directly
if (require.main === module) {
  const options = parseArgs();
  const runner = new OpsDigestRunner(options);
  
  runner.run()
    .then(exitCode => {
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('❌ Script runner failed:', error);
      process.exit(1);
    });
}

export { OpsDigestRunner };