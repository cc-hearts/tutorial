---
title: http服务与缓存
---

# 简单 http 服务

```javascript
const http = require('http')
const serve = http.createServer((req, res) => {
  console.log(req.method) // 请求方法
  console.log(req.headers.accept) // 请求所接受的类型
  console.log(req.url) // 请求的url
  // 浏览器默认的请求是不带 application/json 的形式的
  if (
    req.method === 'POST' ||
    req.headers.accept.includes('application/json')
  ) {
    res.end('application/json')
    return
  }
  res.end('hello world')
})

serve.listen(8080, () => {
  console.log('services: http://localhost:8080')
})
```

# 静态 http 服务

```javascript
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

function httpFilter(url) {
  return new Promise((resolve, reject) => {
    const white = ['/favicon.ico']
    if (white.includes(url)) resolve(null)
    else resolve(url)
  })
}

function writeHead(code, { ContentType = 'text/html; charset="utf-8"' } = {}) {
  if (this && this.writeHead && this.writeHead instanceof Function) {
    this.writeHead(code, {
      'Content-Type': ContentType,
    })
  }
}

const service = http.createServer(async (req, res) => {
  const prefixFile = 'static'
  let { url: httpUrl } = req
  httpUrl = await httpFilter(httpUrl)
  if (httpUrl === null) {
    res.end(null)
    return
  }
  let filePath = path.resolve(
    __dirname,
    path.join(prefixFile, url.fileURLToPath(`file:///${httpUrl}`))
  )
  if (fs.existsSync(filePath)) {
    // 获取文件信息
    const stats = fs.statSync(filePath)
    const isDirectory = stats.isDirectory()
    // 是一个文件夹 默认返回改文件夹下的 index.html
    if (isDirectory) {
      filePath = path.join(filePath, 'index.html')
    }
    if (fs.existsSync(filePath)) {
      writeHead.call(200)
      const val = await fs.readFileSync(filePath)
      res.end(val)
      return
    }
  }
  writeHead.call(404)
  res.end('<h1>404 page not found')
})

service.listen(8080, () => {
  console.log('services: http://localhost:8080')
})
```

但是对 MIME 类型的处理没有完善 不能够处理音视频等文件对应的返回的 `Content-Type` 引入第三方包 `mime` 获取返回不同的 `MIME` 的类型。

```javascript
const mime = require('mime')
// ...
writeHead.call(res, 200, {
  ContentType: mime.getType(ext),
})
```

> 修改文件的读取方式 fs.readFileSync 的方式 会将读取的内容存入到内存中，如果文件的内容过大，容易造成 I/O 的性能瓶颈 创建文件流可以节省 I/O 开销问题

```javascript
// const val = await fs.readFileSync(filePath)
// 创建文件流 节省I/O 开销
const readStream = fs.createReadStream(filePath)
readStream.pipe(res)
// res.end(val)
```

完整代码

```javascript
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

function httpFilter(url) {
  return new Promise((resolve, reject) => {
    const white = ['/favicon.ico']
    if (white.includes(url)) resolve(null)
    else resolve(url)
  })
}

function writeHead(code, { ContentType = 'text/html; charset="utf-8"' } = {}) {
  if (this && this.writeHead && this.writeHead instanceof Function) {
    this.writeHead(code, {
      'Content-Type': ContentType,
    })
  }
}

const service = http.createServer(async (req, res) => {
  const prefixFile = 'static'
  let { url: httpUrl } = req
  httpUrl = await httpFilter(httpUrl)
  if (httpUrl === null) {
    res.end(null)
    return
  }
  let filePath = path.resolve(
    __dirname,
    path.join(prefixFile, url.fileURLToPath(`file:///${httpUrl}`))
  )
  if (fs.existsSync(filePath)) {
    // 获取文件信息
    const stats = fs.statSync(filePath)
    const isDirectory = stats.isDirectory()
    // 是一个文件夹 默认返回改文件夹下的 index.html
    if (isDirectory) {
      filePath = path.join(filePath, 'index.html')
    }
    if (fs.existsSync(filePath)) {
      const { ext } = path.parse(filePath)
      writeHead.call(res, 200, {
        ContentType: mime.getType(ext),
      })
      // const val = await fs.readFileSync(filePath)
      // 创建文件流 节省I/O 开销
      const readStream = fs.createReadStream(filePath)
      readStream.pipe(res)
      // res.end(val)
      return
    }
  }
  writeHead.call(res, 404)
  res.end('<h1>404 page not found')
})

