import { describe, it, expect } from "vitest";
import { lengthOfLongestSubstring } from "./longestNonRepeatingString";

describe("lengthOfLongestSubstring", () => {
  it("works on abcabcbb", () => {
    expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
  });

  it("works on pwwkew", () => {
    expect(lengthOfLongestSubstring("pwwkew")).toBe(3);
  });
});
