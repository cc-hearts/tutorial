---
title: 构造函数
---

每个 JavaScript 都是一个 Function 对象

```javascript
;
(function() {}).constructor === Function // true
```

## 构造函数 Function

**语法：**

```javascript
new Function([arg1[, arg2[, ...argN]], ] functionBody)
```

**Function 构造函数**创建一个新的 Function **对象，**直接调用此构造函数可用动态创建函数

> Function 创建的函数只能在全局作用域中运行。

```javascript
const func: Function = new Function('a', 'b', 'c', 'return (a+b)/c')

console.log(func(1, 3, 4))
```

> 使用 Function 构造器生成的函数，并不会在创建它们的上下文中创建闭包；它们一般在全局作用域中被创建。当运行这些函数的时候，它们只能访问自己的本地变量和全局变量，不能访问 Function 构造器被调用生成的上下文的作用域。

> global.d.ts

```typescript
declare global {
  interface Window {
    v: number
  }
}

export {}
```

```javascript
window.v = 1

function foo(a: number, b: number) {
    const v = 2
    const func: Function = new Function('a', 'b', 'c', 'return (a + b) / c + v')
    return func(a, b, 4)
}

console.log(foo(1, 3)) // 2
```

> 以调用函数的方式调用 Function 的构造函数（而不是使用 new 关键字) 跟以构造函数来调用是一样的。
