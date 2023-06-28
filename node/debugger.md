---
title: Node调试
---

# Chrome 调试

在 Node 的 package.json 中添加 `node --inspect index` 开启调试模式
&#x20; 之后打开 `chrome://inspect` 添加 配置 地址 之后点击 `inspect` 即可调试

> 也可以使用 `--inspect-brk=8080` 修改调试端口

# Node 调试

创建一个 attach 调试模式

> port 为 node 开启调试的端口

```json
  "configurations": [
   {
    "name": "Attach",
    "port": 9229,
    "request": "attach",
    "skipFiles": [
      "<node_internals>/**"
    ],
    "type": "node"
   }
  ]
```

创建 `launch Program` 创建一个调试服务 并且自动 `attach`

```javascript
  "configurations": [{
      "name": "Launch Program",
      "program": "${workspaceFolder}/2022-10-17/index.js",
      "request": "launch",
      "skipFiles": [
          "<node_internals>/**"
      ],
      "type": "node"
  }, ]
```

添加 `"stopOnEntry": true` 可以在首行断点
