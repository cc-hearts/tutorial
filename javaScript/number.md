---
title: number
---

JavaScript 中所有的数值类型都是 Number 类型(并不区分浮点数和整数)
**Number 几个特殊的内置属性**
Number. MIN_VALUE 0 以上的最小值
Number. MAX_VALUE 最大值(最大值并不等于无穷大)
几个内置的方法

```typescript
 // 把字符串转换成整数 取有效的整数，到非数字直接结束
parseInt(string: string, radix?: number): number;

parseFloat(string: string): number;
```

## Infinity 全局属性 表示一个数值 是无穷大

```typescript
declare var Infinity: number
```

```javascript
Infinity === Infinity // true

Infinity === Infinity + 1 // true
```

## NaN

```typescript
declare var NaN: number
```

- 任何值与 NaN 比较 都会为 false（包括自己）

```javascript
NaN === NaN // false
```

NaN 与 任何运算都是 NaN (除了 NaN \*\* 0)

```js
NaN ** 0 === 1 // true
```

## 检测 NaN 的方法

1. Object.is(NaN,NaN) // true
2. Number.isNaN(NaN) // true
   > Object.is 与 === 不同的是 `===` 将 +0 与 -0 判断为相等 而 Object.is 则判断
   > 正负 0 为不想等

```ts
Number.NaN === NaN // false
Object.is(Number.NaN, NaN) // true
Object.is(+0, -0) // false
```

## isNaN 与 Number.isNaN 的区别

```js
isNaN('is') // true
Number.isNaN('is') // false
```

> isNaN 会对传入的值使用 toNumber 转换一次 因此一些字符串会被转换成 `NaN` 在被判断是否为 NaN 则会被判断为 true

## toExponential

`toExponential` 接收一个参数，表示结果中小数的位数。 以指数表示法返回该数值字符串表示形式

```js
;(123).toExponential(2) // '1.23e+2'
;(1.23).toExponential() // '1.23e+0'
```

### toPrecision

以指定的精度返回该数值对象的字符串表示

```js
const num = 99
console.log(num.toPrecision(1)) // "1e+2"
console.log(num.toPrecision(2)) // "99"
console.log(num.toPrecision(3)) // "99.0"
```

表示多少次方

```js
2 ** 53 // 2 的53次方
```

## Number 的整数和安全整数

`MIN_SAFE_INTEGER MAX_SAFE_INTEGER`

两个值表示在 javascript 中最大和最小的安全整数

```ts
// 最大的整数
console.log(Number.MAX_VALUE)(
  // 1.7976931348623157e+308
  Math.pow(2, 53) - 1
) * Math.pow(2, 971) // 1.7976931348623157e+308
// 最大安全值
console.log(Number.MAX_SAFE_INTEGER) // 9007199254740991
console.log(2 ** 53 - 1)
```

为了鉴别整数是否在这个范围内，可以使用 `Number.isSafeInteger`

```js
console.log(Number.isSafeInteger(-1 * 2 ** 53)) // false
console.log(Number.isSafeInteger(-1 * 2 ** 53 + 1)) // true
console.log(Number.isSafeInteger(2 ** 53)) // false
console.log(Number.isSafeInteger(2 ** 53 - 1)) // true
```

## 数字千分位表示

原生方法：

```js
;(3500).toLocaleString()
```

## 参考资料

- [Number.prototype.toLocaleString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString#%E4%BD%BF%E7%94%A8_locales)
