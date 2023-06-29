---
title: child_process exec
---

执行 shell 命令

```js
import { exec } from 'child_process'
// 创建文件夹
exec('mkdir sign')

// 查看当前的文件夹

exec('ls', (err, stdout) => {
  // 获取当前所有的文件 以及文件夹
  console.log(stdout)
})

// 监听并且在控制台输出
const cp = exec('ping www.baidu.com')

cp.stdout.on('data', (chunk) => {
  process.stdout.write(chunk)
})
```

## exec 调用 shell 程序

```javascript
const childProcess = require('child_process')
// sto的值为 shell的输出
childProcess.exec('echo hello', (err, sto) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(sto)
})
```

## 打开浏览器

```js
import { platform } from 'process'
import { exec } from 'child_process'
const url = 'http://www.baidu.com'
let cmd = ''
if (platform == 'win32') {
  cmd = 'start "%ProgramFiles%Internet Exploreriexplore.exe"'
} else if (platform == 'linux') {
  cmd = 'xdg-open'
} else if (platform == 'darwin') {
  cmd = 'open'
}
exec(`${cmd} "${url}"`)
```
