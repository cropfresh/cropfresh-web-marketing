import { describe, expect, test } from "@jest/globals";
import { cn } from "./utils";

describe("cn", () => {
  test("combines conditional classes and resolves Tailwind conflicts", () => {
    expect(cn("rounded-lg", false && "hidden", "p-2", "p-4")).toBe(
      "rounded-lg p-4",
    );
  });
});
