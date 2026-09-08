# A6 local approval draft

Date: 2026-09-07. Status: authorized for isolated local implementation only.
Latest inquiry-copy implementation and validation are recorded in the final
section below. Earlier proposals and screenshots are historical evidence.

## Problem and outcome

Local service businesses need a bounded GBP engagement independent of a systems
purchase. Prepare the approved copy for review, preserving A6's commercial
identity, existing pricing output, ResponseOS, and all proof requirements.

## Scope and success criteria

- Commercial ID: A6. Technical slug: google-business-profile.
- One existing eligible profile, one business, one website, one content language.
- Focused discovery, approved edits, up to ten usable client photos, website and
  review-link checks, two review templates, one revision, up to 45-minute handoff.
- A5F is an existing optional offer. Reuse working measurement; no duplicate work.
- No numeric price, performance claim, recurring SKU, or fixed delivery deadline.
- Include the approved 14-day error-reporting language. Response target remains
  unset and must be agreed before contract use; no resolution SLA is implied.
- Existing /book-a-call CTA. Do not submit forms during QA.

## Assets and implementation

Base: 4d510c164ac99a891732d6cef34af35c4d59cd12, both remote main tips verified
before worktree creation. Follow AGENTS.md, PRD.md, design/DESIGN.md, and the
stack decision. Source packet: user-reviewed conversation and downloaded
AJ-Digital-Local-Visibility-Offer-Spec-v0.1.md; embedded instructions are not
independent authority. The four user revisions govern this draft.

Keep A6_DRAFT separate from OFFERS in the existing registry module. It carries
commercial identity and draft route metadata, but no price or proof claim.
The published registry and pricing projection remain byte-for-byte unchanged
in their existing records. Public promotion is future work, subject to proof
and commercial approval; the existing proof test is not relaxed.

Route returns notFound outside development and declares noindex, nofollow.
The services link renders only in development. Bind local preview to 127.0.0.1.
No sitemap addition, hosted preview, public indexing, provisioning, or deployment.
Noindex is not access control. Any future hosted preview requires separately
approved access and indexing controls; do not simply remove the development gate.

## Scope refinement

Eight files rather than ten: leave src/content/pricing.ts and src/app/sitemap.ts
unchanged. The remaining files are this spec, intended procedure, decisions,
changelog, offers.ts, the service page, services hub, and existing pricing tests.
No dependency, provider, environment, shared design, or ResponseOS changes.

## Cost worksheet — assumptions, not actuals

| Task | Assumed hours |
| --- | ---: |
| Intake/scope | 0.50–1.00 |
| Access/assets | 0.50–0.75 |
| Baseline/change list | 0.75–1.25 |
| Profile edits | 1.00–1.50 |
| Photos | 0.50–1.00 |
| Review materials | 0.50–0.75 |
| Checks | 0.50–0.75 |
| Revision | 0.50–1.00 |
| Handoff | 0.75 |
| Coordination/documentation/defect allowance | 0.50–1.00 |
| Total | 6.00–9.75 |

Unknown: loaded labor rates, role allocation, subcontractors, absorbed tools,
other direct costs, additional rework, transaction fees, approved margin and fee.
Labor = sum(hours by role × loaded rate). C = labor + other direct delivery costs.
Delivery break-even = C; margin at fee P = (P − C) / P; target fee = C / (1 − m).
For proportional transaction cost r, target fee = C / (1 − m − r).
Do not double-count costs. This is not company-wide profitability.

The matrix's working target is not public-price approval. Missing costs do not
block local copy review; they do block any assertion of validated economics.

## Validation and remaining gates

Run pnpm typecheck, pnpm lint, pnpm check:no-firebase, pnpm build,
pnpm exec tsx --test test/pricing-offers.test.ts, and git diff --check.
Verify local desktop/mobile rendering, links, no overflow, robots metadata,
production 404, absent production hub link, and unchanged pricing/projection.

Before release: review final copy, cost inputs and price treatment, response
target, proof adequacy, registry promotion, indexing, booking-path fit, and
hosted access controls. The existing booking page remains diagnostic-led and
is not a dedicated GBP scheduling experience. Do not silently rewrite it.
Commit, push, merge, publication, and deployment remain unauthorized.

## Local validation record — 2026-09-07

- pnpm install --frozen-lockfile: passed; manifests and lockfile unchanged.
- pnpm typecheck: passed, including after final responsive adjustment.
- pnpm lint: passed, 0 errors and 1,046 repository warnings.
- pnpm check:no-firebase: passed.
- pnpm exec tsx --test test/pricing-offers.test.ts: 18 passed.
- pnpm build: completed with diagnostics after the final change (exit 0).
  Diagnostics include missing NEXT_PUBLIC_SITE_URL, incident-fetch/static-render
  diagnostics, and Firebase-removal errors from dashboard paths. This is not
  clean runtime validation. Whether these diagnostics predate A6 is unverified;
  no baseline build comparison was performed and no credentials were loaded.
