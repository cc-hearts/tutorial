---
title: babel/plugin-transform-runtime
---

结论：

默认情况下，babel 在每个需要使用 helper 的地方都会定义一个 helper，导致最终的产物里有大量重复的 helper；引入 polyfill 时会直接修改全局变量及其原型，造成原型污染。

`@babel/polyfill` 按需加载配置:

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage", // usage 按需加载 entry全量加载
        "debug": true
      }
    ]
  ]
}
```

`@babel/plugin-transform-runtime` 的作用是将 helper 和 polyfill 都改为从一个统一的地方引入，并且引入的对象和全局变量是完全隔离的，这样解决了上面的两个问题。

配置信息如下：

```js
{
  "presets": [
    [
      "@babel/preset-env",
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3 // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
      }
    ]
  ]
}
```

> `useBuiltIns` 与 `babel/plugin-transform-runtime` 不能同时使用，会增大产物的体积以及会造成不必要的 bug。 并且在 `babel v7.4.0`时，`@babel/polyfill` 已经被废弃

## 参考资料

- <https://babeljs.io/docs/babel-polyfill>

- <https://zhuanlan.zhihu.com/p/147083132>

- <https://github.com/zloirock/core-js/issues/908#issuecomment-776059356>
