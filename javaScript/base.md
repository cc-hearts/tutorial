---
title: 基础知识
---

## 基本数据类型

六种基本数据类型：

1. Number
2. Null
3. Boolean
4. Undefined
5. String
6. Symbol (new in ES 6)

## Boolean 类型

只有 true 和 false 两个值

- 0 - false
- "" - false
- NaN - false
- undefined - false
- null - false

  其余基本上转成 Boolean 都是 true

> [mdn falsy](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)

## undefined 类型

和 Null 类型一样 也只有一个值**undefined** 未定义（表示一个变量已经声明 但未赋值）
undefined 的类型为 undefined

## Object 类型

属性名可以是任何字符串或者 symbol（一种特殊的标志符类型，将在后面介绍）。

其他类型会被自动地转换为字符串。

```js
const obj = {
  0: 'foo',
}

obj[0] // foo
```

> 对象属性排序
>
> “有特别的顺序”：整数属性会被进行排序，其他属性则按照创建的顺序显示。

```js
let codes = {
  '+49': 'Germany',
  '+41': 'Switzerland',
  '+44': 'Great Britain',
  // ..,
  '+1': 'USA',
}

for (let code in codes) {
  alert(+code) // 49, 41, 44, 1
}
```

## 强制类型转换

纯数字转换还是纯数字

字符串如果非数字内容，则会转换成 NaN

如果是空串或者空格字符串 则返回 0

true 返回的是 1 false 返回的是 0 Null 返回的也是 0 undefined 则返回时数字 NaN

其余的基本类型的数据如果要转换成 String 可以跳用 toString()方法

```javascript
let number = 123 // "123"
let boolean = true // "true

number.toString()
boolean.toString()
```

## 包装类

Boolean、Number 和 String

```js
let s1 = 'some text'
let s2 = s1.substring(2)
```

在这里，s1 是一个包含字符串的变量，它是一个原始值。第二行紧接着在 s1 上调用了 substring() 方法，并把结果保存在 s2 中。我们知道，原始值本身不是对象，因此逻辑上不应该有方法。而实际上 这个例子又确实按照预期运行了。这是因为后台进行了很多处理，从而实现了上述操作。具体来说，当 第二行访问 s1 时，是以读模式访问的，也就是要从内存中读取变量保存的值。在以读模式访问字符串 值的任何时候，后台都会执行以下 3 步:

1. 创建一个 String 类型的实例;
2. 调用实例上的特定方法;
3. 销毁实例。

可以把这 3 步想象成执行了如下 3 行 ECMAScript 代码:

```js
let s1 = new String('some text')
let s2 = s1.substring(2)
s1 = null
```

```js
let s1 = 'some text'
s1.color = 'red'
console.log(s1.color) // undefined
```

这里的第二行代码尝试给字符串 s1 添加了一个 color 属性。可是，第三行代码访问 color 属性时， 它却不见了。原因就是第二行代码运行时会临时创建一个 String 对象，而当第三行代码执行时，这个对象已经被销毁了。实际上，第三行代码在这里创建了自己的 String 对象，但这个对象没有 color 属性。

在原始值包装类型的实例上调用 typeof 会返回"object"，所有原始值包装对象都会转换为布尔值 true

> Object 构造函数作为一个工厂方法，能够根据传入值的类型返回相应原始值包装类型的实例
>
> 使用 new 原始值包装类型的构造函数，与调用同名的转换函数的到的结果并不一样

```js
let value = '25'
let number = Number(value)
console.log(typeof number)
let obj = new Number(value)
console.log(typeof obj) // 转换函数 // "number" // 构造函数 // "object"
```

## 类型声明提升

只有声明本身会被提升，而赋值或其他运行逻辑会留在原地。如果提升改变了代码执行的顺序，会造成非常严重的破坏。

- 函数声明
- var 变量

（函数声明的优先级要比 var 变量声明的优先级要高）

函数声明会被提升，但是函数表达式却不会被提升。

```javascript
foo() // TypeError
bar() // ReferenceError
var foo = function bar() {
  console.log('test')
}
```

var foo =  function bar 为函数表达式 不会进行变量提升

```javascript
//函数声明的形式
bar() // test
function bar() {
  console.log('test')
}
var foo = bar
```

> 作用域中遍寻不到所需的变量，引擎就会抛出 ReferenceError 异常。

出现在后面的函数声明还是可以覆盖前面的

```javascript
function foo() {
  console.log('a')
}

function foo() {
  console.log('b')
}
foo() // b
```

## 算术运算符

- **任何值做 \* / - %都会变成 Number 类型（加号例外）**
- **任何值和 NaN 运算都为 NaN**
- **任何值和 string 做加法运算，都会转化成 string，都会转化成 string 类型，然后做拼串操作**

```javascript
其他类型转化成string类型另外一种方法：
var a = '这里是其他数据类型' + "" //空串; //这里相当于隐式类型转换string() a的类型是string类型
```

- **对非 number 类值运算，会将这些值转换成 number 类型在运算 （加号的字符串运算不在内）**

- **+号在字符串前面可以进行转换成 number 类型**

## 比较运算符

> 两个字符串比较，比较字符的 unicode 编码 比较字符编码是一位一位进行比较 若一位比出高低 后面则无需比较 直接返回结果

字符串比较： JavaScript 会使用“字典（dictionary）”或“词典（lexicographical）”顺序进行判定。

> 换言之，字符串是按字符（母）逐个进行比较的。

想等性比较符（==） 和 普通的比较符的代码逻辑是独立的（>=, <=, >, <）

比较运算符会将 null 转换为数字 因此 `null >= 0` 为 `true` (null 转换为数字是 0)

