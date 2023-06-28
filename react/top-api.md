---
title: React 顶层API的使用
---

## 顶层 API 的使用

```tsx
import React from 'react'

function App() {
  const render = (
    <div className="app">
      {/* 普通dom类型 */}
      <div>
        <div>123123123</div>
      </div>
      {/* 文本节点类型 */}
      文本节点类型
      {/* Fragment 类型 */}
      <React.Fragment>
        <div>fragment</div>
      </React.Fragment>
      {/* 数组节点类型 */}
      {[1, 2, 3].map((val) => (
        <div key={val}>{val}</div>
      ))}
    </div>
  )

  // 获取所有的子节点

  const { children } = render.props

  console.log(children)

  // 扁平化 扁平化第一层的数组

  let childrenList = React.Children.toArray(children)

  console.log(childrenList)

  // 除去文本节点类型

  const filterKeyList: React.ReactElement[] = []

  childrenList.forEach((node) => {
    // 是否是react类型 如果是的话 返回

    if (React.isValidElement(node)) filterKeyList.push(node)
  })

  console.log(filterKeyList)

  // 创建新的react元素

  const newNode = React.createElement(
    'div',

    { key: 'unique' },

    'stu react example'
  )

  // 修改元素

  console.log([...filterKeyList, newNode])

  // https://zh-hans.reactjs.org/docs/react-api.html#cloneelement

  return React.cloneElement(render, {}, [...filterKeyList, newNode])

  // return render
}

export default App
```

## react 自动引入

* @babel/plugin-syntax-jsx
  + @babel/plugin-syntax-jsx ： 使用这个插件，能够让 Babel 有效的解析 JSX 语法。
* @babel/plugin-transform-react-jsx：这个插件内部调用了 @babel/plugin-syntax-jsx，可以把 React JSX 转化成 JS 能够识别的 createElement 格式。

  > 需要在.babelrc 中设置  runtime: automatic

```js
"presets": [
    ["@babel/preset-react", {
        "runtime": "automatic"
    }]
],
```

## 工具 API

React. Children 提供了一些工具 API

render 函数

```tsx
import React from 'react'
import { Component, ReactNode } from 'react'

export default class App extends Component {
  constructor(props: {}) {
    super(props)
  }
  render(): ReactNode {
    const reactElement = (
      <div className="app">
        {/* 普通dom类型 */}
        <div>
          <div>123123123</div>
          <div>
            <div>
              <div>123</div>
            </div>
          </div>
        </div>
        {/* 文本节点类型 */}
        文本节点类型
        {/* Fragment 类型 */}
        <React.Fragment>
          <div>fragment</div>
        </React.Fragment>
        {/* 数组节点类型 */}
        {[1, 2, 3].map((val) => (
          <div key={val}>{val}</div>
        ))}
      </div>
    )
    // count 返回 children 中的组件总数量，等同于通过 map 或 forEach 调用回调函数的次数。
    // toArray 扁平化children数组 会自动添加上key（注意只能扁平化一层）
    // map 如果 children 是一个数组，它将被遍历并为数组中的每个子节点调用该函数。如果子节点为 null 或是 undefined，则此方法将返回 null 或是 undefined，而不会返回数组
    // only 验证 children 是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误
    // forEach 与map 类似
    const { children } = reactElement.props
    const newNode = React.Children.toArray(children)
    console.log(newNode)

    // count
    console.log(React.Children.count(newNode))

    // map
    const map = React.Children.map(children, function (val) {
      try {
        // only的使用
        console.log(React.Children.only(val))
      } catch (e) {
        console.log(e)
      }
    })

    return <></>
  }
}
```

## babel 转换 react

```ts
const fs = require('fs')
const path = require('path')
const babel = require('@babel/core')

const code = fs.readFileSync(path.join(__dirname, 'App.tsx'), {
  encoding: 'utf8',
})
const result = babel.transformSync(code, {
  plugins: ['@babel/plugin-transform-react-jsx'],
})

fs.writeFileSync(path.join(__dirname, 'bundle.js'), result.code)
```
