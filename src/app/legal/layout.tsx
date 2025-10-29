export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#111] text-white">
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-16 md:py-24">
        {children}
      </section>
    </main>
  );
}
