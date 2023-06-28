---
title: zlib
---

```javascript
const zlib = require('zlib')

console.log(zlib)
// gzip deflate br 是三种不同的压缩算法
// 其中gzip和deflate是同一种格式(gzip)的两种不同的算法实现
// br 则是使用Brotli算法的压缩格式。

const deflate = zlib.createDeflate()

const gzip = zlib.createGzip()

const br = zlib.createBrotliCompress()
```

# 单文件压缩

```javascript
const fs = require('fs')
const zlib = require('zlib')

const gzipFilePath = __dirname + '/test.js'
const destFilePath = __dirname + '/gzipData.zip'

const gzipReadStream = fs.createReadStream(gzipFilePath)
const gzipWriteStream = fs.createWriteStream(destFilePath)

gzipReadStream.pipe(new zlib.createGzip()).pipe(gzipWriteStream)
```

解压就是将压缩的步骤反过来

```javascript
const fs = require('fs')
const zlib = require('zlib')

const gzipFilePath = __dirname + '/test.js'
const destFilePath = __dirname + '/gzipData.zip'

const gzipReadStream = fs.createReadStream(destFilePath)
const gzipWriteStream = fs.createWriteStream(gzipFilePath)

gzipReadStream.pipe(new zlib.createGunzip()).pipe(gzipWriteStream)
```
