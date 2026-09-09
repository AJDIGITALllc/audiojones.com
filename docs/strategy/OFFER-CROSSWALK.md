---
title: AJ Digital — Offer Crosswalk (Website ↔ Master Pricing Matrix)
status: draft — requires owner approval before it carries authority
version: v0.1-draft
date: 2026-09-09
owner: AJ Digital LLC
approver: Audio (founder)
sources:
  - aj-digital-revops/docs/commercial/AJ-Digital-Master-Pricing-Matrix-2026-v1.2.md (eff. 2026-09-04)
  - audiojones.com/docs/strategy/PRICING_OFFER_RECONCILIATION_2026-07-31.md
  - audiojones.com/src/content/offers.ts @ 4d510c1
  - aj-digital-revops/hubspot/catalog/products.json (catalogVersion 2026.2) @ f962985
blocked_on:
  - D1 — ResponseOS tier pricing (does the 2026-07-31 supersession stand?)
  - D2 — which document is the public authority
---

# Offer Crosswalk — Website ↔ Master Pricing Matrix

## Status of this document

**This is a draft for review. It carries no authority and ratifies nothing.**

It records what the evidence supports today and, just as deliberately, what it
does not. Rows that cannot be resolved without a commercial decision are left
**unresolved on purpose**. Filling them in would not be reconciliation — it
would be making the decision silently, which is the failure mode this document
exists to prevent.

No price in this document is new. Every figure is quoted from an existing
source and attributed. Nothing here should be read as approval to publish,
provision, or change any price.

---

## 1. Why this document exists

AJ Digital currently maintains two live commercial authorities that do not
reference each other:

| | Document | Scope claimed |
|---|---|---|
| **A** | Master Pricing Matrix v1.2 (2026-09-04) | "Canonical working source for offer architecture, HubSpot product-catalog development, offer-map development, proposals, internal linking, pricing governance, and commercial packaging" |
| **B** | Pricing & Offer Reconciliation (2026-07-31) | "Public source of truth: `src/content/pricing.ts`" |

Neither supersedes the other. There is no mapping between their offer
taxonomies — the matrix uses `R` / `A` / `S` / `BM` / `AR` / `D` / `M`
identifiers, the website uses ten named offers. Without a crosswalk, no one can
answer "is the website correct?" without re-deriving the comparison by hand,
and two people doing so will reasonably disagree.

---

## 2. Mapping rule — read before using this table

**Map on scope. Treat price as a check, never as the key.**

This is not a style preference. Two of the ten website offers carry one matrix
row's *name* alongside a figure that belongs to a *different* matrix row:

- **ReKonr** holds matrix row R2's name at the superseded Kaizen price.
- **Founder Intelligence System** holds the Integrated FI/RAG row's name at a
  figure sitting inside the Core Business Knowledge corridor.

A crosswalk built by matching offer names would resolve both incorrectly — and
would look correct while doing it. Match on deliverables, buyer decision, and
support boundary; then use price as a consistency check, and treat a mismatch
as a finding rather than a rounding error.

---

## 3. Status legend

| Status | Meaning |
|---|---|
| **Mapped** | Scope, buyer decision, and price agree. No open question. |
| **Contested** | Two or more matrix rows are plausible. Named below with the specific ambiguity. |
| **Blocked** | Cannot be mapped until a named decision (D1/D2) is taken. Mapping it now would make that decision. |
| **No matrix row** | The website sells something the matrix does not describe. Requires a decision to add, retire, or reclassify. |
| **Not on website** | The matrix describes something the website's pricing registry does not carry. |

---

## 4. Website → Matrix

Ten records, from `src/content/offers.ts` at commit `4d510c1`. All ten carry
`evidenceStatus: "unratified"` in the registry itself.

