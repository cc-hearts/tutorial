---
title: docker 权限
---

Docker 容器中资源隔离使用了 `Linux` 宿主机的 `Capability` 机制，而 Capability 机制允许我们显示的将 root 的权限划分为不同的小的单元。默认情况下，docker 容器中只支持如下 Capability：

- CHOWN,
- DAC_OVERRIDE,
- FSETID,
- FOWNER,
- MKNOD,
- NET_RAW,
- SETGID,
- SETUID,
- SETFCAP,
- SETPCAP,
- NET_BIND_SERVICE,
- SYS_CHROOT,
- KILL,
- AUDIT_WRITE

> 可以直接通过 `--privileged` 赋予全部的最高权限

````shell
>  docker run --it --privileged --name my-node node:latest /bin/bash
> ```

`

````

仅仅通过`--cap-add` 赋予权限

```shell
docker run --it  --cap-add=SYS_TIME --name my-node node:latest /bin/bash
```

> 修改系统时钟需要用到 SYS_TIME 权限

## 参考资料

- [Docker 中获取 root【所有 | 有限授权】权限](https://blog.csdn.net/liuwei0376/article/details/100310462)

- [利用 Capabilities 实现 Linux 系统权限提升](https://www.secrss.com/articles/28488)
