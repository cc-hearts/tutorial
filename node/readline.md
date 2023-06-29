---
title: readline的使用
---

```js
import readline from 'readline'

function getQuestions(rl, { text, value }) {
  const question = `${text}(${value})\n`

  return new Promise((resolve, reject) => {
    rl.question(question, (ans) => {
      resolve(ans || value)
    })
  })
}

export async function interact(options) {
  // 创建交互命令行 的实例对象

  const rl = readline.createInterface({
    input: process.stdin,

    output: process.stdout,
  })

  const ans = {}

  try {
    for (let i = 0; i < options.length; i++) {
      const { text, value, field } = options[i]

      ans[field] = await getQuestions(rl, {
        text,
        value,
      })
    }

    rl.close()

    return ans
  } catch (e) {
    console.log('get ans error:', e)
  }
}
```

## 交互式命令行检查包的版本信息

```ts
import { exec } from 'child_process'
import { createInterface } from 'readline'

export async function searchPkgVersion() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question('请输入包的名称?\n', (pkgName: string) => {
    // npm view node version 只有一个版本
    exec(`npm view ${pkgName} versions`, (err, stdout) => {
      if (err) console.log(err)
      console.log(`package ${pkgName} versions is ${stdout}`)
      rl.close()
    })
  })
}
```
