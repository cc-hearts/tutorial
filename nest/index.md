---
title: nest 学习之路
---

# nest 学习

执行的流程

> 发起的请求 ==> 中间件 ==> 守卫 ==> 拦截器(next.handle() 之前) ==> 管道 ==> 执行对应的 Controller 方法 ==> 拦截器(next.handle() 之后) ==> 请求结束 返回内容

> 这里中间件 ==> 到拦截器中的所有的异常 都可以被异常过滤器捕获

![nest-progress](http://oss.cc-heart.cn:30002/oss/file/WPJTOOANlAvXos4EJeb0m/2023-06-07/nest-progress.png)

## 🧭Guide

- [cache 缓存模块](./cache.md)
- [class-transformer](./class-transformer.md)
- [class-validator 基础 api 介绍](./class-validator.md)
- [跨域配置](./cors.md)
- [自定义装饰器](./custom-decorators.md)
- [环境变量 配置](./envVariable.md)
- [常见错误处理](./error.md)
- [exception filter 异常过滤器](./exception.md)
- [Guard 守卫](./gurad.md)
- [拦截器的使用](./interceptor.md)
- [生命周期](./lifecycle.md)
- [mysql 配置](./mysqlProvider.md)
- [前缀基本使用](./prefix.md)
- [swagger 文档生成](./swagger.md)
- [typeOrm 使用](./typeorm.md)
- [版本控制](./version.md)

## 资料

- [nest 中文文档](https://www.kancloud.cn/juukee/nestjs/2666734)
