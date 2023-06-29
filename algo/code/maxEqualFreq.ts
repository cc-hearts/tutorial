/**
 * @author heart
 * @description
 * @Date 2022-08-18
 * @description  用hashMap存储每个元素出现的次数 之后用hashMap存储 元素出现的值
 */
// function maxEqualFreq(nums: number[]): number {
//   // 创建一个hashMap
//   const map = new Map<number, number>()
//   for (let i = 0; i < nums.length; i++) {
//     if (map.has(nums[i])) {
//       map.set(nums[i], map.get(nums[i])! + 1)
//     } else {
//       map.set(nums[i], 1)
//     }
//   }

//   let count
//   let numberIndex = -1
//   console.log(map)
//   for (const [key, value] of map) {
//     if (count === undefined) {
//       count = value
//       numberIndex = key
//     } else {
//       if (count !== value) {
//         // 判断哪个多1
//         if (value == count + 1) {
//           numberIndex = key
//         }
//         break
//       }
//     }
//   }
//   return numberIndex
// }
