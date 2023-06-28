---
title: Object
---

## Object.freeze

冻结对象 （浅冻结）

> 冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值

`Object.isFrozen` 判断一个对象是否被冻结

## Object.seal

封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变

`Object.isSealed` 判断一个对象是否被封闭

`Object.preventExtensions` : 标记对象不可再扩展

## Object.entries()

一般用于代替 `for in`

> for in 会循环枚举原型链中的属性

## Object.defineProperty

```javascript
/**
 * Object.defineProperty的descriptor所描述的修饰符：
 * writable 值不可以被赋值修改 默认为false
 * configurable 当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
 * enumerable 当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。
 * value 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。 默认为 undefined
 * get
 * set
 * Invalid property descriptor. Cannot both specify accessors and a value or writable attribute
 * descriptor 中同时有 访问器(getter/setter) 与 value/writable 属性
 */

var obj = {
    name: '123',
}

Object.defineProperty(obj, 'name', {
    // value: '12345',
    configurable: false,
    enumerable: false,
    // writable: false,
    get() {
        return '1'
    },
    set(str: string) {
        obj.name = str
    },
})

delete obj.name // configurable: false 不能删除

console.log(obj.name)
```

## Object.is

**Object.is 是 ES2015 新特性，与 === 不一样的是：它可以正确分辨 正负零 及 NaN。**

* 抽象相等比较 (==)：将执行类型转换再进行比较，特殊地：Null 与 undefined 返回 true, 任何类型与 NaN 返回 false, +0 与-0 为 true.
* 严格等于运算符（===）: 不会执行类型转换，类型不一致返回 false, 特殊地：NaN 与 NaN 为 false, +0 与-0 为 true.
* Object.is: 基本与全等（===）相同，特殊地：NaN 与 NaN 为 true, +0 与-0 为 false.

**在除法中，1/+0 为 +Infinity, 1/-0 为 -Infinity，而 +Infinity === -Infinity 返回 false.**
