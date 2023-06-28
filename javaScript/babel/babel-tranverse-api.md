---
title: babel 转译 apis 的实现
---

# babel 转译 apis 的实现

由于最近的需求需要对 `api` 进行权限添加处理 因此想到了用 `babel` 对代码进行词法分析 并且提取出相应的节点 生成一个 `json` 对象的方式对 `api` 进行提取

先安装依赖项

```shell
pnpm add @babel/core @babel/preset-env @babel/parser  @babel/traverse
```

下面主要对以下的几种代码进行词法分析:

```ts
export const specializedApi = {
  list(data) {
    return post(`${javaPrefix}/edu/major/getPage`, data)
  },
  add(data) {
    return post(`${javaPrefix}/edu/major`, data)
  },
  update(data) {
    return put(`${javaPrefix}/edu/major`, data)
  },
  delete({ id }) {
    return http.delete(`${javaPrefix}/edu/major/${id}`)
  },
  listAll(data) {
    return post(`${javaPrefix}/edu/course/page`, data)
  },
  getSpecialList(data) {
    return post(`${javaPrefix}/edu/major/list`, data)
  },
}
```

```ts
export function addSuitableYear(data) {
  return post(`${javaPrefix}/edu/plan/addYear`, data)
}
```

```ts
export const getDepartmentTree = () => {
  return http.get(`${javaPrefix}/edu/major/tree`)
}
```

```ts
// 按月份获取
export function listByMonth(data) {
  return http({
    url: 'http://xxx.xxx.xxx/jxue/edu/eduTimeRecord/listByMonth',
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    data,
  })
}
```

创建一个 `apis.ts` 文件

```ts
import functionDeclaration from './lib/functionDeclaration'
import variableDeclarator from './lib/variableDeclarator'
import { readFile, write } from './lib/utils'

const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

function bootstrap() {
  const cont = readFile('./template/api-template.js')
  const apiNames = []
  // 读取代码模版 进行ast 转换
  const ast = parser.parse(cont, {
    sourceType: 'module',
  })
  // 遍历 ast 对 函数 和变量进行递归处理
  traverse(ast, {
    FunctionDeclaration: functionDeclaration(apiNames),
    VariableDeclarator: variableDeclarator(apiNames),
  })
  write(path.resolve(__dirname, './dist/api.json'), apiNames)
}

bootstrap()
```

`functionDeclaration` 、 `variableDeclarator` 进行节点处理

> `functionDeclaration.ts`

```ts
import { IData } from './config'
import { handleArgument } from './shard'

export default function (apiNames: IData[]) {
  return function ({ node }) {
    const name = node.id.name
    const { type } = node
    switch (type) {
      case 'FunctionDeclaration': {
        const cur: IData = { name }
        const { body } = node.body
        body.forEach((bodyChild) => {
          handleArgument(bodyChild, cur)
        })
        apiNames.push(cur)
        break
      }
    }
  }
}
```

> `variableDeclarator.ts`

```ts
import { handleObjectExpression, handleArrowFunctionExpression } from './shard'
import { IData } from './config'

export default function (apiNames: IData[]) {
  return function ({ node }) {
    const name = node.id.name
    const { type } = node.init
    switch (type) {
      case 'ObjectExpression': {
        const cur = { name, children: [] }
        const children = handleObjectExpression(node.init)
        cur.children = children
        apiNames.push(cur)
        break
      }
      case 'ArrowFunctionExpression': {
        const cur: IData = {}
        cur.name = node.id.name
        handleArrowFunctionExpression(node.init, cur)
        apiNames.push(cur)
        break
      }
    }
  }
}
```

> `shard.ts` 中 各种 `handleXxxx` 对各种 `type` 进行不同的处理

```ts
import { reflect, type IData } from './config'

export function handleArgument(val, curChild) {
  let method = ''
  // if 等语句不判断条件
  if (val.type === 'IfStatement') return
  const args = val.argument.arguments
  const { callee } = val.argument
  switch (callee.type) {
    case 'Identifier': {
      method = val.argument.callee.name
      break
    }
    case 'MemberExpression': {
      method = val.argument.callee.property.name
      break
    }
  }
  let path = ''
  curChild.method = method
  let ind = 0
  args.forEach((arg) => {
    switch (arg.type) {
      case 'TemplateLiteral': {
        arg.quasis.forEach((qua) => {
          if (qua.value.raw) {
            path += qua.value.raw
          } else {
            const name = arg.expressions[ind++].name
            if (Object.prototype.hasOwnProperty.call(reflect, name)) {
              path += reflect[name]
            } else {
              path += `:${name}`
            }
          }
        })
        curChild.path = path
        break
      }
      case 'ObjectExpression': {
        arg.properties.forEach((property) => {
          const key = property.key.name
          switch (key) {
            case 'url': {
              const reg = /:\d{1,6}(.*?)$/g
              if (reg.test(property.value.value)) {
                curChild.path = RegExp.$1
              }
              break
            }
            case 'method': {
              curChild.method = property.value.value
              break
            }
          }
        })
        break
      }
    }
  })
}

export function handleProperty(property) {
  const curChild: IData = {}
  if (property.type === 'ObjectMethod') {
    curChild.name = property.key.name
    const { body } = property
    body.body.forEach((val) => {
      handleArgument(val, curChild)
    })
  }
  return curChild
}

// 处理对象表达式的问题
export function handleObjectExpression(init) {
  const { properties } = init
  const children: IData[] = []
  properties.forEach((property) => {
    const data = handleProperty(property)
    children.push(data)
  })
  return children
}

/**
 * 这里处理的是 export const () => {} 这样的结构
 */
export function handleArrowFunctionExpression(init, cur) {
  const { body } = init.body
  body.forEach((bodyChild) => {
    handleArgument(bodyChild, cur)
  })
  return body
}
```

> 补充一下 `utils.ts` 中的 `readFile` 和 `write`

```ts
import fs from 'fs'

export const readFile = (fileName: string) => {
  const cont = fs.readFileSync(fileName, 'utf-8')
  return cont
}

export function write(
  path: string,
  apiNames: Record<string, unknown> | unknown[]
) {
  fs.writeFileSync(path, JSON.stringify(apiNames, null, 4), 'utf-8')
}
```

## 参考资料

> 如果不清楚节点值 可以在 下面的 `在线ast转换` 网址中进行 对应的 `type` 查看

* [在线 ast 转换](https://astexplorer.net/)

* [babel ast type 类型节点](https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md#exportnameddeclaration)

* [ast 分析](https://resources.jointjs.com/demos/rappid/apps/Ast/index.html)
