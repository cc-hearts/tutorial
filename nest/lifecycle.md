---
title: 生命周期
---

## 模块初始化 hook

`onModuleInit` 用于在模块创建的时期初始化一些配置(例如： 连接`redis`)

```ts
@Injectable()
export class RedisService implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log('onModuleInit')
  }

  onApplicationBootstrap() {
    console.log('onApplicationBootstrap')
  }
  private redisInstance
}
```

声明周期的执行顺序：

在 mvc 中 是 `controller -> provider(service) -> module`

> 所有的生命周期都支持 async/await

## 参考资料

- [nestJs docs Lifecycle Events](https://docs.nestjs.com/fundamentals/lifecycle-events#lifecycle-sequence)
