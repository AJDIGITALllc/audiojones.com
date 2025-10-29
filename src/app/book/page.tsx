/**
 * Renders the booking page, which embeds a Cal.com scheduling interface.
 * @returns {JSX.Element} The booking page component.
 */
export default function BookPage() {
  return (
    <main className="min-h-screen bg-[#111] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Book a Consultation</h1>
        <iframe
          src="https://cal.com/audiojones/consult?hide_event_type_details=1&primary_color=FF4500"
          className="w-full h-[900px] rounded-xl border border-white/10 bg-white"
          title="Book with Audio Jones"
        />
      </div>
    </main>
  );
}

