---
title: babel 转译 vue-route 文件结构
---

# babel 转译 vue-route 文件结构

一般的 `vue.router` 的结构 一般为

```js
export default [{
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [{
        path: 'dashboard',
        component: () => import('@/views/academicAffairs/dashboard'),
        name: 'Dashboard',
        meta: {
            title: '首页'
        },
    }, ],
}, ]
```

新建一个 `index.ts` 文件 引入 `babel` 进行词法解析

```ts
import exportDefaultDeclaration from './lib/exportDefaultDeclaration'
import { readFile, write } from './lib/utils'

const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

function bootstrap() {
  const cont = readFile('.template/router-template.js')
  const routers = []
  const ast = parser.parse(cont, {
    sourceType: 'module',
  })
  traverse(ast, {
    // 这里解析的默认导出的结构
    ExportDefaultDeclaration: exportDefaultDeclaration(routers),
  })
  write(path.resolve(__dirname, './dist/router.json'), routers)
}

bootstrap()
```

> `exportDefaultDeclaration.ts`

```ts
import { handleRouterElements } from './shard'

export default function (routers) {
  return function ({ node }) {
    const { declaration } = node
    const { elements } = declaration
    handleRouterElements(elements, routers)
  }
}
```

> `handleRouterElements` 对代码进行分析

```ts
export function handleRouterElements(elements, routes) {
  elements.forEach((el) => {
    const { properties } = el
    const router: any = {}
    properties.forEach((property) => {
      // property 是对象的各种 key 值  根据不同的 key 值 进行解析
      const name = property.key.name
      switch (name) {
        case 'path': {
          router.path = property.value.value
          break
        }
        case 'meta': {
          const { properties } = property.value
          properties.forEach((child) => {
            if (child.key.name === 'title') {
              router.name = child.value.value
            }
          })
          break
        }
        case 'children': {
          const { elements } = property.value
          const children = []
          handleRouterElements(elements, children)
          router.children = children
          break
        }
      }
    })
    routes.push(router)
  })
}
```
