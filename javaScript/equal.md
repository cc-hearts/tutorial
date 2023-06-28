---
title: 相等判断
---

```javascript
const a = -0
const b = +0
console.log(a == b)
console.log(a === b)
console.log(Object.is(a, b))

// == === 都区分不了+0 -0 的方式 现在只有Object.is 能够区分 +0 -0

// indexOf 使用的是 === 方式判断
// includes 使用的是零值相等判断 与同值相等类似 但是 +0 与 -0 会判断为相等 NaN也会判断为相等
const arr = [a]

console.log(arr.indexOf(+0))
console.log(arr.includes(+0))

console.log([NaN].includes(NaN))
```

## 同值相等 Object.is

Object.is 是同值相等的判断 能够区分 + - 0 的区别 ` ==`  `=== ` 区分不了 `+ - 0`

```javascript
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

# 参考资料
* <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness>
