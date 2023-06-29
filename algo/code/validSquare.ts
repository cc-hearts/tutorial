/**
 * @author heart
 * @description
 * @Date 2022-07-29
 * @see https://leetcode.cn/problems/valid-square/
 */

function validSquare(
  p1: number[],
  p2: number[],
  p3: number[],
  p4: number[]
): boolean {
  let length = -1
  const calculationLine = (p1: number[], p2: number[], p3: number[]) => {
    // 是否是一个直角三角形并且两边是否相等
    const long1 = (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2
    const long2 = (p1[0] - p3[0]) ** 2 + (p1[1] - p3[1]) ** 2
    const long3 = (p2[0] - p3[0]) ** 2 + (p2[1] - p3[1]) ** 2
    const bool =
      (long1 === long2 && long1 + long2 === long3) ||
      (long1 === long3 && long1 + long3 === long2) ||
      (long2 === long3 && long2 + long3 === long1)

    if (!bool) return false
    // 保存一个直角
    if (length === -1) length = Math.min(long1, long2)
    // 每次比较直角的长度
    else if (length === 0 || length !== Math.min(long1, long2)) return false
    return true
  }

  return (
    calculationLine(p1, p2, p3) &&
    calculationLine(p1, p2, p4) &&
    calculationLine(p1, p3, p4) &&
    calculationLine(p2, p3, p4)
  )
}
