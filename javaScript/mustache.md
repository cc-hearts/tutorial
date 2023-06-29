---
title: mustache 表达式的运行
---

```js
const data = '{{a + b + c}}'

global.a = 2
global.b = 3
global.c = 4
const scope = {
  a: 1,
  b: 2,
  c: 0,
}

function functionFactory(data) {
  const reg = /^\s*\{\{([\s\S]*)\}\}\s*$/
  const matcher = data.match(reg)
  const newData = matcher?.[1] || ''
  return new Function('$root', `with ($root) { return (${newData}) }`)
}

console.log(functionFactory(data)(scope))
```

## 参考资料

[new Function 语法](https://zh.javascript.info/new-function)

[with 关键词](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with)
