# Blog Automation Specification

**Version**: 1.0.0  
**Owner**: AJ DIGITAL LLC (Audio Jones)  
**Target**: Next.js + n8n + Perplexity API + Firebase Admin  
**Status**: Implementation Ready  

---

## Purpose

Create a full-proof, repeatable, automation-driven blog system for Audio Jones under AJ DIGITAL LLC, powered by Perplexity research, with admin controls, scheduling, and distribution. This system will generate high-quality, AEO/SEO-optimized content that operates exclusively within our 5 strategic pillars, maintains consistent Audio Jones voice, and integrates seamlessly with existing Marketing Automation, Data Intelligence, AI Optimization, and Client Delivery modules.

The goal is to publish 2-3 pillar-focused posts weekly with zero manual research overhead while maintaining brand authority and commercial relevance.

---

## Scope

### Blog UI (Next.js)
- **Public Pages**: `/blog`, `/blog/[slug]`
- **Admin Interface**: `/blog/admin` (Firebase custom claim `admin: true` required)
- **API Routes**: `/api/blog/publish`, `/api/blog/draft`, `/api/content/track`

### Automation Pipeline (n8n)
- **CRON Trigger**: Daily 08:00 ET → Perplexity research → LLM generation → draft creation → admin notification
- **Research Flow**: Perplexity API → JSON research payload → Audio Jones voice conversion → AEO/SEO enhancement
- **Publishing Flow**: Admin approval → scheduling → publish → distribution → analytics seeding

### Admin Components
- **Draft Management**: Approval queue with pillar/source filters
- **Content Scheduling**: Calendar interface with variant support
- **Performance Dashboard**: Integration with Data Intelligence module
- **A/B Testing**: Title, intro, CTA, and pillar-specific variant controls

### Distribution Network
- **Marketing Automation**: Newsletter integration via MailerLite
- **Social Queue**: Podcast-news short versions for social distribution
- **Site Integration**: Auto-revalidation of `/blog` and individual slugs

### Analytics & Optimization
- **Performance Tracking**: Write events to Data Intelligence module
- **AI Optimization**: Trigger regeneration of underperforming content
- **Content Intelligence**: Track pillar performance and audience engagement

---

## Architecture

### Content Pipeline Flow
```
Research Sources → Perplexity API → Voice/AEO Merge → Draft Creation → Admin Review → Scheduling → Publishing → Distribution → Analytics → Optimization Loop
```

### 5 Strategic Pillars (Hard-Coded)
```yaml
brand: "Audio Jones"
legal: "AJ DIGITAL LLC"
pillars:
  - id: ai
    label: "AI for Marketing & Creators"
    intents: ["news", "how-to", "framework-link", "opinion"]
  - id: marketing
    label: "AEO/SEO, Funnels, Automation"
    intents: ["educate", "commercial", "authority"]
  - id: podcast-news
    label: "Podcast, Creator, Industry Insights & News"
    intents: ["news", "trend", "repurpose"]
  - id: tech-business-trends
    label: "Tech, Business & Trends"
    intents: ["news", "analysis", "operator POV"]
  - id: personal-brand
    label: "Personal Brand Development / KOL"
    intents: ["thought-lead", "story", "playbook"]
```

### File Structure
```
/ai/
  /sources/
    /perplexity/
      base_research.md           # Perplexity API prompt template
  /prompts/
    /blog/
      from-perplexity.md        # LLM blog generation prompt
  /voice/
    audiojones.md               # Brand voice guard and style rules
  /partials/
    /aeo/
      ai.json                   # AI pillar AEO patterns
      marketing.json            # Marketing pillar AEO patterns
      podcast-news.json         # Podcast/News pillar AEO patterns
      tech-business-trends.json # Tech/Business pillar AEO patterns
      personal-brand.json       # Personal Brand pillar AEO patterns
```

### Source Priority System
1. **Internal Research** (EPM, ASI, PR, AOF frameworks) → Priority 1
2. **Perplexity API** (latest news/trends) → Priority 2
3. **Target Feeds** (industry RSS/social) → Priority 3
4. **YouTube Transcripts** (when provided) → Priority 4

---

## Data Model

### Tables/Collections

#### `topical_map`
```typescript
interface TopicalMap {
  id: string
  pillar: 'ai' | 'marketing' | 'podcast-news' | 'tech-business-trends' | 'personal-brand'
  topic: string
  persona: 'creator' | 'entrepreneur' | 'smb' | 'agency'
  intent: string
  source_urls: string[]
  priority: number
  last_generated: Date
  active: boolean
}
```

