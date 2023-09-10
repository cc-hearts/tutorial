---
title: base nest
---

## nest 底层 Express 切换为 Fastify

nest 默认使用 `express` 作为底层框架使用 但是 nest 还内置了另外一套框架为 `Fastify` 框架

默认为 `express` 框架的写法：

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const env: env = readEnvFile(
    process.cwd() + `/.${process.env.NODE_ENV || 'development'}.env`
  )
  await app.listen(env.PORT || 3664)
}
```

下面将底层的框架切换为 fastify

> 优先安装依赖 `@nestjs/platform-fastify` 使用使用 `FastifyAdapter` 替换默认的 `Express`

```ts
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

interface env {
  PORT?: string
}
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )
  const env: env = readEnvFile(
    process.cwd() + `/.${process.env.NODE_ENV || 'development'}.env`
  )
  await app.listen(env.PORT || 3664)
}
```

## ModuleRef

`moduleRef`可以获取到当前模块的 provider 对象

```ts
@Controller('form')
export class FormController {
    private readonly moduleRef: ModuleRef,
  ) { }

  @Get()
  getValue() {
    console.log(this.moduleRef.get(DddService).findAll()); // This action returns all ddd
  }
}
```
