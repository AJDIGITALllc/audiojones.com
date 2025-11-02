# Tasks: Client Portal

**Input**: Design documents from `.specify/specs/client-portal.md` and `.specify/plans/client-portal.plan.md`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Based on implementation plan:
- **Client Portal**: `apps/client-portal/`
- **API Routes**: `src/app/api/`
- **Shared Services**: `src/lib/server/`
- **Tests**: `tests/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create client portal app directory structure at apps/client-portal/
- [ ] T002 Initialize Next.js package.json for client portal with TypeScript and Tailwind CSS
- [ ] T003 [P] Configure Firebase Admin SDK connection in src/lib/server/firebase/auth.ts
- [ ] T004 [P] Create base TypeScript interfaces in apps/client-portal/lib/types/index.ts
- [ ] T005 [P] Set up Tailwind CSS dark theme configuration in apps/client-portal/tailwind.config.js
- [ ] T006 [P] Configure environment variables template in .env.example
- [ ] T007 [P] Create robots.txt to exclude portal from search indexing in apps/client-portal/public/robots.txt

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T008 Create Firebase Firestore collections schema in src/lib/server/firebase/firestore.ts
- [ ] T009 Implement role-based access control middleware in src/lib/server/middleware/rbac.ts
- [ ] T010 Create authentication middleware for API routes in src/lib/server/middleware/auth.ts
- [ ] T011 Set up request validation middleware in src/lib/server/middleware/validation.ts
- [ ] T012 Create base layout component in apps/client-portal/components/shared/Layout.tsx
- [ ] T013 Implement navigation component with role-based menu in apps/client-portal/components/shared/Navigation.tsx
- [ ] T014 Create loading component in apps/client-portal/components/shared/Loading.tsx
- [ ] T015 Set up error boundary component in apps/client-portal/components/shared/ErrorBoundary.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Client Authentication and Role-Based Access (Priority: P1) 🎯 MVP

**Goal**: Secure user authentication with role-based access to portal features

**Independent Test**: Create test accounts, log in, and verify role-based access controls work correctly

### Implementation for User Story 1

- [ ] T016 [P] [US1] Create User interface in apps/client-portal/lib/types/user.ts
- [ ] T017 [P] [US1] Create Organization interface in apps/client-portal/lib/types/organization.ts
- [ ] T018 [P] [US1] Implement UserService in src/lib/server/services/UserService.ts
- [ ] T019 [US1] Create login page in apps/client-portal/pages/login.tsx
- [ ] T020 [P] [US1] Implement LoginForm component in apps/client-portal/components/auth/LoginForm.tsx
- [ ] T021 [P] [US1] Create RoleGuard component in apps/client-portal/components/auth/RoleGuard.tsx
- [ ] T022 [P] [US1] Implement SessionProvider in apps/client-portal/components/auth/SessionProvider.tsx
- [ ] T023 [US1] Create session management utilities in apps/client-portal/lib/auth/session.ts
- [ ] T024 [US1] Implement role utilities in apps/client-portal/lib/auth/roles.ts
- [ ] T025 [US1] Create authentication API route in src/app/api/auth/login/route.ts
- [ ] T026 [P] [US1] Create logout API route in src/app/api/auth/logout/route.ts
- [ ] T027 [P] [US1] Create session verification API route in src/app/api/auth/session/route.ts
- [ ] T028 [US1] Add authentication middleware to client portal in apps/client-portal/middleware.ts

**Checkpoint**: User authentication system is fully functional and role-based access controls are working

---

## Phase 4: User Story 2 - Dashboard Overview with Actionable Insights (Priority: P1) 🎯 MVP

**Goal**: Comprehensive dashboard showing next actions, billing status, and upcoming meetings

**Independent Test**: Log in and verify all dashboard widgets display relevant, actionable information

### Implementation for User Story 2

- [ ] T029 [P] [US2] Create dashboard page in apps/client-portal/pages/index.tsx
- [ ] T030 [P] [US2] Implement NextActions component in apps/client-portal/components/dashboard/NextActions.tsx
- [ ] T031 [P] [US2] Create BillingAlert component in apps/client-portal/components/dashboard/BillingAlert.tsx
- [ ] T032 [P] [US2] Implement UpcomingBookings component in apps/client-portal/components/dashboard/UpcomingBookings.tsx
- [ ] T033 [US2] Create dashboard API route in src/app/api/dashboard/route.ts
- [ ] T034 [US2] Implement dashboard data aggregation service in src/lib/server/services/DashboardService.ts
- [ ] T035 [P] [US2] Add dashboard styling and responsive design
- [ ] T036 [P] [US2] Implement dashboard loading states and error handling

**Checkpoint**: Dashboard provides actionable overview of client's current status and next steps

---

## Phase 5: User Story 3 - Project Management and Progress Tracking (Priority: P2)

**Goal**: View project status, milestones, and deliverables with progress tracking

**Independent Test**: Create projects, set milestones, and verify progress tracking functionality works

### Implementation for User Story 3

- [ ] T037 [P] [US3] Create Project interface in apps/client-portal/lib/types/project.ts
- [ ] T038 [P] [US3] Create Milestone interface in apps/client-portal/lib/types/milestone.ts
- [ ] T039 [US3] Implement ProjectService in src/lib/server/services/ProjectService.ts
- [ ] T040 [US3] Create projects listing page in apps/client-portal/pages/projects/index.tsx
- [ ] T041 [US3] Create project detail page in apps/client-portal/pages/projects/[id].tsx
- [ ] T042 [P] [US3] Implement ProjectCard component in apps/client-portal/components/projects/ProjectCard.tsx
- [ ] T043 [P] [US3] Create MilestoneTracker component in apps/client-portal/components/projects/MilestoneTracker.tsx
- [ ] T044 [P] [US3] Implement ProgressIndicator component in apps/client-portal/components/projects/ProgressIndicator.tsx
- [ ] T045 [US3] Create projects API route in src/app/api/projects/route.ts
- [ ] T046 [US3] Create project detail API route in src/app/api/projects/[id]/route.ts
- [ ] T047 [P] [US3] Add project filtering and search functionality
- [ ] T048 [P] [US3] Implement project timeline visualization

**Checkpoint**: Project management system provides complete visibility into project status and progress

---

## Phase 6: User Story 4 - Billing and Payment Management (Priority: P2)

**Goal**: View billing status, payment history, and manage payment methods via Whop integration

**Independent Test**: Display billing information, process payments, and handle billing updates via Whop integration

### Implementation for User Story 4

- [ ] T049 [P] [US4] Create Billing interface in apps/client-portal/lib/types/billing.ts
- [ ] T050 [US4] Implement BillingService with Whop integration in src/lib/server/services/BillingService.ts
- [ ] T051 [US4] Create Whop API client in apps/client-portal/lib/integrations/whop.ts
- [ ] T052 [US4] Create billing page in apps/client-portal/pages/billing/index.tsx
- [ ] T053 [P] [US4] Implement billing overview components
- [ ] T054 [US4] Create billing API route in src/app/api/billing/route.ts
- [ ] T055 [US4] Create Whop webhook handler in src/app/api/webhooks/whop/route.ts
- [ ] T056 [P] [US4] Add billing status indicators throughout portal
- [ ] T057 [P] [US4] Implement payment history display
- [ ] T058 [P] [US4] Add billing alert system for overdue accounts

**Checkpoint**: Billing system provides real-time status and payment management through Whop integration

---

## Phase 7: User Story 5 - Content Approval Workflow (Priority: P2)

**Goal**: Review and approve content deliverables with automated workflow notifications

**Independent Test**: Submit content for approval and verify complete approval workflow with n8n integration

### Implementation for User Story 5

- [ ] T059 [P] [US5] Create Approval interface in apps/client-portal/lib/types/approval.ts
- [ ] T060 [P] [US5] Create ApprovalFeedback interface in apps/client-portal/lib/types/approval.ts
- [ ] T061 [US5] Implement ApprovalService in src/lib/server/services/ApprovalService.ts
- [ ] T062 [US5] Create n8n integration client in apps/client-portal/lib/integrations/n8n.ts
- [ ] T063 [US5] Create approvals listing page in apps/client-portal/pages/approvals/index.tsx
- [ ] T064 [US5] Create approval detail page in apps/client-portal/pages/approvals/[id].tsx
- [ ] T065 [P] [US5] Implement ApprovalCard component in apps/client-portal/components/approvals/ApprovalCard.tsx
- [ ] T066 [P] [US5] Create ContentViewer component in apps/client-portal/components/approvals/ContentViewer.tsx
- [ ] T067 [P] [US5] Implement ApprovalActions component in apps/client-portal/components/approvals/ApprovalActions.tsx
- [ ] T068 [US5] Create approvals API route in src/app/api/approvals/route.ts
- [ ] T069 [US5] Create approval detail API route in src/app/api/approvals/[id]/route.ts
- [ ] T070 [US5] Create approval action API route in src/app/api/approvals/[id]/action/route.ts
- [ ] T071 [US5] Create n8n webhook handlers in src/app/api/webhooks/n8n/approvals/route.ts
- [ ] T072 [P] [US5] Implement Slack notifications integration in apps/client-portal/lib/integrations/slack.ts

**Checkpoint**: Content approval workflow is fully automated with n8n and Slack integration

---

## Phase 8: User Story 6 - Appointment Scheduling and Calendar Integration (Priority: P3)

**Goal**: Schedule appointments and view upcoming meetings with calendar integration

**Independent Test**: Book appointments through embedded calendar and verify Google Calendar sync

### Implementation for User Story 6

- [ ] T073 [P] [US6] Create Booking interface in apps/client-portal/lib/types/booking.ts
- [ ] T074 [US6] Create Google Calendar integration in apps/client-portal/lib/integrations/google-calendar.ts
- [ ] T075 [US6] Create bookings page in apps/client-portal/pages/bookings/index.tsx
- [ ] T076 [P] [US6] Implement calendar embed components
- [ ] T077 [P] [US6] Create upcoming bookings widgets
- [ ] T078 [US6] Create bookings API route in src/app/api/bookings/route.ts
- [ ] T079 [US6] Create calendar embed configuration API in src/app/api/bookings/embed/route.ts
- [ ] T080 [US6] Create calendar webhook handler in src/app/api/webhooks/calendar/route.ts
- [ ] T081 [P] [US6] Add Cal.com/Calendly embed integration

**Checkpoint**: Calendar integration provides seamless appointment scheduling and management

---

## Phase 9: User Story 7 - File and Asset Management (Priority: P3)

**Goal**: Access shared files and upload assets through Google Drive integration

**Independent Test**: Upload files, organize assets, and access shared Google Drive content

### Implementation for User Story 7

- [ ] T082 [P] [US7] Create File interface in apps/client-portal/lib/types/file.ts
- [ ] T083 [P] [US7] Create FilePermissions interface in apps/client-portal/lib/types/file.ts
- [ ] T084 [US7] Implement FileService with Google Drive integration in src/lib/server/services/FileService.ts
- [ ] T085 [US7] Create Google Drive API client in apps/client-portal/lib/integrations/google-drive.ts
- [ ] T086 [US7] Create files page in apps/client-portal/pages/files/index.tsx
- [ ] T087 [P] [US7] Implement file browser components
- [ ] T088 [P] [US7] Create file upload components
- [ ] T089 [P] [US7] Implement file preview components
- [ ] T090 [US7] Create files API route in src/app/api/files/route.ts
- [ ] T091 [US7] Create file upload API route in src/app/api/files/upload/route.ts
- [ ] T092 [US7] Create file download API route in src/app/api/files/[id]/download/route.ts
- [ ] T093 [P] [US7] Add project-based file organization

**Checkpoint**: File management system provides secure access to Google Drive content with project organization

---

## Phase 10: User Story 8 - Messaging and Communication (Priority: P3)

**Goal**: Communicate through threaded conversations organized by project context

**Independent Test**: Send messages, create threads, and verify real-time delivery

### Implementation for User Story 8

- [ ] T094 [P] [US8] Create Message interface in apps/client-portal/lib/types/message.ts
- [ ] T095 [P] [US8] Create MessageThread interface in apps/client-portal/lib/types/message.ts
- [ ] T096 [US8] Implement MessageService in src/lib/server/services/MessageService.ts
- [ ] T097 [US8] Create messages page in apps/client-portal/pages/messages/index.tsx
- [ ] T098 [P] [US8] Implement message thread components
- [ ] T099 [P] [US8] Create conversation components
- [ ] T100 [US8] Create messages API route in src/app/api/messages/route.ts
- [ ] T101 [US8] Create thread messages API route in src/app/api/messages/[threadId]/route.ts
- [ ] T102 [P] [US8] Add real-time message delivery
- [ ] T103 [P] [US8] Implement project-based message organization

**Checkpoint**: Messaging system provides organized project-based communication

---

## Phase 11: Integration & Webhooks

**Purpose**: External system integrations and webhook handlers

- [ ] T104 [P] Create GBU webhook handler in src/app/api/webhooks/gbu/route.ts
- [ ] T105 [P] Create n8n project webhook handler in src/app/api/webhooks/n8n/projects/route.ts
- [ ] T106 [P] Add webhook security validation across all webhook endpoints
- [ ] T107 [P] Implement webhook retry logic and error handling
- [ ] T108 [P] Add webhook event logging and monitoring

---

## Phase 12: Testing & Quality Assurance

**Purpose**: Comprehensive testing of all user scenarios

- [ ] T109 [P] Create integration tests for authentication flow in tests/integration/auth.test.ts
- [ ] T110 [P] Create integration tests for billing sync in tests/integration/billing-sync.test.ts
- [ ] T111 [P] Create integration tests for approval workflow in tests/integration/approval-workflow.test.ts
- [ ] T112 [P] Create integration tests for webhook handlers in tests/integration/webhook-handlers.test.ts
- [ ] T113 [P] Create end-to-end tests for client journey in tests/e2e/client-journey.spec.ts
- [ ] T114 [P] Create end-to-end tests for approval flow in tests/e2e/approval-flow.spec.ts
- [ ] T115 [P] Create end-to-end tests for billing management in tests/e2e/billing-management.spec.ts

---

## Phase 13: Polish & Performance

**Purpose**: Performance optimization, security review, and final polish

- [ ] T116 [P] Implement performance monitoring and analytics
- [ ] T117 [P] Add comprehensive error handling and user feedback
- [ ] T118 [P] Optimize bundle size and loading performance
- [ ] T119 [P] Add accessibility features and ARIA labels
- [ ] T120 [P] Implement security headers and CSP
- [ ] T121 [P] Add audit logging for sensitive operations
- [ ] T122 [P] Create deployment scripts and CI/CD configuration
- [ ] T123 [P] Generate API documentation and user guides

---

## Dependencies & Parallel Execution

### User Story Dependencies

**No Blocking Dependencies**: All user stories (US3-US8) can be implemented in parallel after foundational infrastructure (US1-US2) is complete.

**Sequential Requirements**:
1. Setup & Foundation (Phases 1-2) → MUST complete first
2. Authentication (US1) → Required for all other features
3. Dashboard (US2) → Can integrate with other features as they complete
4. All other stories (US3-US8) → Can be implemented in parallel

### Parallel Execution Groups

**Group A**: Core Infrastructure (run after Phase 2)
- User Story 3: Project Management (T037-T048)
- User Story 4: Billing Management (T049-T058)
- User Story 5: Content Approval (T059-T072)

**Group B**: Enhanced Features (run after Group A starts)
- User Story 6: Calendar Integration (T073-T081)
- User Story 7: File Management (T082-T093)
- User Story 8: Messaging (T094-T103)

**Group C**: Supporting Systems (run in parallel with Groups A & B)
- Integration & Webhooks (T104-T108)
- Testing Implementation (T109-T115)

## Implementation Strategy

### MVP Scope (Minimum Viable Product)
- **Phase 1-2**: Setup & Foundation
- **Phase 3**: User Story 1 (Authentication) - REQUIRED
- **Phase 4**: User Story 2 (Dashboard) - REQUIRED
- **Phase 5**: User Story 3 (Project Management) - Recommended for MVP

### Incremental Delivery
1. **Week 1-2**: Foundation + Authentication (MVP Core)
2. **Week 3-4**: Dashboard + Project Management (Functional MVP)
3. **Week 5-6**: Billing + Approval Workflow (Business Critical)
4. **Week 7-8**: Calendar + Files + Messaging (Full Feature Set)
5. **Week 9-10**: Testing + Polish + Deployment

### Success Metrics per Story
- **US1**: Authentication success rate > 99%, role-based access working
- **US2**: Dashboard load time < 2 seconds, actionable insights displayed
- **US3**: Project visibility increases client satisfaction to 4.5/5.0
- **US4**: Billing-related support tickets decrease by 60%
- **US5**: Content approval cycle time reduces by 50%
- **US6**: Meeting attendance improves through calendar integration
- **US7**: Email attachments decrease by 80% through file management
- **US8**: Centralized communication improves team coordination

## Task Summary

**Total Tasks**: 123
- Setup & Foundation: 15 tasks
- User Story 1 (Authentication): 13 tasks
- User Story 2 (Dashboard): 8 tasks
- User Story 3 (Projects): 12 tasks
- User Story 4 (Billing): 10 tasks
- User Story 5 (Approvals): 14 tasks
- User Story 6 (Calendar): 9 tasks
- User Story 7 (Files): 12 tasks
- User Story 8 (Messages): 10 tasks
- Integration & Testing: 20 tasks

**Parallel Opportunities**: 65 tasks marked [P] can run in parallel
**Independent Stories**: 6 user stories can be implemented independently after foundation
**MVP Scope**: 36 tasks (Phases 1-5) for functional minimum viable product