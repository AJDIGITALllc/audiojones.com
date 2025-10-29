# 🚀 Audio Jones Deployment Guide

## Complete Setup & Security Implementation ✅

This repository now includes enterprise-grade security and ImageKit integration. Everything has been implemented and is ready for production deployment.

## 🔒 Security Features Implemented

### Three-Layer Admin Protection
1. **Edge Middleware** (`middleware.ts`) - Session cookie verification
2. **Server Layout** (`src/app/portal/admin/layout.tsx`) - Firebase session + admin claims
3. **API Guards** - Bearer token validation in protected routes

### Security Components Added
- ✅ `/not-authorized` page for better UX
- ✅ `/api/not-authorized` endpoint for consistent 403 responses
- ✅ Admin claim management script (`tools/set-admin-claim.ts`)
- ✅ Complete environment configuration

## 🖼 ImageKit Integration

### Smart Fallback System
- **Development**: Serves images from `/public/assets/` (no ImageKit needed)
- **Production**: Automatically routes through ImageKit with cache-busting

### Path Mapping
```
/assets/Icons/ → ik.imagekit.io/audiojones/icons/
/assets/AUDIO JONES WEBSITE IMAGES/ → ik.imagekit.io/audiojones/images/
/assets/Backgrounds/ → ik.imagekit.io/audiojones/backgrounds/
/assets/Client Testiomonials/ → ik.imagekit.io/audiojones/testimonials/
```

## 🚀 Deployment Steps

### 1. Vercel Environment Variables

Set these in Vercel Project Settings → Environment Variables:

```bash
# ImageKit (Production Only)
NEXT_PUBLIC_IMAGEKIT_URL=https://ik.imagekit.io/audiojones

# Firebase Admin (Required)
FIREBASE_CLIENT_EMAIL=your-service-account@audiojoneswebsite.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 2. Deploy to Production

```powershell
# Deploy via Vercel
vercel --prod

# OR deploy via Codex (if using internal tooling)
npm run repo:commit
npm run repo:sync
```

### 3. Set Up Admin User

After deployment, grant yourself admin access:

```powershell
# Set admin privileges (use your email)
npx tsx tools/set-admin-claim.ts your-email@domain.com
```

## 🧪 Testing Checklist

### Security Flow Testing
- [ ] Visit `/portal/admin` logged out → redirects to `/login?next=/portal/admin`
- [ ] Log in as non-admin user → redirects to `/not-authorized`
- [ ] Log in as admin user → shows admin interface
- [ ] API endpoints return 403 for non-admin requests

### ImageKit Testing
- [ ] Images load in development (from `/public`)
- [ ] Images load in production (from ImageKit)
- [ ] Build stamp shows in footer with commit SHA
- [ ] Network tab shows `ik.imagekit.io` URLs in production

## 🛠 Development Workflow

### Local Development
```bash
npm ci                    # Install dependencies
npm run dev              # Start development server
```

### Image Management
```bash
npm run imagekit:convert  # Convert Image → IKImage
npm run imagekit:setup   # Check ImageKit status
```

### Admin Tools
```bash
npx tsx tools/set-admin-claim.ts <email>  # Grant admin access
```

## 📁 Key Files Reference

### Security
- `middleware.ts` - Edge protection for admin routes
- `src/app/portal/admin/layout.tsx` - Server-side admin verification
- `src/app/not-authorized/page.tsx` - Unauthorized access page
- `tools/set-admin-claim.ts` - Admin privilege management

### ImageKit
- `src/lib/imagekit.ts` - Smart loader with dev/prod fallback
- `src/components/IKImage.tsx` - Drop-in Image replacement
- `src/components/BuildStamp.tsx` - Version info display

### Environment
- `.env.local` - Development environment variables
- `functions/.env` - Firebase Functions environment

## 🎯 Production URLs

Once deployed:
- **Main Site**: `https://audiojones.com`
- **Portal**: `https://audiojones.com/portal`
- **Admin**: `https://audiojones.com/portal/admin` (requires admin privileges)

## 📞 Support

All security layers, ImageKit integration, and deployment automation are now in place. The system is production-ready with enterprise-grade security and performance optimization.

**Build Info**: Available in footer via BuildStamp component showing commit SHA and asset version.