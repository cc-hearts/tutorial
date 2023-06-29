var { lengthOfLongestSubstring } = require('../code/lengthOfLongestSubstring')

test('abcabcbb is result 3', () => {
  expect(lengthOfLongestSubstring('abcabcbb')).toBe(3)
})

test('bbbbb is result  1', () => {
  expect(lengthOfLongestSubstring('bbbbb')).toBe(1)
})

test('pwwkew is result 3', () => {
  expect(lengthOfLongestSubstring('pwwkew')).toBe(3)
})
