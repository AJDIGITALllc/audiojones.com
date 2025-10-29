// components/BuildStamp.tsx
export default function BuildStamp() {
  const sha = (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "").slice(0, 7);
  const ver = process.env.NEXT_PUBLIC_ASSET_VERSION || "";
  return (
    <small
      aria-label="build stamp"
      style={{ opacity: 0.6, fontSize: 12, letterSpacing: 0.2 }}
    >
      build {sha || "dev"} · v={ver || "dev"}
    </small>
  );
}