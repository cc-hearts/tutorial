/**
 * @author heart
 * @description
 * @Date 2022-08-13
 */
// 会 无限循环，那么也就是说求和的过程中，sum会重复出现，这对解题很重要！
function isHappy(n: number): boolean {
  const set: Set<number> = new Set()
  const forwardDigitArrays = (num: number): number[] => {
    let tempNum = num
    // 获取数组的每一项的值
    const result: number[] = []
    while (tempNum !== 0) {
      result.push(tempNum % 10)
      tempNum = ~~(tempNum / 10)
    }
    return result
  }
  while (!set.has(n)) {
    const array = forwardDigitArrays(n)
    let total = 0
    for (let i = 0; i < array.length; i++) {
      total += array[i] ** 2
    }
    if (total === 1) {
      return true
    }
    set.add(n)
    n = total
  }
  return false
}
