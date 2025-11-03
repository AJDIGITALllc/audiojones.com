interface ServiceTileProps {
  title: string;
  description: string;
  highlights?: readonly string[] | string[];
  ctaLabel: string;
  ctaHref: string;
  accent?: "orange" | "teal";
}

export function ServiceTile({
  title,
  description,
  highlights = [],
  ctaHref,
  ctaLabel,
  accent = "orange",
}: ServiceTileProps) {
  const accentStyles =
    accent === "teal"
      ? {
          border: "border-[#008080]/30",
          hoverBorder: "hover:border-[#008080]/60",
          badge: "from-[#008080] to-[#00b3b3]",
          button:
            "bg-[#008080] hover:bg-[#00a0a0] text-white",
        }
      : {
          border: "border-[#FF4500]/30",
          hoverBorder: "hover:border-[#FF4500]/60",
          badge: "from-[#FF4500] to-[#FFD700]",
          button:
            "bg-gradient-to-r from-[#FF4500] to-[#FFD700] text-black hover:opacity-95",
        };

  return (
    <article
      className={`relative flex h-full flex-col justify-between rounded-2xl border ${accentStyles.border} ${accentStyles.hoverBorder} bg-white/5 p-6 text-left shadow-lg shadow-black/10 transition hover:-translate-y-1`}
    >
      <div className="space-y-4">
        <div className={`inline-flex items-center rounded-full bg-gradient-to-r ${accentStyles.badge} px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black/80`}>Service</div>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="text-base leading-relaxed text-white/70">{description}</p>
        {highlights && highlights.length > 0 && (
          <ul className="space-y-2 text-sm text-white/70">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#FFD700]" aria-hidden />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-8">
        <a
          href={ctaHref}
          className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/70 ${accentStyles.button}`}
        >
          {ctaLabel}
        </a>
      </div>
    </article>
  );
}
