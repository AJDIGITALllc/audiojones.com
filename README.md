# Audio Jones / AJ DIGITAL LLC

> **AI-Powered Marketing & Branding Platform** — Production-ready Next.js application for Audio Jones, a Miami-based creative services agency specializing in AI marketing systems, podcast production, and personal branding for creators and entrepreneurs.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.4-orange)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Architecture](#architecture)
- [API Routes](#api-routes)
- [Blog Automation System](#blog-automation-system)
- [Authentication & Authorization](#authentication--authorization)
- [Deployment](#deployment)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Audio Jones** is a full-stack web application that serves dual purposes:

1. **Public Marketing Site** — Homepage, services, blog, testimonials, and booking system
2. **Operational Platform** — Admin portal with AI-powered blog automation, user management, payment processing, and analytics

The platform emphasizes **predictable growth** through **systematic frameworks** (EPM, ASI, PR, AOF) and focuses on the creator economy with a Miami-forward, operator-focused approach.

### What Makes This Special?

- **AI-Powered Blog Automation** — Automated research (Perplexity API) + LLM generation + Audio Jones brand voice validation
- **AEO (AI Engine Optimization)** — Content optimized for AI search engines with structured data
- **5 Strategic Pillars** — Content organized across AI, Marketing, Podcast News, Tech/Business Trends, and Personal Brand
- **Multi-Layer Security** — Edge middleware, server-side verification, and custom claims authorization
- **Payment Integration** — Stripe subscriptions with webhook handling
- **Enterprise-Grade** — Firebase/Google Cloud infrastructure with PostgreSQL via Data Connect

---

## 🚀 Key Features

### 🤖 AI-Powered Blog Automation
- **Perplexity API Integration** — Automated topic research with web access
- **LLM Content Generation** — GPT-4 powered blog creation with Audio Jones voice
- **Brand Voice Validation** — Enforces required/encouraged/discouraged language patterns
- **AEO Scoring** — 100-point optimization score for AI search visibility
- **A/B Testing** — Title, intro, CTA, and hero image variants
- **Performance Analytics** — Weighted scoring across views, engagement, conversions, shares
- **Content Scheduling** — Multi-channel distribution with retry logic

### 🔐 Admin Portal
- **Three-Layer Security** — Edge middleware → Server layout → API guards
- **User Management** — View, search, and manage Firebase Auth users
- **Custom Claims** — Admin role assignment and permissions
- **System Dashboard** — Key metrics and health monitoring
- **Blog Management** — Draft creation, review workflow, publishing pipeline

### 💳 Payment & Monetization
- **Stripe Integration** — Checkout, subscriptions, customer portal
- **Whop Integration** — Community/membership products
- **Webhook Handling** — Automated payment processing
- **Subscription Tracking** — Firestore records with real-time updates

### 📧 Marketing & Email
- **MailerLite Integration** — Newsletter subscription management
- **Substack Syndication** — Content distribution
- **Lead Magnets** — CTA blocks with conversion tracking

### 📅 Booking & Calendar
- **Cal.com Integration** — Automated booking system
- **Webhook Processing** — Event tracking in Firestore

### 📄 Contract Management
- **PDF Generation** — Dynamic contract creation
- **Digital Signatures** — Signing and verification API
- **Link Management** — Shareable contract links

### 🔧 Automation & Workflows
- **N8N Integration** — No-code workflow execution
- **Multi-Service Webhooks** — Stripe, Cal.com, Whop

---

## 🛠 Tech Stack

### Core Framework
- **[Next.js 16.0](https://nextjs.org/)** — React framework with App Router
- **[React 19.2](https://react.dev/)** — UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** — Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first styling

### Backend & Database
- **[Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)** — Server-side Firebase operations
- **[Firebase Authentication](https://firebase.google.com/docs/auth)** — User authentication with custom claims
- **[Cloud Firestore](https://firebase.google.com/docs/firestore)** — NoSQL database
- **[Firebase Data Connect](https://firebase.google.com/docs/data-connect)** — PostgreSQL abstraction layer
- **[Google Cloud SQL](https://cloud.google.com/sql)** — Managed PostgreSQL instance

### AI & Automation
- **[OpenAI GPT-4](https://platform.openai.com/)** — Blog content generation
- **[Perplexity API](https://docs.perplexity.ai/)** — Web-connected research AI

### Payments & Commerce
- **[Stripe](https://stripe.com/)** — Payment processing and subscriptions
- **[Whop](https://whop.com/)** — Membership and community platform

### Media & Assets
- **[ImageKit](https://imagekit.io/)** — Image optimization and CDN
- **[Sharp](https://sharp.pixelplumbing.com/)** — Server-side image processing

### Email & Marketing
- **[MailerLite](https://www.mailerlite.com/)** — Email marketing and automation
- **[Substack](https://substack.com/)** — Content syndication

### Booking & Calendar
- **[Cal.com](https://cal.com/)** — Open-source scheduling platform

### Deployment & Hosting
- **[Vercel](https://vercel.com/)** — Primary hosting platform
- **[Firebase Hosting](https://firebase.google.com/docs/hosting)** — Alternative deployment

---

## 📁 Project Structure

```
/audiojones.com
├── /src                          # Main source code
│   ├── /app                      # Next.js App Router
│   │   ├── /(site)               # Public marketing pages
│   │   ├── /admin                # Admin portal (protected)
│   │   ├── /portal               # User dashboard (authenticated)
│   │   ├── /blog                 # Blog listing and posts
│   │   ├── /api                  # API routes (28 endpoints)
│   │   │   ├── /admin            # Admin management APIs
│   │   │   ├── /blog             # Blog automation APIs
│   │   │   ├── /stripe           # Payment processing
│   │   │   ├── /whop             # Community integration
│   │   │   ├── /contracts        # Contract generation
│   │   │   └── /newsletter       # Email subscriptions
│   │   └── layout.tsx            # Root layout
│   ├── /components               # React components
│   │   ├── /home                 # Homepage sections
│   │   ├── /blog                 # Blog components
│   │   ├── Header.tsx            # Navigation
│   │   ├── Footer.tsx            # Footer
│   │   └── AuthWidget.tsx        # Authentication UI
│   ├── /lib                      # Utility functions & services
│   │   ├── /automation           # Blog generation pipeline
│   │   │   ├── blog-generator.ts # LLM content generation
│   │   │   └── perplexity.ts     # Research API client
│   │   ├── /models               # TypeScript data models
│   │   │   └── blog.ts           # Blog types & utilities
│   │   ├── /server               # Server-side utilities
│   │   │   ├── firebaseAdmin.ts  # Firebase Admin SDK
│   │   │   └── n8n.ts            # Workflow automation
│   │   ├── /firebase             # Firebase client SDK
│   │   └── /client               # Client-side utilities
│   ├── /hooks                    # React hooks
│   │   └── useAuth.ts            # Authentication hook
│   └── /data                     # Static data
│       └── testimonials.ts       # Client testimonials
├── /dataconnect                  # Firebase Data Connect schema
│   ├── dataconnect.yaml          # Configuration
│   └── /schema                   # GraphQL schema
│       └── schema.gql            # Database schema
├── /functions                    # Firebase Cloud Functions
│   └── /src
│       └── index.ts              # Webhook handlers
├── /public                       # Static assets
│   ├── /assets                   # Images, icons, backgrounds
│   └── /favicons                 # Brand favicons
├── /docs                         # Documentation
│   ├── blog-automation-spec.md   # Blog automation specs
│   └── chatkit-agent-builder.md  # Agent builder docs
├── /specs                        # Design specifications
├── /scripts                      # Build and utility scripts
├── /tools                        # Development tools
├── middleware.ts                 # Edge middleware (auth guard)
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── firebase.json                 # Firebase deployment config
├── .firebaserc                   # Firebase project config
├── package.json                  # Dependencies and scripts
├── DEPLOYMENT.md                 # Deployment guide
└── README.md                     # This file
```

---

## 🎬 Getting Started

### Prerequisites

- **Node.js 20+** and **npm**
- **Firebase project** with Authentication, Firestore, and Data Connect enabled
- **API Keys** for Stripe, OpenAI, Perplexity, MailerLite, ImageKit, Whop, Cal.com

### Installation

```bash
# Clone the repository
git clone https://github.com/AJDIGITALllc/audiojones.com.git
cd audiojones.com

# Install dependencies
npm install

# Set up environment variables (see below)
cp .env.example .env.local

# Run development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 🔐 Environment Variables

### Root App (`.env.local`)

```bash
# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id

# Firebase Admin (Server - PRIVATE)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
# OR
GOOGLE_APPLICATION_CREDENTIALS_JSON='{"type":"service_account",...}'

# AI & Automation
OPENAI_API_KEY=sk-...
PERPLEXITY_API_KEY=pplx-...

# Payments
stripe_secret=sk_test_...
stripe_webhook_secret=whsec_...

# Media & CDN
NEXT_PUBLIC_IMAGEKIT_URL=https://ik.imagekit.io/audiojones
IMAGEKIT_PUBLIC_KEY=public_...
IMAGEKIT_PRIVATE_KEY=private_...

# Email Marketing
MAILERLITE_TOKEN=your_mailerlite_api_token
MAILERLITE_GROUP_ID=your_subscriber_group_id
MAILERLITE_API_BASE=https://connect.mailerlite.com  # Optional
SUBSTACK_FEED_URL=https://yoursubstack.substack.com/feed

# Membership & Community
WHOP_API_KEY=your_whop_api_key
WHOP_WEBHOOK_SECRET=your_whop_webhook_secret
WHOP_API_URL=https://api.whop.com

# Booking & Calendar
CALCOM_API_KEY=cal_live_...
CALCOM_WEBHOOK_SECRET=your_calcom_webhook_secret

# Automation
N8N_API_URL=https://your-n8n-instance.app.n8n.cloud
N8N_API_KEY=your_n8n_api_key
```

### Firebase Functions (`functions/.env`)

```bash
stripe_secret=sk_test_...
stripe_webhook_secret=whsec_...
WHOP_API_KEY=your_whop_api_key
WHOP_WEBHOOK_SECRET=your_whop_webhook_secret
WHOP_API_URL=https://api.whop.com
MAILERLITE_TOKEN=your_mailerlite_api_token
```

---

## 💻 Development

### Running the Development Server

```bash
npm run dev
```

Starts Next.js development server on `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

Creates an optimized production build.

### Running Production Build Locally

```bash
npm run build && npm start
```

### Linting

```bash
npm run lint
```

### ImageKit Utilities

```bash
# Convert Next.js Image components to IKImage
npm run imagekit:convert

# Set up ImageKit configuration
npm run imagekit:setup
```

### Repository Management

```bash
npm run repo:init      # Initialize repository
npm run repo:link      # Link to remote
npm run repo:sync      # Sync with remote
npm run repo:status    # Check repository status
npm run repo:commit    # Commit changes
```

---

## 🏗 Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         VERCEL EDGE                          │
│                    (middleware.ts)                           │
│              Auth Guard for /admin & /api/admin              │
└───────────────────────────┬─────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
┌───────▼────────┐                    ┌────────▼──────────┐
│  Next.js App   │                    │   API Routes      │
│  (App Router)  │                    │   (28 endpoints)  │
│                │                    │                   │
│ • Public Pages │                    │ • Admin APIs      │
│ • Admin Portal │◄───────────────────┤ • Blog APIs       │
│ • User Portal  │   Server Actions   │ • Stripe APIs     │
│ • Blog Pages   │                    │ • Whop APIs       │
└───────┬────────┘                    └────────┬──────────┘
        │                                      │
        │         ┌────────────────────────────┘
        │         │
┌───────▼─────────▼──────────────────────────────────────────┐
│                    FIREBASE / GOOGLE CLOUD                  │
│                                                             │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────────┐  │
│  │  Firebase    │  │  Firestore  │  │  Data Connect    │  │
│  │  Auth        │  │  (NoSQL)    │  │  (PostgreSQL)    │  │
│  └──────────────┘  └─────────────┘  └──────────────────┘  │
│                                                             │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────────┐  │
│  │  Storage     │  │  Functions  │  │  Cloud SQL       │  │
│  │              │  │  (Webhooks) │  │  (PostgreSQL)    │  │
│  └──────────────┘  └─────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
        │                     │                      │
        │                     │                      │
┌───────▼─────────┐  ┌────────▼────────┐  ┌─────────▼────────┐
│   External      │  │   AI Services   │  │   Media & CDN    │
│   Services      │  │                 │  │                  │
│                 │  │ • OpenAI GPT-4  │  │ • ImageKit       │
│ • Stripe        │  │ • Perplexity    │  │                  │
│ • Whop          │  │                 │  │                  │
│ • MailerLite    │  └─────────────────┘  └──────────────────┘
│ • Cal.com       │
│ • N8N           │
└─────────────────┘
```

### Authentication Flow

```
1. User visits /admin or /api/admin
2. Edge Middleware checks for idToken cookie or Bearer header
3. If missing → Redirect to /login (UI) or 401 (API)
4. If present → Pass through to route handler
5. Route handler verifies token with Firebase Admin SDK
6. Check custom claims for admin: true
7. If not admin → 403 Forbidden
8. If admin → Process request
```

### Blog Automation Pipeline

```
1. Admin creates draft via /api/blog/draft
2. Perplexity API researches topic (web-connected)
3. Parse research into structured data
4. LLM (GPT-4) generates blog content with Audio Jones voice
5. Validate brand voice (required/encouraged/discouraged patterns)
6. Calculate AEO score (100-point scale)
7. Save draft to Data Connect (PostgreSQL)
8. Admin reviews draft
9. Publish via /api/blog/publish
10. Track performance via /api/content/track
```

---

## 🔌 API Routes

### Admin Management

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/admin/users` | GET | List all users | Admin |
| `/api/admin/users` | POST | Lookup user by email/UID | Admin |
| `/api/admin/users/[uid]/admin` | PATCH | Set admin claims | Admin |
| `/api/admin/dashboard` | GET | Dashboard statistics | Admin |
| `/api/admin/claims` | POST | Manage custom claims | Admin |
| `/api/admin/grant` | POST | Grant permissions | Admin |
| `/api/admin/system` | GET | System health status | Admin |
| `/api/admin/whoami` | GET | Current user info | Admin |
| `/api/admin/ping` | GET | Health check | Admin |

### Blog & Content

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/blog/draft` | GET | List blog drafts | Admin |
| `/api/blog/draft` | POST | Generate new draft | Admin |
| `/api/blog/draft/[id]` | PUT | Update draft | Admin |
| `/api/blog/draft/[id]` | DELETE | Delete draft | Admin |
| `/api/blog/publish` | POST | Publish draft | Admin |
| `/api/content/track` | POST | Track analytics | Public |

### Payments

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/stripe/checkout` | POST | Create checkout session | User |
| `/api/stripe/portal` | POST | Customer portal access | User |

### Integrations

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/whop/products` | GET | List Whop products | User |
| `/api/whop/customers` | GET | Customer info | Admin |
| `/api/newsletter/subscribe` | POST | Subscribe to newsletter | Public |
| `/api/n8n/execute` | POST | Execute workflow | User |
| `/api/n8n/me` | GET | User profile | User |

### Media & Files

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/imagekit-auth` | POST | ImageKit auth tokens | User |
| `/api/imagekit-files` | GET | List files | User |

### Contracts

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/contracts/generate` | POST | Generate PDF contract | User |
| `/api/contracts/sign` | POST | Digital signature | User |
| `/api/contracts/verify` | POST | Verify signature | User |
| `/api/contracts/links` | GET | Contract links | User |

### Portal

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/portal/dashboard` | GET | User dashboard data | User |
| `/api/portal/billing` | GET | Billing information | User |
| `/api/portal/projects` | GET | User projects | User |

---

## 📝 Blog Automation System

### 5 Strategic Pillars

1. **AI for Marketing & Creators** — AI tools, marketing automation, predictive analytics
2. **AEO/SEO, Funnels, Automation** — Optimization strategies, conversion tactics
3. **Podcast, Creator, Industry Insights & News** — Creator economy trends, monetization
4. **Tech, Business & Trends** — Emerging technologies, business model innovations
5. **Personal Brand Development / KOL** — Thought leadership, brand building

### Audio Jones Voice Guard

**Required Elements:**
- Must mention "Audio Jones" or "AJ DIGITAL"
- Operator perspective (practical, results-focused)
- Miami-forward confidence

**Encouraged Patterns:**
- Framework references (EPM, ASI, PR, AOF)
- "automation", "predictable", "growth", "operator"
- Data-driven insights

**Discouraged Language:**
- "We believe" or "We think"
- "Cutting-edge", "revolutionary", "game-changing"
- Generic marketing buzzwords

### AEO (AI Engine Optimization) Scoring

**100-Point Scale:**
- Title optimization (15 points)
- Meta description (10 points)
- Keywords (10 points)
- Content structure (20 points) — headings, lists, numbers
- FAQs (15 points)
- Key takeaways (10 points)
- Structured data (10 points)
- Content length (10 points) — 1500-2500 words optimal

---

## 🔐 Authentication & Authorization

### Client-Side Authentication

Uses **Firebase Authentication SDK** (`src/lib/firebase/client.ts`):

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  return <div>Welcome, {user.email}</div>;
}
```

### Server-Side Authentication

Uses **Firebase Admin SDK** (`src/lib/server/firebaseAdmin.ts`):

```typescript
import { adminAuth } from '@/lib/server/firebaseAdmin';

// Verify ID token
const decodedToken = await adminAuth().verifyIdToken(token, true);

// Check custom claims
if (decodedToken.admin) {
  // User is admin
}
```

### Custom Claims

Set via Admin API:

```bash
curl -X PATCH https://audiojones.com/api/admin/users/USER_UID/admin \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"admin": true}'
```

---

## 🚀 Deployment

### Vercel (Primary)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

**Environment Variables:** Set in Vercel dashboard at `Settings > Environment Variables`.

### Firebase (Alternative)

```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login
firebase login

# Deploy hosting and functions
firebase deploy
```

**Configuration:** See `firebase.json` and `.firebaserc`.

### Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Firebase Admin credentials set
- [ ] Stripe webhook endpoints configured
- [ ] ImageKit setup complete
- [ ] Database migrations run (Data Connect)
- [ ] Firestore security rules deployed
- [ ] Storage security rules deployed
- [ ] Custom domain configured
- [ ] SSL certificate active

---

## 📜 Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run imagekit:convert # Convert to ImageKit components
npm run imagekit:setup   # Configure ImageKit
npm run repo:init        # Initialize repository
npm run repo:link        # Link to remote repository
npm run repo:sync        # Sync with remote
npm run repo:status      # Check repository status
npm run repo:commit      # Commit changes
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Add JSDoc comments to all functions
- Write unit tests for new features
- Update documentation as needed
- Follow the Audio Jones brand voice guidelines

---

## 📄 License

© 2025 AJ DIGITAL LLC. All rights reserved.

This is proprietary software for Audio Jones / AJ DIGITAL LLC. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.

---

## 📞 Support

For questions or support:

- **Email:** support@audiojones.com
- **Website:** [https://audiojones.com](https://audiojones.com)
- **Booking:** [https://audiojones.com/book](https://audiojones.com/book)

---

## 🙏 Acknowledgments

Built with love in **Miami** 🌴 by the Audio Jones team.

**Technologies:**
- [Next.js](https://nextjs.org/) by Vercel
- [Firebase](https://firebase.google.com/) by Google
- [Stripe](https://stripe.com/) for payments
- [OpenAI](https://openai.com/) for AI generation
- [Perplexity](https://www.perplexity.ai/) for research
- [ImageKit](https://imagekit.io/) for media optimization

---

**Made with ☕️ and ⚡️ by Audio Jones**
