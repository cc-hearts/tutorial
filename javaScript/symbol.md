---
title: symbol
---

> Symbol 会在 for in 中跳过 并且 也会在 Object.keys 中跳过
>
> 相反，[Object.assign](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 会同时复制字符串和 symbol 属性。

## Symbol.for

要从注册表中读取（不存在则创建）symbol，请使用 `Symbol.for(key)` 。

> https://zh.javascript.info/symbol#symbolkeyfor

![image-20230427111807049](http://oss.cc-heart.cn:30002/oss/file/WPJTOOANlAvXos4EJeb0m/2023-04-27/image-20230427111807049.png)

## Symbol.totoPrimitive

对象到原始类型的转换 有三种类型( `hint` )的转换 `string`  `number`  `default`

三种类型的转换会运行的转换算法是:

1. 调用 `obj[Symbol.toPrimitive](hint)` 如果这个方法存在，
2. 否则 如果`hint`是`string`尝试调用`toString()` 或者 `valueOf()` 无论哪个存在
3. 否则，如果 hint 是 "number" 或者 "default" 尝试调用 obj.valueOf() 或 obj.toString()，无论哪个存在
   > 由于历史原因，如果 `toString` 或 `valueOf` 返回一个对象，则不会出现 error，但是这种值会被忽略（就像这种方法根本不存在）。这是因为在 JavaScript 语言发展初期，没有很好的 “error” 的概念。相反， `Symbol.toPrimitive` 更严格，它 **必须** 返回一个原始值，否则就会出现 error。
   >
   > 这些方法都必须返回一个原始值才能工作（如果已定义）

### 面试题

a==1&&a==2&&a==3 的值为 true？

```js
const a = {
    val: 0
}

a[Symbol.toPrimitive] = function(hint) {
    console.log(hint) // default
    return ++a.val
}
console.log(a == 1 && a == 2 && a == 3) // true
```

## 参考资料

[对象 —— 原始值转换](https://zh.javascript.info/object-toprimitive)
