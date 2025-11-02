# Admin Portal (AJ DIGITAL / Audio Jones)

**Feature Branch**: `002-admin-portal`  
**Created**: 2025-11-01  
**Status**: READY FOR PLAN  
**Owner**: AJ DIGITAL LLC (Audio Jones)  
**Input**: Internal Admin Portal for AJ DIGITAL operators to monitor and manage Client Portal operations

## Purpose

Build an **internal Admin Portal** for AJ DIGITAL / Audio Jones operators to monitor, manage, and support everything that the **Client Portal** exposes to clients.

This Admin Portal is **not public**, **not SEO**, and **must be role-gated** using Firebase Admin custom claims (`admin: true`, plus named roles). It will sit alongside the existing Next.js app in the same repo and re-use all **server-only** Firebase Admin constructs already in `src/lib/server/firebaseAdmin.ts`.

**Primary use**: AJ ops / AJ admin users log in → see dashboards → manage clients, projects, billing, content approvals, webhooks, and system health.

## Goals

1. **Single pane of glass** for AJ ops (clients, projects, billing, approvals, messages).
2. **Ops visibility** into webhooks (Whop, n8n, GBU, Calendar) + replay / reprocess controls.
3. **User & roles control** (list, search, grant/revoke `admin`, set role, view claims).
4. **Content & approvals** view to override/retry client approvals.
5. **System / platform health**: ping, Firebase Admin envs present, webhook last run, error log snapshot.
6. **Tight alignment** with existing **Git Spec / speckit** workflow so future agents (Jules, Codex, Copilot) can extend panels without guesswork.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Admin Authentication and Dashboard Access (Priority: P1)

As an AJ Digital admin, I need to securely log into the admin portal with admin-level permissions so that I can access the operations dashboard and manage all client portal functions.

**Why this priority**: Foundation requirement - admin functions require secure authentication with elevated privileges

**Independent Test**: Can be fully tested by creating admin accounts, logging in, and verifying admin-only access to management features

**Acceptance Scenarios**:

1. **Given** an admin user with valid credentials and admin custom claims, **When** they log into the admin portal at `/admin`, **Then** they are authenticated and can access all administrative dashboards
2. **Given** a user without admin claims, **When** they attempt to access `/admin`, **Then** they are denied access with appropriate error message or redirect
3. **Given** an authenticated admin, **When** they navigate through admin sections, **Then** all admin APIs are accessible with proper authorization

---

### User Story 2 - User Management and Role Administration (Priority: P1)

As an AJ Digital admin, I need to view, create, and manage user accounts and roles so that I can control access to the system and manage client permissions.

**Why this priority**: Core admin function for user lifecycle management using existing Firebase Admin infrastructure

**Independent Test**: Can be tested by viewing user lists, granting/revoking admin privileges, and managing user roles through existing admin API routes

**Acceptance Scenarios**:

1. **Given** an authenticated admin at `/admin/users`, **When** they view the user management page, **Then** they see a paginated list of all users with key details (uid, email, role, admin status, last login)
2. **Given** an admin viewing a user profile, **When** they grant admin privileges using the existing `/api/admin/grant` endpoint, **Then** the user receives admin claims and can access admin features
3. **Given** an admin managing user claims, **When** they modify user permissions via `/api/admin/claims`, **Then** changes are applied immediately with audit logging

---

### User Story 3 - System Monitoring and Health Dashboard (Priority: P1)

As an AJ Digital admin, I need to monitor system health, API performance, and webhook activity so that I can ensure the platform is running smoothly and troubleshoot issues.

**Why this priority**: Essential for maintaining system reliability and performance, leveraging existing admin ping/whoami endpoints

**Independent Test**: Can be tested by viewing system metrics, checking API health via `/api/admin/ping`, and monitoring webhook activity logs

**Acceptance Scenarios**:

1. **Given** an authenticated admin at `/admin`, **When** they view the system dashboard, **Then** they see real-time metrics for system health, recent webhook activity, and pending approvals count
2. **Given** system issues are detected, **When** the admin checks `/admin/system`, **Then** they can identify Firebase Admin env status, API route availability, and last deployment info

---

### User Story 4 - Content Approval Management (Priority: P1)

As an AJ Digital admin, I need to view and manage all client content approvals so that I can override decisions, retry failed approvals, and ensure quality control.

**Why this priority**: Critical for content delivery workflow and client satisfaction

