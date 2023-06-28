---
title: os
---

操作系统相关的包

```javascript
const os = require('os');
// 操作系统的平台
var platform = os.platform();
console.log(platform);
// 操作系统版本
var release = os.release();
console.log(release);
// 操作系统的平均负载
var loadavg = os.loadavg();
console.log(loadavg);
console.log('剩余内存(M):' + parseInt(os.freemem() / 1024 / 1024));
console.log('总内存(M):' + parseInt(os.totalmem() / 1024 / 1024));
console.log('CPU 架构:' + os.arch());
var cpus = os.cpus();
console.log('CPU:' + cpus.length + '核 ' + cpus[0].speed + 'mHz');
console.log('网卡:', os.networkInterf
```
