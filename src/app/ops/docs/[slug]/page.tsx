import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import './markdown.css';

interface DocPageProps {
  params: { slug: string };
}

export default async function DocPage({ params }: DocPageProps) {
  const docsDir = path.join(process.cwd(), "repos", "ajdigital-automation-hub", "docs");

  // read all files that actually exist in the deployed submodule
  let availableFiles: string[] = [];
  if (fs.existsSync(docsDir)) {
    availableFiles = fs.readdirSync(docsDir).filter((f) => f.endsWith(".md"));
  }

  const targetFile = `${params.slug}.md`;
  const filePath = path.join(docsDir, targetFile);

  // if the target file is missing, show a helpful page instead of a 404
  if (!fs.existsSync(filePath)) {
    return (
      <main className="mx-auto max-w-3xl py-10 space-y-6">
        <h1 className="text-2xl font-bold">Document not found on server</h1>
        <p className="text-gray-600">
          The document <code>{targetFile}</code> was not found in{' '}
          <code>repos/ajdigital-automation-hub/docs</code>.
        </p>
        <p className="text-gray-700">These are the docs I do see on the server right now:</p>
        <ul className="list-disc pl-5 space-y-1">
          {availableFiles.length === 0 ? (
            <li>No markdown files were found. Make sure the submodule is pulled on Vercel.</li>
          ) : (
            availableFiles.map((f) => (
              <li key={f}>
                <a href={`/ops/docs/${f.replace(".md", "")}`} className="text-orange-500 underline">
                  {f}
                </a>
              </li>
            ))
          )}
        </ul>
        <div className="mt-6">
          <a href="/ops/docs" className="text-[#FF4500] hover:text-[#E03D00] underline">
            ← Back to All Modules
          </a>
        </div>
      </main>
    );
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const processed = await remark().use(html).process(raw);
  const content = processed.toString();

  return (
    <main className="prose mx-auto max-w-3xl py-10">
      <div className="mb-6">
        <a href="/ops/docs" className="text-[#FF4500] hover:text-[#E03D00] underline text-sm">
          ← Back to All Modules
        </a>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} className="markdown-content" />
    </main>
  );
}