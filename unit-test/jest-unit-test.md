---
title: jest 单元测试
---

<https://www.jianshu.com/p/7f4292f23aac>

## jest

```javascript
npm install--save - dev jest
```

index.js

```javascript
function sum(a, b) {
    return a + b
}

module.exports = {
    sum,
}
```

index.test.js

```javascript
const {
    sum
} = require('../js/index')

describe('sum function test', () => {
    // 描述
    it('sum(1, 2) === 3', () => {
        // 会打印时间
        expect(sum(1, 2)).toBe(3)
    })
    test('sum(1, 2) === 3', () => {
        // 只是普通测试
        expect(sum(1, 2)).toBe(3)
    })
})
```

## 加载 es6 文件

jest 运行时内部先执行( jest-babel )，检测是否安装 babel-core，然后取 .babelrc 中的配置运行测试之前结合 babel 先把测试用例代码转换一遍然后再进行测试

> babelrc

```javascript
npm install--save - dev @babel / core @babel / preset - env {
    "presets": ["@babel/preset-env"]
}
```

> index.js

```javascript
export function sum(a, b) {
    return a + b
}
```

> index.test.js

```javascript
import {
    sum
} from '../js/index'

describe('sum function test', () => {
    // 描述
    it('sum(1, 2) === 3', () => {
        // 会打印时间
        expect(sum(1, 2)).toBe(3)
    })
    test('sum(1, 2) === 3', () => {
        // 只是普通测试
        expect(sum(1, 2)).toBe(3)
    })
})
```

# 测试 ts 文件

jest 需要借助 .babelrc 去解析 TypeScript 文件再进行测试

```javascript
npm install--save - dev @babel / preset - typescript

{
    "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
```

为了解决编辑器对 jest 断言方法的类型报错，如 test、expect 的报错，你还需要安装

```javascript
npm install--save - dev @types / jest
```

> index.ts

```typescript
export function get<T>(
  object: any,
  path: Array<number | string>,
  defaultValue?: T
): T {
  const result = path.reduce(
    (obj, key) => (obj !== undefined ? obj[key] : undefined),
    object
  )

  return result !== undefined ? result : defaultValue
}
```

> index.test.ts

```typescript
import { get } from '../js/get'

test('测试嵌套对象存在的可枚举属性 line1', () => {
  expect(
    get(
      {
        id: 101,
        email: 'jack@dev.com',
        personalInfo: {
          name: 'Jack',
          address: {
            line1: 'westwish st',
            line2: 'washmasher',
            city: 'wallas',
            state: 'WX',
          },
        },
      },
      ['personalInfo', 'address', 'line1']
    )
  ).toBe('westwish st')
})
```

## 持续监听

> \--coverage 显示覆盖率

```javascript
"scripts": {
    "test": "jest --coverage --watchAll"
},
```

# 单元测试覆盖率

单元测试覆盖率是一种软件测试的度量指标，指在所有功能代码中，完成了单元测试的代码所占的比例。有很多自动化测试框架工具可以提供这一统计数据，其中最基础的计算方式为：

# 常用的断言

> <https://www.jestjs.cn/docs/expect>

**.not 修饰符允许你测试结果不等于某个值的情况**

**.toEqual 匹配器会递归的检查对象所有属性和属性值是否相等，常用来检测引用类型**

```javascript
export const getUserInfo = () => {
    return {
        name: 'moji',
        age: 24,
    }
}
```

```javascript
test('getUserInfo()返回的对象深度相等', () => {
    expect(getUserInfo()).toEqual(getUserInfo())
})

test('getUserInfo()返回的对象内存地址不同', () => {
    expect(getUserInfo()).not.toBe(getUserInfo())
})
```

**.toHaveLength 可以很方便的用来测试字符串和数组类型的长度是否满足预期**

**.toThorw 能够让我们测试被测试方法是否按照预期抛出异常**

**.toMatch 传入一个正则表达式，它允许我们来进行字符串类型的正则匹配**

**测试异步函数**
@babel/preset-env 不支持 async await 导致的，这时候就需要对 babel 配置进行增强，可以安装 @babel/plugin-transform-runtime 这个插件解决

```javascript
npm install--save - dev @babel / plugin - transform - runtime
```

**.toContain 匹配对象中是否包含**

```javascript
toBeNull 仅匹配 null
toBeUndefined 仅匹配 undefined
toBeDefined 与… 相反 toBeUndefined
toBeTruthy 匹配
if 语句视为 true 的任何内容
toBeFalsy 匹配
if 语句视为 false 的任何内容

检查数字类型（ number）
toBeGreaterThan 大于
toBeGreaterThanOrEqual 至少（ 大于等于）
toBeLessThan 小于
toBeLessThanOrEqual 最多（ 小于等于）
toBeCloseTo 用来匹配浮点数（ 带小数点的相等）
```

# 循环测试

```typescript
// 测试循环添加
describe('test for loop', () => {
  for (let i = 0; i < 3; i++) {
    it('test for', () => {
      const date = new Date()
      expect(formatDate()).toBe(
        addPrefixZero(date.getFullYear(), 4) +
          '-' +
          addPrefixZero(date.getMonth() + 1, 2) +
          '-' +
          addPrefixZero(date.getDate(), 2)
      )
    })
  }
})
```

## 跑单个测试文件

```shell
npx jest src/index.test.ts
```

## 跑指定的测试用例

可以使用 `-t` 指定( `--testNamePattern` 的缩写)

```ts
npx jest src/index.test.ts -t "add" // add 会去匹配用例名字的正则
```

## 测试用例调试

> `${input:case}` 可以在运行时输入变量

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/node_modules/bin/jest.js",
      "args": [
        "-i",
        "${file}", // 当前打开的文件
        "-t",
        "${input:case}"
      ]
    }
  ],
  "inputs": [
    {
      "type": "promptString",
      "id": "case",
      "description": "测试用例",
      "default": ""
    }
  ]
}
```

> 参考文章: https://juejin.cn/post/7226988012675874872

## jest 中的钩子函数

* beforeAll：所有测试之前执行
* afterAll：所有测试执行完之后
* beforeEach：每个测试实例之前执行
* afterEach：每个测试实例完成之后执行

运行顺序:

```js
;
(beforeAll) => (beforeeach) => (afterEach) => afterAll
```
