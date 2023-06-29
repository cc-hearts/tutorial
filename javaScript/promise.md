---
title: promise resolve 总结
---

```ts
let thenable = {
  then: (resolve) => {
    console.log(resolve)
    resolve('123')
  },
}

// Promise.resolve(value) 总结:
// 如果 接收的参数是一个Promise 对象 则直接后续直接引用的是这个Promise对象
// 如果 接收的参数是一个thenable 对象 则会执行thenable的的then方法 后续的值根据这个方法的调用(resolve 或者 reject) 来判定后续的走向
// 如果 都不是上述的情况 则会直接使用该value值作为参数 传递给下面的then 方法
Promise.resolve(thenable).then((res) => {
  console.log(res)
})
```

## resolve 一个 `Promise` 会发生什么?

```js
const p1 = new Promise(function (resolve) {
  resolve('ok')
})
var p2 = new Promise(function (resolve) {
  resolve(p1) //resolve了一个promise
})

console.log(p1) //Promise { ok }
console.log(p2) //Promise { <pending> }

p2.then(function (res) {
  console.log(res) //“ok"
})
```

当 `p2` 的 `execute` 执行之后 `resolve` 了 一个 `Promise` 相当于进行了

```js
var p2 = new Promise(function (resolve) {
  p1.then(resolve)
})
```

因此 resolve 会 要在微任务的任务队列中进行执行 p2 的 `log` 会呈现在 `pending` 状态

## Promise.allSettled()

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

## 参考资料

- [resolve 一个 promise 时候发生了什么](https://zhuanlan.zhihu.com/p/81643188)
- [What's the difference between resolve(thenable) and resolve('non-thenable-object')?](https://stackoverflow.com/questions/53894038/whats-the-difference-between-resolvethenable-and-resolvenon-thenable-object)
