/**
 * @author heart
 * @description 重新排列数组
 * @Date 2022-08-29
 * @see https://leetcode.cn/problems/shuffle-the-array/
 */
function shuffle(nums: number[], n: number): number[] {
  const result = []
  for (let i = 0; i < n && i < nums.length; i++) {
    result.push(nums[i])
    if (nums.length > n + i) {
      result.push(nums[n + i])
    }
  }
  return result
}
