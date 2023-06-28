---
title: utils
---

官方提供的工具包

# promiseify

将函数的执行 Promise 化 大致的实现:

```javascript
// promiseify 大致实现思路
function promiseify(callback) {
    return async (...args) => {
        new Promise((resolve, reject) => {
            callback(...args, (error, ...rest) => {
                console.log(rest)
                if (error) reject(error)
                else resolve(rest)
            })
        })
    }
}
//const readFile = require('fs').readFile
//readFile('./stop.js',(err, data) => {
//    console.log(data.toString())
//})

// 但是有副作用 返回结果会变成数组包裹
const fsFileSync = promiseify(require('fs').readFile)
fsFileSync('./stop.js').then((res) => {
    console.log(res)
})
```

## 参考资料

* promiseify: <https://segmentfault.com/a/1190000016720505>