service.listen(8080, () => {
  console.log('services: http://localhost:8080')
})
```

# Http 缓存

:::info
GET 和 OPTIONS 是支持缓存的
:::

## 强缓存

服务端返回的的请求头中带有 `Cache-Control` 响应头 这种策略叫做强缓存策略
`Cache-Control` 响应头的最常用格式为：

    Cache-Control: max-age=<seconds>  // seconds 是缓存的时间，单位是秒。

浏览器请求的资源带有 `Cache-Control` 的响应头的时候 会将资源缓存到本地，当浏览器下一次访问该资源的时候。满足下面的三个条件 则会直接使用本地的缓存资源

- 两次的请求的 url 完全相同(pathname, host, query)
- 请求的 method 是 get
- 请求头不带有`Cache-Control:no-chace`或者`Pragma: no-chache`

> 根据浏览器的标准，通过地址栏访问、以及强制刷新网页的时候，HTTP 请求头自动会带上 `Cache-Control: no-cache` 和 `Pragma: no-cache` 的信息。只要有这两个请求头之一，浏览器就会忽略响应头中的 `Cache-Control` 字段。

> 注意，这并不是说网页不会被缓存，而是 _资源被访问的方式_ （比如直接通过地址栏）会导致服务器返回给浏览器响应头中的 `Cache-Control` 信息被忽略。如果这个网页是通过 iframe 加载的，那么这个网页就可能被浏览器缓存

> 强缓存以秒为单位

```javascript
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

function httpFilter(url) {
  return new Promise((resolve, reject) => {
    const white = ['/favicon.ico']
    if (white.includes(url)) resolve(null)
    else resolve(url)
  })
}

function writeHead(
  code,
  { ContentType = 'text/html; charset="utf-8"', CacheControl = 'no-cache' } = {}
) {
  if (this && this.writeHead && this.writeHead instanceof Function) {
    this.writeHead(code, {
      'Content-Type': ContentType,
      'Cache-Control': CacheControl,
    })
  }
}

const service = http.createServer(async (req, res) => {
  const prefixFile = 'static'
  let { url: httpUrl } = req
  httpUrl = await httpFilter(httpUrl)
  if (httpUrl === null) {
    res.end(null)
    return
  }
  let filePath = path.resolve(
    __dirname,
    path.join(prefixFile, url.fileURLToPath(`file:///${httpUrl}`))
  )
  if (fs.existsSync(filePath)) {
    // 获取文件信息
    const stats = fs.statSync(filePath)
    const isDirectory = stats.isDirectory()
    // 是一个文件夹 默认返回改文件夹下的 index.html
    if (isDirectory) {
      filePath = path.join(filePath, 'index.html')
    }
    if (fs.existsSync(filePath)) {
      const { ext } = path.parse(filePath)
      // 添加缓存信息
      writeHead.call(res, 200, {
        ContentType: mime.getType(ext),
        CacheControl: 'max-age=60000',
      })
      const readStream = fs.createReadStream(filePath)
      readStream.pipe(res)
      return
    }
  }
  writeHead.call(res, 404)
  res.end('<h1>404 page not found')
})

service.listen(8080, () => {
  console.log('services: http://localhost:8080')
})
```

## 协商缓存

以 HTTP 内容协商的方式来实现的缓存
:::info
协商缓存实现方式: 当服务端的响应头返回了一个 `Last-Modified` 的的字段，那么浏览器就会缓存当前的资源，并且当下一次的请求的时候 请求头会带上一个 `if-modified-since` 字段。 服务端可以通过字段比对是否走缓存 如果走缓存 则返回一个 `304` 状态码 的响应 该响应体没有 Body 只有一个 Head 会以缓存的内容作为 Body
还有另外一种协商缓存的方式是 `Etag` 他的机制和 `Last-Modified` 相似 需要将 `if-modified-since` 替换成 `If-None-Match` 字段
`Etag` 的值 可以用 资源文件的 MD5 或 sha 签名
:::

### `Last-Modified` 缓存实现

```javascript
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

function httpFilter(url) {
  return new Promise((resolve, reject) => {
    const white = ['/favicon.ico']
    if (white.includes(url)) resolve(null)
    else resolve(url)
  })
}

function writeHead(
  code,
  {
    ContentType = 'text/html; charset="utf-8"',
    CacheControl = 'no-cache',
    lastModified,
  } = {}
) {
  if (this && this.writeHead && this.writeHead instanceof Function) {
    const header = {
      'Content-Type': ContentType,
      'Cache-Control': CacheControl,
    }
    if (lastModified !== void 0) {
      header['Last-Modified'] = lastModified
    }
    this.writeHead(code, header)
  }
}

