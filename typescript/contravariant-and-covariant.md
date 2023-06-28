---
title: 逆变 和 协变
---

## 逆变

> 类型向内收缩

一般发生在函数的参数传递的过程中
例如：

```ts
interface Person {
  name: string
}

interface Heart extends Person {
  age: number
}

let person: (arg: Person) => void

person = (arg) => {
  return arg.name
}

let heart: (arg: Heart) => void

heart = (arg) => {
  return arg.name
}

// 这里 Heart 即为 Person 的 子类型
heart = person
// heart 赋值给 person 报错了
person = heart
```

这里 将`heart` 赋值给 `person` 就出现了错误，但是为啥可以将`person`就可以赋值给`heart` 呢？这里就是函数的参数逆变的概念了。
因为`heart`这个函数调用的过程中是受到了`Heart`这个接口的约束的 因此如果传入的是`Person`, 也是满足了`Heart`约束规范的。
举个例子：

```ts
let person: (arg: '1' | '2' | '3') => void

person = (arg) => {
  return arg
}

let heart: (arg: '1' | '2') => void

heart = (arg) => {
  return arg
}

heart = person

// error
person = heart
```

> 这里将 arg 的类型定义为两个联合类型 但是还是满足了上述的父子关系的约束。

> `heart` 的 `arg` 是 `person` 的子类型

这里`person` 的调用结果会是`1 | 2 | 3` 但`heart` 的调用结果`1 | 2` 显然这在这个结果之内(将函数的执行结果看成一个多分枝，`heart` 的调用只是走了这个函数过程当中众多分支中的某一些分支，即使有其他的分支，也能够保证`header` 能够全部被走到 因为是类型安全的)

### 函数参数的 any 和 unknown 的区别

```ts
type getType<T> = T extends (...args: unknown[]) => infer r ? r : never

// s === never
type s = getType<(arg: string) => void>
```

这里的`s`的值会是一个`never` 因为 上述的函数推导的过程中`T的参数`要是 `unknown` 类型的父类型 但是没有这样的类型 所以会是`never`。 将`unknown` 换成 `any` 则能正常推导结果。

## 协变

> 类型向外扩张
> 类似 OOP 的向上转型 也就是`子类型` 能赋值给`父类型`
