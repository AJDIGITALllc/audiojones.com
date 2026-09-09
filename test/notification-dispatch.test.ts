import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const repoRoot = process.cwd();

function read(relativePath: string) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function routeFiles(dir: string): string[] {
  const absolute = path.join(repoRoot, dir);
  return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) return routeFiles(relative);
    return entry.name === "route.ts" ? [relative] : [];
  });
}

// Every notifier that has been fixed. A new one added here without the same
// treatment should fail loudly rather than ship the fifth copy of this bug.
const NOTIFIER_MODULES = [
  "src/lib/apply/apply-notifications.ts",
  "src/lib/leads/lead-notifications.ts",
  "src/lib/founder-gravity-audit/notifications.ts",
  "src/lib/roi-calculator/roi-calculator-email.ts",
];

// This defect reached four separate routes before it was caught, because each
// one looked reasonable on its own. `void` lets the route return while the
// work is still in flight, and on serverless the invocation can be suspended
// there — dropping the request and, in the ROI case, the status write after it.
test("no API route dispatches notification work with a bare void", () => {
  const offenders: string[] = [];

  for (const file of routeFiles("src/app/api")) {
    const source = read(file);
    for (const [index, line] of source.split("\n").entries()) {
      if (/^\s*void\s+\w*(notify|send|email)/i.test(line)) {
        offenders.push(`${file}:${index + 1} — ${line.trim()}`);
      }
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `dispatch deferred work with \`after\` from next/server, not \`void\`:\n${offenders.join("\n")}`,
  );
});

test("every notifier request is bounded by a timeout", () => {
  for (const file of NOTIFIER_MODULES) {
    const source = read(file);
    const calls = source.split("fetch(").length - 1;
    assert.ok(calls > 0, `${file} has no fetch calls; is the path list stale?`);

    const bounded = source.split("AbortSignal.timeout(").length - 1;
    assert.equal(
      bounded,
      calls,
      `${file}: ${calls} fetch call(s) but ${bounded} timeout(s). An unbounded request holds the deferred task open until the platform kills it.`,
    );
  }
});

// `fetch` resolves on 4xx/5xx, so a bad key or a rejecting webhook looks
// exactly like success unless the status is checked.
test("every notifier inspects the response status and caps the body it logs", () => {
  for (const file of NOTIFIER_MODULES) {
    const source = read(file);
    assert.match(source, /\.ok\b/, `${file} never checks response.ok`);
    assert.match(
      source,
      /readCappedBody\(/,
      `${file} should read failed bodies through readCappedBody, not res.text()`,
    );
    assert.equal(
      /await\s+res(ponse)?\.text\(\)/.test(source),
      false,
      `${file} still buffers a whole response body before slicing it`,
    );
  }
});
