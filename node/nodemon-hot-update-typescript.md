---
title: 利用nodemon 热更新 typescript
---

传统的 tsc -w 只能热更新编译代码 不能对 node 启动的代码进行热更新 因此需要使用 `nodemon` 进行热更新运行时的 `ts` 文件

> nodemon.json 配置:

```json
{
  "verbose": false,
  "debug": false,
  "exec": "ts-node-esm  ./index.ts",
  "ignore": [
    "mochawesome-report",
    "node_modules",
    "./test",
    "**/*.d.ts",
    "*.test.ts",
    "*.spec.ts",
    "fixtures/*",
    "test/**/*",
    "docs/*"
  ],
  "events": {
    "restart": ""
  },
  "watch": ["./src/show-pkg-version.ts", "./index.ts"],
  "ext": "ts tsx",
  "inspect": true
}
```

之后只要运行 `npx nodemon` 就会 `watch`  `index` 和 `show-pkg-version` 的代码发生变化重启项目了
