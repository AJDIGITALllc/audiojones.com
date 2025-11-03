# Tasks: AudioJones.com Core Experience

**Input**: Design documents from `/specs/main/`
**Prerequisites**: spec.md (required for user stories), research.md, data-model.md, contracts/

**Feature**: AudioJones.com marketing site with Homepage, Artist Hub, and EPM pages
**Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Firebase, Vercel
**Organization**: Tasks are grouped by functional requirement to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which functional requirement this task belongs to (e.g., FR01, FR06, FR07)
- Include exact file paths in descriptions

## Path Conventions

Next.js 16 App Router structure:
- `src/app/` - Application routes and layouts
- `src/components/` - React components
- `src/config/` - Configuration files
- `src/lib/` - Utility libraries

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create site configuration in src/config/site.ts
- [ ] T002 [P] Create brand colors configuration in src/config/colors.ts
- [ ] T003 [P] Setup TypeScript interfaces in src/types/index.ts
- [ ] T004 [P] Configure environment variables structure in .env.example
- [ ] T005 [P] Create shared UI components directory structure in src/components/ui/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No functional requirement work can begin until this phase is complete

- [ ] T006 Create global navigation component in src/components/layout/Navigation.tsx
- [ ] T007 [P] Create header component in src/components/layout/Header.tsx
- [ ] T008 [P] Create footer component in src/components/layout/Footer.tsx
- [ ] T009 [P] Setup MailerLite integration in src/lib/mailerlite.ts
- [ ] T010 [P] Setup analytics tracking in src/lib/analytics.ts
- [ ] T011 [P] Create ImageKit integration in src/lib/imagekit.ts
- [ ] T012 Create root layout in src/app/layout.tsx
- [ ] T013 [P] Setup Tailwind config with Audio Jones brand colors in tailwind.config.ts

**Checkpoint**: Foundation ready - functional requirement implementation can now begin in parallel

---

## Phase 3: FR01 - Homepage Layout (Priority: P1) 🎯 MVP

**Goal**: Deliver core homepage with hero, services, testimonials, and footer

**Independent Test**: Homepage loads at `/` with all sections visible and functional CTAs

### Implementation for FR01

- [ ] T014 [P] [FR01] Create homepage route in src/app/(site)/page.tsx
- [ ] T015 [P] [FR01] Create HomeHero component in src/components/pages/HomePage/HomeHero.tsx
- [ ] T016 [P] [FR01] Create ServiceCard component in src/components/pages/HomePage/ServiceCard.tsx
- [ ] T017 [P] [FR01] Create ServicesGrid component in src/components/pages/HomePage/ServicesGrid.tsx
- [ ] T018 [P] [FR01] Create TestimonialStrip component in src/components/pages/HomePage/TestimonialStrip.tsx
- [ ] T019 [P] [FR01] Create FeaturedFunnel component in src/components/pages/HomePage/FeaturedFunnel.tsx
- [ ] T020 [FR01] Create services configuration in src/config/services.json
- [ ] T021 [FR01] Integrate all homepage components in src/app/(site)/page.tsx
- [ ] T022 [FR01] Add homepage metadata and SEO tags

**Checkpoint**: Homepage is fully functional with all required sections

---

## Phase 4: FR02 - CTA Behavior (Priority: P1)

**Goal**: Implement configurable CTAs with Whop integration and portal routing

**Independent Test**: Primary CTA redirects to Whop, secondary CTA routes to client portal

### Implementation for FR02

- [ ] T023 [P] [FR02] Create CTA configuration in src/config/cta.ts
- [ ] T024 [P] [FR02] Create Button component in src/components/ui/Button.tsx
- [ ] T025 [P] [FR02] Create CTAButton component in src/components/ui/CTAButton.tsx
- [ ] T026 [FR02] Implement CTA tracking in src/lib/analytics.ts
- [ ] T027 [FR02] Update HomeHero component with configurable CTAs
- [ ] T028 [FR02] Add CTA behavior to service cards

**Checkpoint**: All CTAs are functional and properly configured

---

## Phase 5: FR03 - Integrations (Priority: P1)

**Goal**: Implement MailerLite newsletter, ImageKit images, and analytics

