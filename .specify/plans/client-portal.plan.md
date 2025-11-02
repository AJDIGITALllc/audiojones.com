# Implementation Plan: Client Portal# Implementation Plan: Client Portal



**Branch**: `001-client-portal` | **Date**: 2025-11-01 | **Spec**: [client-portal.md](./.specify/specs/client-portal.md)**Branch**: `001-client-portal` | **Date**: 2025-11-01 | **Spec**: [client-portal.md](./.specify/specs/client-portal.md)

**Input**: Feature specification from `.specify/specs/client-portal.md` and normalized artifact from `.specify/artifacts/client-portal.json`**Input**: Feature specification from `.specify/specs/client-portal.md` and normalized artifact from `.specify/artifacts/client-portal.json`



## Summary## Summary



Gated client portal for project management, billing transparency, and content collaboration. Provides role-based access to project status, approval workflows, billing information, and team communication. Integrates with existing AJ Digital infrastructure (Whop, Google Workspace, n8n, Slack) to create unified client experience.Gated client portal for project management, billing transparency, and content collaboration. Provides role-based access to project status, approval workflows, billing information, and team communication. Integrates with existing AJ Digital infrastructure (Whop, Google Workspace, n8n, Slack) to create unified client experience.



## Technical Context## Technical Context



**Language/Version**: TypeScript 5.5+ with Next.js 16.0.0 (using Turbopack)  **Language/Version**: TypeScript 5.5+ with Next.js 16.0.0 (using Turbopack)  

**Primary Dependencies**: Next.js, React 18, Firebase Admin SDK, Tailwind CSS, Whop API SDK  **Primary Dependencies**: Next.js, React 18, Firebase Admin SDK, Tailwind CSS, Whop API SDK  

**Storage**: Firebase Firestore (user roles, projects, approvals, messages), Google Drive (file storage)  **Storage**: Firebase Firestore (user roles, projects, approvals, messages), Google Drive (file storage)  

**Testing**: Jest with React Testing Library, Playwright for E2E  **Testing**: Jest with React Testing Library, Playwright for E2E  

**Target Platform**: Web application (responsive design for desktop/mobile)  **Target Platform**: Web application (responsive design for desktop/mobile)  

**Project Type**: Web application with API routes and client portal  **Project Type**: Web application with API routes and client portal  

**Performance Goals**: <2s page loads, <500ms API response times, 100+ concurrent users  **Performance Goals**: <2s page loads, <500ms API response times, 100+ concurrent users  

**Constraints**: Role-based access control, exclude from SEO indexing, Firebase Admin security  **Constraints**: Role-based access control, exclude from SEO indexing, Firebase Admin security  

**Scale/Scope**: 50-100 clients, 500-1000 projects annually, 10-20 team members**Scale/Scope**: 50-100 clients, 500-1000 projects annually, 10-20 team members



## Constitution Check## Constitution Check



*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.**GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*



**Core Principles Compliance**:**Core Principles Compliance**:

- ✅ **Library-First**: Authentication, role management, and API integrations built as reusable services- ✅ **Library-First**: Authentication, role management, and API integrations built as reusable services

- ✅ **CLI Interface**: Admin functions exposed via Firebase Admin CLI tools for user management- ✅ **CLI Interface**: Admin functions exposed via Firebase Admin CLI tools for user management

- ✅ **Test-First**: TDD approach with user story acceptance scenarios as test specifications- ✅ **Test-First**: TDD approach with user story acceptance scenarios as test specifications

- ✅ **Integration Testing**: Focus on Whop billing sync, Google Drive integration, n8n webhook flows- ✅ **Integration Testing**: Focus on Whop billing sync, Google Drive integration, n8n webhook flows

- ✅ **Observability**: Structured logging for authentication, billing events, and approval workflows- ✅ **Observability**: Structured logging for authentication, billing events, and approval workflows



**No Constitution Violations Identified****No Constitution Violations Identified**



## Project Structure## Project Structure



### Documentation (this feature)### Documentation (this feature)



```text```text

.specify/.specify/

├── plans/├── plans/

