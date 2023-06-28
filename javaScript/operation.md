---
title: 操作符
---

## ?. 可选链操作符

将 `?.` 跟 `delete` 一起使用

```js
delete user?.name // 如果 user 存在，则删除 user.name
```

## ?? 空值合并操作符

当左侧的操作数为 **null** 或者 **undefined** 时，返回其**右侧操作数**，否则返回**左侧操作数**

```javascript
let a = null
let b = 1
let c = a ?? b //1
let fooa = foo ?? b // 1
let foob = bar ?? b // "" 只要不是null和undefined 则返回左侧操作数
```

## 可选链操作符( ?. )

在引用为空(nullish ) (**null** 或者 **undefined**) 的情况下不会引起错误，该表达式短路返回值是 **undefined**。与函数调用一起使用时，如果给定的函数不存在，则返回 **undefined**。

> 不能用于赋值操作
> let obj = {}
> obj?.protoName = 1; // Uncaught SyntaxError: Invalid left-hand side in assignment

```javascript
let obj = {}
console.log(obj.name?.age) // undefind
console.log(obj.foo?.()) // undefind
```
