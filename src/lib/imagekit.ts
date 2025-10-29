// lib/imagekit.ts
type LoaderProps = { src: string; width?: number; quality?: number };

const IK_BASE_RAW = (process.env.NEXT_PUBLIC_IMAGEKIT_URL || "").trim().replace(/\/+$/, "");
const IK_ENABLED = IK_BASE_RAW.length > 0;

const VERSION =
  process.env.NEXT_PUBLIC_ASSET_VERSION ||
  (process.env.VERCEL_GIT_COMMIT_SHA || "").slice(0, 7) ||
  "dev";

// map your repo paths -> ImageKit paths
function mapLocalToIK(src: string): string {
  let s = src.trim();
  s = s.replace(/^public\//i, "");
  if (!s.startsWith("/")) s = "/" + s;

  // Icons
  if (/^\/assets\/Icons\//i.test(s)) {
    s = s.replace(/^\/assets\/Icons\//i, "/icons/");
  }

  // Main image library
  if (/^\/assets\/AUDIO JONES WEBSITE IMAGES\//i.test(s)) {
    // Option A: flatten under /images
    s = s.replace(/^\/assets\/AUDIO JONES WEBSITE IMAGES\//i, "/images/");
    // Option B: route subfolders if you want (example):
    // s = s.replace(/^\/assets\/AUDIO JONES WEBSITE IMAGES\/home\//i, "/hero/");
  }

  // Background images
  if (/^\/assets\/Backgrounds\//i.test(s)) {
    s = s.replace(/^\/assets\/Backgrounds\//i, "/backgrounds/");
  }

  // Client testimonials
  if (/^\/assets\/Client Testiomonials\//i.test(s)) {
    s = s.replace(/^\/assets\/Client Testiomonials\//i, "/testimonials/");
  }

  s = s.replace(/\/{2,}/g, "/");
  return `${IK_BASE_RAW}${s}`;
}

function appendQuery(url: string, key: string, val?: string | number) {
  if (val === undefined || val === null) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`;
}

export function imageKitLoader({ src, width, quality }: LoaderProps) {
  // Absolute URLs: return as-is (works for both modes)
  if (src.startsWith("http")) return src;

  // If IK is disabled, serve local path (e.g., /assets/... from /public)
  if (!IK_ENABLED) return src;

  // IK enabled: map + transform + version
  let out = mapLocalToIK(src);
  const tr: string[] = [];
  if (width) tr.push(`w-${width}`);
  if (quality) tr.push(`q-${quality}`);
  if (tr.length) out = appendQuery(out, "tr", tr.join(","));
  out = appendQuery(out, "v", VERSION);
  return out;
}

// Helper for plain <img> tags (non-next/image)
export function getImageSrc(src: string, width?: number, quality?: number) {
  return imageKitLoader({ src, width, quality });
}

// Utility to check if ImageKit is enabled
export function isImageKitEnabled(): boolean {
  return IK_ENABLED;
}