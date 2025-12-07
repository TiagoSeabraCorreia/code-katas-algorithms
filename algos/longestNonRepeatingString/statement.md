Longest Substring Without Repeating Characters

Given a string s, return the length of the longest substring that contains no repeated characters.

A substring is a contiguous block of characters within the string. Your goal is to find the largest possible window that contains only unique characters.

Example 1:
Input: "abcabcbb"
Output: 3
Explanation: The answer is "abc", which has length 3.

Example 2:
Input: "bbbbb"
Output: 1
Explanation: All substrings with more than one character contain duplicates. The longest substring with all unique characters is "b".

Example 3:
Input: "pwwkew"
Output: 3
Explanation: The substring "wke" has length 3.

Constraints:
1 <= s.length <= 100000
s contains ASCII characters only.
Your solution must run in O(n) time using a sliding window technique.

Function signature (TypeScript):
function lengthOfLongestSubstring(s: string): number