export const CTA_LINKS = {
  bookStrategy: "/book",
  servicesOverview: "/#services",
  podcast: "/podcast",
  insights: "/insights",
  portal: "/portal",
  artistHub: "/artist-hub",
  epm: "/epm",
  artistServices: {
    browseBeats: "https://whop.com/audiojones/beats",
    brandingCall: "https://whop.com/audiojones/branding-call",
    startCampaign: "https://whop.com/audiojones/artist-campaign",
    automateBrand: "https://whop.com/audiojones/automation-suite",
    consulting: "https://whop.com/audiojones/artist-consulting",
  },
  servicePillars: {
    personalBranding: "https://whop.com/audiojones/personal-branding",
    podcastProduction: "https://whop.com/audiojones/podcast-lab",
    aiSystems: "https://whop.com/audiojones/ai-marketing",
  },
  artistNetwork: "https://whop.com/audiojones/artist-network",
  artistStudioBooking: "https://whop.com/audiojones/studio-booking",
  epmWaitlist: "#epm-waitlist",
};

export const SERVICE_PILLARS = [
  {
    id: "personal-branding",
    title: "Personal Branding Authority",
    description:
      "We help founders and on-air talent build undeniable positioning that compounds across every touchpoint.",
    highlights: ["Brand Strategy", "Content Creation", "Audience Growth"],
    ctaLabel: "Build Your Authority",
    ctaHref: CTA_LINKS.servicePillars.personalBranding,
  },
  {
    id: "video-podcast",
    title: "Video Podcast Production",
    description:
      "From concept to multi-cam capture, we produce studio-grade podcasts designed to feed your entire content engine.",
    highlights: ["Full-Service Production", "High-Quality Editing", "Distribution Strategy"],
    ctaLabel: "Launch Your Show",
    ctaHref: CTA_LINKS.servicePillars.podcastProduction,
  },
  {
    id: "ai-marketing",
    title: "AI Marketing Systems",
    description:
      "Automation, analytics, and optimization that keep your offers, funnels, and follow-up running on autopilot.",
    highlights: ["AI Automation", "Content Repurposing", "Lead Generation"],
    ctaLabel: "Automate Growth",
    ctaHref: CTA_LINKS.servicePillars.aiSystems,
  },
] as const;

export const ARTIST_SERVICE_MATRIX = [
  {
    id: "music-production",
    title: "Music Production",
    description: "Beat licensing, recording, mixing, and mastering tailored for independent artists.",
    ctaLabel: "Browse Beats",
    ctaHref: CTA_LINKS.artistServices.browseBeats,
  },
  {
    id: "branding",
    title: "Branding & Identity",
    description: "Visual identity, cover art, and content kits engineered for social discovery.",
    ctaLabel: "Book Branding Call",
    ctaHref: CTA_LINKS.artistServices.brandingCall,
  },
  {
    id: "marketing",
    title: "Artist Marketing",
    description: "Paid and organic campaign strategy with automation that keeps momentum high.",
    ctaLabel: "Start Campaign",
    ctaHref: CTA_LINKS.artistServices.startCampaign,
  },
  {
    id: "automation",
    title: "AI Automation",
    description: "Personalized automations for release schedules, merch drops, and fan nurture.",
    ctaLabel: "Automate My Brand",
    ctaHref: CTA_LINKS.artistServices.automateBrand,
  },
  {
    id: "consulting",
    title: "Consulting & Strategy",
    description: "1:1 artist growth consulting, monetization mapping, and rollout planning.",
    ctaLabel: "Book Session",
    ctaHref: CTA_LINKS.artistServices.consulting,
  },
] as const;

export const EPM_STREAMS = [
  {
    title: "Predictive Content Intelligence",
    description:
      "Audience and emotional signal scoring that forecasts content resonance before you publish.",
    status: "In Pilot",
  },
  {
    title: "Automation Blueprint Library",
    description:
      "Pre-built n8n, MailerLite, and Whop automations that plug directly into your marketing stack.",
    status: "Launching Soon",
  },
  {
    title: "Revenue Attribution Studio",
    description:
      "Data studio dashboards and AI prompts that connect content engagement to actual revenue.",
    status: "Private Beta",
  },
] as const;

export const COMING_SOON_CAPABILITIES = [
  {
    title: "Predictive Offer Lab",
    description:
      "Dynamic offer testing that uses emotional triggers and conversion data to recommend the next best promotion.",
    statusLabel: "Research Sprint",
  },
  {
    title: "Sentiment Heatmaps",
    description:
      "Live dashboards that highlight which clips, emails, and community drops spark the strongest responses.",
    statusLabel: "Prototype",
  },
  {
    title: "Creator Command Center",
    description:
      "Unified control panel connecting your CMS, automations, and analytics with actionable AI prompts.",
    statusLabel: "Coming Soon",
  },
] as const;

export const ARTIST_TESTIMONIALS = [
  {
    quote:
      "Partnering with Audio Jones elevated our digital storytelling and helped modernize the Circle House brand with automation and creative strategy that actually moves culture.",
    name: "Abebe Lewis",
    role: "Music Executive, Circle House Digital",
    image:
      "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/Client%20Testiomonials/ABEBE_LEWIS_MAGE_PROFILE_2025_2.webp?updatedAt=1762105182886",
  },
  {
    quote:
      "The production quality and AI-driven marketing systems transformed how I engage my audience. The Audio Jones team gets it on every level — creative, business, and tech.",
    name: "K Foxx",
    role: "99 Jams Radio Personality",
    image:
      "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/Client%20Testiomonials/KFOXX_IMAGE_PROFILE_2025.webp?updatedAt=1762105182864",
  },
  {
    quote:
      "From podcast automation to brand positioning, Audio Jones gave us a complete system that attracts clients effortlessly. It’s next-level marketing.",
    name: "Mike Keegan",
    role: "Business Owner",
    image:
      "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/Client%20Testiomonials/MIKE_KEEGAN_IMAGE_PROFILE_2025.png?updatedAt=1761600050350",
  },
] as const;
