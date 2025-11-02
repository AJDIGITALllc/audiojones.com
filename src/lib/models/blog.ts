/**
 * Blog Automation System Types
 *
 * Comprehensive type definitions for the Audio Jones blog automation system.
 * Based on blog-automation-spec.md
 *
 * @module lib/models/blog
 */

/** Strategic content pillar for blog organization */
export type PillarType = 'ai' | 'marketing' | 'podcast-news' | 'tech-business-trends' | 'personal-brand';

/** Target audience persona */
export type PersonaType = 'creator' | 'entrepreneur' | 'smb' | 'agency';

/** Blog draft lifecycle status */
export type BlogStatus = 'draft' | 'needs_review' | 'approved' | 'scheduled' | 'published' | 'optimization_pending';

/** Content source origin */
export type BlogSource = 'perplexity' | 'internal' | 'mixed';

/** Audio Jones proprietary framework types */
export type FrameworkType = 'EPM' | 'ASI' | 'PR' | 'AOF';

/** Call-to-action type for content */
export type CTAType = 'newsletter' | 'podcast' | 'services' | 'lead_magnet';

/** A/B testing variant types */
export type VariantType = 'title' | 'intro' | 'cta' | 'hero_media';

/** Content scheduling status */
export type ScheduleStatus = 'pending' | 'published' | 'failed';

// Audio Jones 5 Strategic Pillars Configuration
export const PILLARS = {
  ai: {
    id: 'ai' as const,
    label: 'AI for Marketing & Creators',
    intents: ['news', 'how-to', 'framework-link', 'opinion'],
    color: '#FF4500' // Audio Jones orange
  },
  marketing: {
    id: 'marketing' as const,
    label: 'AEO/SEO, Funnels, Automation',
    intents: ['educate', 'commercial', 'authority'],
    color: '#FFD700' // Audio Jones gold
  },
  'podcast-news': {
    id: 'podcast-news' as const,
    label: 'Podcast, Creator, Industry Insights & News',
    intents: ['news', 'trend', 'repurpose'],
    color: '#32CD32' // Lime green
  },
  'tech-business-trends': {
    id: 'tech-business-trends' as const,
    label: 'Tech, Business & Trends',
    intents: ['news', 'analysis', 'operator POV'],
    color: '#1E90FF' // Dodger blue
  },
  'personal-brand': {
    id: 'personal-brand' as const,
    label: 'Personal Brand Development / KOL',
    intents: ['thought-lead', 'story', 'playbook'],
    color: '#8A2BE2' // Blue violet
  }
} as const;

