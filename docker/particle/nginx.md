---
title: nginx配置
---

## 基本的 Dockerfile 配置

```shell
FROM nginx:latest

MAINTAINER heart<7362469@qq.com>

COPY dist/ /usr/share/nginx/html/

COPY default.conf /etc/nginx/conf.d/default.conf
```

default.conf 配置

```nginx
upstream my_server{
  server localhost:3663; # 后端server 地址
  keepalive 2000;
}

server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    access_log  /var/log/nginx/host.access.log  main;
    error_log  /var/log/nginx/error.log  error;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html =404;
    }
     #  这里就是和vue本地代理的意思一样，已api开头的路径都代理到本机的3000端口
    location /api/ {
        proxy_pass http://my_server/api;
        proxy_set_header Host $host:$server_port;
        rewrite ^/api/(.*) /$1 break;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

打包镜像

```shell
docker build -t nginx:1.0.0 .
```

启动容器实例

```shell
docker run -d -p3666:80 -v /tmp/nginx:/docker/tmp 758098464265
```