│   └── client-portal.plan.md       # This file│   └── client-portal.plan.md       # This file

├── specs/├── specs/

│   └── client-portal.md            # Feature specification│   └── client-portal.md            # Feature specification

├── artifacts/├── artifacts/

│   └── client-portal.json          # Normalized JSON artifact│   └── client-portal.json          # Normalized JSON artifact

└── tasks/└── tasks/

    └── client-portal.tasks.md      # Phase 2 output (generated separately)    └── client-portal.tasks.md      # Phase 2 output (generated separately)

``````



### Source Code (repository root)### Source Code (repository root)

```

```textapps/client-portal/

# Web application structure with client portal├── src/

apps/│   ├── app/                    # Next.js App Router pages

└── client-portal/│   │   ├── (auth)/            # Authentication routes

    ├── pages/│   │   ├── dashboard/         # Main dashboard

    │   ├── index.tsx               # Dashboard (main landing)│   │   ├── projects/          # Project management

    │   ├── login.tsx               # Authentication│   │   ├── billing/           # Billing & payments

    │   ├── projects/│   │   ├── approvals/         # Content approvals

    │   │   ├── index.tsx           # Project listing│   │   ├── messages/          # Communication

    │   │   └── [id].tsx            # Project details│   │   ├── files/             # File management

    │   ├── billing/│   │   └── api/               # API routes

    │   │   └── index.tsx           # Billing overview│   ├── components/            # Reusable UI components

    │   ├── approvals/│   │   ├── ui/                # Base UI components

    │   │   ├── index.tsx           # Approval queue│   │   ├── auth/              # Authentication components

    │   │   └── [id].tsx            # Approval details│   │   ├── dashboard/         # Dashboard-specific components

    │   ├── messages/│   │   ├── projects/          # Project components

    │   │   └── index.tsx           # Threaded conversations│   │   └── shared/            # Shared business components

    │   ├── files/│   ├── lib/                   # Utility libraries

    │   │   └── index.tsx           # File management│   │   ├── auth/              # Authentication helpers

    │   └── bookings/│   │   ├── api/               # API client functions

    │       └── index.tsx           # Calendar integration│   │   ├── integrations/      # External service integrations

    ├── components/│   │   └── utils/             # General utilities

    │   ├── auth/│   └── types/                 # TypeScript type definitions

    │   │   ├── LoginForm.tsx└── public/                    # Static assets

    │   │   ├── RoleGuard.tsx```

    │   │   └── SessionProvider.tsx

    │   ├── dashboard/## Implementation Phases

    │   │   ├── NextActions.tsx

    │   │   ├── BillingAlert.tsx### Phase 1: Foundation & Authentication (Week 1-2)

    │   │   └── UpcomingBookings.tsx**Goal**: Establish core infrastructure and user authentication

    │   ├── projects/

    │   │   ├── ProjectCard.tsx#### Week 1: Core Setup

    │   │   ├── MilestoneTracker.tsx- Initialize Next.js project with TypeScript

    │   │   └── ProgressIndicator.tsx- Configure Tailwind CSS with custom dark theme

    │   ├── approvals/- Set up Firebase project and authentication

    │   │   ├── ApprovalCard.tsx- Implement user role system (client_owner, client_member, aj_ops, aj_admin)

    │   │   ├── ContentViewer.tsx- Create base layout and navigation components

    │   │   └── ApprovalActions.tsx- Set up environment configuration for dev/staging/prod

    │   └── shared/

    │       ├── Layout.tsx#### Week 2: Authentication Flow

    │       ├── Navigation.tsx- Build login/logout functionality

    │       └── Loading.tsx- Implement role-based route protection

    └── lib/- Create user profile management

        ├── auth/- Set up session handling and token refresh

        │   ├── session.ts- Build password reset and email verification flows

        │   ├── roles.ts- Add loading states and error handling

        │   └── middleware.ts

        ├── integrations/**Deliverables**:

        │   ├── whop.ts- Functional authentication system

        │   ├── google-drive.ts- Role-based access control

        │   ├── google-calendar.ts- Basic app shell with navigation

        │   ├── n8n.ts- Environment setup for all stages

        │   └── slack.ts

        └── utils/### Phase 2: Dashboard & Core Features (Week 3-4)

            ├── validation.ts**Goal**: Implement main dashboard and essential client features

            ├── formatting.ts

            └── constants.ts#### Week 3: Dashboard Foundation

- Create responsive dashboard layout

src/app/api/- Implement next actions component

├── auth/- Build billing status widget

│   ├── login/route.ts- Add upcoming bookings display

│   ├── logout/route.ts- Create project overview cards

│   └── session/route.ts- Add quick access navigation

├── dashboard/route.ts

├── projects/#### Week 4: Project Management

│   ├── route.ts                    # List projects- Build project listing page

│   └── [id]/route.ts               # Project details- Implement project detail views

├── billing/- Add milestone tracking

│   └── route.ts                    # Billing data from Whop- Create file attachment system

├── approvals/- Build project status updates

│   ├── route.ts                    # List approvals- Add progress visualization

│   ├── [id]/route.ts               # Approval details

│   └── [id]/action/route.ts        # Approve/reject**Deliverables**:

├── messages/- Functional dashboard with real-time data

│   ├── route.ts                    # List/create messages- Complete project management interface

│   └── [threadId]/route.ts         # Thread messages- File upload and management system

├── files/- Progress tracking and visualization

│   ├── route.ts                    # List files

│   └── upload/route.ts             # File upload### Phase 3: Integrations & Workflows (Week 5-6)

├── bookings/**Goal**: Connect external services and implement business workflows

│   └── route.ts                    # Calendar integration

└── webhooks/#### Week 5: Billing & Calendar Integration

    ├── whop/route.ts               # Billing updates- Integrate Whop API for billing data

    ├── n8n/- Build payment status monitoring

    │   ├── projects/route.ts       # Project updates- Implement Cal.com/Calendly embedding

    │   └── approvals/route.ts      # Approval notifications- Add Google Calendar sync

    ├── gbu/route.ts                # Contract updates- Create booking management interface

    └── calendar/route.ts           # Booking updates- Set up payment reminders and notifications



src/lib/server/#### Week 6: Approval Workflows

├── firebase/- Build content approval interface

│   ├── auth.ts                     # Firebase Auth server utils- Implement approval state management

│   └── firestore.ts                # Firestore admin operations- Create comment and feedback system

├── services/- Set up n8n webhook integrations

│   ├── UserService.ts              # User management- Add Slack notification triggers

│   ├── ProjectService.ts           # Project operations- Build approval history tracking

│   ├── BillingService.ts           # Whop integration

│   ├── ApprovalService.ts          # Approval workflows**Deliverables**:

│   ├── MessageService.ts           # Communication- Fully integrated billing system

│   └── FileService.ts              # Google Drive integration- Working calendar and booking system

└── middleware/- Complete approval workflow

    ├── auth.ts                     # Authentication middleware- Automated notifications and alerts

    ├── rbac.ts                     # Role-based access control

    └── validation.ts               # Request validation### Phase 4: Communication & Files (Week 7-8)

**Goal**: Complete messaging system and advanced file management

tests/

├── integration/#### Week 7: Messaging System

│   ├── auth.test.ts- Build threaded conversation interface

│   ├── billing-sync.test.ts- Implement real-time message delivery

│   ├── approval-workflow.test.ts- Add file sharing within messages

│   └── webhook-handlers.test.ts- Create message search functionality

├── unit/- Build notification system

│   ├── services/- Add team collaboration features

│   ├── components/

│   └── utils/#### Week 8: Advanced Features & Polish

└── e2e/- Integrate Google Drive API

    ├── client-journey.spec.ts- Build advanced file management

    ├── approval-flow.spec.ts- Add AI chatbot integration (ChatKit)

    └── billing-management.spec.ts- Implement advanced search

```- Performance optimization

