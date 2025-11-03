# AudioJones.com Core Experience - Quickstart Guide

## Overview
This guide helps you set up and deploy the AudioJones.com core experience including Homepage, Artist Hub, and EPM pages.

## Prerequisites
- Node.js 18+ 
- TypeScript knowledge
- Next.js 16 (App Router) familiarity
- Firebase account with Data Connect enabled
- Vercel account for deployment
- MailerLite account (optional)
- Whop account for checkout integration

## 🚀 Quick Setup (5 minutes)

### 1. Environment Configuration
Create `.env.local` in project root:

```bash
# Core Configuration
NEXT_PUBLIC_SITE_NAME="Audio Jones"
NEXT_PUBLIC_SITE_URL="https://audiojones.com"

# Whop Integration (Primary CTAs)
WHOP_CHECKOUT_URL="https://whop.com/checkout/..."
WHOP_STUDIO_PRODUCT_URL="https://whop.com/product/studio-time"
WHOP_MIX_PRODUCT_URL="https://whop.com/product/mix-master"
WHOP_BEATS_URL="https://whop.com/product/beats"
WHOP_CONSULT_PRODUCT_URL="https://whop.com/product/consultation"

# MailerLite (Newsletter)
MAILERLITE_TOKEN="your_mailerlite_api_token"
NEXT_PUBLIC_MAILERLITE_FORM_ID="your_form_id"

# ImageKit CDN
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/youraccount"

# Firebase (existing from repo)
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_firebase_project"
# ... other Firebase vars from existing setup

# Analytics (optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### 2. Install Dependencies
```bash
npm install
# or
npm ci  # for production-exact dependencies
```

### 3. Configure Site Data
Edit `src/config/site.ts`:

```typescript
export const siteConfig = {
  siteName: "Audio Jones",
  primaryCtaUrl: process.env.WHOP_CHECKOUT_URL!,
  secondaryCtaUrl: "/client",
  brandColors: {
    primary: "#FF4500",
    secondary: "#FFD700", 
    accent: "#008080",
    white: "#FFFFFF",
    black: "#000000"
  }
};
```

### 4. Start Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

## 📂 Project Structure

```
src/
├── app/
│   ├── (site)/             # Main marketing pages
│   │   ├── page.tsx        # Homepage
│   │   ├── artist-hub/     # Artist Hub page
│   │   └── epm/            # EPM page
│   ├── api/                # API routes
│   │   ├── subscribe/      # MailerLite integration
│   │   ├── config/         # Configuration endpoints
│   │   └── track/          # Analytics tracking
│   └── layout.tsx          # Root layout
├── components/
│   ├── layout/             # Header, Footer, Navigation
│   ├── pages/              # Page-specific components
│   │   ├── HomePage/       # Hero, Services, etc.
│   │   ├── ArtistHub/      # Service tiles
│   │   └── EPM/            # EPM flow, coming soon
│   └── ui/                 # Reusable UI components
├── config/
│   ├── site.ts             # Site configuration
│   ├── services.json       # Service cards data
│   ├── artistHub.json      # Artist Hub services
│   └── epm.json            # EPM page content
└── lib/
    ├── mailerlite.ts       # Newsletter API
    ├── analytics.ts        # Event tracking
    └── whop.ts             # Checkout integration
