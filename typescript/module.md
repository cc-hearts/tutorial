---
title: 模块
---

## 全局模块

在一个新的 typescript 文件中编写的代码 他处于一个全局的命名空间中&#x20;
&#x20;在全局的命名空间过程中 有可能会造成代码的命名冲突问题

```typescript
const foo = 123 //在index.ts中

//Cannot redeclare block-scoped variable 'foo'.(2451)
const foo = 1234 //在foo.ts
```

## 文件模块

如果在根级别的位置包含有 import 或者 export，它会在这个文件中创建一个本地的作用域

```typescript
export const foo = 123 //此时的foo不在全局命名空间中 需要引入才能使用
```

## 文件模块的几种分类

> - AMD：不要使用它，它仅能在浏览器工作；
> - SystemJS：这是一个好的实验，已经被 ES 模块替代；
> - ES 模块：它并没有准备好。
> - 使用 module: commonjs 选项来替代这些模式，将会是一个好的主意。

### commonJs

nodeJs 的模块系统就是参照 CommonJs 的规范实现的
会有一个全局的方法为 require(),用于同步加载模块

```typescript
var foo = require('foo')
```

### amd

> commonJs 的同步对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。 AMD 规范就此诞生

AMD 是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"
AMD 也采用 require()语句加载模块，但是不同于 CommonJS，它要求两个参数：

```javascript
require([module], callback)

require(['math'], function (math) {
  math.add(2, 3)
})
```

### es modules

```typescript
// export 在ts中可以导出一个变量 或者是 一个类型
export const foo = 123

export default function foo() {}

const num = 0
const str = 'str'
type myType = string | number
export { num, str, myType }

export { str as asString }

//
export * from './index' //其他模块导入后整体导出

export { num } from './index' //其他模块导入后部分导出

export { num as n } from './index' //重命名，部分导出从另一个模块导入

// import 可以在ts中导入一个变量 或者是一个类型
import foo from './index' // 默认导入

import { num, str } from './index' //部分导入

import * as fooObj from './index' // 全部导入

import { str as s } from './index' // 导入重命名

import './index' //只导入模块
```

# others

> UMD 是 AMD 和 CommonJS 的糅合。AMD 模块以浏览器第一的原则发展，异步加载模块。CommonJS 模块以服务器第一原则发展，选择同步加载 是两种方案的通用版

UMD 先判断是否支持 Node.js 的模块（exports）是否存在，存在则使用 Node.js 模块模式。在判断是否支持 AMD（define 是否存在），存在则使用 AMD 方式加载模块。

# 模块路径的查找

## 动态查找

当导入路径不是相对路径时，模块解析将会模仿 [Node 模块解析策略](https://nodejs.org/api/modules.html#modules_all_together)

## ts 导入

```typescript
TypeScript 4.5 也允许单独的导入，你需要使用 type 前缀 ，表明被导入的是一个类型：
import { createCatName, type Cat, type Dog } from "./animal.js";
```