#### `blog_drafts`
```typescript
interface BlogDraft {
  id: string
  pillar: string
  source: 'perplexity' | 'internal' | 'mixed'
  status: 'draft' | 'needs_review' | 'approved' | 'scheduled' | 'published' | 'optimization_pending'
  title: string
  slug: string
  content: string // Markdown
  seo_meta: {
    title: string
    description: string
    keywords: string[]
    og_image?: string
  }
  aeo_meta: {
    faqs: Array<{q: string, a: string}>
    key_takeaways: string[]
    structured_data: object
  }
  cta_block: {
    type: 'newsletter' | 'podcast' | 'services' | 'lead_magnet'
    headline: string
    description: string
    link: string
  }
  research_payload?: object // Original Perplexity JSON
  framework_used?: 'EPM' | 'ASI' | 'PR' | 'AOF'
  created_at: Date
  updated_at: Date
  scheduled_for?: Date
  published_at?: Date
}
```

#### `blog_variants`
```typescript
interface BlogVariant {
  id: string
  draft_id: string
  variant_type: 'title' | 'intro' | 'cta' | 'hero_media'
  original_value: string
  variant_value: string
  test_percentage: number
  performance_data?: object
  active: boolean
}
```

#### `content_perf`
```typescript
interface ContentPerformance {
  id: string
  draft_id: string
  slug: string
  pillar: string
  views: number
  engagement_time: number
  conversions: number
  social_shares: number
  search_impressions: number
  bounce_rate: number
  performance_score: number
  last_updated: Date
}
```

#### `content_schedule`
```typescript
interface ContentSchedule {
  id: string
  draft_id: string
  scheduled_for: Date
  status: 'pending' | 'published' | 'failed'
  distribution_channels: string[]
  retry_count: number
  last_attempt?: Date
  error_message?: string
}
```

### Status State Machine
```
draft → needs_review → approved → scheduled → published → optimization_pending
```

---

## UI Requirements

### Blog Page Components
- **BlogHero**: Title, author, date, pillar badge, reading time
- **BlogContent**: Markdown rendering with syntax highlighting
- **KeyTakeaways**: Bullet points extracted from AEO metadata
- **FAQBlock**: Structured Q&A from AEO metadata
- **AuthorCard**: Audio Jones bio with social links
- **RelatedPosts**: Pillar-based recommendations
- **LeadMagnetCTA**: Dynamic CTA based on pillar and content type
- **SEOHead**: Meta tags, structured data, Open Graph

### Admin Route: `/blog/admin`
**Protection**: Firebase custom claim `admin: true` required

#### Admin Views
1. **Draft List**
   - Filters: pillar, source, status, date range
   - Actions: approve, schedule, edit, delete, regenerate
   - Bulk operations: approve multiple, schedule batch

2. **Draft Detail**
   - **Preview**: Rendered markdown with live preview
   - **Meta Editor**: SEO title, description, keywords, slug
   - **AEO Editor**: FAQ management, key takeaways
   - **CTA Editor**: Headline, description, link customization
   - **Scheduling**: Calendar picker with timezone support

3. **Content Scheduler**
   - **Calendar View**: Monthly/weekly grid with scheduled posts
   - **Queue Management**: Drag-and-drop rescheduling
   - **Conflict Resolution**: Pillar distribution balance

4. **Performance Dashboard**
   - **Analytics Integration**: Data Intelligence module connection
   - **Pillar Performance**: Engagement by content type
   - **Optimization Queue**: Underperforming content list

### A/B Variant UI
**Pillar-Specific Testing**:
- **AI & Marketing**: Title and CTA variants
- **Podcast-News**: Length variants (short news vs. long analysis)
- **Personal Brand**: Story opener vs. framework opener variants
- **Tech-Business**: Data-driven vs. opinion-led variants

---

## Automation Flow

### Daily Research & Generation (08:00 ET)
```yaml
n8n_workflow:
  trigger:
    type: cron
    schedule: "0 8 * * *"
    timezone: "America/New_York"
  
  steps:
    1_get_topics:
      action: query_database
      table: topical_map
      filters:
        - active: true
        - pillar: [ai, marketing, podcast-news, tech-business-trends, personal-brand]
        - last_generated: older_than_24h
      limit: 5
    
    2_perplexity_research:
      action: http_request
      endpoint: perplexity_api
      prompt_template: /ai/sources/perplexity/base_research.md
      variables:
        topic: "{{step1.topic}}"
        pillar: "{{step1.pillar}}"
        today: "{{current_date}}"
    
    3_load_aeo_partial:
      action: load_file
      path: "/ai/partials/aeo/{{step1.pillar}}.json"
    
    4_generate_blog:
      action: llm_request
      model: "gpt-4"
      prompt_template: /ai/prompts/blog/from-perplexity.md
      context:
        perplexity_json: "{{step2.response}}"
        pillar: "{{step1.pillar}}"
        aeo_partial: "{{step3.content}}"
        voice_guard: "{{load_file('/ai/voice/audiojones.md')}}"
    
    5_save_draft:
      action: create_record
      table: blog_drafts
      data:
        pillar: "{{step1.pillar}}"
        source: "perplexity"
        status: "needs_review"
        content: "{{step4.markdown}}"
        seo_meta: "{{step4.seo_meta}}"
        aeo_meta: "{{step4.aeo_meta}}"
        research_payload: "{{step2.response}}"
    
    6_notify_admin:
      action: send_notification
      channels: [email, slack]
      message: "New {{step1.pillar}} draft ready for review"
      link: "/blog/admin?draft={{step5.id}}"
```

