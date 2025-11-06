import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { remark } from 'remark';
import html from 'remark-html';
import { Metadata, ResolvingMetadata } from "next";
import './markdown.css';

interface Props {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const title = params.slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `${title} | System Modules`,
    description: `Audio Jones ${title} module documentation`,
    robots: {
      index: false,
      follow: false,
    }
  };
}

export default async function DocsPage({ params }: Props) {
  const docsDir = path.join(process.cwd(), "repos", "ajdigital-automation-hub", "docs");
  const filePath = path.join(docsDir, `${params.slug}.md`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  // Read and process markdown
  const markdown = fs.readFileSync(filePath, "utf-8");
  const processed = await remark().use(html).process(markdown);
  const contentHtml = processed.toString();

  const title = params.slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());

  return (
    <main className="mx-auto max-w-4xl py-10">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <a
            href="/ops/docs"
            className="text-[#FF4500] hover:text-[#E03D00] text-sm font-medium transition-colors"
          >
            ← All Modules
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Module documentation from ajdigital-automation-hub
        </p>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-4">
          <p className="text-orange-800 text-sm">
            🔒 <strong>Internal Use Only</strong> - This documentation is for Audio Jones operations team
          </p>
        </div>
      </div>

      <article className="prose prose-gray max-w-none">
        <div 
          dangerouslySetInnerHTML={{ __html: contentHtml }}
          className="markdown-content"
        />
      </article>

      <div className="mt-12 border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Source: repos/ajdigital-automation-hub/docs/{params.slug}.md</span>
          <a href="/" className="text-[#FF4500] hover:text-[#E03D00] transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>


    </main>
  );
}