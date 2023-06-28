---
title: 虚悬镜像
---

查看系统内的虚悬镜像

```shell
docker image ls -f dangling=true
```

删除系统内的虚悬镜像

```shell
docker image prune
```

或者使用

```shell
docker rmi $(docker images -f "dangling=true" -q)
```

删除停止运行的容器

```shell
sudo docker rm $(sudo docker ps -qf status=exited)
```
