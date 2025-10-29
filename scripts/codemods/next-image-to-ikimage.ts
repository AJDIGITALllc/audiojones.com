import { API, FileInfo, JSCodeshift } from "jscodeshift";

export default function transform(file: FileInfo, api: API) {
  const j: JSCodeshift = api.jscodeshift;
  const root = j(file.source);

  // skip test or non-tsx files
  if (!file.path.match(/\.(tsx|jsx)$/)) return file.source;

  // find import from next/image
  const nextImg = root.find(j.ImportDeclaration, { source: { value: "next/image" } });
  if (nextImg.size() === 0) return file.source;

  // remove default Image import and keep any named ones (rare)
  nextImg.forEach(p => {
    const specifiers = p.node.specifiers || [];
    const filtered = specifiers.filter(s => !(s.type === "ImportDefaultSpecifier" && s.local?.name === "Image"));
    if (filtered.length === 0) {
      j(p).remove();
    } else {
      p.node.specifiers = filtered;
    }
  });

  // add IKImage import if not exists
  const hasIKImport = root.find(j.ImportDeclaration, { source: { value: "@/components/IKImage" } }).size() > 0;
  if (!hasIKImport) {
    root.get().node.program.body.unshift(
      j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier("IKImage"))],
        j.literal("@/components/IKImage")
      )
    );
  }

  // replace <Image ...> with <IKImage ...>
  root.findJSXElements("Image").forEach(p => {
    p.node.openingElement.name = j.jsxIdentifier("IKImage");
    if (p.node.closingElement) p.node.closingElement.name = j.jsxIdentifier("IKImage");
  });

  return root.toSource({ quote: "double" });
}