---
title: babel transform-gl-matrix
---

```js
const { vec2 } = require('gl-matrix')

const a = vec2(1, 2)
const b = vec2(3, 4)
const c = vec2(a) + vec2(b)
const d = vec2(a) + 1.0
const e = vec2(a) + vec2(b) + vec2(c)
const f = 2.0 + vec2(a)
const g = -vec2(a)
```

将上述的函数转换成下面的形式

```js
const { vec2 } = require('gl-matrix')
const a = vec2.fromValues(1, 2)
const b = vec2.fromValues(3, 4)
const c = vec2.add(vec2.create(), a, b)
const d = vec2.add(vec2.create(), a, vec2.fromValues(1.0, 0))
const e = vec2.add(vec2.add.create(), vec2.add(vec2.create(), a, b), c)
const f = vec2.add(vec2.create(), vec2.fromValues(2.0, 0), a)
const g = vec2.negate(vec2.create(), a)
```

- 创建`.babelrc`

```js
{
    "plugins": [
        "./index.js"
    ]
}
```

在 `index.js` 中写入

> 此时的第一额参数 `types` 就是 `@babel/types` 的判断方法

```js
module.exports = function ({ types: t }) {
  function tranverse(t, left, right) {
    return t.callExpression(t.identifier(`${left.callee.name}.add`), [
      t.callExpression(t.identifier(`${left.callee.name}.create`), []),
      left.arguments[0],
      right.arguments[0],
    ])
  }
  // plugin contents
  return {
    visitor: {
      CallExpression: {
        exit(nodePath) {
          const fullName = nodePath.node.callee.name
          if (fullName === 'vec2') {
            const args = nodePath.node.arguments
            if (args.length === 2) {
              nodePath.node.callee.name = 'vec2.fromValues'
            }
          }
        },
      },
      BinaryExpression: {
        exit(nodePath) {
          const { left, right } = nodePath.node
          if (t.isCallExpression(left) && left.callee.name === 'vec2') {
            if (t.isCallExpression(right) && right.callee.name === 'vec2') {
              if (nodePath.node.operator === '+') {
                const node = tranverse(t, left, right)
                nodePath.replaceWith(node)
              }
            } else if (t.isNumericLiteral(right)) {
              if (nodePath.node.operator === '+') {
                const node = t.callExpression(
                  t.identifier(`${left.callee.name}.add`),
                  [
                    t.callExpression(
                      t.identifier(`${left.callee.name}.create`),
                      []
                    ),
                    left.arguments[0],
                    // t.callExpression(t.identifier(`vec2.fromValues`), [t.identifier(String(right)), t.identifier('0')])
                    t.callExpression(t.identifier(`vec2.fromValues`), [
                      right,
                      t.numericLiteral(0),
                    ]),
                  ]
                )
                nodePath.replaceWith(node)
              }
            }
          } else if (
            t.isCallExpression(left) &&
            left.callee.name === 'vec2.add'
          ) {
            if (nodePath.node.operator === '+') {
              const node = t.callExpression(
                t.identifier(`${left.callee.name}`),
                [
                  t.callExpression(
                    t.identifier(`${left.callee.name}.create`),
                    []
                  ),
                  left,
                  right.arguments[0],
                ]
              )
              nodePath.replaceWith(node)
            }
          } else if (
            t.isCallExpression(right) &&
            right.callee.name === 'vec2'
          ) {
            if (nodePath.node.operator === '+') {
              if (t.isNumericLiteral(left)) {
                const node = t.callExpression(
                  t.identifier(`${right.callee.name}.add`),
                  [
                    t.callExpression(
                      t.identifier(`${right.callee.name}.create`),
                      []
                    ),
                    t.callExpression(t.identifier(`vec2.fromValues`), [
                      left,
                      t.numericLiteral(0),
                    ]),
                    right.arguments[0],
                    // t.callExpression(t.identifier(`vec2.fromValues`), [t.identifier(String(right)), t.identifier('0')])
                  ]
                )
                nodePath.replaceWith(node)
              }
            }
          }
        },
      },
      UnaryExpression: {
        exit(nodePath) {
          const { operator, argument } = nodePath.node
          if (operator === '-') {
            if (
              t.isCallExpression(argument) &&
              argument.callee.name === 'vec2'
            ) {
              const node = t.callExpression(
                t.identifier(`${argument.callee.name}.negate`),
                [
                  t.callExpression(
                    t.identifier(`${argument.callee.name}.create`),
                    []
                  ),
                  argument.arguments[0],
                ]
              )
              console.log(node)
              nodePath.replaceWith(node)
            }
          }
        },
      },
    },
  }
}
```

在 `package.json` 中添加脚本:

```js
"scripts": {
    "compile": "babel test.js -d dist" // output
}
```