**Independent Test**: Newsletter subscription works, images load from ImageKit, events tracked

### Implementation for FR03

- [ ] T029 [P] [FR03] Create newsletter subscription API route in src/app/api/subscribe/route.ts
- [ ] T030 [P] [FR03] Create SubscribeForm component in src/components/ui/SubscribeForm.tsx
- [ ] T031 [P] [FR03] Implement MailerLite API client in src/lib/mailerlite.ts
- [ ] T032 [P] [FR03] Setup ImageKit loader in src/lib/imagekit.ts
- [ ] T033 [P] [FR03] Create analytics tracking events in src/lib/analytics.ts
- [ ] T034 [FR03] Add newsletter form to homepage hero
- [ ] T035 [FR03] Integrate ImageKit with homepage images
- [ ] T036 [FR03] Add analytics tracking to all user interactions

**Checkpoint**: All third-party integrations are working correctly

---

## Phase 6: FR04 & FR05 - SEO and Brand Compliance (Priority: P2)

**Goal**: Implement SEO optimization and ensure brand compliance

**Independent Test**: Page metadata is correct, brand colors used consistently, AJ DIGITAL LLC in footer

### Implementation for FR04 & FR05

- [ ] T037 [P] [FR04] Create SEO metadata configuration in src/config/seo.ts
- [ ] T038 [P] [FR04] Implement structured data in src/components/seo/StructuredData.tsx
- [ ] T039 [P] [FR05] Create brand compliance utilities in src/lib/brand.ts
- [ ] T040 [P] [FR05] Create OpenGraph image generation in src/app/api/og/route.tsx
- [ ] T041 [FR04] Add meta tags to root layout
- [ ] T042 [FR05] Audit all components for brand color compliance
- [ ] T043 [FR05] Ensure AJ DIGITAL LLC appears in footer

**Checkpoint**: SEO is optimized and brand compliance is complete

---

## Phase 7: FR06 - Artist Hub (Priority: P2)

**Goal**: Implement Artist Hub page with service tiles and Whop integration

**Independent Test**: `/artist-hub` loads with 4 service tiles, CTAs redirect to Whop products

### Implementation for FR06

- [x] T044 [P] [FR06] Create artist hub route in src/app/(site)/artist-hub/page.tsx
- [x] T045 [P] [FR06] Create ArtistHubLayout component in src/components/pages/ArtistHub/ArtistHubLayout.tsx
- [x] T046 [P] [FR06] Create ServiceTile component in src/components/pages/ArtistHub/ServiceTile.tsx
- [x] T047 [P] [FR06] Create artist hub services configuration in src/config/artistHub.json
- [x] T048 [P] [FR06] Create artist hub API route in src/app/api/config/artist-hub/route.ts
- [ ] T049 [FR06] Update navigation to include Artist Hub link
- [x] T050 [FR06] Integrate Whop product URLs from environment variables
- [x] T051 [FR06] Add Artist Hub metadata and SEO optimization
- [x] T052 [FR06] Ensure responsive design meets Lighthouse ≥90 requirement

**Checkpoint**: ✅ Artist Hub is fully functional with working service tiles

---

## Phase 8: FR07 - EPM Page (Priority: P3)

**Goal**: Implement EPM page with framework explanation and coming soon services

**Independent Test**: `/epm` loads with hero, explainer, flow steps, and coming soon cards

### Implementation for FR07

- [x] T053 [P] [FR07] Create EPM route in src/app/(site)/epm/page.tsx
- [x] T054 [P] [FR07] Create EpmHero component in src/components/pages/EPM/EpmHero.tsx
- [x] T055 [P] [FR07] Create EpmExplainer component in src/components/pages/EPM/EpmExplainer.tsx
- [x] T056 [P] [FR07] Create EpmFlowStep component in src/components/pages/EPM/EpmFlowStep.tsx
- [x] T057 [P] [FR07] Create ComingSoonCard component in src/components/pages/EPM/ComingSoonCard.tsx
- [x] T058 [P] [FR07] Create EpmFlow component in src/components/pages/EPM/EpmFlow.tsx
- [x] T059 [P] [FR07] Create EPM configuration in src/config/epm.json
- [x] T060 [P] [FR07] Create EPM API route in src/app/api/config/epm/route.ts
- [ ] T061 [FR07] Update navigation to include EPM link
- [x] T062 [FR07] Implement EPM waitlist subscription with MailerLite tagging
- [x] T063 [FR07] Add EPM gradient styling per brand requirements
- [x] T064 [FR07] Add EPM metadata and SEO optimization