| # | Website offer | Website price | Matrix candidate(s) | Status | Open question |
|---|---|---|---|---|---|
| 1 | AI Readiness Score | Free | **R0** — Online AI Readiness Assessment, Free, Established | **Mapped** | None. The only clean mapping in the set. |
| 2 | Revenue Leak Assessment | $1,997 | none | **No matrix row** | Created by the 2026-07-31 doc to separate a one-workflow assessment from the full ReKonr diagnostic. The matrix has no bounded tier beneath R2. Add as a sub-R2 offer, or retire? |
| 3 | ReKonr Revenue Recovery Diagnostic | From $3,500 | **R1** ($5,000) *or* **R2** ($4,500) | **Contested** | See §5.1. Name points at R2; price is R1's superseded predecessor figure. Also: does the website need two offers here, as the matrix has? |
| 4 | Team AI Readiness Workshop | From $2,500 | none | **No matrix row** | The matrix has no workshop or education category. A "Tier 3 — Workshops" SOP exists at `docs/sop/offer-ecosystem/`, which the 2026-06-17 ratification proposal recommended deprecating. Add to matrix, or retire? |
| 5 | ResponseOS Managed Pilot | From $8,500 impl + from $1,500/mo | **AR.2 Tier 1** ($797 setup + $397/mo) | **Blocked — D1** | Mapping this row decides D1 by implication. Left open deliberately. |
| 6 | ResponseOS Core | From $12,500 impl + from $2,500/mo | **AR.2 Tier 2** ($1,297 setup + $797/mo) | **Blocked — D1** | As above. Note the matrix also carries a Tier 3 with no website counterpart. |
| 7 | Founder Intelligence System | From $15,000 | **Integrated FI/RAG** ($25,000–60,000+, Scoped) *or* **Core AI-Ready Business Knowledge System** ($15,000–20,000) | **Contested** | See §5.2. Name points at one row, figure at another. |
| 8 | Managed Intelligence | From $2,500/mo | **M5** ($2,500/mo) *or* **M9** ($6,000/mo) | **Contested** | Price matches M5 exactly. The published scope — monitoring, KPI reporting, optimization, memory maintenance, exception review, decision support — reads closer to M9. |
| 9 | Worksie Reference Pilot | Application only | none (Category D adjacent) | **No matrix row** | Category D covers custom operations systems but names no reference pilot. Is Worksie a D-family productization, or deliberately outside the matrix? |
| 10 | Strategic Partnership | Application only | none | **No matrix row** | Replaced the former Performance Partnership on 2026-07-31, with outcome fees and revenue-share language removed. The matrix has no partnership construct. |

**Totals:** 1 mapped · 3 contested · 2 blocked · 4 with no matrix row.

---

## 5. The two contested rows in detail

### 5.1 ReKonr — one website offer where the matrix has two

| Source | Figure | Detail |
|---|---|---|
| Website (`offers.ts`) | **From $3,500** | ReKonr Revenue Recovery Diagnostic. One offer. |
| Matrix **R2** | **$4,500** | ReKonr Revenue Leak Diagnostic. Corridor $3,500–6,500. Market-calibrated working. |
| Matrix **R1** | **$5,000** | AI Readiness Kaizen Diagnostic. Corridor $3,500–7,500. Still a distinct offer. |

The 2026-07-31 reconciliation renamed the old *AI Readiness Kaizen Diagnostic*
to *ReKonr Revenue Recovery Diagnostic* and carried its $3,500 price across.
The matrix, independently, retains Kaizen (R1) and ReKonr (R2) as two separate
offers answering two different buyer questions:

- **R1** — *Where can AI create value, and what must be fixed first?*
- **R2** — *Where is revenue being lost between inquiry and completed sale?*

The website's single offer therefore carries R2's name at neither R1's nor R2's
price. Its $3,500 is the superseded Kaizen figure.

Additionally, "From $3,500" publishes the **corridor floor as an anchor** —
precisely the `displayConvention` decision left deliberately undefined at
`offers.ts:25-26`.

**Decisions required:**

1. Did R1 and R2 genuinely merge into one website offer, or is the website
   missing an offer?
2. If they remain distinct, which one is the current website offer, and what
   happens to the other?
3. Is the public anchor $3,500 or $4,500 — and is the convention corridor-floor
   or anchor?

### 5.2 Founder Intelligence System — a floor from a different tier

| Source | Figure | Detail |
|---|---|---|
| Website (`offers.ts`) | **From $15,000** | Founder Intelligence System. Published from-price. |
| Matrix — **same name** | **$25,000–60,000+** | Integrated Founder Intelligence / RAG System. Status: **Scoped**. |
| Matrix — **same figure** | **$15,000–20,000** | Core AI-Ready Business Knowledge System. A lower tier, different scope. |

The website floor sits 40% below the corridor floor of the matrix row it shares
a name with, but lands squarely inside the corridor of a different, smaller
Business Memory tier.

**Whether that reflects an intended scope change or an accident of drafting
cannot be determined from the documents. Both readings fit the evidence
equally, and this draft does not choose between them.**

The **display convention is not itself a conflict.** Matrix §10.3 permits either
a "from" or a scoped treatment for high-variance work, and the website publishes
`From $15,000` — a from-price, which is allowed. The open question is which
corridor that floor belongs in, not how it is displayed.

Related, and already on the record: the 2026-09-01 offer-map redline notes that
the matrix states **two** Core Business Memory figures — the $25,000 BM1–BM11
target and the $15,000–20,000 typical corridor — without saying which governs.
That ambiguity sits upstream of this row and may be what the website floor is
tracking.

**Decisions required:**

1. Which matrix row is the website's Founder Intelligence System?
2. If it is the Integrated FI/RAG row, does the $15,000 floor stand, or does it
   move into the $25,000+ corridor?
3. Which Core Business Memory figure governs — the $25,000 target or the
   $15,000–20,000 corridor? Resolving this may resolve question 2.

---

## 6. Matrix → Website coverage

The reverse direction. "Not on website" below means **absent from the pricing
registry** (`src/content/offers.ts`) — see the scope limit in §8.