const service = http.createServer(async (req, res) => {
  const prefixFile = 'static'
  let { url: httpUrl } = req
  httpUrl = await httpFilter(httpUrl)
  if (httpUrl === null) {
    res.end(null)
    return
  }
  let filePath = path.resolve(
    __dirname,
    path.join(prefixFile, url.fileURLToPath(`file:///${httpUrl}`))
  )
  if (fs.existsSync(filePath)) {
    // 获取文件信息
    let stats = fs.statSync(filePath)
    const isDirectory = stats.isDirectory()
    // 是一个文件夹 默认返回改文件夹下的 index.html
    if (isDirectory) {
      filePath = path.join(filePath, 'index.html')
    }
    if (fs.existsSync(filePath)) {
      const { ext } = path.parse(filePath)
      const resHeader = {
        ContentType: mime.getType(ext),
      }
      isDirectory && (stats = fs.statSync(filePath))
      // 添加缓存信息
      const lastModi = req.headers['if-modified-since']
      console.log(lastModi, stats.mtimeMs)
      resHeader['lastModified'] = stats.mtimeMs
      if (lastModi !== void 0 && stats.mtimeMs === Number(lastModi)) {
        writeHead.call(res, 304, resHeader)
        res.end()
        return
      }
      writeHead.call(res, 200, resHeader)
      const readStream = fs.createReadStream(filePath)
      readStream.pipe(res)
      return
    }
  }
  writeHead.call(res, 404)
  res.end('<h1>404 page not found')
})

service.listen(8080, () => {
  console.log('services: http://localhost:8080')
})
```

### Etag 缓存实现

> `Last-Modified` 缺点:
> 由于资源可以会分布式部署到几台服务器，导致文件的各个副本的在不同服务器上的修改时间不一定相同，如果用其中一台的服务的协商缓存请求另外一台服务器的协商缓存，可能会造成缓存失效。此时可以使用另外的一种缓存 `Etag` 缓存

如果服务端第一次响应了 `ETag` 字段，之后的请求头会带上 `If-None-Match` 值为上一次的 `ETag` 字段

> 使用了第三方 `checksum` 包去校验

```javascript
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')
const checksum = require('checksum')

function httpFilter(url) {
  return new Promise((resolve, reject) => {
    const white = ['/favicon.ico']
    if (white.includes(url)) resolve(null)
    else resolve(url)
  })
}

function writeHead(
  code,
  {
    ContentType = 'text/html; charset="utf-8"',
    CacheControl = 'no-cache',
    eTag,
  } = {}
) {
  if (this && this.writeHead && this.writeHead instanceof Function) {
    const header = {
      'Content-Type': ContentType,
      'Cache-Control': CacheControl,
    }
    if (eTag !== void 0) {
      header['ETag'] = eTag
    }
    this.writeHead(code, header)
  }
}

const service = http.createServer(async (req, res) => {
  const prefixFile = 'static'
  let { url: httpUrl } = req
  httpUrl = await httpFilter(httpUrl)
  if (httpUrl === null) {
    res.end(null)
    return
  }
  let filePath = path.resolve(
    __dirname,
    path.join(prefixFile, url.fileURLToPath(`file:///${httpUrl}`))
  )
  if (fs.existsSync(filePath)) {
    // 获取文件信息
    let stats = fs.statSync(filePath)
    const isDirectory = stats.isDirectory()
    // 是一个文件夹 默认返回改文件夹下的 index.html
    if (isDirectory) {
      filePath = path.join(filePath, 'index.html')
    }
    if (fs.existsSync(filePath)) {
      const { ext } = path.parse(filePath)
      const resHeader = {
        ContentType: mime.getType(ext),
      }
      // 添加缓存信息
      const eTag = req.headers['if-none-match']
      checksum.file(filePath, (err, sum) => {
        //        console.log('checksum:', sum)
        //        console.log('If-None-Match:', eTag)
        resHeader['eTag'] = sum
        if (sum === eTag) {
          writeHead.call(res, 304, resHeader)
          res.end()
          return
        }
        writeHead.call(res, 200, resHeader)
        const readStream = fs.createReadStream(filePath)
        readStream.pipe(res)
        return
      })
    }
  } else {
    writeHead.call(res, 404)
    res.end('<h1>404 page not found')
  }
})

