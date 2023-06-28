---
title: rollup 代码拆分
---

> 该选项用于指定要写入的文件名。如果该选项生效，那么同时也会生成源码映射（sourcemap）文件。只有当生成的 chunk 不超过一个时，该选项才会生效

```js
export default {
  input: './index.js',
  output: {
    dir: 'dist',
    format: 'esm',
  },
}
```

另外 多入口文件打包到一个文件夹下 也可以使用`dir` 配置

```js
export default {
  input: {
    foo: 'src/a.js',
    bar: 'src/b.js',
  },
  output: {
    dir: 'dist',
    format: 'esm',
  },
}
```

## 参考资料

- [rollup output.dir](https://www.rollupjs.com/guide/big-list-of-options#outputdir)
