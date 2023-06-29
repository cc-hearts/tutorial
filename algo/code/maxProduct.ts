/**
 * @author heart
 * @description
 * @Date 2022-08-26
 */
export function maxProduct(nums: number[]): number {
  // 排序去值
  nums.sort((a, b) => a - b)
  return (nums[nums.length - 1] - 1) * (nums[nums.length - 2] - 1)
}

export function maxProduct2(nums: number[]): number {
  let a = -1,
    b = -1
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= a) {
      b = a
      a = nums[i]
    } else if (nums[i] > b) {
      b = nums[i]
    }
  }
  return (a - 1) * (b - 1)
}

console.log(maxProduct2([10, 2, 5, 2]))
