---
title: 使用textContent
---

## 使用 textContent 代替 innerHTML

> `innerHTML` 属性可以用来检查当前页面自最初加载到当前的 HTML 源码的变化

`Node` 接口的 `textContent` 属性表示一个节点及其后代的文本内容

### 区别:

`textContent` 会返回节点中的每一个元素。相反， `innerText` 受 CSS 样式的影响，并且不会返回隐藏元素的文本，
由于 `innerText` 受 CSS 样式的影响，它会触发回流（ reflow ）去确保是最新的计算样式。（回流在计算上可能会非常昂贵，因此应尽可能避免）

## 参考文章

- [Node.textContent](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent)

## 自定义事件

```ts
/**
 * 页面需要
 * <button id="btn"> click me </button>
 * <input  id="input"/>
 */
// 创建事件
const customEvent = new CustomEvent('input', {
  // 表示是否可以冒泡
  bubbles: true,
  // 事件是否可以被撤销
  cancelable: true,
  // 事件初始化时传递的数据
  detail: {
    realData: true,
  },
})

const btn = document.getElementById('btn')
const input = document.getElementById('input')
let count = 0
if (input) {
  input.addEventListener('input', (e) => {
    console.log(e)
  })
}

if (btn) {
  // 按钮点击 触发自定义事件的分发
  btn.addEventListener('click', () => {
    if (input instanceof HTMLInputElement) {
      input.value = count + ''
      count++
      // 分发事件
      input.dispatchEvent(customEvent)
    }
  })
  btn.dispatchEvent(customEvent)
}
```

[customEvent MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent#customeventinit)
