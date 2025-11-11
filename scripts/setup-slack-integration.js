/**
 * Slack Integration Setup Script
 * 
 * This script helps configure Slack tokens for the Audio Jones notification system.
 * Run this once to set up Slack integration.
 */

console.log('🔧 Setting up Slack Integration for Audio Jones...\n');

// SECURITY NOTE: Slack tokens should be stored as environment variables
// The actual tokens should be configured in your deployment environment
const SLACK_TOKENS = {
  ACCESS_TOKEN: process.env.SLACK_ACCESS_TOKEN || '[SET_SLACK_ACCESS_TOKEN_IN_ENV]',
  REFRESH_TOKEN: process.env.SLACK_REFRESH_TOKEN || '[SET_SLACK_REFRESH_TOKEN_IN_ENV]'
};

console.log('📋 Slack Workspace: AjDigital');
console.log('🔑 Access Token:', SLACK_TOKENS.ACCESS_TOKEN.substring(0, 20) + '...');
console.log('🔄 Refresh Token:', SLACK_TOKENS.REFRESH_TOKEN.substring(0, 20) + '...\n');

console.log('⚙️ Environment Variables to Set:\n');

console.log('For Production (Vercel/Deployment):');
console.log('SLACK_BOT_TOKEN="xoxe.xoxp-1-[YOUR_ACCESS_TOKEN_HERE]"');
console.log('SLACK_REFRESH_TOKEN="xoxe-1-[YOUR_REFRESH_TOKEN_HERE]"');
console.log('SLACK_CHANNEL="#alerts"');
console.log('');

console.log('For Local Development (.env.local):');
console.log('SLACK_BOT_TOKEN=xoxe.xoxp-1-[YOUR_ACCESS_TOKEN_HERE]');
console.log('SLACK_REFRESH_TOKEN=xoxe-1-[YOUR_REFRESH_TOKEN_HERE]');
console.log('SLACK_CHANNEL=#alerts');
console.log('');

console.log('📝 Next Steps:');
console.log('1. Add the environment variables to your deployment platform');
console.log('2. Add them to your local .env.local file for testing');
console.log('3. Create a #alerts channel in your AjDigital Slack workspace');
console.log('4. Test notifications using the /api/admin/alerts/test endpoint');
console.log('');

console.log('🔒 Security Notes:');
console.log('- These tokens have been logged in this script');
console.log('- Consider rotating tokens after initial setup');
console.log('- Ensure .env.local is in .gitignore');
console.log('- Use secure environment variable storage in production');
console.log('');

console.log('✅ Slack integration configuration complete!');
console.log('   Audio Jones alerts will now be sent to Slack when configured.');