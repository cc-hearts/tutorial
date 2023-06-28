---
title: 生成器
---

Generator **生成器**

```javascript
function* generator() {
    let index: number = 0
    var v = yield 2
    while (true) {
        console.log(v)
        yield index * v
        index++
    }
}
const generators = generator()

console.log(generators.next().value) //0
console.log(generators.next(10)) //{value: 0, done: false}
console.log(generators.next(10)) //{value: 10, done: false}
console.log(generators.next(10)) //{value: 20, done: false}
```

yield 关键字用来暂停和恢复一个生成器函数

```javascript
;
[rv] = yield [expression]
```

**expression **定义通过迭代器协议从生成器函数返回的值。如果省略，则返回 undefined。
**rv **返回传递给生成器的 next()方法的可选值，以恢复其执行。

```javascript
function* generator() {
    var created = yield
    if (created instanceof Function) {
        created.apply(this)
    }
    var mounted = yield
    if (mounted instanceof Function) {
        mounted.apply(this)
    }
}
const v = generator()

v.next()
v.next(() => {
    console.log('created')
})
v.next(() => {
    console.log('mounted')
})
console.log(v.next())
```

> 生成器函数不能当作构造函数使用

**function\*** 这种声明方式(function 关键字后跟一个星号）会定义一个**_生成器函数_ (\***generator function**\*)**，它返回一个 [Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator) 对象。并且它符合[可迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)和[迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#iterator)。

> [生成器函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)

生成器函数可以由构造函数生成或者直接 function\*(){} 生成

## 由构造函数生成

生成器函数的构造器 GeneratorFunction 会生成一个新的**生成器函数**对象
但是 GeneratorFunction 并不是一个全局对象 需要获取

```javascript
const GeneratorFunction = Object.getPrototypeOf(function*() {}).constructor

console.log(
    Object.prototype.toString.call(new GeneratorFunction('a', 'b', 'yield a + b'))
) // [object GeneratorFunction]
```

由构造函数生成的效率会比 function\*{}的效率低
如果生成器函数中有显式的 return 则最后的 next 带出的是 return 的值 且生成器对象的 done 为 true

```javascript
function* g() {
    yield 2
    return '1'
}
const gObj: Generator = g() // Generator {}

console.log(gObj.next())
console.log(gObj.next(2)) // 向生成器发送一个值 2 并且返回下一个生成器表达式的值
```

> [Generator.prototype.return()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator/return) 返回给定的值并结束生成器。

```javascript
function* g() {
    yield 2
    return '1'
}
const gObj: Generator = g() // Generator {}

console.log(gObj.return('1')) // 1
```

## yield\*

或者如果用的是 [yield\*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*)（多了个星号），则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。

## 迭代 generator 对象

```javascript
function* iterator() {
    yield 1
    yield 2
    yield 3
}
const i = iterator()
for (const iterator of i) {
    console.log(iterator)
    // 1 2 3
}
```

## 多维数组变为一维数组

```javascript
// 多维数组变为一维数组

function* isArr(arr: any[]) {
    if (Array.isArray(arr)) {
        for (const iterator of arr) {
            yield* isArr(iterator)
        }
    } else {
        yield arr
    }
}

const arr = ['a', ['b', 'c'],
    ['d', ['e', 'f']]
]

const i = isArr(arr)

let result: any[] = []
for (const iterator of i) {
    result = [...result, iterator]
}
console.log(result)
```
