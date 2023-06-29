/**
 * @author heart
 * @description
 * @Date 2022-08-01
 * @see https://leetcode.cn/problems/generate-a-string-with-characters-that-have-odd-counts/
 */

function generateTheString(n: number): string {
  let str = ''
  if (n % 2 === 0) {
    for (let i = 0; i < n - 1; i++) {
      str += 'a'
    }
    str += 'b'
  } else {
    for (let i = 0; i < n - 1; i++) {
      str += 'a'
    }
  }
  return str
}
