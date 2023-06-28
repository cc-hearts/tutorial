---
title: 常见问题
---

# TypeScript 无法重新声明块范围变量

在报错的文件底部添加一行代码：export {}。

> 在 Typescript 中，只要文件存在 import 或 export 关键字，都被视为 module

```typescript
// 只要文件存在 import 或 export 关键字，都被视为 module
export {}
```

# 浏览器端 exports is not defined

设置 tsconfig.json 的 module 模快不为 CommonJs

```typescript
-- "module": "CommonJS"
++ "module": "es6",
```

# tsc 编译--project 带上 tsconfig.json

<https://www.tslang.cn/docs/handbook/tsconfig-json.html>

## 常用的注视类型

```ts
// @ts-expect-error # 与 @ts-ignore 指令类似，不同的是一旦错误被修复，TS 编译器就会提示报错。
```

## 接口合并

如果有两个同名的接口的时候 接口会进行合并

```ts
interface person {
  name: string
  age: number
}
interface person {
  detail: string
}
// 接口的类型合并 因此person 会是一个 {name:string,age:number,detail:string}
const stu: person = {
  name: 'string',
  age: 1,
  detail: 'description',
}
```

## 联合类型的 |

```ts
type s = (string | null) & string
// 主要是 null 与 & string 会发生never string | never === string
```
