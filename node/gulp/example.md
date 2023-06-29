---
title: gulp 案例
---

## 打包压缩成 zip 文件

```js
const { series, dest, src } = require('gulp')
const { rimraf } = require('rimraf')
const { exec } = require('child_process')
const zip = require('gulp-zip')
// series 串联执行
// parallel 并发执行

function clean(cb) {
  rimraf('./dist').then((res) => {
    if (res) cb()
  })
}

function build(cb) {
  console.log('build')
  exec('npm run build', (err, stdout, stderr) => {
    if (err) {
      console.log(err)
      return
    }
    cb()
  })
}

function publish(cb) {
  src('./dist/**/*', {
    base: './dist',
  })
    .pipe(zip('archive.zip'))
    .pipe(dest('./dist'))
  cb()
}

exports.default = series(clean, build, publish)

exports.publish = publish
```