export interface TopicalMap {
  id: string;
  pillar: PillarType;
  topic: string;
  persona: PersonaType;
  intent: string;
  sourceUrls: string[];
  priority: number;
  lastGenerated?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SEOMetadata {
  title?: string;
  description?: string;
  keywords: string[];
  ogImage?: string;
}

export interface AEOMetadata {
  faqs: Array<{ q: string; a: string }>;
  keyTakeaways: string[];
  structuredData: Record<string, any>;
}

export interface CTABlock {
  type: CTAType;
  headline: string;
  description: string;
  link: string;
}

export interface BlogDraft {
  id: string;
  pillar: PillarType;
  source: BlogSource;
  status: BlogStatus;
  title: string;
  slug: string;
  content: string; // Markdown
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords: string[];
  ogImage?: string;
  faqs?: string; // JSON string of FAQ array
  keyTakeaways: string[];
  structuredData?: string; // JSON string
  ctaType: CTAType;
  ctaHeadline: string;
  ctaDescription: string;
  ctaLink: string;
  researchPayload?: string; // Original Perplexity JSON
  frameworkUsed?: FrameworkType;
  readingTime: number; // Estimated reading time in minutes
  createdAt: Date;
  updatedAt: Date;
  scheduledFor?: Date;
  publishedAt?: Date;
}

export interface BlogVariant {
  id: string;
  draftId: string;
  variantType: VariantType;
  originalValue: string;
  variantValue: string;
  testPercentage: number;
  performanceData?: Record<string, any>;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentPerformance {
  id: string;
  draftId: string;
  slug: string;
  pillar: PillarType;
  views: number;
  engagementTime: number; // Average time in seconds
  conversions: number;
  socialShares: number;
  searchImpressions: number;
  bounceRate: number;
  performanceScore: number; // Calculated score 0-1
  lastUpdated: Date;
}

export interface ContentSchedule {
  id: string;
  draftId: string;
  scheduledFor: Date;
  status: ScheduleStatus;
  distributionChannels: string[];
  retryCount: number;
  lastAttempt?: Date;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Utility Functions
 */

/**
 * Get configuration for a specific pillar
 *
 * @param pillar - The pillar type to get config for
 * @returns Pillar configuration object with id, label, intents, and color
 * @example
 * ```typescript
 * const config = getPillarConfig('ai');
 * console.log(config.label); // "AI for Marketing & Creators"
 * ```
 */
export function getPillarConfig(pillar: PillarType) {
  return PILLARS[pillar];
}

/**
 * Calculate estimated reading time in minutes
 *
 * Uses standard reading speed of 200 words per minute.
 *
 * @param content - The full blog content (markdown or plain text)
 * @returns Estimated reading time in minutes (rounded up)
 * @example
 * ```typescript
 * const content = "Lorem ipsum..."; // 1500 words
 * const time = calculateReadingTime(content); // Returns 8 minutes
 * ```
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate URL-friendly slug from title
 *
 * Converts title to lowercase, replaces special characters with hyphens,
 * removes leading/trailing hyphens, and truncates to 100 characters.
 *
 * @param title - The blog post title
 * @returns URL-safe slug
 * @example
 * ```typescript
 * const slug = generateSlug("How AI Transforms Marketing!");
 * console.log(slug); // "how-ai-transforms-marketing"
 * ```
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

export function formatPillarForDisplay(pillar: PillarType): string {
  return PILLARS[pillar].label;
}

export function getStatusColor(status: BlogStatus): string {
  const colors = {
    draft: 'bg-gray-500',
    needs_review: 'bg-yellow-500',
    approved: 'bg-blue-500',
    scheduled: 'bg-purple-500',
    published: 'bg-green-500',
    optimization_pending: 'bg-orange-500'
  };
  return colors[status] || 'bg-gray-500';
}

export function getStatusLabel(status: BlogStatus): string {
  const labels = {
    draft: 'Draft',
    needs_review: 'Needs Review',
    approved: 'Approved',
    scheduled: 'Scheduled',
    published: 'Published',
    optimization_pending: 'Optimization Pending'
  };
  return labels[status] || status;
}

/**
 * Content Validation
 */

/**
 * Validate blog draft for required fields and data integrity
 *
 * Checks for:
 * - Required fields (title, slug, content, pillar, CTA fields)
 * - Valid pillar selection
 * - Valid CTA type
 *
 * @param draft - Partial blog draft object to validate
 * @returns Validation result with isValid flag and error messages array
 * @example
 * ```typescript
 * const draft = { title: "Test", content: "...", pillar: "ai" };
 * const result = validateBlogDraft(draft);
 * if (!result.isValid) {
 *   console.error("Validation errors:", result.errors);
 * }
 * ```
 */
export function validateBlogDraft(draft: Partial<BlogDraft>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!draft.title?.trim()) {
    errors.push('Title is required');
  }

  if (!draft.slug?.trim()) {
    errors.push('Slug is required');
  }

  if (!draft.content?.trim()) {
    errors.push('Content is required');
  }

  if (!draft.pillar || !Object.keys(PILLARS).includes(draft.pillar)) {
    errors.push('Valid pillar is required');
  }

  if (!draft.ctaType || !['newsletter', 'podcast', 'services', 'lead_magnet'].includes(draft.ctaType)) {
    errors.push('Valid CTA type is required');
  }

  if (!draft.ctaHeadline?.trim()) {
    errors.push('CTA headline is required');
  }

