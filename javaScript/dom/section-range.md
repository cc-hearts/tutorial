---
title: Selection对象和Range对象
---

## Selection 对象

> 每一个浏览器窗口都有一个 Selection 对象，代表用户鼠标在页面中所选取的区域。

```js
const selection = window.getSelection()
```

### 实现案例

1. 复制代码块的所有内容并且高亮显示

```html
<div id="app">
    <pre>
      <code>
        footer = document.getElementById("footer");
        window.getSelection().selectAllChildren(footer);
        /* Everything inside the footer is now selected *
      </code>
    </pre>
</div>
<button id="btn">click copy</button>
```

```js
const app = document.getElementById('app')

const btn = document.getElementById('btn')

btn.onclick = function() {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Selection
    const selection = window.getSelection()
    // 高亮选中的区域
    selection.selectAllChildren(app)
    // 拷贝
    navigator.clipboard.writeText(selection.toString())
}
```

## Range 对象

> 一个 Range 对象代表页面上的一段连续区域

```js
const range = new Range()
```
