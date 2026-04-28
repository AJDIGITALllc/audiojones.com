// Audio Jones Applied Intelligence design tokens.
// Premium dark consulting palette used by all Applied Intelligence routes.

export const aiColors = {
  background: "#05070F",
  surface: "#0B1020",
  surfaceAlt: "#101827",
  primary: "#0911BB",
  primaryBright: "#3B5BFF",
  accent: "#C8A96A",
  text: "#F8FAFC",
  muted: "#94A3B8",
  border: "rgba(255,255,255,0.12)",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
} as const;

export const aiEntity = {
  name: "Audio Jones",
  legalName: "Tyrone Alexander Nelms",
  brandName: "AJ Digital",
  title: "Applied Intelligence Systems Partner",
  description:
    "Audio Jones helps founder-led businesses reduce noise, identify causal growth signals, and build Applied Intelligence Systems.",
  url: "https://audiojones.com",
  sameAs: [
    "https://www.linkedin.com/in/audiojones",
    "https://www.youtube.com/@audiojones",
    "https://audiojones.com",
  ],
  knowsAbout: [
    "Applied Intelligence Systems",
    "AI Consulting",
    "Marketing Attribution",
    "Signal vs Noise",
    "Business Systems",
    "Founder-Led Businesses",
    "AEO",
    "SEO",
    "AI Augmentation",
    "Systems Thinking",
  ],
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://audiojones.com";
