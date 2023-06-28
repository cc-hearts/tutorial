---
title: url Modules
---

`url` 模块主要用来处理 URL 地址

可以通过 `new URL` 创建一个 URL 对象，然后访问这个对象的 protocal、hostname、port、origin、pathname、query、hash 等等属性，拿到 URL 上的各部分信息。

```js
new URL(path: string)
```
