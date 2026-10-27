import assert from "node:assert/strict";
import test from "node:test";
import { fetchCars } from "./cars.js";

test("car-list API errors are surfaced with their HTTP status", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: false, status: 503 });

  try {
    await assert.rejects(fetchCars("?use_case=electric"), /HTTP 503/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("unexpected car-list response shapes are rejected", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({ data: { cars: [] } }),
  });

  try {
    await assert.rejects(fetchCars(""), /expected format/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
