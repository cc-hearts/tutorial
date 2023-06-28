---
title: object Object 和 {} 的区别
---

## object

`object` 代表的是一个非原始类型的对象
object 定义是一个对象类型，不能自动获取对象上的属性和方法

> `number`，`string`，`boolean`，`symbol`，`null` 或 `undefined`在 JavaScript 中为原始类型

```ts
export function create(o: object): void

create({}) // ok

create('123') //error
```

## Object

> Object 就是一个对象，但是是包含了 js 原始的**所有公用**的功能
> Object 类型可以定义任何类型
> Object 不可以自动获取定义的对象上的属性和方法，

```ts
const a: Object = {
  say() {},
}

a.say() // Property 'say' does not exist on type 'Object'.
```

## {}

空对象：它描述了一个没有成员的对象。当你试图访问这样一个对象的任意属性时，TypeScript 会产生一个编译时错误。但是，你可以使用在 Object 类型上定义的所有属性和方法。

```ts
const a = {}

// a.x = 3 // error
a.toString()
```

## types extends {} 发送了什么

```ts
// types extends {} 发生了什么
// 声明为Object可以赋予除了null、undefined以外的任意值！此时访问这些声明的变量，都可以访问Object接口所定义的几个基本方法。
// 空对象字面量 ({})，可以指代除了 undefined 和 null、unknown之外的任何类型，但不推荐使用这种方式
// 类型的检测的宽泛度：类型限制范围上：any > unknown > {} ~ Object > object
type emptyObjectType = any extends {} ? true : false
```

## never

```ts
// never
type emptyObjectKeys = keyof {}

// 开启了 --strictNullChecks 编译选项后，null和undefined 则只能被赋予各自的同名类型。
let b: void = undefined

// never是所有类型的子类型并且可以赋值给所有类型。 没有类型是never的子类型或能赋值给never（never类型本身除外）
// never还可以用于映射类型中表达式，用于删除/过滤当前类型
```