**Checkpoint**: ✅ EPM page is complete with all required sections

---

## Phase 9: Configuration APIs (Priority: P2)

**Goal**: Implement API endpoints for dynamic configuration

**Independent Test**: All `/api/config/*` endpoints return correct JSON data

### Implementation for Configuration APIs

- [ ] T065 [P] [API] Create site config API route in src/app/api/config/site/route.ts
- [ ] T066 [P] [API] Create services config API route in src/app/api/config/services/route.ts
- [ ] T067 [P] [API] Create tracking API route in src/app/api/track/event/route.ts
- [ ] T068 [API] Add error handling to all API routes
- [ ] T069 [API] Add rate limiting to subscription endpoints
- [ ] T070 [API] Add CORS configuration for API routes

**Checkpoint**: All configuration APIs are functional

---

## Phase 10: Polish & Cross-Cutting Concerns

**Goal**: Performance optimization, error handling, and final polish

**Independent Test**: Lighthouse score ≥90, error pages work, loading states smooth

### Polish Tasks

- [ ] T071 [P] Create loading components in src/components/ui/Loading.tsx
- [ ] T072 [P] Create error boundary in src/components/ui/ErrorBoundary.tsx
- [ ] T073 [P] Create 404 page in src/app/not-found.tsx
- [ ] T074 [P] Optimize images and implement lazy loading
- [ ] T075 [P] Add loading states to all async operations
- [ ] T076 Implement error handling across all components
- [ ] T077 Run Lighthouse audit and optimize for ≥90 score
- [ ] T078 Add keyboard navigation support
- [ ] T079 Test all responsive breakpoints
- [ ] T080 Final QA pass on all functional requirements

**Final Checkpoint**: Application is production-ready

---

## Dependencies & Execution Strategy

### User Story Dependencies
- **FR01 (Homepage)**: Independent MVP - can be delivered first
- **FR02 (CTAs)**: Depends on FR01 hero section
- **FR03 (Integrations)**: Can be parallel with FR02
- **FR04/FR05 (SEO/Brand)**: Can be parallel with all others
- **FR06 (Artist Hub)**: Independent of homepage, requires foundational nav
- **FR07 (EPM)**: Independent of other pages, requires foundational nav

### Parallel Execution Opportunities

**After Phase 2 (Foundation)**:
- **Track 1**: FR01 Homepage (T014-T022)
- **Track 2**: FR06 Artist Hub (T044-T052) 
- **Track 3**: FR07 EPM (T053-T064)
- **Track 4**: API Development (T065-T070)

**Critical Path**: Phase 1 → Phase 2 → Parallel tracks → Phase 10 Polish

### MVP Recommendation
**Minimum Viable Product**: Phase 1 + Phase 2 + FR01 (Homepage Layout)
- Delivers: Functional homepage with hero, services, testimonials
- Enables: Immediate traffic capture and CTA testing
- Timeline: ~15-20 tasks for core functionality

---

## Summary

- **Total Tasks**: 80
- **Setup & Foundation**: 13 tasks
- **FR01 (Homepage)**: 9 tasks  
- **FR02 (CTAs)**: 6 tasks
- **FR03 (Integrations)**: 8 tasks
- **FR04/FR05 (SEO/Brand)**: 7 tasks
- **FR06 (Artist Hub)**: 9 tasks
- **FR07 (EPM)**: 12 tasks
- **APIs**: 6 tasks
- **Polish**: 10 tasks

**Parallel Opportunities**: 45+ tasks can run in parallel after foundation
**Independent Test Criteria**: Each functional requirement has clear acceptance criteria
**MVP Scope**: Homepage functionality (Phases 1-3, ~22 tasks)