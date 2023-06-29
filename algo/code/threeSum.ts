/**
 * @author heart
 * @description
 * @Date 2022-09-06
 */
type threeNumber = [number, number, number]
//三重for循环超时
// export function threeSum(nums: number[]): number[][] {
//   // 排序之后使用set存储
//   const set = new Set<string>()
//   nums.sort((a, b) => a - b)
//   //
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         if (nums[i] + nums[j] + nums[k] === 0) {
//           set.add(`${nums[i]},${nums[j]},${nums[k]}`)
//         }
//       }
//     }
//   }
//
//   const result: Array<threeNumber> = []
//   for (const iterator of set) {
//     result.push(iterator.split(',').map((val) => Number(val)) as unknown as threeNumber)
//   }
//   return result
// }

// 排序 + 双指针
export function threeSum(nums: number[]): number[][] {
  const result: Array<threeNumber> = []
  nums.sort((a, b) => a - b)
  // 排序完成的情况下
  // 如果有 a + b + c === 0  再则存在 a + b' + c'=== 0 一定存在 b < b' c' < c 因此他们两个可以并列移动
  // 第一个元素
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    //  双指针解法
    let right = nums.length - 1
    const target = -nums[i]
    //  双指针
    for (let left = i + 1; left < right; left++) {
      if (left > i + 1 && nums[left] === nums[left - 1]) {
        // 数据不能重合
        continue
      }

      while (left < right && nums[left] + nums[right] > target) {
        right--
      }
      // 此时只可能是 <= target 或者 left=== right
      if (left === right) break // 没有结果
      if (nums[left] + nums[right] === target) {
        // 有结果
        result.push([nums[i], nums[left], nums[right]])
      }
    }
  }
  return result
}
