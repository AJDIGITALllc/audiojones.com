import assert from "assert";
import { fetchJson } from "../src/lib/client/fetchJson";

type FetchCall = Parameters<typeof fetch>;

const originalFetch = globalThis.fetch;

async function run() {
  try {
    let called = false;
    globalThis.fetch = (async (...args: FetchCall): Promise<Response> => {
      called = true;
      return new Response("Detailed failure", {
        status: 400,
        statusText: "Bad Request",
        headers: { "content-type": "text/plain" },
      });
    }) as typeof fetch;

    const result = await fetchJson("https://example.com");
    assert.ok(called, "fetch should be called");
    assert.strictEqual(result.ok, false, "result should indicate failure");
    assert.strictEqual(result.error, "Detailed failure", "plain text body should be used as error message");
    assert.strictEqual(result.status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
