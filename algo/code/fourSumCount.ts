/**
 * @author heart
 * @description 四数相加
 * @Date 2022-09-06
 */
export function fourSumCount(
  nums1: number[],
  nums2: number[],
  nums3: number[],
  nums4: number[]
): number {
  const map = new Map<number, number>()
  nums1.forEach((val) =>
    nums2.forEach((record) =>
      map.set(val + record, (map.get(val + record) || 0) + 1)
    )
  )
  let ans = 0
  for (let i = 0; i < nums3.length; i++) {
    for (let j = 0; j < nums4.length; j++) {
      const c = -(nums3[i] + nums4[j])
      if (map.has(c)) {
        ans += map.get(c)!
      }
    }
  }
  return ans
}
