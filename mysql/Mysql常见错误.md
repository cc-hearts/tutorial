---
title: sql安装卸载以及报错
categories: Mysql
---

## 常见报错

> mysql Error 1045(28000) ：
> 解决方法:在 my.ini 配置文件下的`mysqld`下面添加一行 skip-grant-tables，保存退出。 重启服务
