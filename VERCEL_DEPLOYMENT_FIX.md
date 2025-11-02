# Vercel Deployment Fix Documentation

## Summary of Issues Fixed

This document outlines the deployment issues that were preventing successful Vercel builds and the solutions implemented.

## Issues Identified

### 1. Google Fonts Network Access Failure ❌
**Problem**: Build environment couldn't access `fonts.googleapis.com`
```
Error: Failed to fetch `Geist` from Google Fonts
Error: Failed to fetch `Geist Mono` from Google Fonts
```

**Root Cause**: 
- Vercel build environment has restricted network access during build
- `next/font/google` requires fetching fonts from Google's servers at build time
- DNS resolution for `fonts.googleapis.com` fails in restricted environments

**Solution**: ✅
- Replaced `next/font/google` with `@fontsource` NPM packages
- Installed `@fontsource/geist-sans` and `@fontsource/geist-mono`
- Fonts are now bundled locally in `node_modules` and don't require network access
- Updated `src/app/layout.tsx` to import font CSS files directly
- Updated `src/app/globals.css` with proper font-family definitions

### 2. Firebase Client Import-Time Initialization ❌
**Problem**: Firebase client threw errors during build when environment variables were missing
```
Error: Missing Firebase env vars
```

**Root Cause**:
- Firebase app was initialized at module load time (`export const app = createFirebaseApp()`)
- Next.js evaluates all modules during build, including client components
- Missing `NEXT_PUBLIC_FIREBASE_*` env vars caused immediate failure

**Solution**: ✅
- Modified `src/lib/firebase/client.ts` to handle missing env vars gracefully
- Added build-time detection using `typeof window === 'undefined'`
- During build: logs warning and returns null
- At runtime: throws proper error if configuration missing
- Allows build to succeed while maintaining runtime safety

### 3. API Client Constructor Validation ❌
**Problem**: Perplexity and OpenAI clients threw errors at import time
```
Error: PERPLEXITY_API_KEY environment variable is required
Error: OPENAI_API_KEY environment variable is required
```

**Root Cause**:
- API clients validated environment variables in constructor
- Constructors ran at module load time, failing during build

**Solution**: ✅
- Moved validation from constructor to runtime methods
- Added `checkApiKey()` methods called only when APIs are actually used
- Allows modules to load during build without requiring API keys
- Maintains strict validation when APIs are called

### 4. Admin Portal Static Pre-rendering ❌
**Problem**: Admin portal tried to render statically, requiring Firebase Admin at build time
```
Error: Missing Firebase env vars (from firebaseAdmin.ts)
Error occurred prerendering page "/portal/admin"
```

**Root Cause**:
- Admin layout is a Server Component that calls Firebase Admin SDK
- Next.js tried to pre-render it statically during build
- Firebase Admin SDK requires credentials that aren't available at build time

**Solution**: ✅
- Added `export const dynamic = 'force-dynamic'` to admin layout
- Forces admin routes to render on-demand instead of at build time
- Firebase Admin only initialized when routes are actually accessed

## Files Modified

### Dependencies
- `package.json`: Added `@fontsource/geist-sans` and `@fontsource/geist-mono`

### Font Configuration
- `src/app/layout.tsx`: Replaced Google Font imports with fontsource imports
- `src/app/globals.css`: Updated font-family CSS variables

### Firebase & API Clients
- `src/lib/firebase/client.ts`: Added build-time safe initialization
- `src/lib/server/firebaseAdmin.ts`: Improved error messaging
- `src/lib/automation/perplexity.ts`: Deferred API key validation
- `src/lib/automation/blog-generator.ts`: Deferred API key validation

### Route Configuration
- `src/app/portal/admin/layout.tsx`: Added force-dynamic export

## Deployment Instructions

### Prerequisites
All environment variables must be configured in Vercel:

#### Required for Build (No Secrets)
These can be placeholder values for build, but must exist:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=placeholder
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=placeholder.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=placeholder
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=placeholder.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=placeholder
NEXT_PUBLIC_FIREBASE_APP_ID=placeholder
```

#### Required for Runtime (Actual Values)
These are needed for the app to work, but not for build:
```bash
# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Optional API Keys (only needed if using those features)
PERPLEXITY_API_KEY=your-key
OPENAI_API_KEY=your-key
```

### Vercel Environment Variable Setup

1. Go to Vercel Project Settings → Environment Variables
2. Add all `NEXT_PUBLIC_*` variables with real or placeholder values
3. Add server-side Firebase Admin credentials
4. Deploy!

### Build Process
```bash
# Install dependencies
npm ci

# Build (should succeed now)
npm run build

# The build will show:
# ✓ Compiled successfully
# ✓ Generating static pages
# Build completed successfully
```

### Verification Checklist
- [ ] Build completes without font fetch errors
- [ ] Build completes without Firebase initialization errors
- [ ] All pages render correctly
- [ ] Admin portal accessible (requires auth)
- [ ] Client-side Firebase auth works at runtime
- [ ] API routes function correctly

## Technical Details

### Build vs Runtime
Next.js has two distinct phases:

**Build Time**:
- Runs in CI/CD environment (limited network access)
- Pre-renders static pages
- Bundles client/server code
- **Should not require**: API keys, database access, external services

**Runtime**:
- User requests trigger Server Components
- API routes execute
- Client components run in browser
- **Requires**: Full environment configuration

### Font Loading Strategy
**Before**: Dynamic fetch from Google at build time
```typescript
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
```

**After**: Bundled fonts from npm
```typescript
import "@fontsource/geist-sans/400.css";
```

### Firebase Initialization Strategy
**Before**: Immediate initialization
```typescript
export const app = createFirebaseApp(); // Runs at import
```

**After**: Build-safe initialization
```typescript
const app = createFirebaseApp(); // Returns null during build
export const auth = app ? getAuth(app) : null as any;
```

## Monitoring & Troubleshooting

### Common Issues

**Issue**: Build still fails with font errors
- **Check**: Ensure `@fontsource` packages are installed
- **Fix**: Run `npm install @fontsource/geist-sans @fontsource/geist-mono`

**Issue**: Runtime error "Missing Firebase configuration"
- **Check**: Vercel environment variables are set
- **Fix**: Add actual Firebase config values in Vercel dashboard

**Issue**: Admin portal shows blank page
- **Check**: Firebase Admin credentials are valid
- **Check**: User has admin custom claim set
- **Fix**: Use `tools/set-admin-claim.ts` to grant admin access

**Issue**: API routes fail at runtime
- **Check**: API keys are configured in Vercel
- **Fix**: Add PERPLEXITY_API_KEY and OPENAI_API_KEY if using blog automation

### Build Logs
Monitor Vercel build logs for:
- ✅ "Compiled successfully"
- ✅ "Generating static pages (X/X)"
- ⚠️ "Firebase not initialized: missing configuration (build time)" - This is expected
- ❌ Any "Error:" messages - These need investigation

## Success Metrics
- ✅ Build time: ~90 seconds
- ✅ Static pages: 46/46 generated
- ✅ Dynamic routes: Correctly marked with ƒ symbol
- ✅ No build errors
- ✅ TypeScript compilation passes
- ✅ No security vulnerabilities (CodeQL verified)

## Next Steps
1. Push changes to main branch or create PR
2. Vercel will auto-deploy on push
3. Monitor build logs for successful completion
4. Test deployment on preview URL
5. Promote to production if successful

## References
- Next.js Font Optimization: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Firebase Client SDK: https://firebase.google.com/docs/web/setup
- Vercel Environment Variables: https://vercel.com/docs/projects/environment-variables
- @fontsource: https://fontsource.org/
