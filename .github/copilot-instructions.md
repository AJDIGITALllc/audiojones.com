# Audio Jones Website - AI Development Guide

## Architecture Overview

This is a Next.js 16 (React 19) website for Audio Jones' AI branding and marketing services, built on a Firebase-first architecture with advanced integrations.

### Core Tech Stack
- **Frontend**: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
- **Database**: Firebase Data Connect (PostgreSQL via Google Cloud SQL) 
- **Auth**: Firebase Auth with custom admin claims
- **Storage**: Firebase Storage + ImageKit CDN
- **Functions**: Firebase Functions (Node.js)
- **Deployment**: Codex (internal tooling) + Vercel integration

### Key Firebase Services Integration
- **Authentication**: Custom admin claims for role-based access (`admin` claim)
- **Data Connect**: Generated TypeScript clients in `src/dataconnect-generated/`
- **Functions**: Located in `functions/` with separate package.json
- **Storage**: File uploads via Firebase Storage with ImageKit optimization

## Essential Patterns & Conventions

### Authentication Flow
```typescript
// Client auth pattern (all portal pages use this)
const { user, loading } = useAuth(); // Custom hook wrapping Firebase auth
const { loading } = useRequireAuth({ redirectTo: "/login" }); // Portal layout pattern
```

### API Routes Structure
- **Admin APIs**: `src/app/api/admin/*` - Require `admin` custom claim verification
- **Integration APIs**: Stripe (`api/stripe/*`), Whop (`api/whop/*`), N8N (`api/n8n/*`)
- **Auth pattern**: Bearer token validation with Firebase Admin SDK

### Portal Architecture
- **Layout**: `src/app/portal/layout.tsx` - Auth-protected wrapper
- **Sections**: admin/, bookings/, contracts/, crm/, files/, invoices/, licenses/, orders/, payments/
- **Navigation**: Centralized in `src/app/portal/components/PortalNav`

### Environment Configuration
Two-tier env setup (see README.md):
1. **Root**: `.env.local` (Next.js + Firebase client vars)
2. **Functions**: `functions/.env` (server-side secrets)

Critical vars: Firebase config, Stripe keys, Whop API, MailerLite, admin credentials JSON

### Development Workflows

### Getting Started
```bash
npm ci                           # Install dependencies
npm run dev                      # Start dev server
npm --prefix functions ci        # Install function dependencies
```

### Image Conversion (when adding ImageKit)
```bash
# Convert all Image imports to IKImage automatically
node scripts/convert-to-ikimage.js
git diff                         # Review changes
git add -A && git commit -m "chore: convert to IKImage loader"
```

### Codex Integration (Deployment)
```bash
npm run repo:init               # Initialize Codex workspace
npm run repo:sync               # Sync with Codex
npm run repo:commit             # Auto-commit via Codex
```

### Admin User Management
```bash
# Grant admin claims (requires Firebase Admin setup)
npx tsx tools/set-admin-claim.ts <email>
npx tsx tools/set-admin-claim.ts <uid>
```

### Security Layer Architecture
Three-layer protection for admin routes:
1. **Edge Middleware**: `middleware.ts` - Checks for session cookies before allowing `/portal/admin/*`
2. **Server Layout**: `src/app/portal/admin/layout.tsx` - Verifies Firebase session cookie + admin claim
3. **API Guards**: Individual API routes verify Bearer tokens + admin claims

## Component Patterns

### ImageKit Integration
- **Config**: `next.config.ts` allows `ik.imagekit.io` domain
- **Components**: `IKImage` automatically routes through ImageKit in production, serves locally in dev
- **Loader**: `src/lib/imagekit.ts` maps local paths to ImageKit URLs with cache-busting
- **Auth endpoint**: `src/app/api/imagekit-auth/route.ts`
- **Smart fallback**: Works without ImageKit in dev, automatically uses ImageKit in production

### Image Optimization Patterns
```typescript
// Use IKImage instead of Image for automatic ImageKit routing
import IKImage from "@/components/IKImage";

// Automatically maps /assets/Icons/mic.svg -> ik.imagekit.io/.../icons/mic.svg?v=<sha>
<IKImage src="/assets/Icons/mic.svg" alt="Mic" width={64} height={64} />

// For raw img tags, use getImageSrc helper
import { getImageSrc } from "@/lib/imagekit";
<img src={getImageSrc("/assets/Icons/mic.svg", 64)} alt="Mic" />
```

### Toast System
- **Provider**: Wrap layouts with `<ToastProvider>`
- **Usage**: Global toast context for user feedback

### Form Patterns
- **AuthForm**: Unified login/register component with mode switching
- **InputField**: Reusable form input with consistent styling

## Data Patterns

### Firebase Data Connect
- **Schema**: Defined in `dataconnect/schema/schema.gql`
- **Queries/Mutations**: `dataconnect/example/` directory
- **Generated Types**: Auto-imported from `@dataconnect/generated`
- **Usage**: Import generated hooks for type-safe data operations

### External Integrations
- **Stripe**: Checkout + customer portal via API routes
- **Whop**: Product licensing and customer management
- **N8N**: Workflow automation backend
- **MailerLite**: Newsletter subscription management

## Security Model

### Authentication Layers
1. **Client Auth**: Firebase Auth for user sessions
2. **Edge Protection**: Middleware checks session cookies for admin routes
3. **Server Verification**: Admin layout verifies session cookie + admin claims
4. **API Security**: Bearer token validation in protected routes

### Admin Access Pattern
```typescript
// Standard admin verification in API routes
async function requireAdmin(req: NextRequest) {
  const authz = req.headers.get('authorization');
  const decoded = await adminAuth().verifyIdToken(token, true);
  if (!decoded.admin) throw new Error('Admin required');
}

// Server-side session cookie verification (admin layout)
const decoded = await adminAuth().verifySessionCookie(sessionCookie, true);
if (decoded.admin !== true) redirect('/not-authorized');
```

## File Organization

### Critical Directories
- `src/app/portal/` - All authenticated user functionality
- `src/app/api/admin/` - Admin-only API endpoints  
- `src/lib/firebase/` - Firebase client/server configuration
- `src/dataconnect-generated/` - Auto-generated Data Connect types
- `functions/` - Firebase Functions (separate Node.js project)
- `dataconnect/` - Database schema and operations

### Styling Approach
- **Tailwind**: Version 4 with CSS variables
- **Theme**: Dark theme (`bg-black text-white`) as primary
- **Typography**: Geist Sans/Mono fonts loaded in root layout

## Debugging & Troubleshooting

### Common Issues
- **Auth failures**: Check Firebase config in `.env.local`
- **Admin access**: Verify custom claims via `api/admin/whoami`
- **Functions**: Separate deployment - check `functions/.env`
- **Data Connect**: Regenerate types after schema changes

### Environment Validation
- Test Firebase Admin: `GET /api/test-firebase-admin`
- Test auth state: `GET /api/admin/ping` (requires admin token)
- N8N connectivity: `GET /api/n8n/me`
- Admin permission test: Visit `/portal/admin` with different user types

### Admin Security Testing
1. **Logged out**: `/portal/admin` → redirects to `/login?next=/portal/admin`
2. **Non-admin user**: `/portal/admin` → redirects to `/not-authorized` 
3. **Admin user**: `/portal/admin` → shows admin interface
4. **API 403 handling**: Use `/api/not-authorized` for consistent error responses
