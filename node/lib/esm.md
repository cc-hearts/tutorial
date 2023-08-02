---
title: esm 转换ECMA 在cjs中运行
---



安装

```shell
pnpm install esm
```

使用 `node -r esm index.js` 去编译 `mjs` 的文件

或者使用 esm提供的module方法

```js
require = require("esm")(module /*, options*/);

console.log(require("./a"));
```

`a.js`

```js
const a = 1;
export default a;
```

## 参考资料

- [esm](https://github.com/standard-things/esm#readme)