- User experience enhancements

**Structure Decision**: Web application structure chosen due to client-facing portal requirements with both frontend UI and backend API integration needs. Client portal is isolated in apps/ directory to maintain separation from main website while sharing core infrastructure.- Testing and bug fixes



## Phase 0: Research & Technical Decisions**Deliverables**:

- Complete messaging and communication system

### Key Research Areas- Advanced file management with Drive integration

- AI-powered customer support

1. **Whop API Integration Patterns**- Optimized and tested application

   - Decision: Use Whop webhook for real-time billing updates + polling fallback

   - Rationale: Ensures billing data freshness while handling webhook failures## Technical Implementation Details

   - Alternatives: Pure polling (higher latency), pure webhooks (reliability issues)

### Authentication & Authorization

2. **Google Drive File Access Strategy**```typescript

   - Decision: Server-side Drive API with scoped access tokens per client organization// User role definitions

   - Rationale: Maintains security boundaries while enabling seamless file accesstype UserRole = 'client_owner' | 'client_member' | 'aj_ops' | 'aj_admin';

   - Alternatives: Client-side Drive picker (UX friction), direct file uploads (storage costs)

// Firebase custom claims structure

3. **Role-Based Access Control Implementation**interface CustomClaims {

   - Decision: Firebase custom claims + middleware-based route protection  role: UserRole;

   - Rationale: Leverages existing Firebase Admin setup with granular permissions  organizationId: string;

   - Alternatives: Database-only roles (auth complexity), third-party RBAC (additional dependency)  permissions: string[];

}

4. **Real-time Communication Architecture**

   - Decision: Server-sent events for approval notifications + polling for messages// Route protection middleware

   - Rationale: Balance between real-time UX and implementation complexityconst withAuth = (allowedRoles: UserRole[]) => {

   - Alternatives: WebSockets (infrastructure overhead), pure polling (poor UX)  // Implementation for route protection

};

5. **Content Approval Workflow Engine**```

   - Decision: n8n webhook integration with Firestore state management

   - Rationale: Leverages existing automation infrastructure while maintaining portal state### API Architecture

   - Alternatives: Built-in workflow engine (reinventing wheel), external BPM tool (complexity)```typescript

// API route structure

## Phase 1: Data Models & API Contracts/api/

├── auth/

### Core Entities│   ├── login

│   ├── logout

#### User Model│   └── refresh

```typescript├── dashboard/

