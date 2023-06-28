---
title: puppeteer 在Docker中配置
---

```shell
FROM ghcr.io/puppeteer/puppeteer:latest

LABEL maintainer="heart<7362469@qq.com>"

WORKDIR /opt/puppeteer

COPY . .

USER root

CMD npm run start

```

```ts
import puppeteer from 'puppeteer'

export default async function xnLogin(id: number | string) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
  })

  const page = await browser.newPage()

  // Configure the navigation timeout
  await page.setDefaultNavigationTimeout(0)

  await page.goto(url)

  await Shard.sleep(10 * 1000)

  await browser.close()
}
```

## 参考资料

* [puppeteer guides docker](https://pptr.dev/guides/docker#usage)
* [puppeteer](https://www.npmjs.com/package/puppeteer)
* [How to solve Puppeteer TimeoutError: Navigation timeout of 30000 ms exceeded](https://ourcodeworld.com/articles/read/1106/how-to-solve-puppeteer-timeouterror-navigation-timeout-of-30000-ms-exceeded)
