# Spec: AudioJones.com Homepage
version: 1.0.0
status: draft
owner: AJ DIGITAL LLC (Audio Jones)
author: dev@audiojones.com
last_updated: 2025-11-01
target_branch: feat/homepage-vnext
runtime: Next.js 14/15+ (App Router) + TypeScript + Tailwind
priority: P0

## 1. Purpose
Document the **canonical** homepage build for **audiojones.com** so Copilot, Git Spec Kit, and Jules can all point to **one source of truth**. This homepage must present the Audio Jones brand as an AI-driven marketing + automation consultancy, and must connect to existing funnel/automation modules (Marketing Automation, Client Delivery, Data Intelligence, AI Optimization). This replaces any earlier ad-hoc homepage edits.

## 2. Goals
- ✅ Show hero with **real image** and **real offer** (not placeholder).
- ✅ Add AEO/SEO service strip that we can reuse on subpages.
- ✅ Add "Fan / Client Proof" (testimonials) using **actual names** when available.
- ✅ Add legal/compliance zone (privacy, terms, cancellation, Florida notice).
- ✅ Add footer CTA to push to Whop / Booking.
- ✅ Keep brand colors aligned:
  - Orange Red: `#FF4500`
  - Gold: `#FFD700`
  - Teal: `#008080`
  - White: `#FFFFFF`
  - Black: `#000000`

## 3. Scope
**In scope**
1. `/` (root homepage) — full layout.
2. All homepage components under `src/components/home/` or `components/` (match repo convention).
3. Linking to legal pages: `/privacy`, `/terms`, `/cancellation`, `/cookie-policy` (can be stubs if not present).
4. Import of actual hero image at:  
   - `public/assets/Backgrounds/aj-hero-portrait.webp`  
   If missing, create it in this path or update spec and rerun Jules.

**Out of scope**
- Blog list
- Dashboard/client portal UI
- Admin routes

## 4. Assumptions
- Repo is `AJDIGITALllc/audiojones.com` on GitHub.
- Next.js app router is used (`src/app/...`).
- Tailwind is already configured.
- You are running **Git Spec Kit** locally in VS Code with Copilot enabled.
- You will run **Jules** in browser/CLI **after** this spec is committed.

## 5. Page Structure (Top → Bottom)
1. **Top Nav / Header**
   - Logo (text: "Audio Jones")
   - Links: "Work", "Solutions", "Resources", "Contact"
   - CTA button: "Work With Audio Jones"
   - Sticky on scroll (optional)

2. **Hero Section** (real image)
   - Left column:
     - Eyebrow: `AI-Driven Marketing & Automation`
     - H1: `Build a brand system that actually converts.`
     - Subtext: `We help creators, consultants, and service businesses connect content → automations → revenue using AI, Whop, and Google Business Ultra.`
     - Primary CTA: **"Request Growth Call"** → `/contact` or external Whop checkout
     - Secondary CTA: **"View Services"** → `#services`
   - Right column:
     - Portrait card using **actual asset**:
       ```tsx
       <div className="mx-auto mt-8 aspect-square w-full max-w-[560px] rounded-3xl bg-[#0c0c0c] p-4 ring-1 ring-white/10">
         <img
           src="/assets/Backgrounds/aj-hero-portrait.webp"
           alt="Audio Jones portrait"
           className="h-full w-full rounded-2xl object-cover object-center"
           loading="eager"
           fetchPriority="high"
         />
       </div>
       ```

3. **AEO / SEO Services Strip** (what you called "AEO SEO fan section" earlier)
   - Section ID: `services`
   - Heading: `AI-SEO & AEO Services for 2026+`
   - Subtext: `Built to win in AI search, not just Google SERPs.`
   - 4 cards (pull from your YouTube/Neil Patel 2026 AI-SEO note):
     1. **Entity-Based Content Architecture**
     2. **AI-Snippet / Answer Engine Optimization**
     3. **Local GBP Growth (Miami, Doral, Ft. Lauderdale, Ft. Myers)**
     4. **Automation-Ready Landing Pages**
   - Each card should have:
     - title
     - 1–2 bullet benefits
     - CTA: "Add to Build Sheet" (button, no logic yet)

