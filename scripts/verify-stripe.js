#!/usr/bin/env node

// scripts/verify-stripe.js
// Quick verification script for Stripe configuration

const fs = require('fs');

console.log('🔍 Stripe Configuration Verification');
console.log('=====================================\n');

// Check environment files
const checkEnvFile = (path, name) => {
  if (!fs.existsSync(path)) {
    console.log(`❌ ${name}: File missing`);
    return false;
  }
  
  const content = fs.readFileSync(path, 'utf8');
  const hasSecret = content.includes('stripe_secret=sk_');
  const hasApiVersion = content.includes('STRIPE_API_VERSION=');
  const hasCommentedVersion = content.includes('# STRIPE_API_VERSION=');
  
  console.log(`✅ ${name}: File exists`);
  console.log(`   stripe_secret: ${hasSecret ? '✅ Configured' : '❌ Missing'}`);
  console.log(`   STRIPE_API_VERSION: ${hasApiVersion ? '⚠️ Pinned' : hasCommentedVersion ? '✅ Optional (commented)' : '✅ Using account default'}`);
  
  return hasSecret;
};

console.log('📁 Environment Files:');
const rootEnvOk = checkEnvFile('.env.local', '.env.local');
const functionsEnvOk = checkEnvFile('functions/.env', 'functions/.env');

console.log('\n🔧 Stripe SDK Implementation:');

// Check API routes
const checkStripeFile = (path, name) => {
  if (!fs.existsSync(path)) {
    console.log(`❌ ${name}: File missing`);
    return false;
  }
  
  const content = fs.readFileSync(path, 'utf8');
  const hasModernInit = content.includes('Stripe.StripeConfig');
  const hasEnvCheck = content.includes('process.env.STRIPE_API_VERSION');
  const hasHardcodedVersion = content.includes('apiVersion:') && !content.includes('envApiVersion');
  
  console.log(`✅ ${name}: ${hasModernInit ? '✅ Future-proof' : '⚠️ Needs update'}`);
  if (hasHardcodedVersion) {
    console.log(`   ⚠️ Warning: Contains hardcoded API version`);
  }
  
  return hasModernInit;
};

const checkoutOk = checkStripeFile('src/app/api/stripe/checkout/route.ts', 'Checkout API');
const portalOk = checkStripeFile('src/app/api/stripe/portal/route.ts', 'Portal API');
const functionsOk = checkStripeFile('functions/src/index.ts', 'Functions');

console.log('\n📊 Overall Status:');
const allOk = rootEnvOk && functionsEnvOk && checkoutOk && portalOk && functionsOk;
console.log(`Overall: ${allOk ? '✅ Ready for production' : '⚠️ Needs attention'}`);

console.log('\n💡 Best Practices:');
console.log('   • Keep STRIPE_API_VERSION commented unless testing specific versions');
console.log('   • Manage API version defaults in Stripe Dashboard → Developers → API version');
console.log('   • Use environment-specific pinning only in Vercel Preview environments');
console.log('   • Let Stripe SDK use account default for maximum compatibility');

console.log('\n🚀 Next Steps:');
if (!allOk) {
  console.log('   1. Fix any missing configurations above');
  console.log('   2. Test Stripe API calls in development');
} else {
  console.log('   1. Deploy to production');
  console.log('   2. Test checkout and billing portal flows');
}
console.log('   3. Monitor Stripe Dashboard for webhook delivery');
console.log('   4. Verify account API version is current in Stripe Dashboard');