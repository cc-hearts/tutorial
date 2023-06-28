---
title: docker网络
---

## 查看 docker 的网络列表

```shell
docker network ls
```

## 查看网络源

```shell
docker network inspect bridge
```

    - bridge: 为每一个容器分配 设置ip 并将容器连接到一个`docker0`的虚拟网桥 默认为该模式 可以使用`--network bridge` 指定
    - host: 容器将不会虚拟除自己的网卡 配置自己的ip等 而是使用宿主机的ip和端口 使用 `--network host` 指定
    - none: 容器有独立的network namespace 但没有对其进行任何的网络设置 如分配veth pair和网桥连接、ip等 使用`--network none` 指定
    - container: 新创建的容器不会创建自己的网卡和配置自己的ip而是和一个指定的容器共享ip、端口范围等。 使用`--network container:NAME` 或者容器id指定
