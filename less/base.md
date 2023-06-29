---
title: less 基本语法
---

## 居中

父元素用 display:flex 子元素可以使用 margin:auto 居中

```html
<style>
  #container {
    width: 100vw;
    height: 100vh;
    display: flex;
  }

  #box {
    width: 50px;
    height: 50px;
    margin: auto;
    background-color: red;
  }
</style>
<!-- ... -->
<div id="container">
  <div id="box"></div>
</div>
```

## less 中循环写法

```less
.circleFor(@i) when(@i < 16) {
  &:nth-child(@{i}) {
    width: 170px - @c-w * (@i - 12);
    height: 170px - @c-w * (@i - 12);
  }
  .circleFor(@i + 1);
}
```

## 循环

```less
@color: 'color';
@color-1: #3c5f9c;
@color-2: #cc6aba;
@color-3: #83c360;
@color-4: #bf7254;
@color-5: #ba848c;
@color-6: #b6c960;
@color-7: #6d3bc0;
@color-8: #9a50c3;
#grid {
  display: grid;
  height: 100vh;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  & > div {
    position: relative;
    .contents(8,1);
  }
}
.contents(@n,@i) when (@i<=@n) {
  &:nth-child(@{i}) {
    background-color: e('@{@{color}-@{i}}');
  }
  &:nth-child(@{i})::after {
    content: '@{i}';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .contents(@n,@i + 1);
}
```

## flex 瀑布流写法

[点击查看【codepen】](https://codepen.io/xiaochen2001/embed/PoJQoLY?editors=0100)
