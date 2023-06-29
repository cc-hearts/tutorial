---
title: 移动端阻止橡皮筋效果
---

```javascript
document.body.addEventListener(
  'touchmove',
  function (e) {
    e.preventDefault() //阻止默认的处理方式(阻止下拉滑动的效果)
  },
  {
    passive: false,
  }
) //passive 参数不能省略，用来兼容ios和android
```
