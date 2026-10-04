import { timingSafeEqual } from "node:crypto";

export function isAdminRequestAuthorized(request: Pick<Request, "headers">): boolean {
  const configuredKey = process.env.ADMIN_API_KEY;
  const suppliedKey = request.headers.get("x-api-key");

  if (!configuredKey?.trim() || !suppliedKey) return false;

  const expected = Buffer.from(configuredKey);
  const supplied = Buffer.from(suppliedKey);
  return expected.length === supplied.length && timingSafeEqual(expected, supplied);
}
