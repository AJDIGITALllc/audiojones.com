// Renders a Schema.org JSON-LD payload as an inline <script> tag.
// Use one component per schema object so Search/AEO crawlers can parse each independently.

type JsonLdProps = { data: Record<string, unknown> | Record<string, unknown>[] };

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
