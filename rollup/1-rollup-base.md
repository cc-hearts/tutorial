---
title: rollup 初使用
---

## 快速配置文件

首先创建一个工程 在工程下创建如下的列表

```shell
.
├── rollup.config.js #rollup 打包配置文件
├── package.json
└── src # es6 代码
    ├── index.js
    └── shard.js
```

在安装对应的模块

```shell
npm i --save-dev rollup
```

## rollup 配置

在 `rollup.config.js` 配置

> 这里的`package.json` 设置了 `type:module` 使用的是`esm` 规范

```js
import { join } from 'path'
const resolveFile = function (filePath) {
    return join(fileURLToPath(import.meta.url), '..', filePath)
}
export default {
    input: resolveFile('src/index.js'), // 入口文件
    output: {
	    file: resolveFile('dist/bundle.js') // 输出的文件
	    format: 'esm' // 转译之后的模块规范
    }
}
```

## 编译源码

> `src/index.js`

```js
import { foo } from './shard'
function init() {
  foo()
}
init()
```

> `src/shard.js`

```js
export function foo() {
  console.log('this is foo')
}
```

简单配置完成之后 在终端输入

```shell
# -c 是--config 的缩写 后面如果不传入文件名
# 则按照下列顺序加载配置文件
# rollup.config.mjs -> rollup.config.cjs -> rollup.config.js
npx rollup -c
```

之后就能看到`dist/index.js` 是我们打包之后的文件

```js
function foo() {
  console.log('this is foo')
}

function init() {
  foo()
}

init()
```

## 函数式配置

> 这里使用的文件结构依旧和上面一样

命令行参数始终会覆盖从配置文件中导出的各个值 可以在函数中通过特定的条件判断 删除命令行参数 不会覆盖默认导出的配置

```js
import { join } from 'path'
import { fileURLToPath } from 'url'

const resolveFile = function (filePath) {
  return join(fileURLToPath(import.meta.url), '..', filePath)
}
// rollup 支持 函数调用返回配置
export default function (commandLineArgs) {
  // 如果是 rollup.config.js 且使用的shell 是 `npx rollup -c` 下面就是输出的结果
  // { _: [], c: true, config: true }
  //  如果 使用的是 `npx rollup -c rollup.func.config.js` 则commandLineArgs 是下面的输出结果
  // { _: [], c: 'rollup.func.config.js', config: 'rollup.func.config.js' }
  console.log(commandLineArgs)

  if (commandLineArgs.input) {
    // 不接受 命令行格式的入口文件
    delete commandLineArgs.input
  }

  return {
    input: resolveFile('src/index.js'),
    output: {
      file: resolveFile('dist/index.js'),
      format: 'esm',
    },
  }
}
```

## 第三方包打包配置

常用的两个插件
`@rollup/plugin-node-resolve`: 使得`rollup` 能够解析并引入第三方包（导入的是`commonjs`的规范）
`@rollup/plugin-commonjs`: 由于大多数的第三方包都是`commonjs` 的模块规范，`@rollup/plugin-commonjs` 可以将`commonjs` 转成`esm`模块

安装第三方包

```shell
npm i @cc-heart/utils
```

之后在`index.js` 中导入此包

```js
import { foo } from './shard'
import { fsUtils } from '@cc-heart/utils'
function init() {
  foo()
  console.log(fsUtils)
}

init()
```

对文件进行打包

```js
rollup -c rollup.func.config.js
```

此时会显示

```shell
(!) Unresolved dependencies
```

并且第三方包并没有被 打包 这是因为`rollup` 只处理相对路径 对于绝对路径 需要使用第三方的插件进行转译(`@rollup/plugin-node-resolve` 加载第三方包)

```shell
npm i @rollup/plugin-node-resolve @rollup/plugin-commonjs
```

再次修改配置文件 `rollup.func.config.js`

```diff
import { join } from 'path'
import { fileURLToPath } from 'url'
+ import commonjs from '@rollup/plugin-commonjs'
+ import resolve from '@rollup/plugin-node-resolve'

const resolveFile = function (filePath) {
  return join(fileURLToPath(import.meta.url), '..', filePath)
}
// rollup 支持 函数调用返回配置
export default function (commandLineArgs) {
  // 如果是 rollup.config.js 且使用的shell 是 `npx rollup -c` 下面就是输出的结果
  // { _: [], c: true, config: true }
  //  如果 使用的是 `npx rollup -c rollup.func.config.js` 则commandLineArgs 是下面的输出结果
  // { _: [], c: 'rollup.func.config.js', config: 'rollup.func.config.js' }
  console.log(commandLineArgs);

  if (commandLineArgs.input) {
    delete commandLineArgs.input
  }

  return {
    input: resolveFile('src/index.js'),
    output: {
      file: resolveFile('dist/index.js'),
      format: 'esm',
    },
+    plugins: [
+      resolve(),
+      commonjs(),
+    ]
  }
}
```

此时在进行打包 则可以看见所有的第三方依赖也被打包了

## 代码

[式例代码](https://github.com/cc-hearts/daily-demo/tree/master/packages/rollup/base)
