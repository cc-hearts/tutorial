---
title: vue2 vue.config.json 配置
---

## webpack 打包之后 chunk.js 数量过多

通过配置合并 chunk 的数量

vue.config.js 中的写法:

```js
const webpack = require('webpack')
config.plugin('chunkPlugin').use(webpack.optimize.LimitChunkCountPlugin, [{
    maxChunks: 5, // 必须大于或等于 1，此处设置成最多生成5个chuank.js文件
    minChunkSize: 10000,
}, ])
```
