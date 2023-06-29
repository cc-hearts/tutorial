/**
 * @author heart
 * @description 两数之和
 * @Date 2022-08-13
 * @see https://leetcode.cn/problems/two-sum/submissions/
 */

function twoSum(nums: number[], target: number): number[] {
  const map: Map<number, number> = new Map()
  let diffTarge
  let result: [number, number] = [0, 0]
  for (let i = 0; i < nums.length; i++) {
    diffTarge = target - nums[i]
    // 比较的这个值 要弹出
    if (map.has(diffTarge)) {
      result = [i, map.get(diffTarge)!]
    }
    map.set(nums[i], i)
  }
  return result
}
