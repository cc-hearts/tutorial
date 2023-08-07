---
title: fs Modules
---

>  node:fs 是node的内置模块， fs是node:fs的一个包装，提供了更好的api

## 常用 API

### 判断文件是否存在

```js
if (fs.existsSync(fileName)) {
  console.log('file exist')
}
```

### 同步写入

```js
// 同步写入api

// https://nodejs.org/api/fs.html#fswritefilesyncfile-data-options

fs.writeFileSync(`./${fileName}`, `# ${getTodayFormatDate()} 每日计划`, {
  encoding: 'utf-8',
})
```

- fs.dir：操作目录的子模块，提供`dir.read`、`dir.readSync`等 API 来读取目录信息。
- fs.createReadStream()：创建一个读文件流对象。
- fs.createWriteSteam()：创建一个写文件流对象。
- fs.stat、fs.statSync()()：读取文件信息，包括文件状态、权限、创建时间、修改时间等等信息。
- fs.appendFile()、fs.appendFileSync()：追加内容到文件
- fs.chmod()、fs.chown()：改变文件权限、权限组。
- fs.copyFile()、fs.copyFileSync()：拷贝文件。
- fs.mkdir()、fs.mkdirSync()：创建目录。
- fs.rename()、fs.renameSync()：修改文件名。
- fs.rmdir()、fs.rmdirSync()：删除目录。
- fs.unlink()、fs.unlinkSync()：删除文件。
- fs.watchFile()：这是用来监听文件内容变化的 API。
- fs.writeFile()、fs.writeFileSync()：写入文件。
- fs.realpath () 获取文件的绝对路径

## fs.stats

fs 获取文件的状态

```javascript
const fs = require('fs')
const path = require('path')

const stats = fs.statSync(path.resolve(__dirname, './index.js'))
// atimeMs 指示上次访问此文件的时间戳，以自 POSIX 纪元以来的毫秒数表示。
// ctimeMs 指示文件状态最后一次更改的时间戳，以自 POSIX 纪元以来的毫秒数表示。
// mtimeMs 指示该文件最后一次修改的时间戳，以自 POSIX 纪元以来的毫秒数表示。
// dev：文件所在设备的ID。
// mode：文件的权限和类型。
// nlink：硬链接的数量。
// uid：文件所有者的用户ID。
// gid：文件所有者的组ID。
// rdev：如果文件是特殊文件，则为该文件设备的ID。
// blksize：文件系统I/O操作的块大小。
// ino：文件的索引节点号。
// size：文件大小（以字节为单位）。 1kb === 1000b
// blocks：文件所使用的磁盘块数。
// atimeMs/atime：文件上一次访问时间。
// mtimeMs/mtime：文件上一次修改时间。
// ctimeMs/ctime：文件状态上一次更改时间。
// birthtimeMs/birthtime：文件创建时间。
console.log(stats)
```

## 查看文件的大小以及 gzip 压缩之后的大小

```js
import fs, { readFileSync } from 'fs'
import * as zlib from 'zlib'
const filePath = './assets/index-88542b38.js'
fs.stat(filePath, (err, file) => {
  console.log(file)
  // 1kb === 1000b
})
const file = readFileSync(filePath)
console.log(zlib.gzipSync(file).length) // 46173b === 46.17kb
```

## path.resolve 和 path.join 的区别

path.join 只是简单的将路径片段进行拼接，并规范化生成一个路径，而 path.resolve 则一定会生成一个绝对路径，相当于执行 cd 操作。

> 参考 [Node 的 path.resolve 和 path.join 的区别](https://cloud.tencent.com/developer/article/1888130)

## realpath

> 将相对路径转换成绝对路径

```ts
import { realpath } from 'fs'
realpath('./', (err, resolvePath) => {
  console.log(resolvePath) // /Users/heart/Desktop/t/2023-3-1
})
```

## 🌰 删除所有的node_modules

```js
/**
 * 删除全局的node_modules
 */
import { readdir, access, constants, writeFile, rm } from "fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "os";
import ora from 'ora'
const filterPathName = [
  'Library',
  'Applications',
  'Downloads'
]
const __dirname = dirname(fileURLToPath(import.meta.url))
const cacheNodeModulesPaths = []
async function write(fileName, data) {
  return await writeFile(join(__dirname, fileName), data, { encoding: 'utf-8' })
}

async function removeNodeModules(path) {
  return await rm(path, { recursive: true, force: true })
}
async function searchNodeModules(path) {
  // 读取当前目录下的所有文件
  try {
    await access(path, constants.R_OK)
    let dirs = await readdir(path, { withFileTypes: true })
    dirs = dirs.filter(dir => dir.isDirectory())
    // 判断是否是一个文件夹
    for (let i = 0; i < dirs.length; i++) {
      const name = dirs[i].name
      if (name.startsWith('.') || filterPathName.includes(name)) continue
      if (name === 'node_modules') {
        cacheNodeModulesPaths.push(join(path, name))
        continue
      }
      await searchNodeModules(join(path, name))
    }
  } catch (e) {
  }
}
async function bootstrap() {
  const spinner = ora('开始搜索node_modules').start()
  await searchNodeModules(homedir())
  spinner.text = '搜索完成, 搜索路径写入 cache.json'
  await write('cache.json', JSON.stringify(cacheNodeModulesPaths))
  spinner.succeed('写入完成, 进行递归删除node_modules')
  const succeedRemovePath = []
  await Promise.all(cacheNodeModulesPaths.map(async path => {
    try {
      await access(path, constants.R_OK)
      await removeNodeModules(path)
      succeedRemovePath.push(path)
      console.log(`删除 ${path} 成功`);
    } catch (e) {
    }
  }))
  await write('succeed.json', JSON.stringify(succeedRemovePath))
  spinner.succeed(`删除完成, 共删除${succeedRemovePath.length}个node_modules， 数据写入到 success.json 中`)
}

bootstrap()
```