**Independent Test**: Can be tested by viewing approval queues, overriding client approval decisions, and triggering n8n workflow notifications

**Acceptance Scenarios**:

1. **Given** an admin at `/admin/approvals`, **When** they view the approval management page, **Then** they see all pending, approved, and rejected content with client context and action buttons
2. **Given** a content approval needs override, **When** the admin approves or rejects content, **Then** n8n workflows are triggered and client notifications are sent

---

### User Story 5 - Billing and Client Organization Oversight (Priority: P2)

As an AJ Digital admin, I need to monitor client billing status, Whop subscriptions, and organization health so that I can manage client relationships and resolve billing issues.

**Why this priority**: Important for business operations and client relationship management

**Independent Test**: Can be tested by viewing billing dashboards, checking Whop integration status, and managing client organization details

**Acceptance Scenarios**:

1. **Given** an admin at `/admin/billing`, **When** they view the billing dashboard, **Then** they see active Whop subscriptions, delinquent accounts, and last sync status
2. **Given** billing sync issues, **When** the admin checks webhook logs at `/admin/webhooks`, **Then** they can see recent Whop webhook activity and retry failed processes

---

### User Story 6 - Webhook Monitoring and Management (Priority: P2)

As an AJ Digital admin, I need to monitor incoming webhooks from Whop, n8n, GBU, and Calendar integrations so that I can troubleshoot integration issues and replay failed events.

**Why this priority**: Critical for maintaining integration reliability and troubleshooting automation workflows

**Independent Test**: Can be tested by viewing webhook logs, checking integration status, and replaying failed webhook events

**Acceptance Scenarios**:

1. **Given** an admin at `/admin/webhooks`, **When** they view the webhook monitoring page, **Then** they see recent webhook events with source, status, payload, and retry options
2. **Given** a failed webhook event, **When** the admin retries the webhook processing, **Then** the event is reprocessed and results are logged

---

### User Story 7 - Client and Project Administration (Priority: P3)

As an AJ Digital admin, I need to view all client projects and intervene in project workflows so that I can ensure project delivery and resolve client issues.

**Why this priority**: Valuable for project oversight but can leverage existing client portal project APIs

**Independent Test**: Can be tested by viewing cross-client project lists, accessing project details, and making administrative project modifications

**Acceptance Scenarios**:

1. **Given** an admin at `/admin/projects`, **When** they view the project administration page, **Then** they see all client projects with status, timeline, and intervention options
2. **Given** a project needs admin intervention, **When** the admin modifies project settings or status, **Then** changes are applied with proper audit trails

---

### Edge Cases

- What happens when an admin's session expires during critical user management operations?
- How does the system handle simultaneous admin actions on the same user account?
- What occurs when Firebase Admin SDK is temporarily unavailable?
- How does the system respond when admin attempts to remove their own admin privileges?
- What happens when webhook replay fails multiple times?
- How does the system handle invalid API keys for admin endpoints?
- What occurs when n8n webhooks fail during approval override actions?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST authenticate admin users with Firebase Auth and verify admin custom claims using existing `/api/admin/whoami` infrastructure
- **FR-002**: System MUST provide admin dashboard at `/admin` with role-based access control blocking non-admin users
- **FR-003**: System MUST integrate with existing admin API routes: `/api/admin/users`, `/api/admin/grant`, `/api/admin/claims`, `/api/admin/ping`
- **FR-004**: System MUST display user management interface at `/admin/users` leveraging existing Firebase Admin SDK user listing
- **FR-005**: System MUST provide content approval override interface at `/admin/approvals` with n8n workflow integration
- **FR-006**: System MUST monitor webhook activity at `/admin/webhooks` for Whop, n8n, GBU, and Calendar integrations
- **FR-007**: System MUST display billing overview at `/admin/billing` with Whop subscription status and delinquent account alerts
- **FR-008**: System MUST provide system health monitoring at `/admin/system` using existing ping/whoami endpoints
- **FR-009**: System MUST support role hierarchy: aj_admin (full access), aj_ops (dashboard/management), aj_support (read-only)
- **FR-010**: System MUST exclude all admin routes from search indexing and public access
- **FR-011**: System MUST use brand colors: #FF4500 (primary), #FFD700 (accent), #008080 (support), dark backgrounds
- **FR-012**: All admin API routes MUST use `export const runtime = 'nodejs';` and import from `@/lib/server/firebaseAdmin`

### Key Entities

