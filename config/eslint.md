---
title: eslint 配置
---

# eslint 配置信息 (长期更新)

```js
module.exports = {
  // javaScript的运行环境
  env: {
    node: true,
    browser: true,
    // 因为我们的代码要支持较新的 JavaScript 语法，所以也设置 env 中的 es6 属性为 true
    es6: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  // globals 是内置全局变量，因为 ESLint 支持最新的 JavaScript 规范，
  // 在 ES2017 中有两个新的全局对象 Atomics 和 SharedArrayBuffer。
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  // parserOptions 指定解析器版本,这里设置 ecmaVersion 值为 11，是目前最新的语言标准。
  // ecmaVersion 这个属性目前可以设置3、5、6、7、8、9、10、11，3、5
  // 表示 ES3 和 ES5，6、7、8、9、10、11 分别表示 ES2015、ES2016、ES2017、ES2018、ES2019 和 ES2020；
  // sourceType 为module，表示支持 ES Modules 模块规范。
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  root: true,
  rules: {
    'no-var': 'error',
  },
}
```

可以运行 `eslint --init` 配置 `eslint`
