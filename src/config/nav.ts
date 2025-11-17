/**
 * Navigation Configuration for Audio Jones
 * 
 * Central source of truth for all navigation items across the site.
 * Used by Header, Footer, and any navigation components.
 */

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/services",
    description: "Explore our service offerings and packages",
  },
  {
    label: "Systems",
    href: "/systems",
    description: "Integrated platform modules",
    children: [
      {
        label: "Client Delivery",
        href: "/systems/client-delivery",
        description: "Project management and seamless delivery",
      },
      {
        label: "Marketing Automation",
        href: "/systems/marketing-automation",
        description: "AI-powered marketing and content distribution",
      },
      {
        label: "AI Optimization",
        href: "/systems/ai-optimization",
        description: "Intelligent optimization and performance tracking",
      },
      {
        label: "Data Intelligence",
        href: "/systems/data-intelligence",
        description: "Analytics, insights, and data-driven decisions",
      },
    ],
  },
  {
    label: "For Creators",
    href: "/creators",
    description: "Tools and systems for artists, podcasters, and creators",
  },
  {
    label: "For Businesses",
    href: "/business",
    description: "Enterprise solutions for consultants, SMBs, and thought leaders",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "About",
    href: "/about",
  },
];

export const portalNav: NavItem[] = [
  {
    label: "Client Portal",
    href: "https://client.audiojones.com",
    external: true,
    description: "Manage your projects, bookings, and assets",
  },
  {
    label: "Admin Portal",
    href: "https://admin.audiojones.com",
    external: true,
    description: "Administrative access for team members",
  },
];

export const systemModules = [
  {
    id: "client-delivery",
    name: "Client Delivery",
    tagline: "Seamless Project Management",
    description: "Automated project management, real-time progress tracking, and transparent client communication.",
    href: "/systems/client-delivery",
    icon: "📦",
    color: "from-[#008080] to-[#00CED1]",
    funnelStage: "deliver",
  },
  {
    id: "marketing-automation",
    name: "Marketing Automation",
    tagline: "AI-Powered Distribution",
    description: "Intelligent content distribution, social media automation, and multi-channel campaign management.",
    href: "/systems/marketing-automation",
    icon: "🚀",
    color: "from-[#FF4500] to-[#FFD700]",
    funnelStage: "discover",
  },
  {
    id: "ai-optimization",
    name: "AI Optimization",
    tagline: "Intelligent Performance",
    description: "Real-time optimization, A/B testing, and machine learning-powered performance improvements.",
    href: "/systems/ai-optimization",
    icon: "🤖",
    color: "from-[#9370DB] to-[#FFD700]",
    funnelStage: "optimize",
  },
  {
    id: "data-intelligence",
    name: "Data Intelligence",
    tagline: "Actionable Insights",
    description: "Comprehensive analytics, custom dashboards, and data-driven decision making.",
    href: "/systems/data-intelligence",
    icon: "📊",
    color: "from-[#4169E1] to-[#00CED1]",
    funnelStage: "retain",
  },
];

export const funnelStages = [
  {
    id: "discover",
    label: "Discover",
    description: "Attract and engage your audience",
    modules: ["marketing-automation"],
  },
  {
    id: "book",
    label: "Book",
    description: "Convert prospects into clients",
    modules: ["client-delivery"],
  },
  {
    id: "deliver",
    label: "Deliver",
    description: "Execute and fulfill projects",
    modules: ["client-delivery"],
  },
  {
    id: "optimize",
    label: "Optimize",
    description: "Improve performance continuously",
    modules: ["ai-optimization"],
  },
  {
    id: "retain",
    label: "Retain",
    description: "Build long-term relationships",
    modules: ["data-intelligence"],
  },
];
