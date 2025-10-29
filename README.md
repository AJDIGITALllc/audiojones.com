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

## Adding a New Page

When adding a new page to the site, follow these steps to ensure proper SEO and schema markup:

1.  **Create the Page Component:** Create a new page component in the `src/app` directory. For example, to create a `/new-page` route, create the file `src/app/new-page/page.tsx`.
2.  **Add Metadata:** At the top of the page component, export a `metadata` object of type `Metadata` from `next`. This object should include the `title`, `description`, `alternates.canonical`, `openGraph`, and `twitter` properties.
3.  **Add Schema Markup:** If the page requires specific schema markup (e.g., `Article`, `Service`, `FAQPage`), add a `<script type="application/ld+json">` tag to the page component with the appropriate schema.
4.  **Add to Sitemap:** Open `src/app/sitemap.ts` and add the new page's route to the `routes` array.
