# Client Portal (AJ DIGITAL / Audio Jones)
Spec Version: v1.0  
Status: DRAFT  
Owner: AJ DIGITAL LLC (Audio Jones)  
Subdomain: https://clients.audiojones.com  
App: Next.js (Vercel)  
Goal: Gated portal for onboarding, billing, projects, approvals, files, chat.

## 1. Modules
- Client Delivery Module (Whop → GBU → Drive/Notion → MailerLite)
- Marketing Automation Module
- Data Intelligence Module
- AI Optimization Module

## 2. Features (MVP)
1. Auth & Roles (client_owner, client_member, aj_ops, aj_admin)
2. Dashboard (next actions, billing alert, upcoming booking)
3. Payments/Billing (Whop sync, delinquent banner, manage link)
4. Bookings (Cal.com/Calendly embed + upcoming from Google Calendar)
5. Projects (status, milestones, notes, files)
6. Contracts (GBU status + download)
7. Content Approvals (approve/reject + comments → n8n/Slack)
8. Messages (threaded per project)
9. Files/Assets (Drive list + upload)
10. Chatbot (Beacon AI / ChatKit embed with client context)

## 3. API Routes (to implement)
- /api/auth/login
- /api/dashboard
- /api/billing
- /api/projects
- /api/projects/[id]
- /api/approvals
- /api/messages
- /api/assets
- /api/webhooks/whop
- /api/webhooks/n8n/projects
- /api/webhooks/n8n/approvals
- /api/webhooks/gbu
- /api/webhooks/calendar

## 4. App Structure
- apps/client-portal/pages/...
- apps/client-portal/components/...
- apps/client-portal/lib/...
- docs/specs/client-portal.md (this file)

## 5. Non-SEO
- Exclude from sitemap.xml
- robots: Disallow: /