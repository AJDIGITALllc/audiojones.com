interface ComingSoonCardProps {
  title: string;
  description: string;
  statusLabel: string;
}

export function ComingSoonCard({ title, description, statusLabel }: ComingSoonCardProps) {
  return (
    <article className="relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-black/60 p-6 shadow-xl shadow-black/20 transition hover:border-[#FFD700]/60">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD700]/40 bg-[#FFD700]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#FFD700]">
          <span className="h-2 w-2 rounded-full bg-[#FF4500]" aria-hidden />
          {statusLabel}
        </div>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="text-base leading-relaxed text-white/70">{description}</p>
      </div>
      <div className="mt-6 text-sm text-white/50">Powered by the Audio Jones Emotional Predictive Marketing engine.</div>
    </article>
  );
}
