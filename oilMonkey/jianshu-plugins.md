---
title: 简书去除广告插件
---

```js
// ==UserScript==
// @name         Block advertising
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  去除博客园广告
// @author       cc-heart
// @match        https://www.tampermonkey.net/index.php?ext=dhdg&updated=true&version=4.18.1
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @run-at       document-end
// ==/UserScript==

;(function () {
  'use strict'
  window.onload = () => {
    const elList = document.body.childNodes
    const filterNodes = []
    for (let i = elList.length - 1; i >= 0; i--) {
      const el = elList[i]
      if (el.nodeName === 'SCRIPT') break
      filterNodes.push(el)
    }
    filterNodes.forEach((node) => node.parentNode.removeChild(node))
  }
})()
```

## 参考资料

- [【轻松上手】油猴脚本开发](https://juejin.cn/post/7022654292880424991)
