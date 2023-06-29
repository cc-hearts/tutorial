/**
 * @author heart
 * @description 两个数组的交集
 * @Date 2022-08-13
 * @see https://leetcode.cn/problems/intersection-of-two-arrays/
 */
function intersection(nums1: number[], nums2: number[]): number[] {
  // 排序 逐个比较
  const tempNums1 = nums1.sort((a, b) => a - b)
  const tempNums2 = nums2.sort((a, b) => a - b)
  const result: number[] = []
  // 随意for循环一个
  let j = 0
  for (let i = 0; i < tempNums1.length; i++) {
    // 比较两个数的大小
    while (tempNums2[j] < tempNums1[i] && j < tempNums2.length) {
      j++
    }
    if (j === tempNums2.length) break
    if (tempNums1[i] === tempNums2[j]) {
      !result.includes(tempNums1[i]) && result.push(tempNums1[i])
    }
  }
  return result
}

// 单 hashSet 完成
function intersection2(nums1: number[], nums2: number[]): number[] {
  const result: number[] = []
  const set: Set<number> = new Set()
  for (let i = 0; i < nums1.length; i++) {
    set.add(nums1[i])
  }
  for (let i = 0; i < nums2.length; i++) {
    if (set.has(nums2[i]) && !result.includes(nums2[i])) {
      result.push(nums2[i])
    }
  }
  return result
}

// 双 hashSet 完成
function intersection3(nums1: number[], nums2: number[]): number[] {
  const result: Set<number> = new Set()
  const set: Set<number> = new Set()
  for (let i = 0; i < nums1.length; i++) {
    set.add(nums1[i])
  }
  for (let i = 0; i < nums2.length; i++) {
    if (set.has(nums2[i])) {
      result.add(nums2[i])
    }
  }
  return [...result]
}
