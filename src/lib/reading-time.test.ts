import { describe, expect, test } from "@jest/globals";
import readingTime from "./reading-time";

describe("readingTime", () => {
  test("calculates the display text and minutes for a short article", () => {
    const result = readingTime("CropFresh connects farmers and buyers.");

    expect(result.text).toBe("1 min read");
    expect(result.minutes).toBe(1);
    expect(result.words).toBe(5);
    expect(result.time).toBe(60000);
  });

  test("rounds longer articles up to the next minute", () => {
    const result = readingTime(Array.from({ length: 401 }, () => "word").join(" "));

    expect(result.minutes).toBe(3);
    expect(result.text).toBe("3 min read");
    expect(result.words).toBe(401);
  });
});