但是 (==) 不会转换 undefined 和 null 的值 因此 `null == 0` 为 `false`

> `undefined == null` `true` 他们有自己独特的相等判断

## 箭头函数

> 箭头函数不能被 new 执行，因为箭头函数没有 this，也没有 prototype
>
> JS 中的 Number 类型只能安全地表示-9007199254740991 (-(2^53-1)) 和 9007199254740991(2^53-1)之间的整数，任何超出此范围的整数值都可能失去精度。

## WeakMap 和 Map 的区别

> node --expose-gc index.js
> \--expose-gc 参数表示允许手动执行垃圾回收机制

map 的堆内存使用情况

```typescript
function usedSize() {
  // 获取堆内存使用情况
  const used = process.memoryUsage().heapUsed
  return Math.round((used / 1024 / 1024) * 100) / 100 + 'M'
}

global.gc()
console.log(usedSize()) // 3.22M

const map = new Map()

let b = new Array(5 * 1024 * 1024)
map.set(b, 1)

b = null
global.gc()
// 此时的Array 无法被内存回收
console.log(usedSize()) // 43.28M
```

weakMap 内存使用情况

```javascript
function usedSize() {
  // 获取堆内存使用情况
  const used = process.memoryUsage().heapUsed
  return Math.round((used / 1024 / 1024) * 100) / 100 + 'M'
}

global.gc()
console.log(usedSize()) // 3.22M

const map = new WeakMap()

let b = new Array(5 * 1024 * 1024)
map.set(b, 1)

b = null
global.gc()
// 此时的Array 无法被内存回收
console.log(usedSize()) // 3.28M
```

可以看出 WeakMap 是对引用类型的弱引用 不会限制引用类型被 gc 而 Map 会造成引用类型无法 gc 从而造成了内存泄漏。

> WeakMap 的键是弱引用对象(包括 null)
> WeakMap 的弱引用只是键名 不是键值
> WeakMap 的 key 不可被枚举

## 函数以模版字符串运行

```js
var a = 5
var b = 10

tag`Hello ${a + b} world ${a * b}`
// 等同于
tag(['Hello ', ' world ', ''], 15, 50)

function invoke(express, ...rest) {
  console.log(express, rest)
  return express
    .reduce((acc, cur, index) => {
      acc.push(cur)
      acc.push(rest[index])
      return acc
    }, [])
    .join('')
}

const name = 'Bob'
const email = 'test@example.com'
const res = invoke`SELECT 'My name is ${name} and my email  is ${email}'`

console.log(res)
```

> [taggesd_templates mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)

## 页面可编辑元素

设置 contentEditable 则可以使得页面为可编辑页面

```js
document.body.contentEditable = true
```

## try catch finally

try 如果是一个函数 return 了 但是 finally 还是会走

```js
;(() => {
  function log() {
    console.log('log')
  }
  try {
    return log()
  } catch (e) {
  } finally {
    console.log('finally')
  }
})()
```

## console 添加颜色

> %c: 标识将 CSS 样式应用于 %c 之后的 console 消息。

```js
console.log('%c消息 是蓝色的 %c 这个是红色的', 'color:blue', 'color: red')
```

## 通过 `import assert` 导入文件

```js
import Icon from './icon.json'
assert {
    type: 'json'
}
```

## 通过 `fetch` 导入文件

```js
const data = await fetch('./src/article/data.json')
const list = await data.json() // 获取json数据
```

## 动态导入 json

```js
const path = './icon.json'

async function getJsonModule() {
  const jsonModule = await import(path, {
    assert: {
      type: 'json',
    },
  })
  return jsonModule
}
```

## 私有字段

添加#操作符表示私有字段

```typescript
class ClassWithPrivateField {
  #privateField
}
```

## 解构

- 如果对象的属性为 null 是不能解构出来的

```javascript
let obj = {
  name: null,
}

const { name = 'name' } = obj

console.log(name) // null
```

经过 babel 转换的代码:

```javascript
'use strict'

var obj = {
  name: null,
}
var _obj$name = obj.name,
  name = _obj$name === void 0 ? 'name' : _obj$name
```

由此可得

```javascript
void 0 === undefined // true

null === undefined // false
```

即 解构之后如果要赋值默认值 则这个值得是 undefind

可以使用 **void 0** 代替 **undefined**

1. 使用 void 0 比使用 undefined 能够减少 3 个字节
2. undefined 并不是 javascript 中的保留字，我们可以使用 undefined 作为变量名字，然后给它赋值。void 0 输出唯一的结果 undefined，保证了不变性。

## 奇特的运算

```javascript
{} + "1" // 1
[] + "1" // "1"
{} + [] // 0
[] + {} //'[object Object]'
```

## 命名规范

- `"get…"` —— 返回一个值，
- `"calc…"` —— 计算某些内容，
- `"create…"` —— 创建某些内容，
- `"check…"` —— 检查某些内容并返回 boolean 值，等。

函数名通常是动词

## 垃圾回收

typeof 操作符可以确定值的原始类型，而 instanceof 操作符用于确保值的引用类型。

主流的垃圾回收算法是标记清理，即先给当前不使用的值加上标记，再回来回收它们的内存。

## 严格模式

> 现代 JavaScript 支持 “class” 和 “module” —— 高级语言结构，它们会自动启用 use strict。因此，如果我们使用它们，则无需添加 "use strict" 指令。

```html
<!-- index.js 中会自动开始严格模式 -->
<script src="./index.js" type="module" />
```

## 常用网站

[es6 语法支持网站查询](https://kangax.github.io/compat-table/es6/)

[jsdoc](https://jsdoc.app/)

[现代 javascript 教程](https://zh.javascript.info/)
