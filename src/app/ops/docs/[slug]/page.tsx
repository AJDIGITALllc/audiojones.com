import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

interface DocPageProps {
  params: { slug: string };
}

export default async function DocPage({ params }: DocPageProps) {
  const docsDir = path.join(process.cwd(), "repos", "ajdigital-automation-hub", "docs");

  // get whatever actually exists on the server
  let availableFiles: string[] = [];
  if (fs.existsSync(docsDir)) {
    availableFiles = fs.readdirSync(docsDir).filter((f) => f.endsWith(".md"));
  }

  const targetFile = `${params.slug}.md`;
  const filePath = path.join(docsDir, targetFile);

  // if missing, don't 404 — show what we DO have
  if (!fs.existsSync(filePath)) {
    return (
      <main className="mx-auto max-w-3xl py-10 space-y-6">
        <h1 className="text-2xl font-bold">Document not found on server.</h1>
        <p className="text-gray-600">
          The document <code>{targetFile}</code> was not found in
          <code> repos/ajdigital-automation-hub/docs </code>.
        </p>
        <p className="text-gray-700">Here are the docs I do see:</p>
        <ul className="list-disc pl-5 space-y-1">
          {availableFiles.length === 0 ? (
            <li>No markdown files found. Make sure Vercel pulled the submodule.</li>
          ) : (
            availableFiles.map((f) => (
              <li key={f}>
                <a
                  href={`/ops/docs/${f.replace(".md", "")}`}
                  className="text-orange-500 underline"
                >
                  {f}
                </a>
              </li>
            ))
          )}
        </ul>
      </main>
    );
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const processed = await remark().use(html).process(raw);
  const content = processed.toString();

  return (
    <main className="prose mx-auto max-w-3xl py-10">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}