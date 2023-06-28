---
title: prisma 使用
---

- 先进行依赖安装

> `@prisma/client` 用于运行 `npx prisma generate`

```shell
pnpm add prisma typescript @prisma/client
```

- 创建配置文件

```shell
mkdir prisma

touch prisma/schema.prisma
```

- 在`schema.prisma` 中写入数据库的配置文件以及数据库的定义`Modal`

```shell
datasource db {
  provider  = "mysql"
  url       = "mysql://root:123456@localhost:3306/prisma"
}

generator client {
  provider        = "prisma-client-js"
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
}
```

- 生成数据表

> `npx prisma migrate dev --name init` 基于`prisma/schema.prisma`，初始化数据库和数据库对应的表

```shell
npx prisma generate
npx prisma migrate dev --name init
```

生成的文件会在 prisma 文件目录下多出来几个 sql 和配置文件

> 如果修改了`prisma/schema.prisma`，需要重新执行命令:
> `npx prisma generate` > `npx prisma migrate dev --name init`

## insert

```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

async function main() {
  // const result = await prisma.user.create({
  //   data: {
  //     email: "test@test.com",
  //     name: "Test User",
  //   },
  // });
  // 因为 email unique  因此重复会报错
  // { id: 1, email: 'test@test.com', name: 'Test User' }
  // console.log(result);

  // 可以使用 createMany 开启 skipDuplicates: true 规避unique 报错的问题 但是值不会被插入到数据库中
  const result = await prisma.user.createMany({
    data: [
      {
        email: 'test@test.com',
        name: 'Test User 2',
      },
    ],
    skipDuplicates: true,
  })

  // { count: 0 }
  console.log(result)
}

main()
  .catch((e) => {
    console.log(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

## delete

```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

async function main() {
  const result = await prisma.user.delete({
    where: {
      OR: [{ id: 1 }, { id: 4 }],
    },
  })
  console.log(result, { depth: Infinity })
}

main()
  .catch((e) => {
    console.log(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

## find

```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

async function main() {
  // const result = await prisma.user.findUnique({ where: { id: 1 })
  const result = await prisma.user.findMany({
    where: {
      id: 1,
    },
  })
  console.dir(result, { depth: Infinity })
}

main()
  .catch((e) => {
    console.log(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

## update

```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

async function main() {
  const user = await prisma.user.update({
    where: {
      id: 1,
    },
    data: {
      name: 'Test User 2',
    },
  })

  // { id: 1, email: 'test@test.com', name: 'Test User 2' }
  console.log(user)
}

main()
  .catch((e) => {
    console.log(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

## 配置文件

在`prisma`文件夹下 创建一个`.env`文件

```shell
DATABASE_URL=mysql://root:123456@localhost:3306/inter
```

修改`schema.prisma`文件

```diff
datasource db {
  provider = "mysql"
-  url      = "mysql://root:123456@localhost:3306/inter"
+  url      = env("DATABASE_URL")
}
```

## 关联查询

```prisma

model User {
  uid   Int          @id @default(autoincrement())
  name  String // 用户名
  roles UserOnRole[]
}

model Role {
  rid              Int                @id @default(autoincrement())
  roleName         String // 角色名
  users            UserOnRole[]
  RoleOnPermission RoleOnPermission[]
}

// 用户 角色 多对多的关系
model UserOnRole {
  id   Int  @id @default(autoincrement())
  uid  Int
  user User @relation(fields: [uid], references: [uid])
  rid  Int
  role Role @relation(fields: [rid], references: [rid])

  @@index([uid, rid])
}

model Permission {
  pid              Int                @id @default(autoincrement())
  numberName       String
  RoleOnPermission RoleOnPermission[]
}

model RoleOnPermission {
  id         Int        @id @default(autoincrement())
  rid        Int
  role       Role       @relation(fields: [rid], references: [rid])
  pid        Int
  permission Permission @relation(fields: [pid], references: [pid])

  @@index([rid, pid])
}
```

可以使用`select` 进行关联数据查询

> 直接 select 就不需要 include 了

```ts
return await this.prisma.user.findMany({
  select: {
    uid: true,
    name: true,
    roles: {
      select: {
        role: true,
        id: true,
      },
    },
  },
})
```

环境变量参考文件

- [Environment variables](https://www.prisma.io/docs/guides/development-environment/environment-variables#using-environment-variables-in-your-code)

## $queryRaw

`$qeuryRow` 可以使用原声的 sql 去写值

> `$queryRow` 只接收模版字符串 或者是 `Prisma.sql`模版返回的值

```ts
const result = await this.prisma.$queryRaw`select * from User`
// const result = await Prisma.sql`select * from User`;
// Sql { values: [], strings: [ 'select * from User' ] }
console.log(result)
return await this.prisma.$queryRaw<User[]>(Prisma.sql`select * from User`)
```

## $queryRowUnsafe

```ts
const userId = '2'
return await this.prisma.$queryRawUnsafe(
  'select * from User where uid = ?',
  userId
)
```

## prisma 在 nest 中开启日志

如果不需要在 service 中开启日志 可以将 log 抽出去 单独实例化之后在进行 log 的定义

```ts
import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
interface pri {
  log: [
    { emit: 'event'; level: 'query' },
    Prisma.LogDefinition,
    Prisma.LogDefinition,
    Prisma.LogDefinition
  ]
  errorFormat: Prisma.ErrorFormat
}
@Injectable()
export class PrismaService extends PrismaClient<pri> implements OnModuleInit {
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'colorless',
    })
    this.$on('query', (event: Prisma.QueryEvent) => {
      Logger.log(event)
    })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
```

> 附件参考

```ts
import { PrismaClient } from '@prisma/client'
import { logger } from '@cc-heart/utils'

let prisma

export function initPrisma() {
  if (!prisma) {
    prisma = new PrismaClient({
      log: [
        { level: 'query', emit: 'event' },
        { level: 'info', emit: 'stdout' },
        { level: 'warn', emit: 'event' },
        { level: 'error', emit: 'event' },
      ],
    })
    initEvents()
  }

  return prisma
}

function initEvents() {
  if (!prisma) return
  prisma.$on('query', (e: unknown) => {
    logger.success(e)
  })
  prisma.$on('warn', (e: unknown) => {
    logger.log(e)
  })
  prisma.$on('error', (e: unknown) => {
    logger.error(e)
  })
}

export function disConnect() {
  if (!prisma) return
  prisma.$disconnect()
  prisma = null
}

export function getInstance() {
  return prisma
}
```
