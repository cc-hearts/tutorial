---
title: glob 使用
---

```js
import glob from 'glob'

glob(
  'a/**/index.js',
  {
    // matchBase: true, // 模式中没有 `/` 它会在任意的目录中去匹配
  },
  function (err, files) {
    console.log(err, files)
  }
)

// 同步搜索
const data = glob.sync('**/*.js', {})
```

## 参考资料

- [node-glob](https://github.com/isaacs/node-glob#glob-primer)
- [Glob Patterns 匹配模式使用](https://juejin.cn/post/6844903749735940109)