### Publishing Flow
```yaml
publish_workflow:
  trigger:
    type: database_watch
    table: content_schedule
    condition: status = 'pending' AND scheduled_for <= now()
  
  steps:
    1_publish_post:
      action: api_request
      endpoint: "/api/blog/publish"
      data:
        draft_id: "{{trigger.draft_id}}"
    
    2_revalidate_pages:
      action: revalidate_nextjs
      paths:
        - "/blog"
        - "/blog/{{draft.slug}}"
    
    3_seed_analytics:
      action: create_record
      table: content_perf
      data:
        draft_id: "{{trigger.draft_id}}"
        slug: "{{draft.slug}}"
        pillar: "{{draft.pillar}}"
        performance_score: 0
    
    4_distribute_content:
      action: parallel
      tasks:
        - marketing_automation:
            endpoint: mailerlite_api
            template: blog_summary
            data:
              title: "{{draft.title}}"
              link: "/blog/{{draft.slug}}"
              summary: "{{draft.content | excerpt}}"
        
        - social_queue:
            condition: "{{draft.pillar}} == 'podcast-news'"
            action: create_social_variant
            platforms: [twitter, linkedin]
            content_type: "short_news"
```

### Optimization Loop (Nightly)
```yaml
optimization_workflow:
  trigger:
    type: cron
    schedule: "0 2 * * *"
  
  steps:
    1_identify_underperformers:
      action: query_database
      table: content_perf
      filters:
        - published_at: older_than_7d
        - performance_score: less_than_0.3
      limit: 3
    
    2_trigger_regeneration:
      action: create_record
      table: blog_drafts
      data:
        source: "optimization"
        status: "needs_review"
        original_draft_id: "{{step1.id}}"
        regeneration_reason: "underperforming"
```

---

## Distribution

### Marketing Automation Integration
```typescript
// On publish event
const distributionPayload = {
  brand: "Audio Jones / AJ DIGITAL LLC",
  title: draft.title,
  summary: extractSummary(draft.content),
  link: `https://audiojones.com/blog/${draft.slug}`,
  pillar: draft.pillar,
  cta: draft.cta_block,
  published_at: new Date()
}

// Send to MailerLite
await mailerlite.campaigns.create({
  template: 'blog_weekly_digest',
  content: distributionPayload
})
```

### Social Distribution (Conditional)
```typescript
// Only for podcast-news pillar
if (draft.pillar === 'podcast-news') {
  const socialVariant = await generateSocialVersion({
    originalContent: draft.content,
    maxLength: 280,
    platforms: ['twitter', 'linkedin'],
    tone: 'audiojones-social'
  })
  
  await socialQueue.add(socialVariant)
}
```

### Brand Consistency
All distributed content must include:
- Brand attribution: "Audio Jones / AJ DIGITAL LLC"
- Consistent voice and terminology
- Framework references (EPM, ASI, PR, AOF) when relevant
- Miami-forward operator perspective

---

## Git Spec Kit Tasks

### PHASE 1: Scaffold (Foundation)
**Goal**: Create basic blog infrastructure
- [ ] Create `/blog` page with post listing
- [ ] Create `/blog/[slug]` dynamic page with all UI components
- [ ] Create `/api/blog/draft` API route for draft management
- [ ] Create `/api/blog/publish` API route for publishing workflow
- [ ] Set up database schema for all content tables
- [ ] Create blog UI components: BlogHero, BlogContent, FAQBlock, etc.

### PHASE 2: Automation (Research & Generation)
**Goal**: Implement automated content pipeline
- [ ] Create Perplexity API integration with base research prompt
- [ ] Implement LLM blog generation with Audio Jones voice guard
- [ ] Create n8n workflow for daily research and generation
- [ ] Set up pillar-specific AEO partial loading system
- [ ] Implement draft creation and admin notification system
- [ ] Create research payload storage and retrieval

### PHASE 3: Admin (Management Interface)
**Goal**: Build comprehensive admin controls
- [ ] Create `/blog/admin` protected route with Firebase auth
- [ ] Implement draft list with pillar/source filtering
- [ ] Build draft detail editor with preview functionality
- [ ] Create content scheduler with calendar interface
- [ ] Implement A/B variant management system
- [ ] Add bulk operations for draft management

### PHASE 4: Analytics (Intelligence Integration)
**Goal**: Connect to Data Intelligence and performance tracking
- [ ] Create `/api/content/track` for performance data collection
- [ ] Integrate with existing Data Intelligence module
- [ ] Implement performance dashboard in admin interface
- [ ] Set up automated performance scoring algorithm
- [ ] Create underperformer identification system
- [ ] Add pillar-specific analytics views

### PHASE 5: Optimization (AI-Powered Improvements)
**Goal**: Automatic content optimization and regeneration
- [ ] Hook to existing AI Optimization module
- [ ] Implement nightly underperformer analysis
- [ ] Create automated regeneration workflow
- [ ] Set up A/B test result processing
- [ ] Implement content variant performance comparison
- [ ] Add optimization recommendation engine

### TODOs for Copilot/Jules
```typescript
// Missing files to generate:
// 1. Blog components
//    - src/components/blog/BlogHero.tsx
//    - src/components/blog/BlogContent.tsx
//    - src/components/blog/FAQBlock.tsx
//    - src/components/blog/AuthorCard.tsx
//    - src/components/blog/RelatedPosts.tsx
//    - src/components/blog/LeadMagnetCTA.tsx

