---
title: 镜像卷
---

# 介绍

镜像卷就是一个目录或者文件，存在于一个或者多个容器中。但是他不属于联合文件系统 可以绕过 `联合文件系统` 提供的用于持续存储或者数据共享的特性：

容器卷的目的就是数据的持久化 完全独立于容器的生存周期。 因此 Docker 不会在容器删除的时候 去删除其挂在的数据卷

# 启动容器镜像卷

> 启动一个 docker 并且指定镜像卷
>
> 通过 -v 去指定容器的镜像和本地的镜像映射
>
> 前面的是本地的路径 : 后面的是容器的路径

```shell
docker run -it  --privileged=true -v /tmp/temp_data:/tmp/temp --name u2 ubuntu
```

## 出现问题

如果挂载主机目录出现了全选不足等问题

```shell
cannot open directory: Permission denied # 权限不足
```

在启动的项添加配置 `--privileged=true` 参数即可

使用了该参数，container 内的 root 拥有了真正的 root 权限。 否则，container 内的 root 知识外部的一个普通用户的权限。

# 镜像卷的权限

镜像卷的默认权限是 rw（默认就是可读写的权限）

可以通过设置使得容器的镜像不能写入内容

```shell
docker run -it --privileged=true -v /tmp/temp_data:/tmp/temp:ro --name u2 ubuntu
```

ro(read only) 容器的镜像卷只读

# 镜像卷继承和共享

`--volumes-form u1` 容器卷继承使得 镜像卷能够在多个容器间能够共享数据

```shell
docker run -it --privileged=true --volumes-form <container> --name <name> <container>
```

```shell
docker run -it --privileged=true --volumes-form u1 --name u2 ubuntu
```
