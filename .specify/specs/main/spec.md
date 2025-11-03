# AudioJones.com — Core Experience Spec (Public + Portal Hand-off)

## 1. Purpose
Deliver the 2025 Audio Jones marketing site and hand-off flow to the client / admin portals described in existing specs (`homepage.md`, `client-portal.md`, `admin-portal.md`).  
The public site must present offers / services (Podcast, AI, Marketing Automation, Client Delivery) and push qualified traffic into the Whop → GBU → MailerLite funnel defined in the Audio Jones modules.

## 2. Background / Context
- **Brand:** Audio Jones under AJ DIGITAL LLC  
- **Tech stack:** Next.js 16 (app router), TypeScript, Tailwind, Firebase, Vercel, ImageKit  
- **Reference modules:** Marketing Automation, Client Delivery, Data Intelligence, AI Optimization, Audio Jones Funnel Map  
- This spec unifies the homepage experience with the 2025 service matrix and prepares the portal hand-off but does not implement the full portal features (those live in their own specs).

## 3. Objectives
1. Present a high-conversion homepage hero aligned to brand colors (#FF4500, #FFD700, #008080, #FFFFFF, #000000).  
2. Show 2025 service categories (Podcast, AI/Automation, Marketing, Data/Intelligence) with CTA blocks.  
3. Provide "Work with Audio Jones" / "Client Login" dual-path CTAs.  
4. Route "Join / Buy" CTAs into Whop so the marketing automation layer can fire.  
5. Keep structure Spec Kit–friendly so AI agents can generate plan / task files automatically.

## 4. User Roles / Scenarios
### 4.1 Visitor (creator / artist / founder)
- I land on audiojones.com and immediately understand what AJ Digital does.  
- I can view services and click a CTA to book, buy, or join.  
- I can see social proof (Circle House Digital, Inner Circle, Miami market).  
- I can opt in (MailerLite) for AI, podcast, or marketing updates.

### 4.2 Existing Client
- I click "Client Portal" and reach the portal sub-domain or route defined in `client-portal.md`.  
- I can request assets or delivery updates (handled in portal).

### 4.3 Admin / Audio Jones Team
- Confirm public routes exist and are SEO-ready.  
- Extend sections without breaking layout.

## 5. Functional Requirements (FR)

### FR01 – Homepage Layout
- Render hero with headline, subhead, primary CTA, secondary CTA.  
- Show services section with ≥ 4 service cards mapped to 2025 matrix.  
- Include "Featured Funnel" band and testimonial strip.  
- Footer with legal + AJ DIGITAL LLC info.

### FR02 – CTA Behavior
- Primary CTA → Whop checkout URL.  
- Secondary CTA → `/client` or `/portal`.  
- CTAs configurable via single JSON or TS config.

### FR03 – Integrations
- MailerLite subscribe form (token from env).  
- ImageKit-hosted hero image.  
- Firebase / Vercel analytics (optional).

### FR04 – SEO / AEO Baseline
- Title, meta description, OG image.  
- Structured content for AI overviews.

### FR05 – Brand Compliance
- Use brand colors (#FF4500 → #FFD700 → #008080 → #FFFFFF → #000000).  
- No lorem ipsum — real Audio Jones copy.  
- Footer must show "AJ DIGITAL LLC".

---

### FR06 – Artist Hub (Artist Services Dashboard)
**Purpose:** Centralized hub for artists to book and purchase studio and creative services without installing an app.

**Goals**
1. New nav tab **"Artist Hub"** in global header.  
2. Route `/artist-hub` showing four core tiles:  
   - Book Studio Time  
   - Book Mix / Master  
   - Buy Beats / Instrumentals  
   - Artist Consultations  
3. Each tile = image + description + CTA.  
4. Optional "Custom Services" toggle in config.  
5. Reuse homepage header/footer styling.

**Technical Notes**
- Route: `/artist-hub`  
- Backend: Firebase / Whop integration  
- Env vars: `WHOP_STUDIO_PRODUCT_URL`, `WHOP_MIX_PRODUCT_URL`, `WHOP_BEATS_URL`, `WHOP_CONSULT_PRODUCT_URL`  
- Components: `ArtistHubLayout.tsx`, `ServiceTile.tsx`  
- Data: `artistHubServices.json`

**Acceptance Criteria**
- Global nav shows "Artist Hub".  
- `/artist-hub` renders four tiles with working CTAs.  
- CTAs open Whop/external links without errors.  
- Responsive layout ≥ 90 Lighthouse mobile score.

---

### FR07 – EPM (Emotional Predictive Marketing) Page / Tab
**Purpose:** Introduce the EPM framework and reserve space for future services ("coming soon").

**Goals**
1. Global nav tab **"EPM"** (aka "EPM Lab").  
2. Route `/epm`.  
3. Explain EPM for founders, artists, marketers (plain language).  
4. 4-step process section (Sense → Predict → Optimize → Automate).  
5. "Services Coming Soon" cards.  
6. Style with Audio Jones gradient (#FF4500 → #FFD700).

**Wireframe / Layout**
- Top Nav: Home | Artist Hub | EPM | Client Portal  
- Hero: title "Emotional Predictive Marketing (EPM)" + subtitle and CTAs.  
- Section 1 – What is EPM? (2-column copy + problem list)  
- Section 2 – EPM Flow (4 cards) Sense / Predict / Optimize / Automate  
- Section 3 – Coming Soon (3 cards: Audit, Affective Offer Engine, Creator EPM Lab)  
- Section 4 – Connect to Audio Jones Ecosystem (links to modules)

**Technical Notes**
- Route: `/epm`  
- Components: `EpmPage.tsx`, `EpmStepCard.tsx`, `ComingSoonCard.tsx`  
- Data: `epmPageConfig` (JSON / TS)  
- Integrations: `MAILERLITE_TOKEN` or `NEXT_PUBLIC_MAILERLITE_FORM_ID`  
- Optional video or Gamma deck link.

**Acceptance Criteria**
- "EPM" in nav and responsive.  
- `/epm` renders hero, explainer, flow, coming-soon cards.  
- Primary CTA triggers subscribe / waitlist.  
- Brand colors and AJ DIGITAL LLC footer.  
- Static-only deploy OK.

**Needs Clarification**
- Mailerlite tag (default `epm-waitlist`).  
- Show pricing placeholders? (default hide).  
- Embed Gamma video? (default external link).

---

## 6. Non-Functional Requirements (NFR)
- NFR01: Next.js 16 app router.  
- NFR02: Mobile-first responsive.  
- NFR03: Lighthouse score ≥ 90.  
- NFR04: TypeScript only, match repo lint rules.

## 7. Data / Config
`config/site.ts` (or similar) should define:  
- siteName "Audio Jones"  
- primaryCtaUrl `env:WHOP_CHECKOUT_URL`  
- secondaryCtaUrl `/client`  
- services array of cards  
- Env vars needed:  
  - `WHOP_CHECKOUT_URL`  
  - `MAILERLITE_TOKEN`  
  - `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`

## 8. Acceptance Criteria (Summary)
- AC01–AC05: Homepage renders and CTAs work.  
- AC06: Artist Hub available and responsive.  
- AC07: EPM page available and responsive.

## 9. Needs Clarification (General)
- NC01: Final Whop product URLs.  
- NC02: Final service card names.  
- NC03: Exact client portal path (`/client` vs `/portal`).  
- NC04: MailerLite list tag for site opt-ins.  
- NC05: Artist Hub custom services data source.  
- NC06: EPM early-access tag / media embed details.