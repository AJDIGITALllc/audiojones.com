import * as assert from "assert";
import nextConfig from "../next.config";

async function testHeaders() {
  if (typeof nextConfig.headers !== "function") {
    throw new Error("nextConfig.headers is not a function");
  }

  const headers = await nextConfig.headers();

  const noStoreHeader = { key: "Cache-Control", value: "no-store, must-revalidate" };
  const immutableCacheHeader = { key: "Cache-Control", value: "public, max-age=31536000, immutable" };

  const pageRule = headers.find(rule => rule.source === "/((?!_next/static|assets).*)");
  assert.deepStrictEqual(pageRule?.headers, [noStoreHeader], "Page rule should have no-store header");

  const nextStaticRule = headers.find(rule => rule.source === "/_next/static/(.*)");
  assert.deepStrictEqual(nextStaticRule?.headers, [immutableCacheHeader], "_next/static rule should have immutable cache header");

  const assetsRule = headers.find(rule => rule.source === "/assets/(.*)");
  assert.deepStrictEqual(assetsRule?.headers, [immutableCacheHeader], "Assets rule should have immutable cache header");

  console.log("All header tests passed!");
}

testHeaders().catch(error => {
  console.error("Header tests failed:", error);
  process.exit(1);
});
