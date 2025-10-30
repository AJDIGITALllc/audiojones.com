// src/components/GlobalDisclaimer.tsx
export default function GlobalDisclaimer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-black py-8 text-center text-xs text-white/50">
      <div className="max-w-7xl mx-auto px-6">
        <p>
          <strong>Disclaimer:</strong> Audio Jones (AJ Digital LLC) provides marketing, automation, and
          creative services for informational and educational purposes. We make no guarantees of specific
          financial or ranking outcomes. Results vary based on client effort, competition, and market
          conditions.
        </p>
        <p className="mt-4">
          All operations are governed by Florida law. In-person sessions occur inside Circle House Studios,
          13700 NW 1st Ave, Miami, FL 33168. © {currentYear} AJ Digital LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
}
