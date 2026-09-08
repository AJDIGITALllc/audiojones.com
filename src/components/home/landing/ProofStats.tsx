import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";

// ─── Asset ───────────────────────────────────────────────────────────────────

const BG =
  "/assets/Homepage/09-proof-metrics/backgrounds/fragmented-to-signal-bg-v2.webp";

// ─── Metric data ─────────────────────────────────────────────────────────────

// These describe what the installed system does, not measured client
// outcomes. No performance figure appears here until it can be sourced —
// see docs/strategy/AUDIOJONES_NICHE_VALIDATION_CORRECTIONS.md §1.
const stats = [
  {
    metric: "Response",
    display: "Agreed target",
    label: "Response-time targets are defined for the agreed channels and scope",
    accent: "#E8FF5A",
  },
  {
    metric: "Follow-up",
    display: "Agreed follow-up",
    label: "A defined schedule and owner for inquiries in the managed workflow",
    accent: "#666666",
  },
  {
    metric: "Attribution",
    display: "Linked results",
    label: "Connect inquiry sources, follow-up, and recorded outcomes. Test causal explanations where the evidence allows.",
    accent: "#4DACFF",
  },
  {
    metric: "Decision Clarity",
    display: "Clear next steps",
    label: "A shared view of what needs attention and who should act",
    accent: "#666666",
  },
];

/**
 * Section 6 — Proof / Results.
 *
 * Layer stack (bottom → top):
 *  z:1 — Background PNG
 *  z:2 — Gradient overlay + atmospheric glows
 *  z:3 — All live content
 *
 * Chart fix:
 *  Charts live in a `relative aspect-[16/7]` wrapper so the SVG fills a
 *  fixed-ratio box. viewBox="0 0 640 280" matches 16∶7 exactly — scaling is
 *  perfectly uniform, no stretching regardless of card width.
 */
export default function ProofStats() {
  return (
    <section
      id="proof"
      className="overflow-hidden border-t border-[var(--line-2)] py-24 sm:py-32"
      style={{ position: "relative", background: "#080808" }}
    >
      {/* ── z:1 Background image ── */}
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}
      >
        <Image
          src={BG}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          style={{ opacity: 0.5 }}
        />
      </div>

      {/* ── z:2a Main dark overlay ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(5,7,15,0.86) 0%, rgba(5,7,15,0.66) 42%, rgba(5,7,15,0.9) 100%)",
        }}
      />

      {/* ── z:2b Muted glow — Before side ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "25%",
          left: "-8%",
          width: "55%",
          height: "65%",
          zIndex: 2,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 65% 55% at 30% 50%, rgba(255,255,255,0.04), transparent 70%)",
        }}
      />

      {/* ── z:2c Blue glow — After side ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "25%",
          right: "-8%",
          width: "55%",
          height: "65%",
          zIndex: 2,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 65% 55% at 70% 50%, rgba(77,172,255,0.10), transparent 70%)",
        }}
      />

      {/* ── z:3 Live content ── */}
      <div
        style={{ position: "relative", zIndex: 3 }}
        className="mx-auto max-w-[1280px] px-5 sm:px-8"
      >
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <Eyebrow>Illustrative Before / After</Eyebrow>
          <h2 className="mt-4 t-h1 text-balance">
            From scattered inquiries to clear next steps.
          </h2>
          <p className="mt-5 t-lead text-fg-2">
            Example workflow, not a live customer dashboard. Channels and
            response targets depend on the agreed scope. Client results are
            published only with consent and supporting evidence.
          </p>
        </div>

        {/* ── Attribution Layer pill — centered above cards ── */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <span
            aria-hidden
            className="h-px w-16 sm:w-24"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.12))",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              whiteSpace: "nowrap",
              padding: "5px 14px",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            Inquiry and outcome tracking
          </span>
          <span
            aria-hidden
            className="h-px w-16 sm:w-24"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(255,255,255,0.12))",
            }}
          />
        </div>

        {/* ── Before / After cards ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PerfCard
            kind="before"
            title="Scattered inquiries and follow-up"
            statusLabel="Illustrative"
            kpis={[
              { label: "Follow-up", value: "Unclear", trend: "owner not defined", trendUp: false },
              { label: "Lead source", value: "Unlinked", trend: "outcome not recorded", trendUp: false },
            ]}
            chart={<ChaoticChart />}
            range="Example before implementation"
            bullets={[
              "Inquiries spread across calls, forms, and messages",
              "No clear record of which inquiries became work",
              "Follow-up depends on someone remembering",
              "Owner has to chase the next step",
            ]}
          />
          <PerfCard
            kind="after"
            title="Example of a connected workflow"
            statusLabel="Illustrative"
            kpis={[
              { label: "Response", value: "Assigned", trend: "agreed owner and target", trendUp: true },
              { label: "Outcomes", value: "Recorded", trend: "linked to inquiries", trendUp: true },
            ]}
            chart={<CleanChart />}
            range="Example after implementation"
            bullets={[
              "Inquiries from agreed channels in a shared workflow",
              "Follow-up and booking outcomes recorded together",
              "Defined next steps and human escalation",
              "Owner can see what needs attention",
            ]}
          />
        </div>

        {/* ── Metric tiles ── */}
        <dl className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.metric}
              className="flex flex-col rounded-2xl p-6"
              style={{
                background: "rgba(10,14,28,0.72)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderTop: `2px solid ${s.accent}`,
                backdropFilter: "blur(8px)",
              }}
            >
              <dt
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: s.accent,
                }}
              >
                {s.metric}
              </dt>
              <dd
                className="mt-3 font-bold leading-none"
                style={{
                  fontFamily: "var(--font-headline)",
                  fontSize: "clamp(22px,3vw,38px)",
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                }}
              >
                {s.display}
              </dd>
              <dd
                className="mt-2"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.62)",
                  lineHeight: 1.5,
                }}
              >
                {s.label}
              </dd>
            </div>
          ))}
        </dl>

        {/* Disclaimer */}
        <p
          className="mt-6 text-center max-w-2xl mx-auto leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.04em",
          }}
        >
          Describes the installed system, not measured client results. Outcomes
          depend on implementation, offer, market, and operational maturity.
        </p>
      </div>
    </section>
  );
}

