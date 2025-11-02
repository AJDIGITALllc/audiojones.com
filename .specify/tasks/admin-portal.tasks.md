# Tasks: Admin Portal

**Input**: Design documents from `.specify/specs/admin-portal.md` and `.specify/plans/admin-portal.plan.md`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Based on implementation plan and existing infrastructure:
- **Admin Pages**: `src/app/admin/`
- **API Routes**: `src/app/api/admin/` (extending existing)
- **Components**: `src/components/admin/`
- **Tests**: `tests/admin/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and admin portal foundation

- [ ] T001 Create admin portal directory structure at src/app/admin/
- [ ] T002 Create admin components directory at src/components/admin/
- [ ] T003 [P] Set up admin layout component with Audio Jones brand colors in src/components/admin/AdminLayout.tsx
- [ ] T004 [P] Create admin navigation component with role-based menu in src/components/admin/AdminNavigation.tsx
- [ ] T005 [P] Create admin guard middleware component in src/components/admin/AdminGuard.tsx
- [ ] T006 [P] Create shared admin UI components (AdminTable, AdminStatCard, AdminStatusPill) in src/components/admin/
- [ ] T007 [P] Add robots.txt exclusion for /admin/* routes

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T008 Create admin route protection middleware leveraging existing Firebase Admin auth in src/app/admin/middleware.ts
- [ ] T009 Implement admin session verification using existing /api/admin/whoami pattern
- [ ] T010 Create admin authentication utilities extending existing admin infrastructure in src/lib/admin/auth.ts
- [ ] T011 Set up admin role validation functions (aj_admin, aj_ops, aj_support) in src/lib/admin/permissions.ts
- [ ] T012 Create admin page layout template with dark theme and brand colors in src/app/admin/layout.tsx
- [ ] T013 Add admin route error boundary component in src/components/admin/AdminErrorBoundary.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Admin Authentication and Dashboard Access (Priority: P1) 🎯 MVP

**Goal**: Secure admin authentication and main dashboard with system overview

**Independent Test**: Create admin accounts, log in, and verify role-based access to admin dashboard works correctly

### Implementation for User Story 1

- [ ] T014 [P] [US1] Create main admin dashboard page in src/app/admin/page.tsx
- [ ] T015 [P] [US1] Implement admin login integration with existing Firebase Auth in src/app/admin/login/page.tsx
- [ ] T016 [P] [US1] Create dashboard stat cards component in src/components/admin/DashboardStats.tsx
- [ ] T017 [P] [US1] Implement recent activity feed component in src/components/admin/RecentActivity.tsx
- [ ] T018 [US1] Create admin dashboard API route in src/app/api/admin/dashboard/route.ts
- [ ] T019 [US1] Integrate with existing /api/admin/ping for system health status
- [ ] T020 [P] [US1] Add pending approvals count widget
- [ ] T021 [P] [US1] Add failed webhooks alert widget
- [ ] T022 [P] [US1] Implement admin session management and route guards

**Checkpoint**: Admin authentication and dashboard provide secure access with system overview

---

## Phase 4: User Story 2 - User Management and Role Administration (Priority: P1) 🎯 MVP

**Goal**: Comprehensive user management interface using existing Firebase Admin infrastructure

**Independent Test**: View user lists, grant/revoke admin privileges, and manage user roles through admin interface

### Implementation for User Story 2

- [ ] T023 [P] [US2] Create user management page in src/app/admin/users/page.tsx
- [ ] T024 [P] [US2] Implement user table component with search and filtering in src/components/admin/UserTable.tsx
- [ ] T025 [P] [US2] Create user actions component (grant admin, edit claims) in src/components/admin/UserActions.tsx
- [ ] T026 [P] [US2] Implement bulk user operations component in src/components/admin/BulkUserOperations.tsx
- [ ] T027 [US2] Enhance existing /api/admin/users route with pagination and search
- [ ] T028 [US2] Integrate grant admin functionality with existing /api/admin/grant endpoint
- [ ] T029 [US2] Integrate claims management with existing /api/admin/claims endpoint
- [ ] T030 [P] [US2] Add user detail view with audit history
- [ ] T031 [P] [US2] Implement user role badge system

**Checkpoint**: User management system provides full admin control over user accounts and permissions

---

## Phase 5: User Story 3 - System Monitoring and Health Dashboard (Priority: P1) 🎯 MVP

**Goal**: Real-time system health monitoring using existing admin endpoints

**Independent Test**: View system metrics, check API health, and monitor platform status through admin interface

### Implementation for User Story 3

- [ ] T032 [P] [US3] Create system health page in src/app/admin/system/page.tsx
- [ ] T033 [P] [US3] Implement health status component in src/components/admin/HealthStatus.tsx
- [ ] T034 [P] [US3] Create metrics visualization component in src/components/admin/MetricsChart.tsx
- [ ] T035 [P] [US3] Implement alert panel component in src/components/admin/AlertPanel.tsx
- [ ] T036 [US3] Create system health API route extending /api/admin/ping in src/app/api/admin/system/health/route.ts
- [ ] T037 [US3] Integrate Firebase Admin env status checks
- [ ] T038 [P] [US3] Add Vercel deployment status monitoring
- [ ] T039 [P] [US3] Implement real-time health status updates
- [ ] T040 [P] [US3] Create admin route availability checker

**Checkpoint**: System monitoring provides comprehensive health visibility and issue detection

---

## Phase 6: User Story 4 - Content Approval Management (Priority: P1) 🎯 MVP

**Goal**: Content approval override system with n8n workflow integration

**Independent Test**: View approval queues, override client decisions, and verify n8n workflow triggering

### Implementation for User Story 4

- [ ] T041 [P] [US4] Create approvals management page in src/app/admin/approvals/page.tsx
- [ ] T042 [P] [US4] Implement approval cards component in src/components/admin/ApprovalCards.tsx
- [ ] T043 [P] [US4] Create approval actions component (approve/reject/retry) in src/components/admin/ApprovalActions.tsx
- [ ] T044 [P] [US4] Implement approval content viewer in src/components/admin/ApprovalContentViewer.tsx
- [ ] T045 [US4] Create approvals API route in src/app/api/admin/approvals/route.ts
- [ ] T046 [US4] Implement approval override functionality with n8n integration
- [ ] T047 [US4] Create approval action logging and audit trail
- [ ] T048 [P] [US4] Add approval status filtering and search
- [ ] T049 [P] [US4] Implement bulk approval operations

**Checkpoint**: Content approval management provides admin override capabilities with workflow integration

---

## Phase 7: User Story 5 - Billing and Client Organization Oversight (Priority: P2)

**Goal**: Billing status monitoring and client organization management

**Independent Test**: View billing dashboards, check Whop integration status, and manage client organizations

### Implementation for User Story 5

- [ ] T050 [P] [US5] Create billing overview page in src/app/admin/billing/page.tsx
- [ ] T051 [P] [US5] Implement billing stats component in src/components/admin/BillingStats.tsx
- [ ] T052 [P] [US5] Create client organization table in src/components/admin/ClientTable.tsx
- [ ] T053 [P] [US5] Implement subscription status indicators in src/components/admin/SubscriptionStatus.tsx
- [ ] T054 [US5] Create billing API route in src/app/api/admin/billing/route.ts
- [ ] T055 [US5] Create clients API route in src/app/api/admin/clients/route.ts
- [ ] T056 [US5] Integrate Whop webhook status monitoring
- [ ] T057 [P] [US5] Add delinquent account alerts
- [ ] T058 [P] [US5] Implement billing sync status tracking

**Checkpoint**: Billing oversight provides comprehensive subscription and client organization visibility

---

## Phase 8: User Story 6 - Webhook Monitoring and Management (Priority: P2)

**Goal**: Integration webhook monitoring with replay capabilities

**Independent Test**: View webhook logs, check integration status, and replay failed webhook events

### Implementation for User Story 6

- [ ] T059 [P] [US6] Create webhook monitoring page in src/app/admin/webhooks/page.tsx
- [ ] T060 [P] [US6] Implement webhook events table in src/components/admin/WebhookTable.tsx
- [ ] T061 [P] [US6] Create webhook detail viewer with payload display in src/components/admin/WebhookDetailViewer.tsx
- [ ] T062 [P] [US6] Implement webhook retry actions in src/components/admin/WebhookActions.tsx
- [ ] T063 [US6] Create webhooks API route in src/app/api/admin/webhooks/route.ts
- [ ] T064 [US6] Create webhook retry API route in src/app/api/admin/webhooks/retry/route.ts
- [ ] T065 [US6] Implement webhook event logging system
- [ ] T066 [P] [US6] Add webhook source filtering (Whop, n8n, GBU, Calendar)
- [ ] T067 [P] [US6] Create webhook status monitoring dashboard

**Checkpoint**: Webhook management provides comprehensive integration monitoring and troubleshooting

---

## Phase 9: User Story 7 - Client and Project Administration (Priority: P3)

**Goal**: Cross-client project oversight and administrative intervention

**Independent Test**: View all client projects, access project details, and make administrative modifications

### Implementation for User Story 7

- [ ] T068 [P] [US7] Create projects administration page in src/app/admin/projects/page.tsx
- [ ] T069 [P] [US7] Implement project overview table in src/components/admin/ProjectTable.tsx
- [ ] T070 [P] [US7] Create project detail admin view in src/app/admin/projects/[id]/page.tsx
- [ ] T071 [P] [US7] Implement project intervention actions in src/components/admin/ProjectActions.tsx
- [ ] T072 [US7] Create projects admin API route in src/app/api/admin/projects/route.ts
- [ ] T073 [US7] Create project statistics API route in src/app/api/admin/projects/stats/route.ts
- [ ] T074 [P] [US7] Add cross-client project filtering and search
- [ ] T075 [P] [US7] Implement project status override capabilities
- [ ] T076 [P] [US7] Create project timeline intervention tools

**Checkpoint**: Project administration provides cross-client oversight and intervention capabilities

---

## Phase 10: API Enhancement & Integration

**Purpose**: Additional API routes and webhook integrations

- [ ] T077 [P] Create enhanced admin authentication API route in src/app/api/admin/auth/route.ts
- [ ] T078 [P] Create audit logging API route in src/app/api/admin/audit/route.ts
- [ ] T079 [P] Implement webhook event storage and retrieval system
- [ ] T080 [P] Add n8n workflow trigger endpoints for approval overrides
- [ ] T081 [P] Create admin action audit trail functionality
- [ ] T082 [P] Implement real-time notification system for admin alerts

---

## Phase 11: Testing & Quality Assurance

**Purpose**: Comprehensive testing of all admin workflows

- [ ] T083 [P] Create integration tests for admin authentication in tests/admin/integration/admin-auth.test.ts
- [ ] T084 [P] Create integration tests for user management in tests/admin/integration/user-management.test.ts
- [ ] T085 [P] Create integration tests for approval management in tests/admin/integration/approval-management.test.ts
- [ ] T086 [P] Create integration tests for webhook monitoring in tests/admin/integration/webhook-monitoring.test.ts
- [ ] T087 [P] Create end-to-end tests for admin workflows in tests/admin/e2e/admin-workflow.spec.ts
- [ ] T088 [P] Create security tests for admin route protection in tests/admin/security/route-protection.test.ts

---

## Phase 12: Polish & Security

**Purpose**: Security hardening, performance optimization, and final polish

- [ ] T089 [P] Implement comprehensive admin action audit logging
- [ ] T090 [P] Add security headers and CSRF protection for admin routes
- [ ] T091 [P] Optimize admin dashboard performance and loading times
- [ ] T092 [P] Add accessibility features and keyboard navigation
- [ ] T093 [P] Implement admin session timeout and security warnings
- [ ] T094 [P] Create admin documentation and usage guidelines
- [ ] T095 [P] Add comprehensive error handling and user feedback
- [ ] T096 [P] Implement admin portal deployment and monitoring setup

---

## Dependencies & Parallel Execution

### User Story Dependencies

**Sequential Requirements**:
1. Setup & Foundation (Phases 1-2) → MUST complete first
2. Admin Authentication (US1) → Required for all other admin features
3. User Management (US2) → Core admin functionality, should complete early
4. System Monitoring (US3) → Can run parallel with US2
5. All other stories (US4-US7) → Can be implemented in parallel after US1-US3

### Parallel Execution Groups

**Group A**: Core Admin Infrastructure (run after Phase 2)
- User Story 1: Admin Authentication (T014-T022)
- User Story 2: User Management (T023-T031)
- User Story 3: System Monitoring (T032-T040)

**Group B**: Content & Operations Management (run after Group A starts)
- User Story 4: Approval Management (T041-T049)
- User Story 5: Billing Oversight (T050-T058)
- User Story 6: Webhook Monitoring (T059-T067)

**Group C**: Advanced Features (run after Group B starts)
- User Story 7: Project Administration (T068-T076)
- API Enhancement (T077-T082)

## Implementation Strategy

### MVP Scope (Minimum Viable Product)
- **Phase 1-2**: Setup & Foundation
- **Phase 3**: User Story 1 (Admin Authentication) - REQUIRED
- **Phase 4**: User Story 2 (User Management) - REQUIRED
- **Phase 5**: User Story 3 (System Monitoring) - REQUIRED
- **Phase 6**: User Story 4 (Approval Management) - Recommended for MVP

### Sequential Implementation Order
1. **Foundation**: Setup & Foundation (Core Infrastructure)
2. **Core**: Admin Authentication (Essential Security)
3. **Essential**: User Management + System Monitoring (Core Admin Functions)
4. **Business**: Approval Management + Billing Oversight (Operations Critical)
5. **Advanced**: Webhook Monitoring + Project Administration (Full Operations)
6. **Production**: Testing + Security + Polish + Deployment

### Success Metrics per Story
- **US1**: Admin dashboard loads in <3s, role-based access working 100%
- **US2**: User management operations complete in <2s, existing API integration working
- **US3**: System health checks return in <1s, Firebase env status visible
- **US4**: Approval overrides trigger n8n workflows within 5s
- **US5**: Billing dashboard shows real-time Whop subscription status
- **US6**: Webhook monitoring displays integration status with 99% accuracy
- **US7**: Project administration provides cross-client visibility and intervention

## Task Summary

**Total Tasks**: 96
- Setup & Foundation: 13 tasks
- User Story 1 (Admin Auth): 9 tasks
- User Story 2 (User Management): 9 tasks
- User Story 3 (System Monitoring): 9 tasks
- User Story 4 (Approval Management): 9 tasks
- User Story 5 (Billing Oversight): 9 tasks
- User Story 6 (Webhook Monitoring): 9 tasks
- User Story 7 (Project Administration): 9 tasks
- API Enhancement: 6 tasks
- Testing & Polish: 14 tasks

**Parallel Opportunities**: 52 tasks marked [P] can run in parallel
**Independent Stories**: 4 user stories can be implemented independently after foundation
**MVP Scope**: 40 tasks (Phases 1-6) for functional minimum viable product

**Existing Infrastructure Integration**:
- Leverages existing `/api/admin/users`, `/api/admin/grant`, `/api/admin/claims`, `/api/admin/ping`, `/api/admin/whoami`
- Builds upon Firebase Admin SDK configuration in `src/lib/server/firebaseAdmin.ts`
- Maintains compatibility with current authentication and authorization patterns
- Extends existing admin API infrastructure with new admin portal UI