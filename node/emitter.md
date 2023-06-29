---
title: 核心模块 EventEmitter
---

node 中所有的异步 I/O 操作都会在完成的时候发送一个事件队列

```javascript
const { EventEmitter } = require('events')

const events = new EventEmitter()

events.on('connection', function () {
  console.log('connection events invoke')
})

events.emit('connection', 123)
```

大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它