4. **Client / Fan Proof Section** (testimonials fixed)
   - Section ID: `proof`
   - Heading: `What Clients Say`
   - Subtext: `From boring businesses to creators, results stay the same — predictable growth.`
   - Display 3–4 testimonials (use ACTUAL names you've used before; example data below)
   - Cards must support avatar/name/company
   - If you already have `/data/testimonials.ts` or similar, **wire to that**. If not, create it.

   **Example data**
   ```ts
   export const testimonials = [
     {
       name: "Peggy Clemons",
       role: "Recording Artist",
       quote: "Audio Jones helped us modernize release, content, and funnel. The AI assets made it easy to stay consistent.",
       image: "/assets/clients/peggy-clemons.jpg"
     },
     {
       name: "Abebe Lewis",
       role: "Circle House Studios",
       quote: "We needed a system, not just content. This is the first time the entire studio offering is mapped to automations.",
       image: "/assets/clients/abebe-lewis.jpg"
     },
     {
       name: "Florida Ramp & Lift",
       role: "Service Business",
       quote: "Local SEO + Google Business Ultra is keeping the pipe full.",
       image: "/assets/clients/florida-ramp-lift.jpg"
     }
   ]
   ```

**Note:** if those images don't exist, add **empty placeholder files** to `/public/assets/clients/` and update in later commit. Spec remains the same.

5. **Systems Modules Preview** (optional but recommended so site matches PDFs in repo)

   * Heading: `Your brand runs on 4 modules`
   * Pull copy from PDFs we already have:

     * **Marketing Automation Module** (MailerLite, Beacon AI, n8n) 
     * **Client Delivery Module** (Whop → GBU → Notion) 
     * **Data Intelligence Module** (Sheets → Data Studio) 
     * **AI Optimization Module** (adaptive/personalized offers) 
   * Each module card should have: title, 1-line purpose, link → `/systems` (can be stub)

6. **Legal / Compliance Band** (Florida service business)

   * Show small text links:

     * Privacy Policy → `/privacy`
     * Terms of Service → `/terms`
     * Cancellation & Refund Policy → `/cancellation`
     * Cookie Notice → `/cookie-policy`
     * Florida Business Disclosure → text: `AJ DIGITAL LLC • 20028 NW 64th PL, Hialeah, FL 33015`
   * This should match your previous request for "standard operating procedures and policies standard to Florida and standard to service and business industry".

7. **Footer CTA**

   * Heading: `Ready to build your Audio Jones system?`
   * Primary CTA: `Book Intake Call`
   * Secondary: `View Packages`

## 6. Components to Create / Update

Create these (or update if they exist):

1. `src/components/home/HomeHero.tsx`
2. `src/components/home/ServicesStrip.tsx`
3. `src/components/home/Testimonials.tsx`
4. `src/components/home/ModulesShowcase.tsx`
5. `src/components/home/LegalBand.tsx`
6. `src/app/page.tsx` → import all above and assemble

**Example assembly (`src/app/page.tsx`):**

```tsx
import HomeHero from "@/components/home/HomeHero"
import ServicesStrip from "@/components/home/ServicesStrip"
import Testimonials from "@/components/home/Testimonials"
import ModulesShowcase from "@/components/home/ModulesShowcase"
import LegalBand from "@/components/home/LegalBand"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HomeHero />
      <ServicesStrip />
      <Testimonials />
      <ModulesShowcase />
      <LegalBand />
    </main>
  )
}
```

## 7. Assets (real, not placeholder)

* `public/assets/Backgrounds/aj-hero-portrait.webp` (used in hero)
* `public/assets/clients/peggy-clemons.jpg`
* `public/assets/clients/abebe-lewis.jpg`
* `public/assets/clients/florida-ramp-lift.jpg`
* **If missing:** create empty placeholder images and add to Git; document in `docs/assets-missing.md`.

## 8. Acceptance Criteria

1. ✅ Homepage loads at `/` with no TS errors.
2. ✅ Lighthouse desktop perf ≥ 85.
3. ✅ All CTAs render (even if route is stub).
4. ✅ All legal links present.
5. ✅ Hero uses **actual** image path from this spec.
6. ✅ Testimonials render 3 cards minimum with name, role, quote.
7. ✅ `npm run lint` passes.
8. ✅ Vercel preview build succeeds.

## 9. Git Spec Kit Notes (for Copilot / VS Code)

When you open this file in VS Code with Git Spec Kit enabled, tell Copilot:

> "Follow `./.specify/specs/homepage.md` and generate the components under `src/components/home`. Use Tailwind with brand colors from the spec. Use the hero image path exactly as defined. Do not create lorem sections."

If your workspace uses a **Spec Runner** task, add this:

```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "spec:homepage",
      "type": "shell",
      "command": "npm run lint && npm run build",
      "problemMatcher": []
    }
  ]
}
```

## 10. Jules Task Prompt (copy/paste)

Use this in **Jules** once the spec is in the repo:

> Read the spec at `.specify/specs/homepage.md`. Then:
>
> 1. Create the homepage components under `src/components/home`:
>
>    * HomeHero.tsx
>    * ServicesStrip.tsx
>    * Testimonials.tsx
>    * ModulesShowcase.tsx
>    * LegalBand.tsx
> 2. Update `src/app/page.tsx` to assemble the homepage using these components.
> 3. Ensure the hero uses the image at `/assets/Backgrounds/aj-hero-portrait.webp`.
> 4. Add testimonial data source in `src/data/testimonials.ts` if it does not exist.
> 5. Run `npm run lint` and fix issues.
> 6. Output the diff.
> 7. If assets are missing, create `docs/assets-missing.md` listing missing files.

## 11. Future Extensions

* Wire CTA to Whop product
* Add blog feed
* Add dynamic AEO/SEO services from CMS
* Add analytics events to Data Intelligence Module (see PDF) for homepage visits.