// 2. Admin components
//    - src/components/admin/DraftList.tsx
//    - src/components/admin/DraftEditor.tsx
//    - src/components/admin/ContentScheduler.tsx
//    - src/components/admin/PerformanceDashboard.tsx

// 3. API routes
//    - src/app/api/blog/draft/route.ts
//    - src/app/api/blog/publish/route.ts
//    - src/app/api/content/track/route.ts

// 4. Database models
//    - src/lib/models/blog.ts
//    - src/lib/models/content.ts

// 5. Automation utilities
//    - src/lib/automation/perplexity.ts
//    - src/lib/automation/blog-generator.ts
//    - src/lib/automation/voice-guard.ts

// 6. n8n workflows
//    - workflows/blog-automation.json
//    - workflows/content-optimization.json
```

---

## Security & Operations

### Authentication & Authorization
- **Admin Routes**: All `/blog/admin/*` routes must verify Firebase custom claim `admin: true`
- **API Security**: All content management APIs require admin authentication
- **Draft Access**: Only authenticated admins can view unpublished drafts
- **Public Routes**: Blog listing and individual posts are publicly accessible

### Operational Logging
```typescript
// All automation must log to operations file
const logOperation = async (operation: string, data: any) => {
  await fs.appendFile('/ops/content-log.md', 
    `## ${new Date().toISOString()} - ${operation}\n` +
    `${JSON.stringify(data, null, 2)}\n\n`
  )
}

// Usage in automation flows
await logOperation('perplexity_research', {
  topic: research.topic,
  pillar: research.pillar,
  tokens_used: response.usage,
  success: true
})
```

### Brand Voice Protection
```typescript
// All LLM calls must include brand voice guard
const generateWithVoiceGuard = async (prompt: string, context: any) => {
  const voiceGuard = await loadFile('/ai/voice/audiojones.md')
  const fullPrompt = `${voiceGuard}\n\n${prompt}`
  
  const response = await llm.generate({
    prompt: fullPrompt,
    context,
    temperature: 0.7,
    max_tokens: 2000
  })
  
  // Validate Audio Jones voice patterns
  if (!validateBrandVoice(response.content)) {
    throw new Error('Generated content failed brand voice validation')
  }
  
  return response
}
```

### Performance Monitoring
- **Response Times**: Track API response times for all content operations
- **Generation Quality**: Monitor LLM output quality scores
- **Publishing Success**: Track successful vs. failed publication attempts
- **User Engagement**: Monitor admin interface usage and efficiency

### Backup & Recovery
- **Draft Backup**: Automatic backup of all drafts before major edits
- **Research Payload Storage**: Preserve original Perplexity responses for regeneration
- **Version History**: Track all changes to published content
- **Rollback Capability**: Ability to revert to previous versions of published posts

---

## Implementation Notes

This specification is designed for immediate implementation using:
- **Next.js 14+** with App Router
- **Firebase Admin SDK** for authentication and database
- **n8n** for workflow automation
- **Perplexity API** for research intelligence
- **OpenAI/Compatible LLM** for content generation

The system integrates with existing AJ DIGITAL LLC modules:
- **Marketing Automation** (MailerLite integration)
- **Data Intelligence** (performance analytics)
- **AI Optimization** (content improvement)
- **Client Delivery** (branded content output)

All content maintains Audio Jones brand voice and operates exclusively within the 5 strategic pillars, ensuring consistent authority positioning and commercial relevance.