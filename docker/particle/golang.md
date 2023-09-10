---
tilte: golang docker
---

```dockerfile
# golang运行环境配置
FROM centos

LABEL maintainer="heart<7362469@qq.com>"

WORKDIR /usr/local

ADD go1.19.2.linux-amd64.tar.gz /usr/local

RUN mkdir /tmp/goProject

# GOROOT设置golang的安装位置
ENV GOROOT /usr/local/go

ENV GOPATH /tmp/goProject

ENV GOBIN $GOPATH/bin

ENV PATH $PATH:$GOROOT/bin

ENV PATH $PATH:$GOPATH/bin

EXPOSE 80

CMD /bin/bash
```
