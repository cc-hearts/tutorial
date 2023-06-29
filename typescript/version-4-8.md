---
title: typescript 4.8 更新
---

## 支持 {} | undefined | null 分配给 unknown

> 4.8 之前版本

```ts
let x: unknown

const y: {} | undefined | null = x // Type 'unknown' is not assignable to type 'undefined'.
```

> 4.8 版本

```ts
let x: unknown

const y: {} | undefined | null = x
```

## {} 与 任何其他的类型的交叉类型都会转换成该类型

> 4.8 之前的版本

```ts
type case1 = {} & object // {} & object

type case2 = {} & string // {} & string

type case3 = {} & boolean // {} & boolean

type case4 = {} & null // never

type case5 = {} & undefined // never
```

> 4.8 版本

```ts
type case1 = {} & object //  object

type case2 = {} & string //  string

type case3 = {} & boolean //  boolean

type case4 = {} & null // never

type case5 = {} & undefined // never
```

> tips: 字面量默认提示写法:

```ts
// Omit<U, PropertyKey> => {}
export type LiteralUnionTips<T extends U, U> = T | (U & Omit<U, PropertyKey>)
//  T | (U & {})
type Foo = LiteralUnionTips<'a' | 'b', string>

//  '' => 'a' | 'b' tips
const foo: Foo = ''
```

> 如果两个都是对象类型 交叉类型还是合并两个的相同值

> 内置类型 `NonNullable` 做出小改动

> 4.8 之前 version

```ts
/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T
```

> 4.8 之后 version

```ts
/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T & {}
```

## 普通类型收窄

> 4.8 之前范型不会收窄

```ts
function throwNullable<T>(value: T): NonNullable<T> {
  if (value === undefined || value === null) {
    throw Error('Nullable')
  }

  // 因此这里需要类型断言
  return value as T & {}
}
```

> 4.8 之后会根据判断进行类型收窄

```ts
function throwNullable<T>(value: T): NonNullable<T> {
  if (value === undefined || value === null) {
    throw Error('Nullable')
  }

  // 这里不再需要类型断言
  return value
}
```

## Infer ... extends 推断

> 4.8

```ts
//  'number' -> '100'.
type num = '100' extends `${infer U extends number}` ? U : never

// 'bigint' -> '100n'.
type bigint = '100' extends `${infer U extends bigint}` ? U : never

// 'boolean' -> 'true'.
type bool = 'true' extends `${infer U extends boolean}` ? U : never
```

> 注意: ts 会贪婪推断 infer 是否为一个字面量 下面就是去匹配 1.0 是否是一个数字类型
>
> typescript 推断出来的是一个 1.0 但是 String(Number('1.0')) 的值是 1。两个不相等 因此无法确定 则回朔为 `number` 类型

````ts
> // JustNumber is `number` here because TypeScript parses out `"1.0"`, but `String(Number("1.0"))` is `"1"` and doesn't match.
> type JustNumber = "1.0" extends `${infer T extends number}` ? T : never；
> ```

## `===` 判断引用类型

> 4.8 不能用 `===` 比较一个引用类型

```ts
const a = []

if (a === []) {
  // This condition will always return 'false' since JavaScript compares objects by reference, not value.
}
````
