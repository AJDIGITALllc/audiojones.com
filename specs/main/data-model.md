# Data Model - AudioJones.com Core Experience

## Overview
This document defines the data structures and relationships for the AudioJones.com core experience including homepage, Artist Hub, and EPM pages.

## Core Entities

### SiteConfig
**Purpose**: Central configuration for site-wide settings and CTA behavior
```typescript
interface SiteConfig {
  siteName: string;
  primaryCtaUrl: string; // from env:WHOP_CHECKOUT_URL
  secondaryCtaUrl: string; // "/client" or "/portal"
  brandColors: BrandColors;
  services: ServiceCard[];
  navigation: NavigationItem[];
}

interface BrandColors {
  primary: "#FF4500";    // Orange Red
  secondary: "#FFD700";  // Gold  
  accent: "#008080";     // Teal
  white: "#FFFFFF";
  black: "#000000";
}
```

### ServiceCard
**Purpose**: Represents service offerings on homepage and service pages
```typescript
interface ServiceCard {
  id: string;
  title: string;
  description: string;
  category: "Podcast" | "AI" | "Marketing" | "Data";
  ctaText: string;
  ctaUrl: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
}
```

### NavigationItem
**Purpose**: Global navigation structure
```typescript
interface NavigationItem {
  label: string;
  href: string;
  isExternal: boolean;
  order: number;
  enabled: boolean;
}
```

### ArtistHubService
**Purpose**: Artist Hub service tiles with Whop integration
```typescript
interface ArtistHubService {
  id: string;
  title: "Book Studio Time" | "Book Mix / Master" | "Buy Beats / Instrumentals" | "Artist Consultations";
  description: string;
  ctaText: string;
  whopProductUrl: string; // from env vars
  imageUrl: string;
  pricing?: string;
  duration?: string;
  order: number;
  enabled: boolean;
}
```

### EpmPageConfig
**Purpose**: EPM page content and structure
```typescript
interface EpmPageConfig {
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta?: string;
  };
  explainer: {
    title: string;
    content: string;
    problemList: string[];
  };
  flow: EpmFlowStep[];
  comingSoon: ComingSoonCard[];
  ecosystem: EcosystemLink[];
}

interface EpmFlowStep {
  step: 1 | 2 | 3 | 4;
  title: "Sense" | "Predict" | "Optimize" | "Automate";
  description: string;
  icon?: string;
}

interface ComingSoonCard {
  title: "EPM Audit" | "Affective Offer Engine" | "Creator EPM Lab";
  description: string;
  waitlistTag: string;
  estimatedLaunch?: string;
}

interface EcosystemLink {
  module: "Marketing Automation" | "Client Delivery" | "Data Intelligence" | "AI Optimization" | "Funnel Map";
  description: string;
  href: string;
}
```

### MailerLiteIntegration
**Purpose**: Newsletter subscription and lead capture
```typescript
interface MailerLiteSubscription {
  email: string;
  tags: string[]; // ["homepage", "artist-hub", "epm-waitlist", etc.]
  source: "homepage" | "artist-hub" | "epm" | "general";
  timestamp: Date;
}
```

## Data Sources

### Static Configuration Files
- `config/site.ts` - SiteConfig and NavigationItem[]
- `config/artistHubServices.json` - ArtistHubService[]
- `config/epmPageConfig.json` - EpmPageConfig

### Environment Variables
- `WHOP_CHECKOUT_URL` - Primary CTA destination
- `WHOP_STUDIO_PRODUCT_URL` - Studio booking
- `WHOP_MIX_PRODUCT_URL` - Mix/master services
- `WHOP_BEATS_URL` - Beat marketplace
- `WHOP_CONSULT_PRODUCT_URL` - Consultation booking
- `MAILERLITE_TOKEN` - Newsletter API access
- `NEXT_PUBLIC_MAILERLITE_FORM_ID` - Public form ID
- `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` - Image CDN

## State Management

### Client-Side State
- Navigation menu open/closed
- Form submission states
- Loading states for external redirects
- Dark/light mode toggle (future)

### Server-Side State
- Page metadata and SEO content
- Static site generation for performance
- Analytics event tracking

## Validation Rules

### ServiceCard Validation
- Title: required, max 50 characters
- Description: required, max 200 characters
- Category: must be valid enum value
- Order: unique positive integer

### ArtistHubService Validation
- Title: must match predefined service types
- WhopProductUrl: valid URL format
- Order: 1-4 for core services

### Email Subscription Validation
- Email: valid email format
- Tags: max 5 tags per subscription
- Source: must match page source

## Relationships

```mermaid
graph TD
    A[SiteConfig] --> B[ServiceCard[]]
    A --> C[NavigationItem[]]
    D[ArtistHubService[]] --> E[Whop Products]
    F[EpmPageConfig] --> G[ComingSoonCard[]]
    F --> H[EpmFlowStep[]]
    I[MailerLiteSubscription] --> J[External MailerLite API]
```

## Performance Considerations

- ServiceCard data: Static JSON, cached at build time
- ArtistHubService data: Static JSON with env var substitution
- EpmPageConfig: Static generation for fast loading
- MailerLite: Client-side async submission with loading states

## Future Extensions

- User accounts (link to client-portal.md)
- Service booking history
- EPM tool integrations
- Analytics dashboard integration
- A/B testing framework for CTAs