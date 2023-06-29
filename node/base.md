---
title: nodeJs 基础
---

## 模块化

Node.js 默认使用的是 `CommonJs` 规范定义的 JS 模块 如果直接导入使用 `ES Modules` 定义的 `.mjs` 文件的模块 控制台会报错

```shell
# node index.js
import * as Test from './test.mjs
^^^^^^

SyntaxError: Cannot use import statement outside a module
```

此时 可以 修改 `package.json` 的 `type` 参数

```json
{
  "type": "module"
}
```

此时在运行 `node index.js` 便可以得到正确的结果了

```shell
# node index.js
[Module: null prototype] {  }
```

## `ES Modules` 与 `CommonJS` 的主要区别

1. ES Modules 导出的是一个一个的模块 而 CommonJS 是整个对象
2. **`CommonJS`在`require`文件的时候采用文件路径，并且可以忽略 .js 文件扩展名**
3. **`ES Modules`的`import`和`export`都只能写在最外层，不能放在块级作用域或函数作用域中**。`CommonJS`中是被允许的
4. **require 是一个函数调用，路径是参数字符串，它可以动态拼接** 而 Import 可以作为函数动态导入

```js
// import可以作为函数动态导入

async function dynamicImport() {
  const data = await import('./index.mjs')

  console.log(data)
}
```

## 内置模块

```js
const buildModule = require('module')

// buildModule.builtinModules 内置的所有模块

console.log(buildModule.builtinModules)
```

社区网站分享:

- [medium](https://medium.com/)
- [dev.to](https://dev.to/)

## 正则

- https://regex101.com/

## grid 布局

- https://grid.layoutit.com/
