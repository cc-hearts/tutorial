---
title: ts内置的工具类型
---

## Partial

`Partial<T>`
Partial 允许你将 T 类型的所有属性设为可选。 它将在每一个字段后面添加一个?

```ts
interface partialType {
  id: number
}

type res = Partial<partialType>
```

## Required

`Required<T>`
将属性全部变成必选的选项

```ts
interface requiredType {
  id?: number
}

type res = Required<requiredType>
```

## Readonly

将属性变成只读的属性

```ts
interface IReadonly {
  readonly id: number
  name: string
}

type res = Readonly<IReadonly>
```

## Pick

`Pick<T,U>` 提取对象中的指定的属性 组成新的对象类型

```ts
interface IPick {
  id: number
  name: string
  age: number
}
type res = Pick<IPick, 'name' | 'age'>
```

## Omit

与 `Pick`相反 排除对象中指定的属性 返回新的对象类型

```ts
interface IOmit {
  id: number
  name: string
  age: number
}
type res = Omit<IOmit, 'name'>
```

## Extract

`Extract<T,U>` 取 T 中 存在与 U 中的类型
取两个类型的交集

```typescript
// 内置工具：交集
type Extract<T, U> = T extends U ? T : never;

type type1 = 'name'|'age'
type type2 = 'name'|'address'|'sex'

// 结果：'name'
type test = Extract<type1, type2>

// 推理步骤
'name'|'age' extends 'name'|'address'|'sex' ? 'name'|'age' : never
=> ('name' extends 'name'|'address'|'sex' ? 'name' : never) |
   ('age' extends 'name'|'address'|'sex' ? 'age' : never)
=> 'name' | never
=> 'name'
```

## Exclude

`Exclude<T,U>` 取 T 中不存在 U 中的类型

```ts
type r1 = 'name' | 'age'
type r2 = 'name' | 'id'

type res = Extract<r1, r2>
// 'age'
```

## Record

`Record<T,U>`
将 U 属性 映射给每一个属性 T 的值

```ts
interface IRecord {
  id: string
}
type res = Record<number, IRecord>
/**
 * {
 *  [x: number]: IRecord;
 * }
 */
```

## NonNullable

`NonNullable<T>`
从 T 中剔除 null 和 undefined

```ts
type NonNullableType = string | null | undefined

type res = NonNullable<NonNullableType> // string
```

## Uppercase

## Lowercase

## Capitalize

## Uncapitalize
