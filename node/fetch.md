---
title: 常用 fetch 请求方法
---

常用 `node-fetch` 的请求方法 可直接复制使用

```shell
npm install node-fetch
```

```ts
import fetch from 'node-fetch'
import type { RequestInit } from 'node-fetch'

export const baseUrl = 'http://localhost:3000'

type newRequestInit = RequestInit & {
  prefix?: string
}
export function request(url: string, options: newRequestInit = {}) {
  if (!options.headers)
    options.headers = {
      'Content-Type': 'application/json',
    }
  else if (!Reflect.get(options.headers, 'Content-Type'))
    Reflect.set(options.headers, 'Content-Type', 'application/json')

  const prefix = options.prefix || ''

  if (!options.method) options.method = 'get'
  return fetch(`${baseUrl}${prefix}${url}`, options).then((res) => {
    const contentType = res.headers.get('content-type')
    if (contentType?.includes('application/json;')) {
      return res.json()
    }
    return res.text()
  })
}
```
