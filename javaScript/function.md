---
title: function 函数
---

## new 操作

如何判断一个函数是否被执行了 `new` 操作

```ts
function A() {
  new.target === A //  如果 new A() 则为true
}
```

> `new function()` 的时候如果返回的是一个对象 则会替代 this
>
> 如果 `return ` 的是一个原始类型 则会被忽略 返回的值还是 `this`
