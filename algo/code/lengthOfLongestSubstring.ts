/**
 * @author heart
 * @description 滑动窗口
 * @Date 2022-07-27
 * @see https://leetcode.cn/problems/longest-substring-without-repeating-characters/
 */
export function lengthOfLongestSubstring(s: string): number {
  let maxCount = 0,
    left = 0
  const saveCharArray = new Set<string>()
  // 是否有重复的字串
  for (let i = 0; i < s.length; i++) {
    const charData = s.charAt(i)
    if (saveCharArray.has(charData)) {
      // 滑动窗口 左指针右边移动 没有同样的则结束
      while (left < i) {
        const startData = s.charAt(left)
        saveCharArray.delete(startData)
        // 减少了一个值 left就需要++
        left++
        if (startData === charData) break
      }
    }
    saveCharArray.add(charData)
    maxCount = Math.max(maxCount, saveCharArray.size)
  }
  return maxCount
}
