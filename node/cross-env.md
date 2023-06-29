---
title: cross-env
---

> 运行跨平台设置和使用环境变量(Node 中的环境变量)的脚本

在自定义配置环境变量的时候，由于在不同的环境下，配置方式也是不同的。

> 当我们使用 NODE_ENV = production 来设置环境变量的时候，大多数 windows 命令会提示将会阻塞或者异常，或者，windows 不支持 NODE_ENV=development 的这样的设置方式，会报错。因此 cross-env 出现了。我们就可以使用 cross-env 命令，这样我们就不必担心平台设置或使用环境变量了。也就是说 cross-env 能够提供一个设置环境变量的 scripts，这样我们就能够以 unix 方式设置环境变量，然而在 windows 上也能够兼容的

## cross-env 统一 node 脚本环境变量

由于在 linux 和 window 下的
[cross-env](https://www.npmjs.com/package/cross-env)
package.json 中：

```json
    "start": "cross-env process.env.NODE_ENV=development webpack-dev-server  --config development.config.js",
    "build": "cross-env NODE_ENV=production  webpack --config production.config.js",
    "test": "cross-env NODE_ENV=test jest"
```
