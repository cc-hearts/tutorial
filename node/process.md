---
title: process
---

堆内存使用情况

```js
function usedSize() {
  // 获取堆内存使用情况
  const used = process.memoryUsage().heapUsed
  return Math.round((used / 1024 / 1024) * 100) / 100 + 'M'
}
```

## process.hrtime()

process.hrtime() 方法在 [seconds, nanoseconds] 元组 Array 中返回当前高解析度实时，其中 nanoseconds 是无法以秒精度表示的实时剩余部分

> - <http://nodejs.cn/api/process/process_hrtime_time.html>

## process.env

`process.env` 有 一系列的 Node 环境变量

## process.argv

`process.argv` 可以获取到命令行的参数

```js
// $ node src/docs/day-2/index.js --title=12
function getArgvParams(list) {
  return (
    list instanceof Array &&
    list.reduce((pre, cur) => {
      if (/^--/.test(cur)) {
        const arr = cur.split(/^--|=/)
        const [, title, value] = arr
        if (title && value) pre[title] = value
      }
      return pre
    }, {})
  )
}
```

```js
// $ node src/docs/day-2/index.js --title 12
function parseArgv(list) {
  const options = {}
  const reg = /^--/
  for (let i = 0; i < list.length; i++) {
    if (reg.test(list[i])) {
      const key = list[i].replace(reg, '')
      options[key] = list[++i]
    }
  }
  return options
}
```

## 第三方库

**[ command-line-args](https://github.com/75lb/command-line-args)**

> 它不仅能获得用户的输入，还能检测用户的输入是否正确

```js
import commandLineArgs from 'command-line-args'

// commandLineArgs 基于配置项

// 如果使用别名 则是 node src/docs/day-2/command-line-args.js -t 1234

// 使用name 则是 node src/docs/day-2/command-line-args.js --title 1234

const optionDefinitions = [
  {
    name: 'title',
    alias: 't',
    type: String,
  },
]

console.log(commandLineArgs(optionDefinitions)) // { title: '1234' }
```

- [command-line-usage](https://github.com/75lb/command-line-usage)
  > 用于生成简单的 help 提示命令

```js
import commandLineUsage from 'command-line-usage'

const sections = [
  {
    header: '词条生成器',

    content: '生成词条段落 便于调试',
  },

  {
    header: 'help',

    optionList: [
      {
        name: 'max',

        typeLabel: '{underline string}',

        description: '文章最大字数',
      },
    ],
  },
]

export const usage = commandLineUsage(sections)
```

## process.stdin

```js
console.log('请输入一个要求和的整数，以0结束输入')

let sum = 0

// 设置读取的字节位数 否则以 utf8读取

process.stdin.setEncoding('utf-8')

// 回车出发readable

process.stdin.on('readable', () => {
  // 读取的是utf8

  // 除去空格

  const chunk = process.stdin.read() // 获取当前输入的字符，包含回车

  // 字符串切割

  const n = Number(chunk.slice(0, -1))

  sum += n

  if (n === 0) {
    process.stdin.emit('end')

    return
  }

  //process.stdin.read()从标准输入流中读取内容，如果有内容，就会把读到的内容返回，如果没有内容，则会返回 null，并继续处于readable状态，监听下一次输入

  process.stdin.read()
})

process.stdin.on('end', () => {
  console.log('sum:', sum)
})

// https://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html

// utf-8 读取

// 11100110 10001000 10010001

// e6 88 91 我
```

### 监听 `data`

```ts
process.stdin.on('data', (data) => {
  const ans = data.toString()
  if (ans === 'end\n') {
    // 使用exit可以退出
    process.exit(0)
  }
})
```

### 监听 `readable`

```ts
process.stdin.on('readable', () => {
  const ans = process.stdin.read()
  console.log('ans', ans.toString())
})
```
