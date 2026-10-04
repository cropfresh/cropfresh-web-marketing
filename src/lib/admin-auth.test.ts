import { afterEach, describe, expect, it } from "@jest/globals";
import { isAdminRequestAuthorized } from "./admin-auth";

const originalKey = process.env.ADMIN_API_KEY;
const fixtureKey = "unit-test-only-admin-key";

function requestWithKey(key?: string) {
  return new Request("http://localhost/api/leads/contact", {
    headers: key === undefined ? {} : { "x-api-key": key },
  });
}

afterEach(() => {
  if (originalKey === undefined) delete process.env.ADMIN_API_KEY;
  else process.env.ADMIN_API_KEY = originalKey;
});

describe("lead administration authorization", () => {
  it.each([undefined, "", "   "])("fails closed with an unconfigured key (%s)", (key) => {
    if (key === undefined) delete process.env.ADMIN_API_KEY;
    else process.env.ADMIN_API_KEY = key;

    expect(isAdminRequestAuthorized(requestWithKey())).toBe(false);
    expect(isAdminRequestAuthorized(requestWithKey(""))).toBe(false);
    expect(isAdminRequestAuthorized(requestWithKey(fixtureKey))).toBe(false);
  });

  it.each([undefined, "", "incorrect-key"])("rejects a missing or incorrect supplied key (%s)", (key) => {
    process.env.ADMIN_API_KEY = fixtureKey;

    expect(isAdminRequestAuthorized(requestWithKey(key))).toBe(false);
  });

  it("accepts only the exact configured key", () => {
    process.env.ADMIN_API_KEY = fixtureKey;

    expect(isAdminRequestAuthorized(requestWithKey(fixtureKey))).toBe(true);
    expect(isAdminRequestAuthorized(requestWithKey(`${fixtureKey}-extra`))).toBe(false);
  });
});
