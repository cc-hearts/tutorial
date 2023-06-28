---
title: puppeteer 使用
---

## 启动浏览器

```ts
// 启动一个浏览器
const browser = await puppeteer.launch({
  headless: false, // 关闭无头模式，方便我们看到这个无头浏览器执行的过程
  timeout: 1000 * 30,
})

// 设置视口宽度
page.setViewport({
  width: 1376,
  height: 768,
})

const page = await browser.newPage() // 创建一个新的页面

// 地址栏输入网页地址
await page.goto(
  'https://www.google.com/search?q=fanyi&oq=fanyi+&aqs=chrome.0.69i59j0i12i433i512j0i12i512j0i12i433i512j0i12i131i433i512l2j0i12i512l4.547j0j7&sourceid=chrome&ie=UTF-8',
  {
    waitUntil: 'networkidle2',
  }
)
// 点击转换
await page.click('.tw-menu-btn-image.z1asCe.lA8Tgb')

// 输入搜索关键字
await page.type('textarea.tw-ta', '内容')
// 关闭新开的页面
await page.close()
```

## 保存一个快照

```ts
// 保存一个快照
await page.screenshot({
  path: './saved.png',
})
```

## 保存为 pdf

```ts
await page.pdf({
  path: './saved.pdf',
  format: 'A4', // 保存尺寸
})
```

## 执行浏览器的代码

```ts
const dimensions = await page.evaluate(() => {
  return {
    // @ts-ignore
    width: document.documentElement.clientWidth,
    // @ts-ignore
    height: document.documentElement.clientHeight,
    // @ts-ignore
    deviceScaleFactor: window.devicePixelRatio,
  }
})
console.log(dimensions)

const htmlHandle = await page.$('html')

// 执行计算
// @ts-ignore
const html = await page.evaluate((body) => body.outerHTML, htmlHandle)

//Page.$ 可以理解为我们常用的 document.querySelector, 而 Page.? 则对应 document.querySelectorAll
console.log(html)
// 销毁句柄
// @ts-ignore
await htmlHandle.dispose()
```

> page.tap(或 page.click) 可以触发点击事件

## page.$eval 用法

```ts
const bodyInnerHTML = await page.$eval('body', (dom) => dom.innerHTML)
// page.evaluate 意为在浏览器环境执行脚本，可传入第二个参数作为句柄，而 page.$eval 则针对选中的一个 DOM 元素执行操作。
```

## 参考资料

* [Puppeteer](https://www.qikegu.com/docs/4559)
