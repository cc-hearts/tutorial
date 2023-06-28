---
title: 迭代器
---

## 简单迭代器的使用

> 一些内置的语法结构——比如[展开语法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)——其内部实现也使用了同样的迭代协议

ES5 语法：

```js
function createIterator(iterator) {
    let i = 0

    return {
        next() {
            const done = iterator.length === i
            const value = done ? void 0 : iterator[i++]
            return {
                done,
                value
            }
        },
    }
}

const iterator = createIterator(['red', 'blue', 'yellow'])
let val
while (!(val = iterator.next()).done) {
    console.log(val.value)
}
```

上述的迭代器转换成生成器

```js
function* createIterator(iterator) {
    for (let i = 0; i < iterator.length; i++) {
        yield iterator[i]
    }
}
```

## 可迭代对象

可迭代对象都实现了 `Symbol.iterator` 方法 当使用 `for of ` 或者扩展运算符的时候 会调用这个方法

```js
const obj = {
    a: 1,
    *[Symbol.iterator]() {
        while (!(this.a > 10)) yield this.a++

        return // 当返回的是 done 的时候 会忽略return的值
    },
}

for (const iterator of obj) {
    console.log(iterator)
}
// 这样也是迭代
console.log([...obj])
```

> 委托迭代器的赋值操作：

```js
function* createNumberIterator(item) {
    const a = yield 1
    console.log('get params:', a) // 1
    yield 2 + a
    return 3
}

function* createRepeatingIterator(count) {
    for (let i = 0; i < count; i++) {
        yield 'repeat'
    }
}

function* createCombinedIterator() {
    let result = yield* createNumberIterator()
    yield* createRepeatingIterator(result)
}

var iterator = createCombinedIterator()

console.log(iterator.next(1)) // "{ value: 1, done: false }"
console.log(iterator.next(2)) // "{ value: 4, done: false }"
console.log(iterator.next()) // "{ value: "repeat", done: false }"
console.log(iterator.next()) // "{ value: "repeat", done: false }"
console.log(iterator.next()) // "{ value: "repeat", done: false }"
console.log(iterator.next()) // "{ value: undfined, done: true }"
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

console.log([...i])
```

## 参考资料

* [迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%8D%8F%E8%AE%AE)