- **AdminUser**: Admin operators with elevated permissions (uid, email, role: aj_admin/aj_ops/aj_support, customClaims, lastSignIn)
- **Client**: Business clients mapped to portal organizations (id, name, primaryEmail, status, plan, linkedWhopId)
- **Project**: Client projects visible across organizations (id, clientId, name, status, lastUpdated)
- **Approval**: Content approvals requiring admin oversight (id, projectId, clientId, status, source, createdAt)
- **WebhookEvent**: Integration webhook activity logs (id, source: whop/n8n/gbu/calendar, payload, status, receivedAt, processedAt)
- **SystemHealth**: Platform health metrics (firebaseEnvStatus, lastPingTime, adminRouteStatus, deploymentInfo)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Admin users can access `/admin` dashboard in under 3 seconds with proper role verification
- **SC-002**: User management operations through `/admin/users` complete in under 2 seconds using existing admin APIs  
- **SC-003**: System health checks via `/admin/system` return Firebase Admin env status and ping results in under 1 second
- **SC-004**: Content approval overrides trigger n8n workflows within 5 seconds of admin action
- **SC-005**: Webhook monitoring displays real-time integration status with 99% accuracy
- **SC-006**: All admin actions are logged with timestamp, admin identity, and action details
- **SC-007**: Non-admin users are blocked from accessing any `/admin/*` routes with proper error handling

## Scope

### In Scope (MVP)
- Admin-only Next.js UI under `/admin/*` routes
- Role-based middleware and server guards using existing Firebase Admin infrastructure
- Dashboard panels with cards, tables, and alerts
- User management interface leveraging existing `/api/admin/users` and related endpoints
- Content approval override system with n8n integration
- Webhook activity monitoring for all platform integrations
- System health monitoring using existing ping/whoami endpoints
- Billing overview with Whop subscription status
- Audio Jones brand-aligned dark UI with specified color palette

### Out of Scope (v1)
- Full analytics suite with advanced charting
- Real-time collaboration features
- Multi-tenant theming beyond brand colors
- Advanced reporting and data export
- Mobile-optimized admin interface

## Business Context

### External Integrations

- **Firebase Admin SDK**: User management and authentication (Critical) - existing infrastructure
- **Existing Admin APIs**: `/api/admin/users`, `/api/admin/grant`, `/api/admin/claims`, `/api/admin/ping`, `/api/admin/whoami`
- **Whop**: Billing webhook monitoring and subscription status
- **n8n**: Workflow automation for approval overrides and notifications
- **GBU**: Contract system webhook monitoring
- **Calendar**: Booking system webhook monitoring
- **Client Portal**: Shared user base and project data

### Security & Privacy Requirements

- Role-based access control with admin-only restrictions using Firebase custom claims
- All admin API routes must use Node.js runtime and server-only Firebase Admin SDK
- Comprehensive audit logging for all admin actions
- Session management with appropriate security timeouts
- Protection against unauthorized access to admin functions
- Exclude all admin routes from public search indexing

### Performance Requirements

- Dashboard load times under 3 seconds
- User management operations under 2 seconds
- System health checks under 1 second
- Real-time webhook monitoring updates
- Support for 10+ concurrent admin users

## Architecture

### High-Level Structure
```text
Next.js App
 ├─ /admin (layout, nav, role gate)
 │   ├─ /admin (dashboard)
 │   ├─ /admin/users (user management)
 │   ├─ /admin/approvals (content approval override)
 │   ├─ /admin/billing (Whop subscription overview)
 │   ├─ /admin/webhooks (integration monitoring)
 │   ├─ /admin/system (health monitoring)
 │   └─ /admin/clients (client organization overview)
 └─ /api/admin/* ← existing + new server-only routes
```

### File Structure
- **Pages**: `src/app/admin/*/page.tsx` (Next.js app router)
- **Components**: `src/components/admin/*` for reusable admin UI components
- **APIs**: `src/app/api/admin/*` (existing + new routes with Node runtime)
- **Styles**: Tailwind with Audio Jones brand colors and dark theme

## Assumptions

- Runtime: Next.js (current repo version), Node runtime for all admin API routes
- Authentication: Firebase ID token from admin login flow with custom claims verification
- RBAC: Enforced at both API level and UI level with role-based menu hiding
- Admin verification: `decoded.admin === true` or `decoded.customClaims?.admin === true`
- All admin routes exclude from sitemap and search indexing
- Existing Firebase Admin SDK configuration in `src/lib/server/firebaseAdmin.ts` remains unchanged