---
title: java docker
---

```dockerfile
# 基于的基础镜像
FROM centos

# 作者
LABEL maintainer="heart<7362469@qq.com>"

# 环境变量定义
ENV BASEURL /usr/local
# 配置进入的根路径
WORKDIR $BASEURL

RUN cd /etc/yum.repos.d/
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*

# 运行命令
# RUN yum -y install vim

# ip-config 命令查看网络ip
RUN yum -y install net-tools

# java8及lib库
# RUN yum -y install glibc.i686

RUN mkdir /usr/local/java

# ADD 可以将宿主机目录下的文件拷贝进镜像 并且会自动处理URL 和解压tar压缩包
# ADD 将相对于当前的相对路径的jar 文件添加到容器中
ADD jdk-8u351-linux-x64.tar.gz /usr/local/java

# 配置Java的环境变量
ENV JAVA_HOME /usr/local/java/jdk1.8.0_351
ENV JRE_HOME $JAVA_HOME/jre
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib:$CLASSPATH
ENV PATH $JAVA_HOME/bin:$PATH

# 对外暴露80端口
EXPOSE 80

# 使用的交互终端
CMD /bin/bash
```
