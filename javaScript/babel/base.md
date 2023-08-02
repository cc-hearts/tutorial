---
title: babel 初学第一章
---

1. `@bebel/core` 依赖于`@babel/parser` 、`@babel/traverse`、`@babel/generator` 模块 因此只要安装`@babel/core` 足够

```shell
npm i @babel/core
```

## babel 的执行流程

> babel 会自动到项目目录查找最近的 babel 配置文件 因此可以在根目录定义 `babel.config.js` 或者 `.babelrc` 这里的方式使用的是 `babel.config.js` 的方式解析

1. 先执行完所有 plugins，再执行 presets。
   > 通过预设（presets）提供常用的环境配置。
2. 多个 plugins，按照声明次序**顺序**执行。
3. 多个 presets，按照声明次序**逆序**执行。

```js
module.exports = {
    // 使用本地的plugins.js插件
    "presets": ["@babel/preset-env"]
    plugins: [
        ["./plugins"]
    ],
};
```

> `plugins.js`

```js
module.exports = function (babel) {
  return {
    visitor: {
      VariableDeclaration({ node, scope }, state) {
        // 重命名 变量名
        node.declarations.forEach((each) => {
          scope.rename(each.id.name, scope.generateUidIdentifier('uid').name)
        })
      },
    },
  }
}
```

## 案例 1 在代码的 return 中添加一个 console.log

> `const CONSOLE_AST = babel.template.ast('console.log("执行完成")');` `babel.template.ast` 可以根据代码生成 `ast`

```js
// code
import React from 'react'

function add() {
  return a + b
}
```

此时可以使用 `parse` 去语法分析代码生成 `ast`

```ts
const code = `
import React from 'react'
function add() {
  return a + b
}
`

const ast = babel.parse(code, {
  sourceType: 'module',
})
```

之后去便利 `ast` 找到 `ReturnStatement` 的节点 并且往前插入一条数据

```ts
function insertConsoleBeforeReturn(body) {
  body.forEach((node) => {
    if (node.type === 'FunctionDeclaration') {
      const blockStatementBody = node.body.body
      if (blockStatementBody && blockStatementBody.length) {
        const index = blockStatementBody.findIndex(
          (val) => val.type === 'ReturnStatement'
        )
        // 如果有return的节点 直接往前插入一个节点
        if (index > -1) {
          // 这样的方式有很多的情况考虑不到  因此一般不会这样分析
          blockStatementBody.splice(index, 0, CONSOLE_AST)
        }
      }
    }
  })
}
insertConsoleBeforeReturn(ast.program.body)
console.log(newCode)
```

这样的方式难以判断边界情况 因此可以使用 `babel` 自带提供的 `visiter` 方式解析

```ts
// 使用babel 的 visit 节点进行处理
babel.traverse(ast, {
  ReturnStatement(path) {
    path.insertBefore(CONSOLE_AST)
  },
})
// 同步将ast转换成 code
const newCode = babel.transformFromAstSync(ast)
console.log(newCode)
```

## 参考资料

- [掘金 AST 数据结构与 babel](https://juejin.cn/post/7090396145230282783#heading-5)

- [babel 学习指南](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-transformation-operations)

~~~~
