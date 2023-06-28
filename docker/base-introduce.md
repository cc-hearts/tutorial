---
title: 基础介绍
---

> docker 依赖于 Linux 环境
> mac 安装 docker `brew install --cask docker`

## 文档

     - https://www.docker.com/
     - https://hub.docker.com/ docker镜像的仓库

## 查看系统内核

```shell
cat /etc/redhat-release

uname -r
```

> uname 命令用于打印当前系统相关信息（内核版本号、硬件架构、主机名称和操作系统类型等）

## 三大特点

* 镜像
  + 一个只读的模版 镜像可以用来创建 Docker 容器 一个镜像可以创建多个容器 相当于是一个 root 文件系统
    > 官方镜像 centos:7 包含了完整的一套 centos7 最小系统的 root 文件系统
    > docker 镜像文件类似于 Java 的类模版 而容器相当于一个实例化对象

* 容器
  + 一个简易版的 Linux 环境（包括 root 权限 进程空间 网络空间等） 和运行在其中的应用程序
* 仓库
  + 存放 镜像的仓库
  + 仓库分为公开仓库和私有仓库两种形式
    > 国内使用可以使用阿里云

docker 是一个 Client-Server 结构的系统 Docker 守护进程运行在主机上 通过 Socket 连接从客户端访问 `守护进程` 从客户端接受命令并管理运行在主机上的容器

> 容器 一个运行时的环境

## 安装

Centos 系统 :
<https://docs.docker.com/engine/install/centos/#install-using-the-repository>

> 注意 设置存储库不要设置 国外的 容易连接超时

### 安装 dock 报错

```shell
# Could not resolve host: yum.dockerproject.org； Unknown error

# 删除/etc/[yum](https://so.csdn.net/so/search?q=yum&spm=1001.2101.3001.7020).repos.d下的有关docker文件
```

```shell

// ❌
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
// ✅
sudo yum-config-manager \
    --add-repo \
http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

**更新 yum 软件包索引**

```shell
yum makcache fast
```

安装 docker 引擎：

```shell
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

安装成功后可以使用
`docker version` 查看是否安装成功

## 镜像加速

使用阿里云的容器镜像服务 加速

> <https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors>

```shell
daemon-reload: 重新加载某个服务的配置文件，如果新安装了一个服务，归属于 systemctl 管理，要是新服务的服务程序配置文件生效，需重新加载。
```

> docker run 发生的事情
> 

![docker run 发生的事情](../assets/img/docker/docker-run.png)

## 常用命令

启动 docker:systemctl start docker
停止 docker::systemctl stop docker
重启 docker:systemctl restart docker
查看 docker 状态：systemctl status docker
开机启动：systemctl enable docker
查看 docker 概要信息：docker info
查看 docker. 总体帮助文档：docker-help
查看 docker 命令帮助文档：docker 具体命令-help

## 虚悬镜像

仓库名 和标签都是 none 的

## 卸载 docker

```shell
systemctl stop docker # 停止docker服务
```

<https://docs.docker.com/engine/install/centos/#upgrade-docker-engine>

## 推荐文档

> <https://yeasy.gitbook.io/docker_practice/>
