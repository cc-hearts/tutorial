---
title: http 和 流文件的操作
---

关键需要设置请求头: "Content-Type", "application/octet-stream" 让浏览器知道是流文件

```js
res.setHeader('Content-Type', 'application/octet-stream')
```

## 参考资料

* <https://juejin.cn/post/7198439108140744765>