interface User {│   └── overview

  userId: string;├── projects/

  email: string;│   ├── list

  role: 'client_owner' | 'client_member' | 'aj_ops' | 'aj_admin';│   ├── [id]/details

  organizationId: string;│   └── [id]/files

  permissions: string[];├── billing/

  profile: {│   ├── status

    firstName: string;│   └── history

    lastName: string;└── webhooks/

    avatar?: string;    ├── whop

    timezone: string;    ├── n8n

  };    └── calendar

  metadata: {```

    lastLogin: Date;

    createdAt: Date;### State Management

    updatedAt: Date;- **Local State**: React useState/useReducer for component state

  };- **Server State**: TanStack Query for API data caching

}- **Global State**: Context API for user session and preferences

```- **Form State**: React Hook Form for complex forms



#### Project Model### External Integrations

```typescript

interface Project {#### Whop Integration

  projectId: string;```typescript

  name: string;// Billing status sync

  description: string;interface WhopSubscription {

  status: 'planning' | 'active' | 'review' | 'completed' | 'paused';  id: string;

  clientId: string;  status: 'active' | 'past_due' | 'canceled';

  teamMembers: string[];  currentPeriodEnd: Date;

  milestones: Milestone[];  amount: number;

  timeline: {}

    startDate: Date;```

    endDate: Date;

    estimatedCompletion: Date;#### Google Drive Integration

  };```typescript

  metadata: {// File management

    createdAt: Date;interface DriveFile {

    updatedAt: Date;  id: string;

    lastActivity: Date;  name: string;

  };  mimeType: string;

}  size: number;

```  modifiedTime: Date;

  permissions: DrivePermission[];

#### Approval Model}

```typescript```

interface Approval {

  approvalId: string;#### n8n Webhook Handlers

  projectId: string;```typescript

  contentType: 'design' | 'copy' | 'video' | 'audio' | 'strategy';// Automation triggers

  title: string;interface N8nWebhook {

  description: string;  trigger: 'project_milestone' | 'approval_needed' | 'payment_overdue';

  status: 'pending' | 'approved' | 'rejected' | 'revision_requested';  data: Record<string, any>;

  submittedBy: string;  timestamp: Date;

  assignedTo: string[];}

  content: {```

    previewUrl?: string;

    fileUrls: string[];## Security Considerations

    notes: string;

  };### Data Protection

  feedback: ApprovalFeedback[];- Implement proper input validation and sanitization

  timeline: {- Use HTTPS everywhere with HSTS headers

    submittedDate: Date;- Implement rate limiting on all API endpoints

    reviewedDate?: Date;- Add CSRF protection for state-changing operations

    dueDate: Date;- Encrypt sensitive data at rest

  };- Implement proper session management

}

```### Access Control

- Role-based permissions with least privilege principle

#### Billing Model- Organization-level data isolation

```typescript- Audit logging for all sensitive operations

interface Billing {- Secure file upload with type validation

  billingId: string;- API key management for external integrations

  clientId: string;

  whopSubscriptionId: string;### Privacy Compliance

  subscriptionStatus: 'active' | 'past_due' | 'canceled' | 'paused';- Exclude portal from search engine indexing

  plan: {- Implement data retention policies

    name: string;- Add user data export functionality

    amount: number;- Provide clear privacy policy and terms

    currency: string;- Enable user account deletion

    interval: 'monthly' | 'annual';

  };## Testing Strategy

  payment: {

    nextBillingDate: Date;### Unit Testing

    lastPaymentDate?: Date;- Jest + React Testing Library for component tests

    paymentMethod: string;- API route testing with supertest

    invoiceUrl?: string;- Authentication flow testing

  };- Form validation testing

  metadata: {- Utility function testing

    syncedAt: Date;

    updatedAt: Date;### Integration Testing

  };- End-to-end testing with Playwright

}- API integration testing

```- Authentication flow testing

- Payment integration testing

### API Endpoints- File upload/download testing



#### Authentication & Session Management### Performance Testing

- `POST /api/auth/login` - Email/password authentication- Lighthouse performance audits

- `POST /api/auth/logout` - Session termination- Load testing for API endpoints

- `GET /api/auth/session` - Current session verification- File upload performance testing

- `GET /api/auth/me` - Current user profile- Real-time messaging performance

- Database query optimization

#### Dashboard & Overview

- `GET /api/dashboard` - Personalized dashboard data (next actions, alerts, metrics)## Deployment Strategy



#### Project Management### Environment Setup

- `GET /api/projects` - List projects for current user/organization- **Development**: Local development with hot reload

- `GET /api/projects/[id]` - Project details with milestones and files- **Staging**: Preview deployments for testing

- `PATCH /api/projects/[id]` - Update project metadata (admin only)- **Production**: Vercel production deployment



#### Billing & Subscription### CI/CD Pipeline

- `GET /api/billing` - Current billing status and payment history```yaml

- `POST /api/billing/sync` - Force sync with Whop (admin only)# GitHub Actions workflow

- Build and test on PR

#### Content Approvals- Deploy preview on feature branches

- `GET /api/approvals` - List pending/recent approvals- Deploy to production on main branch merge

- `GET /api/approvals/[id]` - Approval details with content preview- Run security scans and performance tests

- `POST /api/approvals/[id]/action` - Submit approval decision (approve/reject/request changes)- Automated database migrations

```

#### Communication

- `GET /api/messages` - List conversation threads### Monitoring & Analytics

- `GET /api/messages/[threadId]` - Messages in thread- Vercel Analytics for performance monitoring

- `POST /api/messages/[threadId]` - Send message to thread- Firebase Analytics for user behavior

- Error tracking with Sentry

#### File Management- Uptime monitoring with status page

- `GET /api/files` - List accessible files from Google Drive- Log aggregation and analysis

- `POST /api/files/upload` - Upload file to project folder

- `GET /api/files/[id]/download` - Secure file download## Risk Mitigation



#### Calendar & Bookings### Technical Risks

- `GET /api/bookings` - Upcoming appointments from Google Calendar- **API Rate Limits**: Implement caching and rate limiting

- `GET /api/bookings/embed` - Cal.com/Calendly embed configuration- **File Upload Limits**: Use chunked uploads for large files

- **Real-time Messaging**: Fallback to polling if WebSocket fails

### Webhook Endpoints- **Third-party Dependencies**: Monitor for security vulnerabilities

- **Performance**: Implement lazy loading and code splitting

#### External Integration Webhooks

- `POST /api/webhooks/whop` - Billing and subscription updates from Whop### Business Risks

- `POST /api/webhooks/n8n/projects` - Project milestone updates from n8n- **User Adoption**: Comprehensive onboarding and training

- `POST /api/webhooks/n8n/approvals` - Approval workflow notifications from n8n- **Data Migration**: Careful planning for existing client data

- `POST /api/webhooks/gbu` - Contract status updates from GBU system- **Integration Failures**: Robust error handling and fallbacks

- `POST /api/webhooks/calendar` - Calendar booking confirmations- **Security Breaches**: Regular security audits and penetration testing

- **Scalability**: Design for growth from the beginning

## Phase 2: Implementation Roadmap

## Success Metrics & KPIs

### Sprint 1: Foundation & Authentication (Week 1-2)

- Set up client portal app structure in apps/client-portal/### Technical Metrics

- Implement Firebase Authentication with role-based access- Page load time < 2 seconds

- Create user session management and middleware- API response time < 500ms

- Build basic layout components and navigation- 99.9% uptime

- Set up API route structure with authentication guards- Zero critical security vulnerabilities

- < 1% error rate

### Sprint 2: Dashboard & Project Overview (Week 3-4)

- Implement dashboard with next actions and billing alerts### Business Metrics

- Create project listing and detail pages- User adoption rate > 80%

- Build milestone tracking components- Daily active users growth

- Integrate with Google Calendar for upcoming bookings- Reduced support ticket volume

- Add responsive design for mobile access- Faster project approval cycles

- Improved client satisfaction scores

### Sprint 3: Billing Integration (Week 5)

- Integrate Whop API for billing data synchronization## Post-Launch Roadmap

- Implement billing overview page with payment history

- Create billing alert system for overdue accounts### Month 1-2: Stabilization

- Set up Whop webhook handler for real-time updates- Monitor performance and fix critical issues

- Add billing status indicators throughout portal- Gather user feedback and implement quick wins

- Optimize based on real usage patterns

### Sprint 4: Content Approval System (Week 6-7)- Add missing integrations based on user needs

- Build approval queue and detail pages

- Implement approval action system (approve/reject/comment)### Month 3-6: Enhancement

- Create content preview components for different media types- Advanced analytics and reporting

- Integrate with n8n for approval workflow automation- Mobile application development

- Set up Slack notifications for approval status changes- Additional third-party integrations

- Workflow automation enhancements

### Sprint 5: Communication & Files (Week 8)- Advanced AI features

- Implement threaded messaging system

- Integrate Google Drive for file access and management### Month 6+: Scale

- Create file upload and organization features- Multi-tenant architecture for white-labeling

- Add file preview and download functionality- Advanced customization options

- Build project-based file organization- Enterprise features and compliance

- API for third-party developers

### Sprint 6: Testing & Polish (Week 9-10)- International expansion support
- Comprehensive testing of all user scenarios
- Performance optimization and security review
- Integration testing with all external services
- User acceptance testing with select clients
- Documentation and training material creation

### Deployment Strategy
- Staging environment for client preview and feedback
- Progressive rollout to client segments
- Monitoring and analytics setup
- Backup and disaster recovery procedures
- Support documentation and troubleshooting guides

## Risk Mitigation

### Technical Risks
- **External API Dependencies**: Implement circuit breakers and fallback mechanisms for Whop, Google APIs
- **Authentication Complexity**: Comprehensive role-based testing and session management audit
- **Real-time Features**: Graceful degradation when webhooks fail, polling fallbacks

### Business Risks  
- **User Adoption**: Phased rollout with training and support during transition
- **Data Migration**: Careful migration planning from existing project management tools
- **Performance at Scale**: Load testing and monitoring setup before full deployment

## Success Metrics Tracking

### Technical Metrics
- Page load times < 2 seconds (tracked via Vercel Analytics)
- API response times < 500ms (tracked via application monitoring)
- 99.9% uptime target (tracked via uptime monitoring)
- Zero authentication security incidents

### Business Metrics
- 90% user adoption within 3 months of launch
- 50% reduction in content approval cycle time
- 60% reduction in billing-related support tickets
- 4.5/5.0 client satisfaction score for project transparency

### Monitoring Implementation
- Vercel Analytics for performance tracking
- Firebase Analytics for user behavior
- Custom metrics dashboard for business KPIs
- Weekly reports on adoption and performance metrics

## Features-to-Implementation Mapping

### User Story 1: Client Authentication and Role-Based Access
**Pages**: `apps/client-portal/pages/login.tsx`
**API Routes**: `/api/auth/login`, `/api/auth/session`, `/api/auth/logout`
**Components**: `LoginForm.tsx`, `RoleGuard.tsx`, `SessionProvider.tsx`
**Services**: `UserService.ts`, Authentication middleware
**Models**: User, Organization (with role-based permissions)

### User Story 2: Dashboard Overview with Actionable Insights
**Pages**: `apps/client-portal/pages/index.tsx` (Dashboard)
**API Routes**: `/api/dashboard`
**Components**: `NextActions.tsx`, `BillingAlert.tsx`, `UpcomingBookings.tsx`
**Services**: `ProjectService.ts`, `BillingService.ts`
**Models**: Project, Billing, Booking aggregations

### User Story 3: Project Management and Progress Tracking
**Pages**: `apps/client-portal/pages/projects/index.tsx`, `[id].tsx`
**API Routes**: `/api/projects`, `/api/projects/[id]`
**Components**: `ProjectCard.tsx`, `MilestoneTracker.tsx`, `ProgressIndicator.tsx`
**Services**: `ProjectService.ts`
**Models**: Project, Milestone

### User Story 4: Billing and Payment Management
**Pages**: `apps/client-portal/pages/billing/index.tsx`
**API Routes**: `/api/billing`, `/api/webhooks/whop`
**Components**: `BillingAlert.tsx`, billing overview components
**Services**: `BillingService.ts`
**Models**: Billing, Organization subscription data

### User Story 5: Content Approval Workflow
**Pages**: `apps/client-portal/pages/approvals/index.tsx`, `[id].tsx`
**API Routes**: `/api/approvals`, `/api/approvals/[id]`, `/api/approvals/[id]/action`
**Components**: `ApprovalCard.tsx`, `ContentViewer.tsx`, `ApprovalActions.tsx`
**Services**: `ApprovalService.ts`, n8n integration
**Models**: Approval, ApprovalFeedback

### User Story 6: Appointment Scheduling and Calendar Integration
**Pages**: `apps/client-portal/pages/bookings/index.tsx`
**API Routes**: `/api/bookings`, `/api/bookings/embed`
**Components**: Calendar embed components, upcoming bookings widgets
**Services**: Google Calendar integration, Cal.com/Calendly embed
**Models**: Booking

### User Story 7: File and Asset Management
**Pages**: `apps/client-portal/pages/files/index.tsx`
**API Routes**: `/api/files`, `/api/files/upload`, `/api/files/[id]/download`
**Components**: File browser, upload components, preview components
**Services**: `FileService.ts`, Google Drive integration
**Models**: File, FilePermissions

### User Story 8: Messaging and Communication
**Pages**: `apps/client-portal/pages/messages/index.tsx`
**API Routes**: `/api/messages`, `/api/messages/[threadId]`
**Components**: Message threads, conversation components
**Services**: `MessageService.ts`
**Models**: Message, MessageThread

This comprehensive implementation plan provides concrete mapping from user stories to technical implementation, ensuring all requirements from the specification are addressed with specific components, services, and data models.