  if (!draft.ctaLink?.trim()) {
    errors.push('CTA link is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Performance Scoring
 */

/**
 * Calculate weighted performance score for blog content
 *
 * Scoring algorithm weights:
 * - Views: 25%
 * - Engagement Time: 20%
 * - Conversions: 25%
 * - Social Shares: 15%
 * - Search Impressions: 10%
 * - Bounce Rate: 5%
 *
 * Each metric is normalized against benchmark thresholds and combined
 * into a score from 0 to 1.
 *
 * @param performance - Partial content performance data
 * @returns Performance score (0-1 scale, rounded to 2 decimal places)
 * @example
 * ```typescript
 * const score = calculatePerformanceScore({
 *   views: 500,
 *   engagementTime: 120,
 *   conversions: 5,
 *   socialShares: 25,
 *   searchImpressions: 2000,
 *   bounceRate: 0.4
 * });
 * console.log(score); // 0.68
 * ```
 */
export function calculatePerformanceScore(performance: Partial<ContentPerformance>): number {
  const {
    views = 0,
    engagementTime = 0,
    conversions = 0,
    socialShares = 0,
    searchImpressions = 0,
    bounceRate = 1
  } = performance;

  // Normalize metrics (these thresholds can be adjusted based on Audio Jones benchmarks)
  const normalizedViews = Math.min(views / 1000, 1); // 1000 views = max score
  const normalizedEngagement = Math.min(engagementTime / 180, 1); // 3 minutes = max score
  const normalizedConversions = Math.min(conversions / 10, 1); // 10 conversions = max score
  const normalizedShares = Math.min(socialShares / 50, 1); // 50 shares = max score
  const normalizedImpressions = Math.min(searchImpressions / 5000, 1); // 5000 impressions = max score
  const normalizedBounce = 1 - Math.min(bounceRate, 1); // Lower bounce rate = higher score

  // Weighted score calculation
  const score = (
    normalizedViews * 0.25 +
    normalizedEngagement * 0.20 +
    normalizedConversions * 0.25 +
    normalizedShares * 0.15 +
    normalizedImpressions * 0.10 +
    normalizedBounce * 0.05
  );

  return Math.round(score * 100) / 100; // Round to 2 decimal places
}

// Audio Jones voice validation patterns
export const VOICE_PATTERNS = {
  required: [
    /audio\s+jones/i,
    /aj\s+digital/i
  ],
  encouraged: [
    /framework/i,
    /operator/i,
    /miami/i,
    /(EPM|ASI|PR|AOF)/i,
    /automation/i,
    /predictable/i,
    /growth/i
  ],
  discouraged: [
    /we\s+believe/i,
    /cutting[\s-]?edge/i,
    /revolutionary/i,
    /game[\s-]?changing/i
  ]
};

/**
 * Validate content against Audio Jones brand voice guidelines
 *
 * Checks for:
 * 1. Required elements: Must mention "Audio Jones" or "AJ DIGITAL"
 * 2. Encouraged patterns: Framework references, operator voice, automation focus
 * 3. Discouraged patterns: Generic marketing language, buzzwords
 *
 * @param content - Full blog content to validate
 * @returns Validation result with isValid flag and feedback array
 * @example
 * ```typescript
 * const validation = validateBrandVoice(content);
 * if (!validation.isValid) {
 *   console.warn("Brand voice issues:", validation.feedback);
 * }
 * ```
 */
export function validateBrandVoice(content: string): { isValid: boolean; feedback: string[] } {
  const feedback: string[] = [];
  let isValid = true;

  // Check for required brand mentions
  const hasBrandMention = VOICE_PATTERNS.required.some(pattern => pattern.test(content));
  if (!hasBrandMention) {
    feedback.push('Content should mention "Audio Jones" or "AJ DIGITAL"');
    isValid = false;
  }

  // Check for encouraged voice patterns
  const encouragedMatches = VOICE_PATTERNS.encouraged.filter(pattern => pattern.test(content));
  if (encouragedMatches.length < 2) {
    feedback.push('Consider including more Audio Jones voice elements (frameworks, operator perspective, automation focus)');
  }

  // Check for discouraged patterns
  const discouragedMatches = VOICE_PATTERNS.discouraged.filter(pattern => pattern.test(content));
  if (discouragedMatches.length > 0) {
    feedback.push('Avoid generic marketing language - maintain Audio Jones operator voice');
  }

  return { isValid, feedback };
}