// ─── PerfCard — gradient-bordered analytics card on dark slab ────────────────

type Kpi = {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
};

type PerfCardProps = {
  kind: "before" | "after";
  title: string;
  statusLabel: string;
  kpis: readonly [Kpi, Kpi];
  chart: React.ReactNode;
  range: string;
  bullets: readonly string[];
};

function PerfCard({
  kind,
  title,
  statusLabel,
  kpis,
  chart,
  range,
  bullets,
}: PerfCardProps) {
  const isAfter = kind === "after";

  const ringGradient = isAfter
    ? "linear-gradient(135deg, #4DACFF 0%, #E8FF5A 60%, #4DACFF 100%)"
    : "linear-gradient(135deg, rgba(102,102,102,0.45) 0%, rgba(102,102,102,0.25) 55%, rgba(102,102,102,0.15) 100%)";

  const iconBg = isAfter
    ? "linear-gradient(135deg, #4DACFF, #E8FF5A)"
    : "linear-gradient(135deg, #666666, #4A4A4A)";

  const accent = isAfter ? "var(--aj-blue)" : "#666666";

  const statusDotColor = isAfter ? "var(--aj-success)" : "var(--accent-amber)";
  const statusFg = isAfter
    ? "var(--aj-success)"
    : "var(--accent-amber)";
  const statusBg = isAfter
    ? "rgba(61,255,176,0.10)"
    : "rgba(255,179,64,0.10)";

  return (
    <article
      aria-label={`${isAfter ? "After" : "Before"}: ${title}`}
      className="group relative flex flex-col rounded-2xl p-[1px]"
      style={{
        background: ringGradient,
        boxShadow: isAfter
          ? "0 24px 80px rgba(77,172,255,0.20), 0 0 0 1px rgba(77,172,255,0.10)"
          : "0 24px 80px rgba(0,0,0,0.32), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="flex h-full flex-col rounded-2xl p-6 sm:p-7"
        style={{
          background: "rgba(5,7,15,0.96)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ background: iconBg }}
            >
              {isAfter ? (
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l3-3 4 4 5-7 6 9"
                  />
                </svg>
              )}
            </span>
            <div>
              <p
                className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{ color: accent }}
              >
                {isAfter ? "After" : "Before"}
              </p>
              <h3 className="mt-1 text-base font-semibold leading-tight text-white sm:text-lg">
                {title}
              </h3>
            </div>
          </div>

          <span
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.10em]"
            style={{ background: statusBg, color: statusFg }}
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: statusDotColor }}
            />
            {statusLabel}
          </span>
        </div>

        {/* KPI tiles */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="rounded-lg border p-3"
              style={{
                background: "rgba(10,14,28,0.72)",
                borderColor: "rgba(102,102,102,0.12)",
              }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-fg-3">
                {k.label}
              </p>
              <p
                className="mt-1 font-headline text-xl font-bold leading-none text-white"
                style={{ letterSpacing: "-0.02em" }}
              >
                {k.value}
              </p>
              <p
                className="mt-1 font-mono text-[10px] font-medium"
                style={{
                  color: k.trendUp ? "var(--aj-success)" : "var(--accent-amber)",
                }}
              >
                {k.trend}
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div
          className="relative mt-5 w-full overflow-hidden rounded-lg border"
          style={{
            aspectRatio: "16 / 7",
            background: isAfter
              ? "linear-gradient(180deg, rgba(77,172,255,0.07), rgba(5,7,15,0.30))"
              : "rgba(5,7,15,0.40)",
            borderColor: isAfter
              ? "rgba(77,172,255,0.16)"
              : "rgba(255,255,255,0.08)",
          }}
        >
          {chart}
        </div>

        {/* Bullets */}
        <ul className="mt-5 flex-1 space-y-1.5">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-xs leading-5 text-fg-2 sm:text-sm sm:leading-6"
            >
              <span
                aria-hidden
                className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full"
                style={{ background: accent, opacity: 0.7 }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-[rgba(102,102,102,0.10)] pt-4">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-fg-3">
            {range}
          </span>
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{ color: accent }}
          >
            {isAfter ? "Axis: Signal / Revenue" : "Axis: Activity / Outcome"}
          </span>
        </div>
      </div>
    </article>
  );
}

// ─── Charts ───────────────────────────────────────────────────────────────────
//
// Both SVGs use viewBox="0 0 640 280" (ratio 16∶7) and are placed
// `absolute inset-0 h-full w-full` inside an `aspect-[16/7]` container.
// Scaling is perfectly uniform — no distortion regardless of card width.

function ChaoticChart() {
  // 10 bars, coords in 640×280 space
  const bars = [
    { x: 10, h: 104 },
    { x: 74, h: 196 },
    { x: 138, h: 130 },
    { x: 202, h: 224 },
    { x: 266, h: 160 },
    { x: 330, h: 208 },
    { x: 394, h: 112 },
    { x: 458, h: 192 },
    { x: 522, h: 98 },
    { x: 586, h: 176 },
  ];
  const barW = 42;

  // Jagged line mapped to 640×280 coordinate space
  const line =
    "M0,187 L51,131 L102,168 L154,84 L205,187 L256,103 L307,215 L358,112 L410,178 L461,75 L512,196 L563,131 L614,159 L640,140";

  return (
    <svg
      viewBox="0 0 640 280"
      preserveAspectRatio="none"
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      {[70, 140, 210].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="640"
          y2={y}
          stroke="#666666"
          strokeWidth="1"
          opacity="0.12"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {[128, 256, 384, 512].map((x) => (
        <line
          key={x}
          x1={x}
          y1="0"
          x2={x}
          y2="280"
          stroke="#666666"
          strokeWidth="1"
          opacity="0.08"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <text x="8" y="22" fill="#666666" opacity=".6" fontFamily="ui-monospace, monospace" fontSize="11">
        NOISE
      </text>
      <text x="570" y="264" fill="#666666" opacity=".6" fontFamily="ui-monospace, monospace" fontSize="11">
        TIME
      </text>
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={280 - b.h}
          width={barW}
          height={b.h}
          fill="rgba(255,255,255,0.06)"
        />
      ))}
      {/* Jagged line */}
      <path
        d={line}
        fill="none"
        stroke="#666666"
        strokeWidth="3"
        strokeLinejoin="round"
        opacity="0.88"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function CleanChart() {
  // Smooth upward curve, coords in 640×280 space
  const curve =
    "M0,243 C128,215 224,178 352,131 C461,94 544,65 640,37";
  const area =
    "M0,243 C128,215 224,178 352,131 C461,94 544,65 640,37 L640,280 L0,280 Z";

  const nodes = [
    { x: 64, y: 229 },
    { x: 192, y: 192 },
    { x: 320, y: 145 },
    { x: 461, y: 94 },
    { x: 608, y: 47 },
  ];

  return (
    <svg
      viewBox="0 0 640 280"
      preserveAspectRatio="none"
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id="cleanFill2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4DACFF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#4DACFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[70, 140, 210].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="640"
          y2={y}
          stroke="#4DACFF"
          strokeWidth="1"
          opacity="0.14"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {[128, 256, 384, 512].map((x) => (
        <line
          key={x}
          x1={x}
          y1="0"
          x2={x}
          y2="280"
          stroke="#4DACFF"
          strokeWidth="1"
          opacity="0.08"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <text x="8" y="22" fill="#4DACFF" opacity=".72" fontFamily="ui-monospace, monospace" fontSize="11">
        SIGNAL
      </text>
      <text x="548" y="264" fill="#4DACFF" opacity=".72" fontFamily="ui-monospace, monospace" fontSize="11">
        REVENUE
      </text>
      {/* Area fill */}
      <path d={area} fill="url(#cleanFill2)" />
      {/* Curve */}
      <path
        d={curve}
        fill="none"
        stroke="#4DACFF"
        strokeWidth="3.5"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {/* Nodes */}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="7" fill="#4DACFF" />
      ))}
    </svg>
  );
}