```

## 🎯 Key Routes

| Route | Purpose | Components |
|-------|---------|------------|
| `/` | Homepage with hero, services, testimonials | `HomeHero`, `ServicesGrid`, `TestimonialStrip` |
| `/artist-hub` | Artist services dashboard | `ArtistHubLayout`, `ServiceTile` |
| `/epm` | EPM framework introduction | `EpmHero`, `EpmFlow`, `ComingSoonCards` |

## ⚙️ Configuration Files

### Service Cards (`src/config/services.json`)
```json
[
  {
    "id": "podcast-production",
    "title": "Podcast Production",
    "description": "End-to-end podcast systems and distribution",
    "category": "Podcast",
    "ctaText": "Start Your Podcast",
    "ctaUrl": "/artist-hub",
    "featured": true,
    "order": 1
  }
]
```

### Artist Hub Services (`src/config/artistHub.json`)
```json
[
  {
    "id": "studio-time",
    "title": "Book Studio Time",
    "description": "Professional recording studio sessions",
    "ctaText": "Book Now",
    "whopProductUrl": "${WHOP_STUDIO_PRODUCT_URL}",
    "order": 1
  }
]
```

## 🚀 Deployment

### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Add environment variables in Vercel dashboard
# or via CLI:
vercel env add WHOP_CHECKOUT_URL production
vercel env add MAILERLITE_TOKEN production
```

### Manual Build
```bash
npm run build
npm start
```

## 🔌 Integrations

### MailerLite Newsletter
```typescript
// src/lib/mailerlite.ts
import { subscribe } from '@/lib/mailerlite';

await subscribe({
  email: 'user@example.com',
  tags: ['homepage'],
  source: 'homepage'
});
```

### Whop Checkout
```typescript
// Redirect to Whop checkout
window.open(siteConfig.primaryCtaUrl, '_blank');
```

### Analytics Tracking
```typescript
// src/lib/analytics.ts
import { trackEvent } from '@/lib/analytics';

trackEvent({
  event: 'cta_click',
  source: 'homepage_hero',
  metadata: { ctaText: 'Get Started' }
});
```

## 🎨 Brand Customization

### Colors
Audio Jones brand colors are defined in `src/config/site.ts`:
- Primary: `#FF4500` (Orange Red)
- Secondary: `#FFD700` (Gold)
- Accent: `#008080` (Teal)

### Typography
Uses Geist Sans/Mono fonts (loaded in `app/layout.tsx`)

### Components
All components use Tailwind CSS with brand color utilities:
```tsx
<button className="bg-[#FF4500] hover:bg-[#e63e00] text-white">
  Get Started
</button>
```

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run build test
npm run build

# Test environment setup
npm run test:env
```

## 📊 Performance

Target metrics:
- Lighthouse Score: ≥ 90
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

Optimization features:
- Next.js 16 App Router with SSG
- ImageKit CDN integration
- Tailwind CSS purging
- Component lazy loading

## 🔧 Troubleshooting

### Common Issues

**Build fails with "Module not found"**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Environment variables not loading**
- Check `.env.local` exists in project root
- Verify `NEXT_PUBLIC_` prefix for client-side vars
- Restart development server after adding new vars

**Whop redirects not working**
- Verify URLs in environment variables
- Check Whop product URLs are active
- Test with `console.log(process.env.WHOP_CHECKOUT_URL)`

**MailerLite subscription fails**
- Verify API token is valid
- Check MailerLite rate limits
- Test with API endpoint directly

## 🚀 Production Checklist

- [ ] All environment variables set in Vercel
- [ ] Whop product URLs tested and active
- [ ] MailerLite integration tested
- [ ] ImageKit CDN configured
- [ ] Analytics tracking verified
- [ ] Lighthouse score ≥ 90
- [ ] All CTAs functional
- [ ] Mobile responsive design tested
- [ ] Brand colors and fonts correct
- [ ] AJ DIGITAL LLC footer present

## 📞 Support

For issues with this implementation:
1. Check this quickstart guide
2. Review the [data model](./data-model.md)
3. Check the [API contracts](./contracts/)
4. Contact: AJ DIGITAL LLC

## 🔄 Next Steps

After basic setup:
1. **Artist Hub Enhancement**: Add custom services toggle
2. **EPM Lab Development**: Implement coming soon services
3. **Client Portal Integration**: Connect to existing portal specs
4. **Analytics Dashboard**: Expand tracking and reporting
5. **A/B Testing**: Test different CTA variations