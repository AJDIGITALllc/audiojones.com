# Audio Jones Platform Architecture

> **Technical Architecture Documentation** for the Audio Jones / AJ DIGITAL LLC web application platform.

---

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Core Components](#core-components)
- [Data Architecture](#data-architecture)
- [Authentication & Authorization](#authentication--authorization)
- [API Design](#api-design)
- [Blog Automation Pipeline](#blog-automation-pipeline)
- [Security Architecture](#security-architecture)
- [Performance & Optimization](#performance--optimization)
- [Deployment Architecture](#deployment-architecture)
- [Scalability Considerations](#scalability-considerations)
- [Monitoring & Observability](#monitoring--observability)

---

## Overview

The Audio Jones platform is a **production-grade, full-stack web application** built on modern serverless architecture principles. It combines a public-facing marketing website with a sophisticated admin portal and AI-powered content automation system.

### Design Principles

1. **Security-First** — Multi-layer authentication and authorization
2. **Serverless Architecture** — Leverages Vercel Edge, Firebase, and Google Cloud
3. **Type Safety** — Full TypeScript implementation across client and server
4. **API-Driven** — RESTful APIs with clear separation of concerns
5. **AI-Powered** — Automated content generation with brand voice validation
6. **Scalable** — Built to handle growth from day one

---

## System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                               │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │
│  │   Browser    │  │   Mobile     │  │   Webhook    │                │
│  │   (React)    │  │   (Future)   │  │   Clients    │                │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘                │
│         │                  │                  │                         │
└─────────┼──────────────────┼──────────────────┼─────────────────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          VERCEL EDGE LAYER                              │
│                                                                         │
│  ┌────────────────────────────────────────────────────────────┐       │
│  │                      middleware.ts                         │       │
│  │                                                             │       │
│  │  • Authentication Guard                                    │       │
│  │  • Cookie/Token Validation                                 │       │
│  │  • Redirect Logic (UI) / 401 (API)                        │       │
│  │  • Admin Routes: /admin/*, /api/admin/*                   │       │
│  └────────────────────────────────────────────────────────────┘       │
│                                                                         │
└─────────────────────────────┬───────────────────────────────────────────┘
                              │
                    ┌─────────┴──────────┐
                    │                    │
          ┌─────────▼────────┐   ┌──────▼────────────┐
          │   Next.js App    │   │   API Routes      │
          │   (App Router)   │   │   (28 Endpoints)  │
          │                  │   │                   │
          │  • SSR Pages     │   │  • Admin APIs     │
          │  • Client Comps  │   │  • Blog APIs      │
          │  • Server Comps  │   │  • Payment APIs   │
          │  • Server Actions│   │  • Integration    │
          └─────────┬────────┘   └──────┬────────────┘
                    │                   │
                    └─────────┬─────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────────────┐
│                        APPLICATION LAYER                                │
│                                                                         │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐    │
│  │   /lib/server    │  │   /lib/client    │  │  /lib/automation │    │
│  │                  │  │                  │  │                  │    │
│  │ • firebaseAdmin  │  │ • useAuth hook   │  │ • blog-generator │    │
│  │ • n8n client     │  │ • fetchJson      │  │ • perplexity     │    │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘    │
│                                                                         │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐    │
│  │   /lib/models    │  │   /components    │  │     /hooks       │    │
│  │                  │  │                  │  │                  │    │
│  │ • blog types     │  │ • React UI       │  │ • useAuth        │    │
│  │ • validation     │  │ • Home sections  │  │ • custom hooks   │    │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────────────┐
│                         DATA & SERVICES LAYER                           │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────┐     │
│  │                  FIREBASE / GOOGLE CLOUD                      │     │
│  │                                                               │     │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐  │     │
│  │  │  Firebase  │  │ Firestore  │  │  Firebase Data       │  │     │
│  │  │  Auth      │  │  (NoSQL)   │  │  Connect (GraphQL)   │  │     │
│  │  └────────────┘  └────────────┘  └──────────────────────┘  │     │
│  │                                                               │     │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐  │     │
│  │  │  Cloud SQL │  │  Storage   │  │  Cloud Functions     │  │     │
│  │  │ (Postgres) │  │            │  │  (Webhooks)          │  │     │
│  │  └────────────┘  └────────────┘  └──────────────────────┘  │     │
│  └──────────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘
          │               │               │               │
          │               │               │               │
┌─────────▼──────┐  ┌────▼─────┐  ┌─────▼──────┐  ┌────▼──────────┐
│   AI Services  │  │ Payment  │  │  Media CDN │  │  Integration  │
│                │  │          │  │            │  │   Services    │
│ • OpenAI GPT-4 │  │ • Stripe │  │ • ImageKit │  │ • MailerLite  │
│ • Perplexity   │  │          │  │            │  │ • Cal.com     │
│                │  │          │  │            │  │ • Whop        │
│                │  │          │  │            │  │ • N8N         │
└────────────────┘  └──────────┘  └────────────┘  └───────────────┘
```

---

## Technology Stack

### Frontend Layer

**Framework & UI**
- **Next.js 16.0** — React framework with App Router for SSR/SSG
- **React 19.2** — Component-based UI library
- **TypeScript 5** — Type-safe JavaScript
- **Tailwind CSS 4** — Utility-first CSS framework
- **Lucide React** — Icon library

**State Management**
- React Context API (for auth state)
- Server State via Next.js Server Components
- Client State via React hooks

### Backend Layer

**Server Runtime**
- **Next.js API Routes** — Serverless functions on Vercel Edge
- **Firebase Cloud Functions** — Event-driven serverless compute

**Authentication & Authorization**
- **Firebase Authentication** — User identity management
- **Firebase Admin SDK** — Server-side auth verification
- **Custom Claims** — Role-based access control

**Database & Storage**
- **Cloud Firestore** — NoSQL document database (real-time)
- **Firebase Data Connect** — GraphQL layer for PostgreSQL
- **Google Cloud SQL** — Managed PostgreSQL instance
- **Firebase Storage** — Object storage for media

### AI & Automation Layer

**AI Services**
- **OpenAI GPT-4** — Content generation with Audio Jones voice
- **Perplexity API** — Web-connected research AI

**Automation**
- **N8N** — No-code workflow automation platform

### Integration Layer

**Payment Processing**
- **Stripe** — Payment gateway, subscriptions, customer portal
- **Whop** — Membership and community monetization

**Email & Marketing**
- **MailerLite** — Email marketing and newsletters
- **Substack** — Content syndication

**Media & Assets**
- **ImageKit** — Image optimization, transformation, and CDN
- **Sharp** — Server-side image processing

**Booking & Calendar**
- **Cal.com** — Open-source scheduling platform

### Deployment & DevOps

**Hosting**
- **Vercel** — Primary hosting with Edge Network
- **Firebase Hosting** — Alternative deployment target

**CI/CD**
- Git-based deployment (auto-deploy on push)
- Environment variable management via Vercel/Firebase

**Monitoring** (Recommended)
- Vercel Analytics
- Firebase Performance Monitoring
- Sentry for error tracking

---

## Core Components

### 1. Next.js App Router Structure

```
/src/app
├── /(site)              # Route group for public pages
│   ├── page.tsx         # Homepage (/)
│   ├── services/        # Services page
│   ├── blog/            # Blog listing and posts
│   ├── book/            # Booking page
│   └── about/           # About page
├── /admin               # Admin portal (protected)
│   ├── layout.tsx       # Admin layout with auth check
│   ├── page.tsx         # Admin dashboard
│   ├── users/           # User management
│   └── blog/            # Blog management
├── /portal              # User portal (authenticated)
│   ├── layout.tsx       # Portal layout with auth
│   ├── dashboard/       # User dashboard
│   ├── billing/         # Billing management
│   └── projects/        # User projects
└── /api                 # API routes (28 endpoints)
    ├── /admin           # Admin APIs
    ├── /blog            # Blog automation APIs
    ├── /stripe          # Payment APIs
    ├── /whop            # Whop integration
    ├── /contracts       # Contract management
    └── /newsletter      # Newsletter subscriptions
```

### 2. Component Architecture

**Component Categories**

1. **Layout Components** — `Header.tsx`, `Footer.tsx`, `GlobalDisclaimer.tsx`
2. **Page Components** — Homepage sections, blog pages, portal pages
3. **UI Components** — Reusable UI elements (`IKImage`, `Toast`, `AuthWidget`)
4. **Form Components** — `AuthForm`, `NewsletterForm`
5. **Admin Components** — Blog management, user management, dashboards
6. **Blog Components** — `BlogHero`, `BlogContent`, `FAQBlock`, `AuthorCard`

**Component Design Patterns**

- **Server Components by Default** — Use Client Components only when needed
- **Props Interface** — TypeScript interfaces for all props
- **Composition** — Favor composition over inheritance
- **Separation of Concerns** — Logic in hooks/utils, presentation in components

### 3. Library Structure

```
/src/lib
├── /automation          # AI-powered automation
│   ├── blog-generator.ts   # Blog generation pipeline
│   └── perplexity.ts       # Research API client
├── /models              # Data models and types
│   └── blog.ts             # Blog types, validation, utilities
├── /server              # Server-side utilities
│   ├── firebaseAdmin.ts    # Firebase Admin SDK singleton
│   └── n8n.ts              # N8N automation client
├── /client              # Client-side utilities
│   ├── useRequireAuth.ts   # Auth enforcement hook
│   ├── useApi.ts           # API request hook
│   └── fetchJson.ts        # JSON fetch utility
├── /firebase            # Firebase client SDK
│   └── client.ts           # Firebase client initialization
└── imagekit.ts          # ImageKit configuration and routing
```

---

## Data Architecture

### Database Strategy

**Hybrid Approach: Firestore + PostgreSQL**

1. **Firestore (NoSQL)** — Real-time data, user sessions, payments, bookings
2. **PostgreSQL (via Data Connect)** — Structured blog data, analytics, complex queries

### Firestore Collections

```typescript
/users/{uid}
  - email: string
  - displayName: string
  - createdAt: Timestamp
  - customClaims: {admin: boolean, role: string}

/payments/{paymentId}
  - userId: string
  - amount: number
  - status: string
  - stripePaymentId: string
  - createdAt: Timestamp

/subscriptions/{subscriptionId}
  - userId: string
  - plan: string
  - status: string
  - stripeSubscriptionId: string
  - currentPeriodEnd: Timestamp

/bookings/{bookingId}
  - userId: string
  - calcomEventId: string
  - scheduledDate: Timestamp
  - status: string
```

### PostgreSQL Schema (Data Connect)

```graphql
type User @table {
  uid: String! @primaryKey
  email: String!
  createdAt: Timestamp!
}

type TopicalMap @table {
  id: UUID! @primaryKey
  pillar: PillarType!
  topic: String!
  persona: PersonaType!
  intent: String!
  sourceUrls: [String]
  priority: Int!
  active: Boolean!
  lastGenerated: Timestamp
  createdAt: Timestamp!
  updatedAt: Timestamp!
}

type BlogDraft @table {
  id: UUID! @primaryKey
  pillar: PillarType!
  source: BlogSource!
  status: BlogStatus!
  title: String!
  slug: String! @unique
  content: String!  # Markdown
  seoTitle: String
  seoDescription: String
  seoKeywords: [String]
  ogImage: String
  faqs: String  # JSON string
  keyTakeaways: [String]
  structuredData: String  # JSON string
  ctaType: CTAType!
  ctaHeadline: String!
  ctaDescription: String!
  ctaLink: String!
  researchPayload: String  # Perplexity JSON
  frameworkUsed: FrameworkType
  readingTime: Int!
  createdAt: Timestamp!
  updatedAt: Timestamp!
  scheduledFor: Timestamp
  publishedAt: Timestamp
}

type BlogVariant @table {
  id: UUID! @primaryKey
  draftId: UUID! @foreignKey(references: BlogDraft)
  variantType: VariantType!
  originalValue: String!
  variantValue: String!
  testPercentage: Int!
  performanceData: String  # JSON string
  active: Boolean!
  createdAt: Timestamp!
  updatedAt: Timestamp!
}

type ContentPerformance @table {
  id: UUID! @primaryKey
  draftId: UUID! @foreignKey(references: BlogDraft)
  slug: String! @unique
  pillar: PillarType!
  views: Int!
  engagementTime: Int!  # seconds
  conversions: Int!
  socialShares: Int!
  searchImpressions: Int!
  bounceRate: Float!
  performanceScore: Float!
  lastUpdated: Timestamp!
}

type ContentSchedule @table {
  id: UUID! @primaryKey
  draftId: UUID! @foreignKey(references: BlogDraft)
  scheduledFor: Timestamp!
  status: ScheduleStatus!
  distributionChannels: [String]
  retryCount: Int!
  lastAttempt: Timestamp
  errorMessage: String
  createdAt: Timestamp!
  updatedAt: Timestamp!
}
```

### Data Models (TypeScript)

Located in `src/lib/models/blog.ts`:

- **TypeScript Enums**: `PillarType`, `BlogStatus`, `BlogSource`, `CTAType`, etc.
- **Interfaces**: `BlogDraft`, `BlogVariant`, `ContentPerformance`, `ContentSchedule`, `TopicalMap`
- **Validation Functions**: `validateBlogDraft()`, `validateBrandVoice()`
- **Utility Functions**: `calculateReadingTime()`, `generateSlug()`, `calculatePerformanceScore()`

---

## Authentication & Authorization

### Three-Layer Security Architecture

```
┌──────────────────────────────────────────────────────────┐
│  LAYER 1: Edge Middleware (middleware.ts)               │
│  • Runs on Vercel Edge Network                          │
│  • Checks for idToken cookie or Bearer header           │
│  • Fast redirect/401 for missing credentials            │
│  • Protects: /admin/* and /api/admin/*                  │
└────────────────┬─────────────────────────────────────────┘
                 │ (if auth present, pass through)
┌────────────────▼─────────────────────────────────────────┐
│  LAYER 2: Server Layout (AdminLayout)                   │
│  • Server-side component in /admin/layout.tsx           │
│  • Verifies session cookie with Firebase Admin SDK      │
│  • Checks custom claims (admin: true)                   │
│  • Redirects to /not-authorized if not admin            │
└────────────────┬─────────────────────────────────────────┘
                 │ (if admin, render protected pages)
┌────────────────▼─────────────────────────────────────────┐
│  LAYER 3: API Route Guards                              │
│  • Each API route requires Bearer token                 │
│  • Calls adminAuth().verifyIdToken(token, true)         │
│  • Checks custom claims (admin: true for admin APIs)    │
│  • Returns 401 for invalid token, 403 for missing claim │
└──────────────────────────────────────────────────────────┘
```

### Authentication Flow

**Client-Side Authentication**

```typescript
// 1. User logs in via AuthForm component
import { signInWithEmailAndPassword } from 'firebase/auth';
const userCredential = await signInWithEmailAndPassword(auth, email, password);

// 2. Get ID token
const idToken = await userCredential.user.getIdToken();

// 3. Store in cookie (via AuthForm or API call)
document.cookie = `idToken=${idToken}; path=/; secure; samesite=strict`;

// 4. Use useAuth hook to track state
const { user, loading } = useAuth();
```

**Server-Side Verification**

```typescript
// In API routes or server components
import { adminAuth } from '@/lib/server/firebaseAdmin';

// Extract token from Authorization header
const authHeader = req.headers.get('authorization');
const token = authHeader?.replace('Bearer ', '');

// Verify token (checks signature and revocation)
const decodedToken = await adminAuth().verifyIdToken(token, true);

// Check custom claims
if (decodedToken.admin) {
  // User has admin access
}
```

### Custom Claims Management

**Setting Admin Claims**

```bash
# Via Admin API
curl -X PATCH https://audiojones.com/api/admin/users/USER_UID/admin \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"admin": true}'
```

**Via Firebase Admin SDK**

```typescript
await adminAuth().setCustomUserClaims(uid, { admin: true, role: 'super-admin' });
```

---

## API Design

### RESTful API Principles

1. **Resource-Based URLs** — `/api/blog/draft`, `/api/admin/users`
2. **HTTP Verbs** — GET (read), POST (create), PUT (update), DELETE (delete)
3. **Status Codes** — 200 (success), 201 (created), 400 (bad request), 401 (unauthorized), 403 (forbidden), 500 (server error)
4. **JSON Responses** — Consistent response format

### Standard Response Format

```typescript
// Success Response
{
  "success": true,
  "data": {
    // Response payload
  }
}

// Error Response
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details" // Optional
}
```

### API Categories

**1. Admin Management APIs** — `/api/admin/*`
- User management (list, lookup, set claims)
- Dashboard statistics
- System health checks

**2. Blog Automation APIs** — `/api/blog/*`
- Draft CRUD operations
- Publishing pipeline
- Performance tracking

**3. Payment APIs** — `/api/stripe/*`
- Checkout session creation
- Customer portal access
- Webhook handling (via Cloud Functions)

**4. Integration APIs**
- Whop (`/api/whop/*`)
- MailerLite (`/api/newsletter/*`)
- N8N (`/api/n8n/*`)
- Cal.com (webhook handler)

**5. Media APIs** — `/api/imagekit-*`
- Authentication token generation
- File listing

**6. Contract APIs** — `/api/contracts/*`
- PDF generation
- Digital signatures
- Verification

### API Authentication Requirements

| API Category | Auth Required | Admin Required |
|-------------|---------------|----------------|
| `/api/admin/*` | ✅ Bearer Token | ✅ admin: true |
| `/api/blog/*` | ✅ Bearer Token | ✅ admin: true |
| `/api/stripe/checkout` | ✅ Bearer Token | ❌ |
| `/api/stripe/portal` | ✅ Bearer Token | ❌ |
| `/api/whop/products` | ✅ Bearer Token | ❌ |
| `/api/whop/customers` | ✅ Bearer Token | ✅ admin: true |
| `/api/newsletter/subscribe` | ❌ Public | ❌ |
| `/api/content/track` | ❌ Public | ❌ |
| `/api/n8n/execute` | ✅ Bearer Token | ❌ |
| `/api/imagekit-auth` | ✅ Bearer Token | ❌ |
| `/api/contracts/*` | ✅ Bearer Token | ❌ |

---

## Blog Automation Pipeline

### End-to-End Flow

```
┌──────────────────────────────────────────────────────────────────┐
│  STEP 1: Admin Initiates Draft Generation                       │
│  POST /api/blog/draft                                            │
│  Body: { pillar, topic, persona, intent, ctaType, framework }   │
└────────────────────┬─────────────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────────────┐
│  STEP 2: Research Phase (Perplexity API)                        │
│  • perplexityClient.research(context)                           │
│  • Model: llama-3.1-sonar-huge-128k-online                      │
│  • Web-connected search with citations                          │
│  • Structured prompt for Audio Jones context                    │
│  • Returns: summary, keyPoints, trends, insights, stats         │
└────────────────────┬─────────────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────────────┐
│  STEP 3: Content Generation (OpenAI GPT-4)                      │
│  • blogGenerator.generateContentWithVoice()                     │
│  • System Prompt: Audio Jones Voice Guard                       │
│  • User Prompt: Research data + AEO partial + requirements      │
│  • Model: gpt-4, temperature: 0.7                               │
│  • Returns: JSON with title, content, SEO, FAQs, CTA           │
└────────────────────┬─────────────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────────────┐
│  STEP 4: Brand Voice Validation                                 │
│  • validateBrandVoice(content)                                  │
│  • Check required patterns (Audio Jones mention)                │
│  • Check encouraged patterns (frameworks, operator voice)       │
│  • Check discouraged patterns (buzzwords, generic language)     │
│  • Returns: { isValid, feedback }                               │
└────────────────────┬─────────────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────────────┐
│  STEP 5: AEO Score Calculation                                  │
│  • calculateAEOScore(content)                                   │
│  • 100-point scale across 8 dimensions                          │
│  • Title (15), Meta (10), Keywords (10), Structure (20),       │
│    FAQs (15), Takeaways (10), Structured Data (10), Length (10)│
└────────────────────┬─────────────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────────────┐
│  STEP 6: Draft Validation                                       │
│  • validateBlogDraft(draft)                                     │
│  • Check required fields (title, slug, content, pillar, CTA)    │
│  • Returns: { isValid, errors[] }                               │
└────────────────────┬─────────────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────────────┐
│  STEP 7: Save to Database                                       │
│  • TODO: Save to Data Connect (PostgreSQL)                      │
│  • Currently: Return draft object with mock ID                  │
│  • Status: 'needs_review'                                       │
└────────────────────┬─────────────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────────────┐
│  STEP 8: Admin Review (Manual Step)                            │
│  • Admin reviews draft in admin portal                          │
│  • Makes edits if needed                                        │
│  • Changes status to 'approved'                                 │
└────────────────────┬─────────────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────────────┐
│  STEP 9: Publishing (POST /api/blog/publish)                   │
│  • Changes status to 'published'                                │
│  • Sets publishedAt timestamp                                   │
│  • Triggers distribution to channels (future)                   │
└────────────────────┬─────────────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────────────┐
│  STEP 10: Performance Tracking (POST /api/content/track)       │
│  • Track views, engagement, conversions, shares                 │
│  • Calculate performance score                                  │
│  • Update ContentPerformance table                              │
└──────────────────────────────────────────────────────────────────┘
```

### Audio Jones Voice Guard

**System Prompt Enforcement**

```
REQUIRED VOICE CHARACTERISTICS:
✅ Operator perspective (practical, results-focused)
✅ Miami-forward attitude (confident, ambitious)
✅ Framework-driven approach (EPM, ASI, PR, AOF)
✅ Predictable growth focus
✅ Automation emphasis
✅ Data-driven insights

FORBIDDEN LANGUAGE:
❌ "We believe" or "We think"
❌ "Cutting-edge" or "Revolutionary"
❌ "Game-changing" or generic superlatives
❌ Theoretical concepts without practical application
❌ Generic marketing speak
```

### AEO (AI Engine Optimization) Strategy

**Optimization for AI Search Engines**

1. **Structured Data** — Schema.org Article markup
2. **FAQ Sections** — Direct answers to common questions
3. **Key Takeaways** — Bulleted summaries at the top
4. **Semantic Headings** — H2/H3 hierarchy for content structure
5. **Lists & Tables** — Easy-to-parse information
6. **Citations & Sources** — Credibility signals
7. **Content Depth** — 1500-2500 words optimal

---

## Security Architecture

### Security Layers

**1. Network Security**
- HTTPS enforced (SSL/TLS)
- Vercel Edge Network DDoS protection
- Firebase security rules for database/storage

**2. Authentication Security**
- Firebase Authentication (industry-standard)
- ID token verification with revocation checking
- Session cookie validation
- Password hashing (handled by Firebase)

**3. Authorization Security**
- Custom claims for role-based access
- Three-layer authorization (Edge → Server → API)
- Principle of least privilege

**4. Data Security**
- Environment variables for secrets (never in code)
- Firebase Admin private key protection
- API keys rotated regularly
- Webhook signature verification (Stripe, Whop, Cal.com)

**5. Input Validation**
- TypeScript type checking
- Validation functions for user input
- SQL injection protection (via Data Connect/ORM)
- XSS protection (React escaping)

### Firebase Security Rules

**Firestore Rules**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Only admins can read all users
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.token.admin == true;
    }

    // Payments: users can read their own, admins can read all
    match /payments/{paymentId} {
      allow read: if request.auth != null &&
        (resource.data.userId == request.auth.uid || request.auth.token.admin == true);
      allow write: if false; // Only via backend
    }

    // Subscriptions: same as payments
    match /subscriptions/{subscriptionId} {
      allow read: if request.auth != null &&
        (resource.data.userId == request.auth.uid || request.auth.token.admin == true);
      allow write: if false; // Only via backend
    }
  }
}
```

**Storage Rules**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User uploads: own folder only
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Public assets: read-only
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

---

## Performance & Optimization

### Caching Strategy

**Edge Caching (via next.config.ts)**

```typescript
async headers() {
  return [
    // No cache for dynamic pages
    { source: "/(.*)", headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }] },

    // Immutable cache for static assets (1 year)
    { source: "/_next/static/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    { source: "/assets/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
  ];
}
```

**API Response Caching**

- Admin APIs: `Cache-Control: no-store` (sensitive data)
- Public APIs: `Cache-Control: public, max-age=3600` (1 hour)
- Static content: `Cache-Control: public, max-age=31536000, immutable`

### Image Optimization

**ImageKit Integration**

```typescript
// Smart routing: dev vs. production
const isDev = process.env.NODE_ENV === 'development';
const imageSource = isDev
  ? `/public/assets/${path}`
  : `https://ik.imagekit.io/audiojones/${path}`;
```

**Features**
- Automatic WebP conversion
- Responsive image sizes
- Lazy loading
- CDN distribution

### Code Splitting

- **Route-based splitting** — Automatic via Next.js App Router
- **Component lazy loading** — `React.lazy()` for heavy components
- **Dynamic imports** — `import()` for conditional features

### Database Optimization

**Firestore**
- Indexed queries for common lookups
- Pagination for large datasets
- Real-time listeners only where needed

**PostgreSQL (Data Connect)**
- Indexed columns: `slug`, `pillar`, `status`
- Foreign key constraints for referential integrity
- GraphQL query optimization

---

## Deployment Architecture

### Vercel Deployment (Primary)

```
┌─────────────────────────────────────────────────────────┐
│  GitHub Repository                                      │
│  • Push to main branch                                  │
│  • Automatic trigger on commit                          │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│  Vercel Build Process                                   │
│  • Install dependencies (npm install)                   │
│  • Run TypeScript compiler                              │
│  • Build Next.js app (npm run build)                    │
│  • Optimize assets and create bundles                   │
│  • Generate serverless functions for API routes         │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│  Vercel Edge Network Deployment                         │
│  • Deploy to global CDN (188+ edge locations)           │
│  • Edge middleware for auth                             │
│  • Serverless functions in optimal regions              │
│  • Static assets cached at edge                         │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│  Production Environment                                 │
│  • Custom domain: audiojones.com                        │
│  • SSL certificate (automatic)                          │
│  • Environment variables from Vercel dashboard          │
│  • Analytics and monitoring enabled                     │
└──────────────────────────────────────────────────────────┘
```

### Firebase Deployment (Alternative)

```bash
# Deploy Firebase components
firebase deploy --only hosting        # Static hosting
firebase deploy --only functions      # Cloud Functions
firebase deploy --only firestore:rules # Security rules
firebase deploy --only storage:rules  # Storage rules
```

### Multi-Region Strategy

**Vercel Edge**
- Global CDN with 188+ edge locations
- Automatic routing to nearest edge node
- Edge middleware runs at edge

**Firebase/Google Cloud**
- Cloud SQL: `us-east4` (primary region)
- Firestore: Multi-region (nam5 - US)
- Storage: Multi-region
- Functions: `us-central1`

---

## Scalability Considerations

### Horizontal Scaling

**Serverless Architecture Benefits**
- Automatic scaling based on traffic
- No server management required
- Pay-per-use pricing model

**Database Scaling**
- Firestore: Automatic scaling
- PostgreSQL: Vertical scaling (increase instance size)
- Connection pooling for database efficiency

### Performance Under Load

**Expected Traffic Capacity**

| Component | Capacity | Bottleneck |
|-----------|----------|-----------|
| Vercel Edge | 100K+ req/sec | Credit limit |
| Next.js SSR | 1K req/sec | Serverless function limits |
| API Routes | 500 req/sec per route | Function concurrency |
| Firestore | 10K writes/sec | Document-level locks |
| PostgreSQL | 500 connections | Connection pool size |

**Optimization Strategies**

1. **Caching** — Reduce database hits with CDN and API caching
2. **Connection Pooling** — Reuse database connections
3. **Background Jobs** — Move heavy tasks to Cloud Functions
4. **Rate Limiting** — Prevent abuse (implement via middleware)
5. **Database Indexes** — Optimize query performance

---

## Monitoring & Observability

### Recommended Monitoring Stack

**Application Monitoring**
- **Vercel Analytics** — Web Vitals, page load times
- **Firebase Performance** — Network requests, trace performance
- **Sentry** — Error tracking and alerts

**Infrastructure Monitoring**
- **Vercel Dashboard** — Function execution, bandwidth, errors
- **Firebase Console** — Database usage, auth activity
- **Google Cloud Console** — Cloud SQL performance, storage usage

**Custom Logging**

```typescript
// Structured logging in API routes
console.log(JSON.stringify({
  level: 'info',
  message: 'Blog draft created',
  draftId: draft.id,
  pillar: draft.pillar,
  timestamp: new Date().toISOString(),
  userId: decodedToken.uid
}));
```

### Key Metrics to Track

**Application Metrics**
- Page load time (P50, P95, P99)
- API response time
- Error rate (4xx, 5xx)
- Conversion rate (booking, subscriptions)

**Business Metrics**
- User registrations
- Blog post performance
- Newsletter subscriptions
- Payment transactions

**Infrastructure Metrics**
- Serverless function invocations
- Database queries per second
- Storage usage
- Bandwidth consumption

---

## Future Architecture Enhancements

### Phase 2 Improvements

1. **GraphQL API** — Replace REST with GraphQL for flexible queries
2. **Real-Time Collaboration** — WebSocket support for multi-user editing
3. **Advanced Caching** — Redis layer for session and API caching
4. **Queue System** — Bull/BullMQ for background job processing
5. **Search** — Algolia or Elasticsearch integration for blog search
6. **CDN Enhancement** — Cloudflare in front of Vercel for DDoS protection

### Microservices Consideration

**When to Consider Microservices**
- Blog automation service (separate scaling)
- Payment processing service (PCI compliance isolation)
- Media processing service (heavy computation)

**Not Recommended Yet**
- Premature optimization
- Current monolith (Next.js) is sufficient for scale
- Serverless architecture provides many microservice benefits

---

## Conclusion

The Audio Jones platform architecture is designed for:

✅ **Security** — Multi-layer authentication and authorization
✅ **Scalability** — Serverless architecture with automatic scaling
✅ **Performance** — Edge caching, CDN, and optimized database queries
✅ **Maintainability** — TypeScript, modular code, clear separation of concerns
✅ **AI-First** — Automated content generation with brand voice validation

This architecture supports current needs and provides a clear path for future growth.

---

**Document Version:** 1.0
**Last Updated:** 2025-01-XX
**Maintained By:** AJ DIGITAL LLC Engineering Team
