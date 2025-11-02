# Vercel Deployment Troubleshooting

This guide summarizes the checks we use to unblock preview and production deployments for **audiojones**. Run through the sections in order whenever a build fails on Vercel.

## 1. Verify Local Build Parity

Make sure the repository builds locally with the same steps Vercel runs:

```powershell
npm ci
npm run lint
npm run build
npm --prefix functions ci
npm --prefix functions run build
```

If any step fails, fix it before retrying the cloud deployment. Passing locally ensures the Next.js app and Firebase Functions compile with the exact dependency tree that Vercel will install.

## 2. Confirm Runtime Version

Vercel defaults to Node.js 18 for Next.js projects. The site depends on Next.js 16 and React 19, which require Node.js 18.17 or newer. If you have changed the project settings, revert the **Node.js Version** to **18** under **Project Settings → Build & Development Settings**. When debugging locally, switch to the same version:

```powershell
# Using nvm on Windows (PowerShell)
nvm use 18.20.4
```

## 3. Sync Environment Variables

Missing environment variables are the most common cause of failed builds. Audit the Preview and Production environments in the Vercel dashboard and ensure they match `.env.local` and `functions/.env`.

| Scope | Key | Notes |
| --- | --- | --- |
| Next.js | `NEXT_PUBLIC_FIREBASE_API_KEY` | Required for client-side Firebase |
| Next.js | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Required for auth |
| Next.js | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Required for messaging |
| Next.js | `stripe_secret` | Lowercase key expected by API routes |
| Next.js | `stripe_webhook_secret` | Needed if webhook route is enabled |
| Next.js | `WHOP_API_KEY` / `WHOP_API_URL` | Enables Whop integrations |
| Next.js | `MAILERLITE_TOKEN` (+ optional `MAILERLITE_API_BASE`, `MAILERLITE_GROUP_ID`) | Newsletter automation |
| Next.js | `SUBSTACK_FEED_URL` | Optional feed import |
| Next.js | `GOOGLE_APPLICATION_CREDENTIALS_JSON` | Paste the JSON string for Firebase Admin |
| Functions | `WHOP_WEBHOOK_SECRET` | Required by background jobs |
| Functions | `stripe_secret`, `stripe_webhook_secret` | Mirror of the app secrets |
| Functions | `MAILERLITE_TOKEN` | Background sync |

After adding or updating values, redeploy with **Preview** first to confirm the fix. Remember to replicate any changes in both environments so Production behaves the same way once promoted.

## 4. Inspect the Remote Logs Quickly

Use the helper script to pull the latest deployment events without leaving your terminal:

```powershell
node scripts/fetch-vercel-logs.mjs --token <VERCEL_API_TOKEN>
```

The script prints logs grouped by deployment and highlights common issues (missing env vars, cache problems, Prisma, or Next.js build failures). It also saves a timestamped JSON snapshot under `vercel_logs/` for deeper inspection.

## 5. Redeploy Workflow

1. Push your branch to GitHub – Vercel automatically creates a **Preview** deployment.
2. Watch the preview build in the dashboard. If it passes, run `vercel promote <deployment-url>` or click **Promote to Production** to deploy the exact artifact.
3. For manual deploys, use the CLI:

   ```powershell
   # Pull the latest env values for local testing
   vercel pull --environment=preview

   # Create a preview deployment from the current branch
   vercel --prebuilt

   # Promote to production when ready
   vercel --prod
   ```

4. If a deployment errors, rerun the troubleshooting steps above before reattempting.

## 6. Common Failure Patterns

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| `Missing environment variable` | Secret undefined in Vercel env | Populate the key in both Preview and Production | 
| `Build cache` warnings and timeouts | Stale Next.js cache | Trigger a fresh build with **Redeploy** or run `vercel --force` |
| `Framework not detected` | Wrong project root | Check that the Vercel project points to the repo root (contains `package.json`) |
| `Prisma generate` failures | Prisma schema mismatch | Run `npx prisma generate` locally, commit generated files, and redeploy |
| `next build failed` | General compilation error | Run `npm run build` locally and fix the reported TypeScript or ESLint issues |

Following this checklist should unblock preview and production pushes. Use it as the standard operating procedure whenever a deployment fails.
