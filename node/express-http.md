---
title: 洋葱模型的实现
---

## 创建洋葱模型

```ts
export class Interceptor {
  // 存储拦截切面
  constructor(private aspects: Array<callback> = []) {}

  /** 注册拦截切面 */
  use(/** async */ functor: callback) {
    this.aspects.push(functor)
    return this
  }

  async run(context) {
    const aspects = this.aspects
    // 运用reduceRight 可以拿到上一个切面的函数 将每个函数进行包装 最后返回的是第一个添加的切面的包装函数
    const proc = aspects.reduceRight(
      (acc, cur) => {
        return async () => {
          await cur(context, acc)
        }
      },
      () => Promise.resolve()
    )

    try {
      await proc()
    } catch (ex) {
      console.error(ex.message)
    }

    return context
  }
}
```

`http` 服务

```ts
import { Interceptor } from './interceptor.js'
import { createServer, IncomingMessage, ServerResponse } from 'http'
import type { callback } from '../types'
import Router from './router.js'
const noop = () => {}
export default class {
  service: import('http').Server<typeof IncomingMessage, typeof ServerResponse>
  private interceptor: Interceptor
  constructor() {
    this.interceptor = new Interceptor()

    this.service = createServer(
      async (
        req,
        res: ServerResponse<IncomingMessage> & {
          req: IncomingMessage
        }
      ) => {
        // 等待切面的执行
        await this.interceptor.run({ req, res })
        if (!res.writableFinished) {
          let body = Reflect.get(res, 'body') || '200 OK'
          if (body.pipe) {
            body.pipe(res)
          } else {
            if (
              typeof body !== 'string' &&
              res.getHeader('Content-Type') === 'application/json'
            ) {
              body = JSON.stringify(body)
            }
            res.end(body)
          }
        }
      }
    )

    this.service.on('clientError', (err, socket) => {
      console.log(err)
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
    })
  }

  listen(opts: number | Record<string, unknown>, cb: callback = () => {}) {
    if (typeof opts === 'number') {
      opts = { port: opts }
    }
    opts.host = opts.host || '0.0.0.0'
    console.log(`Starting up http-server
    http://${opts.host}:${opts.port}`)
    this.service.listen(opts, () => cb(this.service))
  }

  use(aspect: callback | string, router?: Router) {
    console.log(router)
    if (typeof aspect === 'string') {
      this.interceptor.use(async (ctx, next) => {
        const url = ctx.req.url as string
        if (aspect === '*' || url.startsWith(aspect)) {
          if (router) {
            const route = router.getRouter()
            ctx.req.url = url.replace(new RegExp(`^${aspect}`), '')
            route.forEach((call) => {
              call instanceof Function && call(ctx, noop)
            })
            ctx.req.url = url
          }
        }
        next()
      })
    } else {
      this.interceptor.use(aspect)
    }
  }
}
```

## 路由

```ts
import path from 'path'
import { parse } from 'url'
import { callback } from '../types.js'

export function check(rule: string, pathname: string) {
  // 匹配路由规则
  const paraMatched = rule.match(/:[^/]+/g)

  const ruleExp = new RegExp(`^${rule.replace(/:[^/]+/g, '([^/]+)')}$`)

  const ruleMatched = pathname.match(ruleExp)

  if (ruleMatched) {
    const res = {}
    if (paraMatched) {
      for (let i = 0; i < paraMatched.length; i++) {
        res[paraMatched[i].slice(1)] = ruleMatched[i + 1]
      }
    }
    return res
  }
  return null
}

function route(method, rule, aspect) {
  return async (ctx, next) => {
    const req = ctx.req
    if (!ctx.url) ctx.url = parse(`http://${req.headers.host}${req.url}`)
    // 检查是否有 /test/:index 这种路由匹配情况
    const checked = check(rule, ctx.url.pathname)
    if (!!checked && !ctx.route && (req.method === method || method === '*')) {
      ctx.route = checked
      await aspect(ctx, next)
    } else {
      // 路径不对 跳过当前的切面 直接执行下一个切面
      await next()
    }
  }
}

class Router {
  public baseURL = ''
  public routerList: callback[]
  constructor(base = '') {
    this.baseURL = base
    this.routerList = []
  }

  getRouter() {
    return this.routerList
  }

  get(rule, aspect) {
    this.routerList.push(route('GET', path.join(this.baseURL, rule), aspect))
  }

  post(rule, aspect) {
    this.routerList.push(route('POST', path.join(this.baseURL, rule), aspect))
  }

  put(rule, aspect) {
    this.routerList.push(route('PUT', path.join(this.baseURL, rule), aspect))
  }

  delete(rule, aspect) {
    this.routerList.push(route('DELETE', path.join(this.baseURL, rule), aspect))
  }

  all(rule, aspect) {
    this.routerList.push(route('*', path.join(this.baseURL, rule), aspect))
  }
}

export default Router
```
