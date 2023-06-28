---
title: 飞书应用对接机器人
---

1. 先进入飞书开放平台 获取应用凭证 并且在应用功能的机器人中`启用机器人`

   > [飞书开放平台](https://open.feishu.cn/apps/cli_a33f9611bab8100e/baseinfo)

2. 进入 权限管理 开启`消息与群组`的权限

3. 之后 在应用发布中进行版本管理与发布

## 封装 APi 请求

上述工作完成后 可以对 `API` 请求 进行封装

```ts
import axios, { Method } from 'axios'
import { getConfig } from './config'
import { Logger } from '@nestjs/common'

const {
  FEI_SHU_CONFIG: { FEI_SHU_URL },
} = getConfig()

/**
 * 任意请求
 * @param param
 * @returns
 */
export const request = async ({ url, option = {} }) => {
  try {
    return axios.request({
      url,
      ...option,
    })
  } catch (error) {
    throw new Error(error)
  }
}

interface IMethodVersion {
  url: string
  method: Method
  headers?: { [key: string]: string }
  params?: Record<string, unknown>
  query?: Record<string, unknown>
}

interface IRequest<T> {
  code: number
  data: T
}
export const requestVersion = async <T>({
  url,
  method,
  headers = {},
  params = {},
  query = {},
}: IMethodVersion): Promise<IRequest<T>> => {
  let requestUrl = ''
  if (/^(http:\/\/)|https:\/\//.test(url)) {
    requestUrl = url
  } else {
    requestUrl = `${FEI_SHU_URL}${url}`
  }
  if (headers && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }
  Logger.log(requestUrl)
  return new Promise((resolve, reject) => {
    axios({
      url: requestUrl,
      method,
      params: query,
      data: {
        ...params,
      },
      headers: {
        ...headers,
      },
    })
      .then(({ data, status }) => {
        resolve({ data, code: status })
      })
      .catch((error) => {
        console.log('error', error)
        reject(error)
      })
  })
}
```

> `getConfig.ts` 进行了对 配置文件的获取 需要在 `上一级` 目录有 `app.yaml` 文件

```ts
import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import { resolve } from 'path'

interface IConfig {
  FEI_SHU_CONFIG: {
    FEI_SHU_URL: string
    FEI_SHU_API_HOST: string
    FEI_SHU_APP_ID: string
    FEI_SHU_APP_SECRET: string
  }
}
let config: IConfig | null = null
export function getConfig() {
  if (config === null) {
    const conf = readFileSync(resolve(__dirname, '../app.yaml'), {
      encoding: 'utf8',
    })
    config = load(conf)
  }
  return config
}
```

先对获取 `Api` 请求的凭证 的接口进行编写

> 访问凭证 2 小时过期 在剩余半小时外 再次请求接口 会是相同的值

```ts
import { getConfig } from './config'
import { requestVersion } from './request'
const {
  FEI_SHU_CONFIG: { FEI_SHU_APP_ID, FEI_SHU_APP_SECRET },
} = getConfig()

interface GetAppTokenRes {
  tenant_access_token: string
  code: number
  msg: string
  app_access_token: string
  expire: number
}

/**
 * 获取访问凭证 tenant_access_token
 * @returns Promise<GetAppTokenRes>
 */
export const getAppToken = async () => {
  const { data } = await requestVersion<GetAppTokenRes>({
    url: '/auth/v3/tenant_access_token/internal',
    method: 'POST',
    params: {
      app_id: FEI_SHU_APP_ID,
      app_secret: FEI_SHU_APP_SECRET,
    },
  })
  return data
}
```

创建一个 `feiShuService` 文件 进行对 token 的获取以及消息的发送

> 这里是用了 `缓存模块` 进行对 token 的缓存

```ts
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { getAppToken } from 'src/fsSDK'
import { messages } from '../fsSDK/utils/message'

@Injectable()
export class FeiShuService {
  private readonly APP_TOKEN_CACHE_KEY: string

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.APP_TOKEN_CACHE_KEY = Math.random().toString(36).slice(2)
  }

  async getAppToken() {
    let appToken: string
    appToken = await this.cacheManager.get(this.APP_TOKEN_CACHE_KEY)
    if (!appToken) {
      const response = await getAppToken()
      if (response.code === 0) {
        // token 有效期限为 2小时
        appToken = response.tenant_access_token
        // 设置token缓存
        await this.cacheManager.set(
          this.APP_TOKEN_CACHE_KEY,
          appToken,
          response.expire - 60
        )
      } else {
        throw new Error('飞书应用调用异常')
      }
    }
    Logger.log('appToken', appToken)
    return appToken
  }
}
```

## 消息收发

```ts
import { requestVersion } from './request'
import { Logger } from '@nestjs/common'

// 接收类型
export enum RECEIVE_TYPE {
  'open_id',
  'user_id',
  'union_id',
  'email',
  'chat_id',
}

// 消息类型
export enum MSG_TYPE {
  text,
  post,
  image,
  file,
  audio,
  media,
  sticker,
  interactive,
  share_chat,
  share_user,
}

type MESSAGES_PARAMS = {
  receive_id: string
  content: string
  msg_type: MSG_TYPE
}

/**
 * 发送消息
 * @param receive_id_type
 * @param params
 * @param appToken
 */
export const messages = async (
  receive_id_type: RECEIVE_TYPE,
  params: MESSAGES_PARAMS,
  appToken: string
) => {
  Logger.log('RECEIVE_TYPE:', receive_id_type)
  Logger.log('MESSAGES_PARAMS:', params)
  Logger.log('appToken:', appToken)
  try {
    const { data } = await requestVersion({
      url: `/im/v1/messages`,
      method: 'POST',
      // receive_id_type 用于判断接收的类型
      query: { receive_id_type },
      params,
      headers: {
        // token验证需要放在请求头中
        Authorization: `Bearer ${appToken}`,
      },
    })
  } catch (e: unknown) {
    Logger.log(e)
  }
}
```

> 在上述的 `service` 中创建发送消息的方法

```ts
import { CACHE_MANAGER, Inject, Injectable, Logger } from "@nestjs/common";
import { Cache } from "cache-manager";
import { getAppToken } from "src/fsSDK";
import { messages } from "../fsSDK/utils/message";
  // 发送消息
  async sendMessage(receive_id_type, params) {
    const appToken = await this.getAppToken();
    return messages(receive_id_type, params, appToken);
  }
```

创建一个 `dto` 对参数的接收进行校验(需要在 `app.ts` 中配置校验的管道([pipe docs](https://docs.nestjs.com/pipes#class-validator)))

> `ApiProperty` 是 `swagger` 中的装饰器 如果没有使用 swagger 则不需要使用

```ts
import { RECEIVE_TYPE, MSG_TYPE } from '../../fsSDK/utils/message'
import { ApiProperty } from '@nestjs/swagger'

export class FeiShuDto {
  @ApiProperty({ example: 'open_id' })
  receive_id_type: RECEIVE_TYPE

  @ApiProperty({ example: 'ou_f19ae162486ee052db68157e4c83a6a6' })
  receive_id?: string

  @ApiProperty({ example: '{"text":" test content"}' })
  content: string

  @ApiProperty({ example: 'text', enum: MSG_TYPE })
  msg_type?: keyof MSG_TYPE
}
```

上述如果有参数不清晰 可以使用飞书的调试平台调试

> - [ 调试后台](https://open.feishu.cn/api-explorer/cli_a33f9611bab8100e?apiName=tenant_access_token_internal&project=auth&resource=auth&version=v3)

## 参考资料

* [飞书调用平台 调用 API](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/get-#891619d5)

* [飞书调用平台 获取 tenant_access_token](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token_internal)

* [飞书调用平台 获取 openID](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-obtain-openid)
