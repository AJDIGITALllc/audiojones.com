# Vercel Environment Variable Cleanup - Basecamp Removal

This document contains the exact Vercel CLI commands needed to remove all Basecamp-related environment variables from the project after the integration has been completely removed from the codebase.

## Commands to Run

Execute these commands for **all environments** (development, preview, production):

```bash
# Remove all Basecamp environment variables
vercel env rm BASECAMP_ACCOUNT_ID
vercel env rm BASECAMP_CLIENT_ID
vercel env rm BASECAMP_CLIENT_SECRET
vercel env rm BASECAMP_ACCESS_TOKEN
vercel env rm BASECAMP_REFRESH_TOKEN
vercel env rm BASECAMP_USER_AGENT
```

## Verification

After running the cleanup commands, verify that no Basecamp variables remain:

```bash
vercel env ls
```

The output should **NOT** contain any variables starting with `BASECAMP_`.

## Context

All Basecamp integration code, API routes, scripts, and environment variable references have been completely removed from the codebase to eliminate deployment bottlenecks. The project now builds successfully without requiring any Basecamp environment variables.

**Current working integrations:**
- ✅ Firebase: Connected
- ✅ ImageKit: Endpoint reachable  
- ✅ Stripe: Authenticated
- ✅ MailerLite: Authenticated

**Build status:** ✅ 62/62 pages generated successfully