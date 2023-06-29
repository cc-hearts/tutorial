---
title: docker 常用命令
---

## docker images

```shell
 docker images
```

repository 镜像的仓库源
tag 镜像的标签
image Id 镜像的 id
created 镜像的创建时间
size 镜像的大小

> 同一个仓库源可以有多个 TAG 版本 repository:tag 可以指定不同版本的镜像

如果 安装的时候没有指定 tag 则默认安装的是最新的 tag

```shell
docker images -a # 列出本地的所有的镜像

docker images -q # 只显示镜像id
```

## docker search

```shell
docker search <镜像名称>
```

从远程的镜像服务查找镜像
参数介绍

- name 镜像名称
- description 镜像说明
- stars 点赞数量
- official 是否官方
- automated 是否自动构建的

```shell
docker search --help 查看命令

# 使用最多的案例：
docker search --limit 5 hello-world
```

## docker pull

```shell
docker pull <镜像名字>:[?tag] # 没有tag 默认使用最新的版本为tag
```

## docker system df

```shell
 docker system df # 镜像容器所占的空间
```

## docker rmi

```shell

docker rmi <imagesId| name>

# 如果需要强制删除 使用-f

# 如果删除多个 则使用
docker rmi [...imagesId|name]

# 删除全部
# docker images -qa 查出全部的id
docker rmi  $(docker images -qa)
```

## docker run

新建或者 启动一个容器 可以使用命令：

```shell
docker run [options] image [command] [arg...]
```

options 常用说明：
--name="容器新名字" 为容器指定一个名称：
-d： 后台运行容器并且返回容器 id 也即启动守护式容器（后台运行）
-: 以交互模式运行容器，通常与 t 同时使用：
-t: 为容器重新分配一个伪输入终端，通常与-i 同时使用
也即启动交互式容器（前台有伪终端，等待交互）

```shell
docker run -it # 返回一个终端 需要对容器进行后续操作

docker run -it ubuntu /bin/bash
#i :交互式操作。 tnteractive
#t:终端。
#centos:centos镜像。
#/bin/bash: 放在镜像名后的是命令 这里我们希望有阶交互式Shell,因此用的是bin/bash。 要退出终端，直接输入exit:

# 如果需要容器能够在后台一直运行 可以直接使用
docker run -d ubuntu /bin/bash

```

> 问题：然后 docker ps-a 进行查看，会发现容器己经退出
> 很重要的要说明的一点：Docker 容器后台运行，就必须有一个前台进程，
> 容器运行的命令如果不是那些一直挂起的命令（比如运行 top, tail), 就是会自动退出的。
> 这个是 docker 的机制问题，比如你的 web 容器，我们以 nginx 为例，正常情况下，
> 我们配置启动服务只需要启动响应的 service 即可。例如 service nginx start
> 但是，这样做，nginx 为后台进程模式运行，就导致 docker 前台没有运行的应用，
> 这样的容器后台启动后，会立即自杀因为他觉得他没事可做了：
> 所以，最佳的解决方案是，将你要运行的程序以前台进程的形式运行，

`-P` 随机指定的端口
`-P` 指定端口映射 小写 p

```shell
docker -p 8080:8080 run image # -p 8080:8080 先访问docker的 8080端口 在访问docker内部的
8080端口 （前一个是宿主机的端口。第二个是docker内部的端口）
```

## docker ps

罗列所有运行的容器

```shell
docker ps # 查看正在运行的容器

# -a 当前运行的容器和历史使用过的容器
# -l:显示最近创建的容器。
# -n:显示最近n个创建的容器。
# -q:静默模式，只显示容器编号。
```

## 退出容器操作

exit : 退出容器 但是容器会停止运行
ctrl+ p + q : 退出容器 但是 不会停止运行

## 启动已经停止的容器的操作

```shell
docker start 容器的id 或者容器名
```

## 重启容器

```shell
docker restart 容器的id 或者容器名
```

## 停止容器

```shell
docker stop 容器的id 或者容器名
```

## 强制停止容器

```shell
docker kill 容器的id 或者容器名
```

## 删除已经停止的容器 id

```shell
docker rm 容器的id 或者容器名

docker rm -f 器的id 或者容器名 # 强制删除
```

## 删除多个容器

```shell
docker rm -f $(docker ps -a -q)

docker ps -a -q | xargs docker rm
```

## 容器日志

```shell
docker logs 容器id 容器名
```

## 容器内部的运行的进程

```shell
docker top 容器id

#
docker top 8ed3e9c0b69e
```

## 查看容器内部的细节

```shell
docker inspect 容器id
docker inspect 8ed3e9c0b69e
```

1. 从面向对象角度
   Docker 利用容器(Container)独立运行的一个或一组应用，应用程序或服务运行在容器里面，容器就类似于一个虚拟化的运行环境，容器是用镜像创建的运行实例。就像是 Jva 中的类和实例对象一样，镜像是静态的定义，容器是镜像运行时的实体。容器为镜像提供了一个标准的和隔离的运行环境，它可以被启动、开始、停止、删除。每个容器都是相互隔离的、保证安全的平台
2. 从镜像容器角度
   以把容器看做是一个前易版的 Linux 坏境（包括 oot 用户权限、进程空间、用户空间和网络空间等）和运行在其中的应用程序。

## 重新进入容器内

```shell
docker exec -it 容器id /bin/bash

#
docker attach 容器id

```

> attach 直接进入容器启动命令的终端，不会启动新的进程
> 用 exit 退出，会导致容器的停止。
> exec 是在容器中打开新的终端，并且可以启动新的进程
> 用 exit 退出，不会导致容器的停止。

## 容器文件拷贝到主机

```shell
docker cp 容器Id:容器内的路径 目的主机等

docker cp a9e5256c3236:/tmp/a.txt ./
```

## 导入 导出

导出

```shell
docker export 容器id > 路径

docker export a9e5256c3236 > uu.tar # 相当于把整个容器备份了
```

导入

```shell
cat 文件名.tar|docker import - 镜像用户/镜像名:镜像版本号

cat uu.tar |docker import - heart/ubun:3.7

docker iamges # 可以查看镜像
```

## docker commit

制作一个容器副本使之成为一个新的镜像

```shell
docker commit -m "提交的描述信息" -a="作者" 容器ID 要创建的目标镜像名:[标签名]

# 案例
docker commit -m="vim create test" -a="heart" a3728a4e8266 heart_vim_test:latest
```

## docker save

将镜像打包成 tar 文件 语法同 `docker epport` 相似

## docker load

导入镜像文件 与 `docker import` 语法相似

## 清除缓存

```shell
docker system prune --volumes
```

改命令清除:

- 所有停止的容器
- 所有不被任何一个容器使用的网络
- 所有不被任何一个容器使用的 volume
- 所有无实例的镜像

## docker host 模式

### 参考资料

[docker host](https://www.cnblogs.com/freeaihub/p/13197292.html)
