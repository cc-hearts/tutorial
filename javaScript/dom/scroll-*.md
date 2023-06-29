---
title: scroll-* offset-* scroll-* page-*
---

## client-\*

`clientWidth = width + padding`

`clientHeight = height + padding`

> clientLeft 即 border-left-width + 左边的滚动条的宽度

> clientTop 即 border-top-width + 上面的滚动条的宽度

### clientHeight、clientWidth

**只读属性**
元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距。

> clientHeight 可以通过 CSS height + CSS padding - 水平滚动条高度 (如果存在)来计算.

```javascript
document.getElementById('app').clientHeight // 150
document.getElementById('app').clientWidth // 150
```

## offset-\*

`offsetWidth = width + padding + border+水平滚动条的宽度`

`offsetHeight = height + padding + border+垂直滚动条的宽度`

`offsetTop` : 从当前元素的 border 外边框到父元素的 border 内边框 与父元素的距离（包括父元素的 padding）

`offsetLeft` 也是如此

> 父亲元素需要有定位等属性

### offsetHeight、offsetWidth

**只读属性**
**HTMLElement.offsetHeight** 是一个只读属性，它返回该元素的像素高度

> 高度包含该元素的垂直内边距和边框，且是一个整数。
> 如果元素被隐藏（例如 元素或者元素的祖先之一的元素的 style.display 被设置为 none），则返回 0

```javascript
document.getElementById('app').offsetHeight // 190
document.getElementById('app').offsetWidth // 190
```

```css
#app {
  width: 150px;
  height: 150px;
  background-color: red;
  border: 20px solid #fff;
}
```

## scroll-\*

`scrollHeight` 就是 容器内部的总高度度

`scrollLeft & scrollTop` : 指定的是元素的滚动条的位置

### scrollHeight、scrollWidth

scrollHeight 的值等于该元素在不使用滚动条的情况下为了适应视口中所用内容所需的最小高度。** 没有垂直滚动条的情况下，scrollHeight 值与元素视图填充所有内容所需要的最小值 clientHeight 相同**。**包括元素的 padding，但不包括元素的 border 和 margin。**scrollHeight 也包括 ::before 和 ::after 这样的伪元素。

### scrollTop、scrollLeft

在 Chrome 中 scroll 是 html 的 可以通过 document.documentElement 获取 html

> 当一个元素的内容没有产生垂直方向的滚动条，那么它的 scrollTop 值为 0

```javascript
document.getElementById('btn').onclick = function () {
  console.log(document.documentElement.scrollHeight)
  console.log(document.documentElement.scrollTop)
  console.log(document.documentElement.clientHeight)
}
```

```css
#app {
  width: 150px;
  height: 2500px;
  background-color: red;
}

#btn {
  width: 40px;
  height: 20px;
  cursor: pointer;
  position: fixed;
  text-align: center;
  top: 0;
  left: 50%;
  background-color: indianred;
}
```

```html
<div id="app"></div>
<div id="btn">btn</div>
```

> 当 scrollHeight -scrollTop == clientHeight 时候 垂直滚动条滚到底部
> 当 scrollWidth -scrollLeft == clientWidth 时候 水平条滚到右侧

## 参考文章

- [菜鸟教程 scrollHeight](https://www.runoob.com/jsref/prop-element-scrollheight.html)
- [scrollHeight 等区分](https://juejin.cn/post/6844903488124633096)

# offsetTop、offsetLeft

**HTMLElement.offsetTop** 为只读属性，它返回当前元素相对于其 offsetParent 元素的顶部内边距的距离。

> 如果当前元素设置了 position:fixed 则 当前元素的 offsetParent 为 null 如果设置为 style.display: none; 当前元素的 offsetParent 也为 null

```javascript
const box = document.getElementById('box')
console.log(box.offsetParent) // null
```

```css
#box {
  width: 70px;
  height: 70px;
  background-color: gray;
  margin-top: 15px;
  overflow: hidden;
  position: fixed;
}
```

---

```javascript
const app = document.getElementById('app')
const box = document.getElementById('box')
console.log(app.offsetTop) //8px
console.log(box.offsetTop) //43 app的border 20px box margin 15px body 自带的padding 8px
```

```css
#app {
  width: 150px;
  height: 750px;
  background-color: red;
  border: 20px solid #fff;
}

#box {
  width: 70px;
  height: 70px;
  background-color: gray;
  margin-top: 15px;
  overflow: hidden;
}
```

```html
<div id="app">
  <div id="box"></div>
</div>
```

如果给父元素设计 position

> 父元素设计的 position 为 relative absolute fixed sticky 则子元素的 offsetParent 则是当前的父元素

## pageX，pageY

pageX/Y：相对于文档边缘, 包含滚动条距离

clientX/Y：相对于当前页面且不包含滚动条距离

## 参考资料

- [容易混淆的 client-\*, scroll-\*, offset-\*](https://segmentfault.com/a/1190000005897042)
