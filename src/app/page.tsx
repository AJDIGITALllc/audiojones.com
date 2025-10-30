{/* RIGHT / HERO IMAGE */}
<div className="flex items-center justify-center md:justify-end">
  <div
    className="relative w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px]
               rounded-[2.75rem]
               bg-gradient-to-b from-[#FF4500] via-[#FF4500]/15 to-transparent
               border border-white/10
               shadow-[0_20px_80px_rgba(0,0,0,0.35)]
               flex items-center justify-center"
  >
    <div
      className="w-[210px] h-[210px] sm:w-[230px] sm:h-[230px] md:w-[280px] md:h-[280px]
                 rounded-[2.4rem]
                 overflow-hidden
                 bg-black/40
                 border border-white/10
                 flex items-center justify-center"
    >
      <IKImage
        src="/assets/AUDIO JONES WEBSITE IMAGES/hero/audiojones-portrait.png"
        alt="Audio Jones"
        width={600}
        height={600}
        className="w-full h-full object-cover object-center"
        priority
      />
    </div>
    <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-[#FF4500]/25 blur-3xl md:blur-[60px]" />
  </div>
</div>