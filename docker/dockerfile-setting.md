---
title: dockerfile 文件编写
---

1.  保留字需要大写

`dockerfile` 的指令会从上到下顺序执行

> \\#表示注释

每条指令都会创建一个新的镜像层并且进行提交

## 保留字

1.  FORM 基础镜像 当前新镜像是基于哪个镜像 制定一个已经存在的作为模版 第一条得是 from

2.  MAINTAINER 镜像维护者的姓名和邮箱地址

3.  RUN 容器构建的时候需要运行的命令

4.  shell 命令或者 exec 格式

> run 在 docker build 的时候运行
>
> exec: RUN ['./dest.js', 'dev']

4.  EXPOSE 指定的端口映射
5.  WORKDIR 指定容器创建的时候 终端默认登陆进来的工作目录 一个落脚点
6.  ROOT 指定镜像的用户权限 默认是 root
7.  ENV 设置环境变量 该环境变量可以在后续的任何 RUN 指令中使用
8.  VOLUME 容器卷
9.  ADD 将宿主机目录下的文件拷贝到镜像中并且会自动处理 URL 和解压 tar 压缩包

10. COPY 类似 ADD,拷贝文件和目录到镜像中。
    将从构建上下文目录中<源路径>的文件/目录复制到新的一层的镜像内的<目标路径>

11. CMD 指定容器启动之后做的事情

    > 可以有多个 CMD 命令 但是只有一个最后生效
    >
    > `CMD 会被docker run之后的参数替换`

12. ENTRYPOINT 也是用来指定一个容器启动时要运行的命令
    类似于 CMD 指令，但是 ENTRYPOINTZ 不会被 docker run 后面的命令覆盖，
    而且这些命令行参数会被当作参数送给 ENTRYPOINT 指令指定的程序

> ENTRYPOINT 可以和 CMD 一起用，一般是变参才会使用 CMD, 这里的 CMD 等于是在给 ENTRYPOINT 传参。
> 当指定了 ENTRYPOINT 后，CMD 的含义就发生了变化，不再是直接运行其命令而是将 CMD 的内容作为参数传递给 ENTRYPOINT 指令，他两个组合
> 会变成
> \<ENTRYPOINT\>"\<CMD\>"

## 编译命令

`docker build -t <镜像名字>:\<Tag> .`

> Java8 Dockerfile
>
> java8 地址:<https://www.oracle.com/java/technologies/downloads/#java8>
>
> 在 Mac 下 需要指定编译的平台
>
> `docker build --platform linux/x86_64 -t centosjava8:1.0 .`

> 需要添加 `--platform linux/x86_64` 编译

```shell

## 基于的基础镜像

FROM centos

## 作者

MAINTAINER heart<hearto_o@163.com>

## MAINTAINER 被废弃了 可以使用LABEL 代替

LABEL maintainer="heart<7362469@qq.com>"

## 环境变量定义

ENV BASEURL /usr/local

## 配置进入的根路径

WORKDIR $BASEURL

RUN cd /etc/yum.repos.d/
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*

## 运行命令

RUN yum -y install vim

## ip-config 命令查看网络ip

RUN yum -y install net-tools

## java8及lib库

## RUN yum -y install glibc.i686

RUN mkdir /usr/local/java

## ADD 可以将宿主机目录下的文件拷贝进镜像 并且会自动处理URL 和解压tar压缩包

## ADD 将相对于当前的相对路径的jar 文件添加到容器中
ADD jdk-8u351-linux-x64.tar.gz /usr/local/java

## 配置Java的环境变量

ENV JAVA_HOME /usr/local/java/jdk1.8.0_351
ENV JRE_HOME $JAVA_HOME/jre
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib:$CLASSPATH
ENV PATH $JAVA_HOME/bin:$PATH

## 对外暴露80端口

EXPOSE 80

CMD echo $BASEURL

CMD echo "success--------"

## 使用的交互终端

CMD /bin/bash
```

## 向容器传递参数

## 清除 docker 缓存

```shell
docker system prune --volumes
```

清除：

- 所有停止的容器
- 所有不被任何一个容器使用的网络
- 所有不被任何一个容器使用的 volume
- 所有无实例的**镜像**

## 常见问题

如果服务端端口映射无效 需要开启 0.0.0.0

```ts
await app.listen(port, '0.0.0.0', () => {
  Logger.log(`启动成功http://localhost:${port}/${prefix}`)
})
```
