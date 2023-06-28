---
title: KMP 算法
---

```typescript
/**
 * @author heart
 * @description KMP算法
 * @Date 2022-10-14
 * @see: https://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html
 * @see: https://www.zhihu.com/question/21923021
 */

// 计算模式匹配移动的次数
function calculateMaxMatchLength(pattern: string) {
  // 保存每个下标为止的最大的前后缀匹配
  const arr: number[] = Array.from({ length: pattern.length })
  let maxLength = 0 // 保存模式匹配的最大的个数
  // for 相当于后缀 maxLength 相当于前缀
  for (let i = 1; i < pattern.length; i++) {
    //最大匹配不匹配的时候 匹配次大匹配
    while (maxLength > 0 && pattern.charAt(maxLength) !== pattern.charAt(i)) {
      // 次大匹配是最大匹配的子集
      // 次大匹配必定在最大匹配  中，所以次大匹配数就是的最大匹配数！
      // 在匹配不想等的时候 需要移动next的最大匹配数 也就是这里的次大匹配数
      maxLength = arr[maxLength - 1]
    }
    if (pattern.charAt(i) === pattern.charAt(maxLength)) {
      maxLength++
    }
    arr[i] = maxLength
  }
  return arr
}

// 时间复杂度为 m + n
function kmpSearch(text: string, pattern: string) {
  // 存储所有的匹配的位置的开头
  const result: number[] = []
  const maxLengths = calculateMaxMatchLength(pattern)
  let count = 0 // pattern位置偏移的值
  for (let i = 0; i < text.length; i++) {
    while (count > 0 && text.charAt(i) !== pattern.charAt(count)) {
      // 找到当前最大匹配的次大匹配 然后再开始比较
      count = maxLengths[count - 1]
    }
    if (pattern.charAt(count) === text.charAt(i)) {
      count++
    }
    if (count === pattern.length) {
      // 一个结果匹配成功
      result.push(i - pattern.length + 1)
      // 次项结果匹配
      count = maxLengths[count - 1]
    }
  }
  return result
}
```
