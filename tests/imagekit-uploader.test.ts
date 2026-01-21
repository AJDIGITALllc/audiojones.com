import test from "node:test";
import assert from "node:assert/strict";

import { initializeImageKit } from "../src/components/ImageKitUploader";

test("initializeImageKit returns false when ImageKit is unavailable", () => {
  const ikRef = { current: null as any };
  let readyCalled = false;

  if ("window" in globalThis) {
    // @ts-expect-error - cleanup testing global
    delete (globalThis as any).window;
  }

  const result = initializeImageKit(ikRef, (value) => {
    readyCalled = Boolean(value);
  });

  assert.equal(result, false);
  assert.equal(ikRef.current, null);
  assert.equal(readyCalled, false);
});

test("initializeImageKit wires up ImageKit when the SDK is present", () => {
  const mockUpload = async () => ({ url: "https://example.com/file.jpg", name: "file.jpg" });

  class MockImageKit {
    public config: Record<string, unknown>;
    public upload: typeof mockUpload;

    constructor(config: Record<string, unknown>) {
      this.config = config;
      this.upload = mockUpload;
    }
  }

  (globalThis as any).window = {
    ImageKit: MockImageKit,
  };

  const ikRef = { current: null as any };
  let readyCalled = false;

  const result = initializeImageKit(ikRef, (value) => {
    readyCalled = Boolean(value);
  });

  assert.equal(result, true);
  assert.ok(ikRef.current instanceof MockImageKit);
  assert.equal(readyCalled, true);

  const uploadResult = ikRef.current.upload();
  assert.equal(uploadResult instanceof Promise, true);

  // Cleanup to avoid side effects on other tests
  // @ts-expect-error - cleanup testing global
  delete (globalThis as any).window;
});
