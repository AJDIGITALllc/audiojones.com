# Automation Module — Whop ↔ MailerLite Integration
**Project:** audiojones.com  
**Organization:** AJ DIGITAL LLC  
**Author:** Tyrone Alexander Nelms  
**Version:** 1.0  
**Related Release:** v1.2.0-mailerlite-whop  
**Depends On:** FR06 (Artist Hub), FR07 (EPM)  
**Purpose:** Connect paid product events in **Whop** to audience and nurture automation in **MailerLite**, aligned to the Audio Jones EPM model.

---

## 1. Problem Statement
Audio Jones now has public-facing acquisition pages (`/artist-hub`, `/epm`) and Whop products connected to them. However, purchases and new members in Whop are **not automatically reflected** in MailerLite, which means:
- onboarding/nurture sequences don't fire,
- EPM tagging can't segment the audience,
- funnel analytics is incomplete.

This automation module closes that loop.

---

## 2. Goals & Non-Goals

### 2.1 Goals
- Automatically sync new Whop customers/subscriptions to MailerLite.
- Apply the correct tags/groups in MailerLite based on the Whop product purchased.
- Optionally notify Slack (or internal channel) when high-value customers buy.
- Maintain a small audit log (Firestore/Data Connect) for ops visibility.
- Keep everything deployable inside the existing Next.js + Firebase + Vercel setup.

### 2.2 Non-Goals
- No full-blown CRM UI right now.
- No advanced billing changes in Whop (cancellations can be handled later).
- No multi-ESP abstraction — this module is MailerLite-first.

---

## 3. Actors / Users
1. **Customer / Artist** — buys a product on Whop (e.g. Studio Time, Mix/Master, EPM early access).
2. **Marketing Automation (MailerLite)** — receives a subscriber + tag and starts a workflow.
3. **Audio Jones Admin** — wants to see who bought, when, and if automation fired.
4. **System / AI Agent** — runs scheduled sync or processes webhooks.

---

## 4. Functional Requirements (FR)

### FR08 — Whop → MailerLite Sync
- The system must accept Whop events (webhook or polled).
- For each event, it must:
  - extract customer email,
  - identify product purchased,
  - map product → MailerLite tag/group,
  - upsert subscriber in MailerLite,
  - store minimal log.
- If email is missing, log as incomplete.

**Acceptance Criteria**
- Given a valid Whop purchase event → subscriber appears in MailerLite within 30 seconds.
- Correct tag is applied.
- Log entry is created.

---

### FR09 — MailerLite → Internal Webhook
- The system must expose an endpoint for MailerLite webhooks (subscribe, unsubscribe, tag-added).
- On "subscribe" → store/update user in Firestore.
- On "tag-added" → optionally forward to Slack for ops visibility.
- On "unsubscribe" → update local status only (do not delete remotely).

**Acceptance Criteria**
- Hitting the endpoint with a sample MailerLite payload is accepted (200).
- Payload is validated via secret.
- Event shows up in logs.

---

### FR10 — Admin Automation Panel
- Add a lightweight admin view (Next.js page, protected via existing portal auth) to:
  - show automation status (enabled/disabled),
  - list last 25 sync events,
  - show errors,
  - show current mapping (Whop → MailerLite tags).
- Panel should read from a JSON/config file (specify) first; later can read from Firestore.

**Acceptance Criteria**
- Visiting `/admin/automation` (or existing portal route) shows the panel.
- Panel renders without JS errors.
- Panel lists most recent events.

---

### FR11 — Tagging Model (EPM-Aligned)
- Define a mapping of **Whop product** → **EPM tag** → **MailerLite tag**, for example:
  - `artist-studio` → `EPM:SENSE` → `artist-studio-buyer`
  - `mix-master` → `EPM:OPTIMIZE` → `mix-master-buyer`
  - `epm-early-access` → `EPM:PREDICT` → `epm-lab`
- Store this in a config file: `src/config/automation-mappings.json`
- Allow the admin panel to display this mapping.

**Acceptance Criteria**
- Mapping file exists and is readable by the automation functions.
- Incoming Whop events are tagged according to this mapping.
- Invalid product IDs are logged as "unmapped".

---

### FR12 — Analytics / Reporting Hook
- All successful sync events must write a compact log entry (timestamp, source, email, product, tag-applied).
- Logs must be queryable by date.
- At least one export path should exist (Firestore → Data Connect / GA4).

**Acceptance Criteria**
- Log records visible in chosen store.
- Log schema matches the data model.
- No PII beyond what's needed (email + product).

---

## 5. Data Model (High-Level)
- **Subscriber**
  - email (string, required)
  - source (`whop`, `manual`, `epm-page`)
  - tags (string[])
  - createdAt, updatedAt
- **SyncEvent**
  - id
  - source (`whop`, `mailerlite`)
  - type (`purchase`, `subscribe`, `unsubscribe`, `tag`)
  - email
  - productId
  - mlTagApplied
  - success (bool)
  - errorMessage?
  - timestamp
- **ProductMapping**
  - whopProductId
  - mailerLiteTag
  - epmStage (`sense|predict|optimize|automate`)

(You already have `data-model.md` for the site — this module can add a section there referencing these entities.)

---

## 6. Integration Points

### 6.1 Whop
- Auth: `WHOP_API_KEY` (from env)
- Endpoints: purchases/memberships (webhook or poll)
- Purpose: event source

### 6.2 MailerLite
- Auth: `MAILERLITE_TOKEN`
- Endpoints: subscribers, groups/tags, webhooks
- Purpose: destination for nurture sequences

### 6.3 Slack (Optional)
- Webhook-only
- Purpose: ops notifications for failed syncs or high-value customers

---

## 7. Non-Functional Requirements (NFR)
- NFR01: All keys must be read from environment variables, never hard-coded.
- NFR02: Functions must be deployable to Vercel / Firebase with minimal configuration.
- NFR03: Logs must not expose API keys.
- NFR04: All endpoints must respond in < 1s for webhook calls.
- NFR05: Must not break existing routes from FR06/FR07.

---

## 8. Needs Clarification
- NC01: Which exact Whop products map to which MailerLite tags?
- NC02: Should unsubscribes in MailerLite also downgrade access in Whop?
- NC03: Should Slack alerts be sent for every event or only failed events?
- NC04: Should we support a "dry run" mode for testing webhooks?
- NC05: Should the admin panel live at `/admin/automation` or inside the existing client/admin portal routes?

(If not provided, the plan should assume defaults and mark them in the tasks.)

---

## 9. Acceptance / Sign-off
This module is considered complete when:
1. A Whop purchase produces a MailerLite subscriber with the correct tag.
2. A MailerLite webhook hits our endpoint and logs successfully.
3. An admin can view recent automation events.
4. All new config/env values are documented in `.specify/docs/` and `quickstart.md`.
5. `/speckit.tasks` can generate task breakdowns from this spec without errors.

**Owner:** Tyrone Alexander Nelms  
**Date:** November 3, 2025  
**Status:** Draft → Ready for `/speckit.plan`