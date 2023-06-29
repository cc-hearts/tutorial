/**
 * @author heart
 * @description
 * @Date 2022-07-28
 * @see https://leetcode.cn/problems/rank-transform-of-an-array/
 */
function arrayRankTransform(arr: number[]): number[] {
  const map = new Map<number, number>()
  let cloneArray = [...arr]
  cloneArray = cloneArray.sort((a, b) => a - b)
  // 现将arr转成map形式 在将key进行排序 输出
  let count = 1
  for (let i = 0; i < cloneArray.length; i++) {
    if (!map.has(cloneArray[i])) {
      map.set(cloneArray[i], count++)
    }
  }

  const result: number[] = []
  for (let i = 0; i < arr.length; i++) {
    result.push(map.get(arr[i])!)
  }
  // 获取所有的key
  return result
}
