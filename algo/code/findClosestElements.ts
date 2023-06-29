/**
 * @author heart
 * @description 顺序插入数据
 * @Date 2022-08-25
 */
export function findClosestElements(
  arr: number[],
  k: number,
  x: number
): number[] {
  // 比较x 和 arr 的最后一位的大小
  const result = []
  if (x >= arr[arr.length - 1]) {
    // 逆序排列插入
    for (let i = arr.length - 1; i >= 0 && i > arr.length - k - 1; i--) {
      result.unshift(arr[i])
    }
  } else if (x <= arr[0]) {
    // 顺序
    for (let i = 0; i < arr.length && i < k; i++) {
      result.push(arr[i])
    }
  } else {
    // 二分查找插入
    let left = 0,
      right = arr.length - 1,
      middle = 0

    while (left < right) {
      middle = (left + ((right - left) >> 1)) >> 0
      if (arr[middle] > x) {
        //
        right--
      } else if (arr[middle] < x) {
        left++
      } else {
        break
      }
    }

    if (left === right) {
      middle = (left + ((right - left) >> 1)) >> 0
      if (Math.abs(arr[middle - 1] - x) <= Math.abs(arr[middle] - x)) {
        middle--
      }
    }
    result.push(arr[middle])
    ;(left = 1), (right = 1)
    while (result.length < k) {
      if (middle - left >= 0 && middle + right < arr.length) {
        if (
          Math.abs(arr[middle - left] - x) <= Math.abs(arr[middle + right] - x)
        ) {
          result.unshift(arr[middle - left])
          left++
        } else {
          result.push(arr[middle + right])
          right++
        }
      } else if (middle - left >= 0) {
        result.unshift(arr[middle - left])
        left++
      } else {
        result.push(arr[middle + right])
        right++
      }
    }
  }
  return result
}
