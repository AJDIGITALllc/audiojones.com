# Vercel Deployment Failures and Resolutions

This document summarizes the root causes of recent Vercel deployment failures and the comprehensive steps taken to resolve them.

## Issue: Invalid `vercel.json` Environment Configuration

**Date:** 2025-12-10

**Symptom:** Every deployment triggered from GitHub failed immediately with schema validation errors before the build could start. Vercel reported:

```
The `vercel.json` schema validation failed with the following message: `env.FIREBASE_PROJECT_ID` should be string
```

### Root Cause Analysis

`vercel.json` defined the `env` section using string arrays:

```json
{
  "env": {
    "FIREBASE_PROJECT_ID": ["production", "preview", "development"]
  }
}
```

The Vercel configuration schema expects each `env` entry to be a string value (for inline secrets or `@alias` references) or an object describing the value/targets. Arrays are not supported, so validation aborted before any build steps ran.

### Resolution

- Removed the invalid `env` block from `vercel.json`. Vercel already manages these variables through the project dashboard/CLI, so no JSON configuration is required.
- Confirmed via the Vercel API that new deployments progress beyond the validation phase once the file only contains the `git.submodules` setting.

### Recommended Follow-up

1. Manage environment variables exclusively through `vercel env` CLI or the dashboard to avoid drifting configuration formats.
2. If configuration-as-code is required in the future, use the documented structure with `@` aliases or `{ "value": "...", "target": [...] }` objects.
3. Add `npm run lint` or a Vercel configuration validation step to CI to surface schema issues before deploy.

---

## Issue: Environment Variable Access During Build Time

**Date:** 2025-11-06

**Symptom:** Vercel deployments were failing with generic "Error" status. Local production builds (`npm run build`) were failing with environment variable errors:
- `Error: OPENAI_API_KEY environment variable is required`
- `Error: PERPLEXITY_API_KEY environment variable is required`

### Root Cause Analysis

The deployment failures were caused by **environment variables being accessed during the module loading phase** of the build process, specifically during Next.js static page generation.

**Problem Pattern:**
```typescript
// ❌ PROBLEMATIC PATTERN
class BlogGenerator {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY!; // Fails during build
  }
}
export const blogGenerator = new BlogGenerator(); // Executes immediately on import
```

**What Happened:**
1. Next.js imports modules during build to collect page data
2. Module imports execute constructors immediately  
3. Constructors access environment variables
4. Environment variables aren't available/required during build time
5. Build fails before deployment

### Solution: Lazy Proxy Initialization Pattern

**Implemented Fix:**
```typescript
// ✅ SOLUTION PATTERN
class BlogGenerator {
  private openaiApiKey: string | null = null;
  
  private initializeOpenAI() {
    if (!this.openaiApiKey) {
      this.openaiApiKey = process.env.OPENAI_API_KEY!;
      if (!this.openaiApiKey) {
        throw new Error('OPENAI_API_KEY environment variable is required');
      }
    }
  }
  
  async generateContentWithVoice() {
    // Only check environment variable when actually needed
    this.initializeOpenAI();
    // ... use this.openaiApiKey
  }
}

// Lazy proxy prevents immediate instantiation
let _blogGenerator: BlogGenerator | null = null;
export const blogGenerator = new Proxy({} as BlogGenerator, {
  get(target, prop) {
    if (!_blogGenerator) {
      _blogGenerator = new BlogGenerator();
    }
    const value = (_blogGenerator as any)[prop];
    return typeof value === 'function' ? value.bind(_blogGenerator) : value;
  }
});
```

### Implementation Details

**Files Modified:**
- `src/lib/automation/perplexity.ts` - Lazy proxy for PerplexityClient
- `src/lib/automation/blog-generator.ts` - Lazy proxy for BlogGenerator
- Removed environment variable access from constructors
- Moved initialization to actual usage points

**Key Principles:**
1. **Lazy Loading:** Only instantiate classes when methods are actually called
2. **Runtime Checks:** Environment variables checked only when features are used
3. **Graceful Failure:** Build succeeds, runtime fails only if missing keys when needed
4. **Proxy Pattern:** Transparent lazy initialization without changing API

### Results

**Before Fix:**
- ❌ Vercel builds failing consistently
- ❌ Local `npm run build` failing 
- ❌ Environment variables required during build time
- ❌ Static page generation blocked

**After Fix:**
- ✅ Vercel builds successful (62/62 pages)
- ✅ Local builds complete without API keys
- ✅ Environment variables only checked when features used
- ✅ Static site generation works perfectly
- ✅ Graceful runtime error handling

### Verification

```bash
# Test build without environment variables
npm run build
# ✅ Succeeds - 63/63 pages generated

# Test runtime behavior
# ✅ API routes work when environment variables are set
# ✅ Clear error messages when environment variables missing at runtime
```

### Lessons Learned

1. **Build vs Runtime:** Environment variables for external APIs should be runtime dependencies, not build dependencies
2. **Lazy Initialization:** Use lazy patterns for modules that depend on runtime configuration
3. **Proxy Pattern:** Effective for transparent lazy loading without API changes
4. **Error Boundaries:** Place environment variable checks at the point of actual usage, not initialization

### Related Implementations

**Webhook Monitoring:** 
- `src/app/api/webhooks/vercel-deploy/route.ts` - Monitors deployment failures
- Provides detailed logs and automatic issue creation
- Graceful handling when notification services not configured

**Log Analysis:**
- `scripts/get-vercel-failed-logs.ps1` - Automated log fetching
- `run-vercel-logs.bat` - Simple interface for troubleshooting

This solution ensures robust deployments while maintaining clean separation between build-time and runtime dependencies.