| Matrix family | Rows | Website coverage |
|---|---|---|
| **R** — Research & Diagnostics | R0–R9 (10 rows) | R0 mapped. R1/R2 contested. **R3–R9 not on website** (7 rows) |
| **A** — Digital Foundation | A1–A9, A5F, 3 website tiers (13 rows) | **None on website** |
| **S** — Social, Content, Paid Social | S1–S8 (8 rows) | **None on website** |
| **BM** — Business Memory | 6 public tiers (BM1–BM11 internal) | 1 contested. **5 not on website** |
| **AR** — AI Receptionist | AR1–AR8 custom, 3 ResponseOS tiers | 2 blocked on D1. Tier 3 and the $34,500 custom implementation **not on website** |
| **D** — Custom Software | D1–D9 (9 rows) | **None on website.** Worksie possibly adjacent, unmapped |
| **M** — Managed Services | M1–M10 (10 rows) | 1 contested (M5/M9). **M1–M4, M6–M8, M10 not on website** |

### Cross-check against the HubSpot catalog

All eight provisioned-candidate SKUs in `products.json` (catalogVersion
`2026.2`) sit in the **S** family, which has zero website representation. The
website and the HubSpot catalog therefore describe **disjoint sets of offers**
— there is currently no offer that appears in both.

---

## 7. Rows this draft deliberately does not resolve

Per Matrix §12 and the revops decision register, the following remain open by
existing governance and **must not be closed by this crosswalk**:

- Paid-social technical setup fee — unresolved (Matrix §S.3)
- All four social onboarding prices — provisional; do not provision or publish (§S.5)
- Six proposed social add-ons — recommendation only (§S.4)
- S4 public positioning — internal fixed price; public "From" not approved (§12 item 9)
- The three `SUPERSEDED_BEFORE_PROVISIONING` SKUs — never to be created or archived
- ResponseOS tier names, included usage, and overage methodology (§12 item 1)
- Diagnostic-credit policy (§12 item 2) — note the website currently states "not
  credited," which the matrix leaves open

---

## 8. Scope limits of this draft

Stated plainly, because a crosswalk that overstates its own coverage is worse
than none:

1. **Only the pricing registry was audited.** `src/content/offers.ts` is the
   source for the website column. Marketing copy on `/services`, `/agents`,
   `/ecosystem` and similar routes was **not** reviewed for unpriced offer
   mentions. A matrix row marked "not on website" may still be described
   somewhere in page copy without a price.
2. **A third pricing source exists and is excluded — but must be retained.**
   `data/catalog/services_pricing_catalog.json` (version `2025-11-07`) carries a
   different taxonomy — podcast production, personal brand, AI automation,
   digital marketing, bilingual Miami — with Whop billing SKUs. It is read by
   `src/lib/getPricing.ts` and depended on by the live `/api/whop` and
   `/api/whop-base64` routes for SKU lookup.

   It is not reconciled here, and it must **not** be superseded or deleted. The
   2026-09-01 offer-map redline (§3, legacy-catalog row) requires marking it
   non-authoritative for systems offers and excluding it from `/offers.json`,
   while **retaining it as the interim pricing record for the podcast, media,
   and personal-brand families** until matrix §12 item 13 integrates them.
   Retiring it would break live Whop flows.
3. **No live HubSpot state was verified.** The catalog column reflects
   `products.json`, not the live account. Whether the eight products exist in
   HubSpot is unknown.
4. **Local uncommitted work was not visible** to the audit that produced this
   draft. Verify against your working trees before relying on it.

---

## 9. What unblocks this document

In order. Rows 5 and 6 of §4 cannot be completed before step 1.

1. **D1 — ResponseOS.** Does the 2026-07-31 supersession stand, or does Matrix
   v1.2 §AR.2 reinstate the tiers? Note the matrix is the *later* document but
   reinstates prices the earlier one deliberately retired, without
   acknowledging the retirement. Resolving by date would reverse a deliberate
   decision.
2. **D2 — Public authority.** Name one document, and record it in both
   repositories' decision logs, each referencing the other.
3. **§5.1 and §5.2** — the ReKonr and Founder Intelligence mappings.
4. **§4 rows 2, 4, 9, 10** — add to matrix, retire, or reclassify.
5. **§4 row 8** — Managed Intelligence to M5 or M9.

Once 1–5 are settled, this document can be promoted from draft to ratified, and
the `family`, `evidenceStatus`, and `displayConvention` fields in
`src/content/offers.ts` can be populated from it — which is the point of having
it.

---

## 10. Suggested location

`audiojones.com/docs/strategy/OFFER-CROSSWALK.md`, alongside the 2026-07-31
reconciliation it extends. If D2 names the matrix as the public authority,
`aj-digital-revops/docs/commercial/` is the better home; in either case the
other repository should carry a one-line redirect stub, per the website's
`AGENTS.md` rule 3.

---

*Draft produced from a read-only diagnostic, 2026-09-08/09. No price in this
document is new; every figure is quoted and attributed. Approval of this
document is approval of the **mapping**, not of any price, publication, or
provisioning action.*
