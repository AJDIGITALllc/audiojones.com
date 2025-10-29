# audiojones.com

## Environment Setup

This repo is initialized from `codex.init.yml`.

- Root app env: `.env.local`
  - Firebase client vars: `NEXT_PUBLIC_FIREBASE_*` (fill API key, auth domain, messaging sender ID)
  - Stripe vars (code expects lowercase): `stripe_secret`, `stripe_webhook_secret`
  - Whop: `WHOP_API_KEY`, `WHOP_API_URL`
  - MailerLite: `MAILERLITE_TOKEN`, optional `MAILERLITE_API_BASE`, `MAILERLITE_GROUP_ID`
  - Substack: `SUBSTACK_FEED_URL`
  - Admin credentials JSON: `GOOGLE_APPLICATION_CREDENTIALS_JSON` (paste JSON string)

- Firebase Functions env: `functions/.env`
  - `stripe_secret`, `stripe_webhook_secret`
  - `WHOP_API_KEY`, `WHOP_WEBHOOK_SECRET`, `WHOP_API_URL`
  - `MAILERLITE_TOKEN`

The initialization created both files with placeholders; fill in missing secrets before running.