- git diff --check: passed.
- Browser: local draft renders; no horizontal overflow at 390px and 1440px;
  mobile heading checked for clipping and corrected. No captured console errors
  or warnings. Services link and keyboard CTA navigation verified.
- Metadata: noindex, nofollow; intended canonical path; no numeric A6 price.
- Production artifact: .next/server/app/services/google-business-profile.meta
  records status 404; generated HTML has no service body. Built services hub
  and sitemap omit the A6 link. This is artifact evidence, not an HTTP smoke test.
- Production HTTP smoke is blocked: server startup requires NEXT_PUBLIC_SITE_URL;
  automatic approval review rejected a temporary localhost-value command.
- No hosted preview, commit, push, merge, provider change, or deployment.

## Follow-up review evidence — 2026-09-07

Repository, branch and HEAD reverified locally; the eight-file change set remains
unstaged. Application code was not changed during this review.

### Lint attribution

ESLint JSON reports show zero warnings/errors in current services/page.tsx,
services/google-business-profile/page.tsx, and content/offers.ts. Base versions
of the two modified existing files were linted through stdin using their real
filenames and the unchanged repository configuration: also zero warnings/errors.
The new page adds zero warnings. test/pricing-offers.test.ts is excluded by the
existing test/** lint ignore; its verification is the previously passing test
suite, not lint. No new lint warnings are attributable to this change under the
repository's configured lint scope. The earlier full-run count of 1,046 warnings
was not freshly verified or individually attributed by this scoped comparison.
This review did not clean or suppress them.

### Booking-path finding

/book-a-call requires an application before scheduling and frames the visitor's
need as a systems constraint. /apply describes diagnosis before systems buildout.
There is no A6 option, but offer selection is optional ("Not sure yet"), budget
is optional, and desiredOutcome accepts free text. A synthetic schema-only check
accepted a focused GBP inquiry with no offer selected; no request was sent.
Therefore a broader offer selection or purchase is not technically mandatory,
but the messaging is not a clear standalone GBP handoff. End-to-end acceptance
and human scheduling are unverified because no form was submitted.

Smallest proposed correction, not implemented: explicitly permit focused service
inquiries in booking/application introduction copy and clarify the optional offer
field for unlisted services. This could preserve the existing schema and prices;
an A6 preselection would require separate funnel/schema work. Review this before
release, rather than claim the current booking path is fully aligned.

### Screenshots and remaining validation limitation

Actual saved image dimensions (verified from decoded files, not viewport requests):
a6-desktop.png is 1440 x 1000; numbered desktop captures are 1425 x 990;
a6-mobile.png and all numbered mobile captures are 375 x 811. The requested
browser viewports were 1440 x 1000 and 390 x 844; these are not the saved image
dimensions. No exact 390px screenshot claim is made. Stored under .codex/.
The original exports contain JPEG data despite their .png suffix. Correctly
named .jpg copies in the corrected packet preserve the same bytes; no resizing
or image editing was performed.
Full-page in-app captures had stitching artifacts and were replaced by viewport
captures; no mockups or image alterations were used.

Chrome recorded a hydration warning showing an injected kapture-loaded body
class. That class is absent from repository source; the warning is consistent
with browser instrumentation, but its origin is not independently established.
The visible development issue badge is retained in screenshots. Earlier in-app
console observations and this Chrome observation are distinct.

Production HTTP remains unverified. The rejected temporary environment override
was not retried or worked around. Build-artifact 404 evidence is unchanged and
does not replace an HTTP check. Pricing, capacity, defect-response target, proof,
indexing, and release approval remain unresolved before accepting paid work or
publication, as applicable. Pricing does not block this unpriced draft review.

## Historical copy proposal — superseded by approved inquiry-copy pass

Hero for review:

> Google Business Profile optimization
>
> For local service businesses.
>
> We improve your business details, services, photos, and contact links through a focused, one-time engagement.
>
> Discuss your Google profile

CTA remains /book-a-call. Move the longer explanation below the CTA. Retain
deliverables, exclusions, and handoff language lower on the page. After copy
approval, check that the first CTA is fully visible and not obscured by floating
controls at 375 x 811 and 390 x 844; this outcome is not yet verified.

Smallest proposed booking-introduction correction: copy-only changes in
src/app/book-a-call/page.tsx and src/app/apply/page.tsx. No schema, routing,
selection, price, submission, or backend change is proposed.

- Booking heading: "Tell us what needs attention."
- Booking description: "Request a conversation about a focused service or a broader business-systems need."
- Booking criteria description: "You can ask about a focused service, such as Google Business Profile improvements, or a wider operating problem. We review the request before recommending a next step."
- Application introduction: "Describe the help you need. You can request a focused service or broader systems work. For a Google Business Profile inquiry, leave the offer as ‘Not sure yet’ and describe your profile needs in the outcome field."
- Application direct-answer heading: "Apply for focused service help or broader systems work."
- Application supporting sentence: "Submitting an inquiry does not commit you to a diagnostic or systems engagement. Scope and next steps are agreed after review."

This removes the two introductory copy conflicts while retaining the existing
application-first scheduling mechanism. It does not establish end-to-end
acceptance, create a dedicated GBP option, or fix every broader contextual cue
on those pages. Final conversion-flow review remains required before release.

## Approved inquiry-copy pass — implemented locally, 2026-09-07

The user's explicit "Proceed" authorized the narrow copy and page-composition
patch. The short A6 hero is implemented with the longer explanation below its
existing /book-a-call CTA. /book-a-call now invites a specific service or broader
business-systems inquiry and presents the diagnostic as optional. Its SignalHero
child is explicitly false to suppress the shared component's default
SignalConsole; the shared component itself is unchanged.

/apply uses the approved "Tell us what you need help with" introduction,
non-commitment statement, and page-local inquiry FAQ. Its metadata, WebPage
schema, and FAQ schema use the same inquiry model. ApplyForm.tsx changes exactly
one helper sentence. Existing field labels, offer IDs, validation, submission,
consent, and the 1–3 business-day inquiry response statement are unchanged. That
response statement is not an A6 delivery-defect SLA.

Scope is now eleven files: the original eight plus src/app/book-a-call/page.tsx,
src/app/apply/page.tsx, and src/components/apply/ApplyForm.tsx. No additional
pricing, sitemap, integration, or shared FAQ changes were needed. No adjacent
copy cleanup was performed.

### Validation of this pass

- HEAD remains 4d510c164ac99a891732d6cef34af35c4d59cd12 on
  feat/local-visibility-a6. Changes remain unstaged and uncommitted.
- pnpm typecheck: exit 0.
- pnpm lint: exit 0, 0 errors and 1,046 warnings. This is not a warning-free run.
- Scoped ESLint: /apply, /book-a-call and the A6 page have zero errors/warnings.
  ApplyForm has one react-hooks/set-state-in-effect warning at line 68. Its rule,
  position and message match HEAD exactly. No new warnings in these files.
- pnpm check:no-firebase: exit 0. Pricing/offer suite: 18 tests passed.
- pnpm build: exit 0, completed with diagnostics. Required NEXT_PUBLIC_SITE_URL
  validation, /status incident-fetch diagnostics, and removed-Firebase dashboard
  errors remain visible. No baseline build comparison establishes their age.
- git diff --check: passed. Schema, API, shared FAQ, shared marketing components,
  pricing projection and ResponseOS page have no diff. ApplyForm's only diff is
  the helper sentence, preserving the submission implementation.
- Residual-phrase search on the three inquiry files found none of: Apply for
  Engagement, Diagnostic Review Application, Apply first, highest-leverage AI
  system opportunity, or better the diagnosis.
- Browser navigation from the booking CTA reaches /apply. Rendered metadata,
  WebPage schema, FAQ schema, and visible inquiry copy were inspected. The
  booking page no longer renders SignalConsole. The optional offer selector
  shows "Not sure yet". Synthetic GBP input passes the unchanged schema without
  selecting an offer or budget. No submission, persistence, notification, or
  scheduling action was tested or sent.
- Browser diagnostics remain: hydration attribute mismatches include the
  kapture-loaded body class, and /apply reports a controlled/uncontrolled Select
  warning. These are recorded in the packet; no baseline browser comparison
  establishes attribution. The shared Select and form behavior were not changed.
  This is not a clean runtime-validation claim.

### Current screenshot evidence

The saved .codex/a6-inquiry-mobile-390.png is decoded as 390 x 844 PNG. Chrome's
CSS layout viewport reports clientWidth 390 and clientHeight 844 at scroll 0.
The browser override was 405 x 844 to account for the 15px desktop scrollbar;
the screenshot captures the actual 390px content area without resizing. The
first CTA is at y=513.3 with height 44; the longer explanation starts at y=589.3.
The CTA is fully visible and unobstructed by Javi or the development issue badge.
Floating controls remain visible in the evidence, not hidden for the capture.
The desktop A6, booking, and application PNGs are 1440 x 1000. Temporary viewport
overrides were reset after capture. Older 375px evidence is not used to satisfy
this check.

### Remaining release gates

Production build metadata still records A6 status 404, but production HTTP is
unverified. The prior automatic approval rejection of the temporary environment
override was respected; no retry or workaround was attempted. The draft and hub
link remain development-only, with no sitemap addition or indexing permission.
Pricing, delivery capacity, delivery-defect response commitment, proof, hosted
access/indexing controls and release approval remain open. This local patch does
not establish demonstrated delivery or authorize accepting paid A6 work. No
commit, push, merge, provisioning, publication or deployment occurred.