service.listen(8080, () => {
  console.log('services: http://localhost:8080')
})
```

# gzip 压缩传输

HTTP 协议规定了客户端的编码格式 `Accept-Encoding` 表示浏览器支持的压缩算法。
Chrome 浏览器的 `Accept-Encoding` 的值分别为 ` gzip` `deflate` `br `

服务端可以根据请求头的该字段判断不同的客户端支持的压缩算法 进而采用不同的压缩策略。但最后都需要在响应头中添加 `Cache-Control ` 字段 告诉客户端使用的哪一种压缩算法

> node 使用 gzip deflate br 算法进行 http 压缩传输

```javascript
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')
const zlib = require('zlib')

function httpFilter(url) {
  return new Promise((resolve, reject) => {
    const white = ['/favicon.ico']
    if (white.includes(url)) resolve(null)
    else resolve(url)
  })
}

function writeHead(
  code,
  {
    ContentType = 'text/html; charset="utf-8"',
    CacheControl = 'no-cache',
    lastModified,
    ContentEncoding,
  } = {}
) {
  if (this && this.writeHead && this.writeHead instanceof Function) {
    const header = {
      'Content-Type': ContentType,
      'Cache-Control': CacheControl,
    }
    if (lastModified !== void 0) {
      header['Last-Modified'] = lastModified
    }
    if (ContentEncoding !== void 0) {
      header['Content-Encoding'] = ContentEncoding
    }
    this.writeHead(code, header)
  }
}

const service = http.createServer(async (req, res) => {
  const prefixFile = 'static'
  let { url: httpUrl } = req
  httpUrl = await httpFilter(httpUrl)
  if (httpUrl === null) {
    res.end(null)
    return
  }
  let filePath = path.resolve(
    __dirname,
    path.join(prefixFile, url.fileURLToPath(`file:///${httpUrl}`))
  )
  if (fs.existsSync(filePath)) {
    // 获取文件信息
    let stats = fs.statSync(filePath)
    const isDirectory = stats.isDirectory()
    // 是一个文件夹 默认返回改文件夹下的 index.html
    if (isDirectory) {
      filePath = path.join(filePath, 'index.html')
    }
    if (fs.existsSync(filePath)) {
      const { ext } = path.parse(filePath)
      const mimeType = mime.getType(ext)
      const resHeader = {
        ContentType: mimeType,
      }
      isDirectory && (stats = fs.statSync(filePath))
      // 添加缓存信息
      const lastModi = req.headers['if-modified-since']
      resHeader['lastModified'] = stats.mtimeMs
      if (lastModi !== void 0 && stats.mtimeMs === Number(lastModi)) {
        writeHead.call(res, 304, resHeader)
        res.end()
        return
      }
      let zlibType = ''
      // 一般只对text 或者application进行压缩 音视频 图片文件一般都会是经过压缩的
      const flag = /^\s*(text|application)\//.test(mimeType)
      const acceptEncoding = req.headers['accept-encoding']
      if (flag && acceptEncoding) {
        // 支持压缩算法
        // 告诉浏览器是用deflate算法压缩的
        // resHeader['ContentEncoding'] = 'deflate'
        // const deflate = zlib.createDeflate()
        acceptEncoding.split(',').some((encoding) => {
          if (/deflate/.test(encoding)) {
            resHeader['ContentEncoding'] = 'deflate'
            zlibType = 'createDeflate'
            return true
          }
          if (/gzip/.test(encoding)) {
            resHeader['ContentEncoding'] = 'gzip'
            zlibType = 'createGzip'
            return true
          }
          if (/br/.test(encoding)) {
            resHeader['ContentEncoding'] = 'br'
            zlibType = 'createBrotliCompress'
            return true
          }
          return false
        })
      }
      writeHead.call(res, 200, resHeader)
      const readStream = fs.createReadStream(filePath)
      if (resHeader['ContentEncoding'] !== void 0) {
        const data = zlib[zlibType] instanceof Function && zlib[zlibType]()
        if (data) {
          readStream.pipe(data).pipe(res)
          return
        }
      }
      readStream.pipe(res)
      return
    }
  }
  writeHead.call(res, 404)
  res.end('<h1>404 page not found')
})

service.listen(8080, () => {
  console.log('services: http://localhost:8080')
})
```

# 参考资料

- Stream 的介绍: <https://juejin.cn/post/6844903891083984910>
- <https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Last-Modified>
- <https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag>
- <https://github.com/dshaw/checksum#readme>
