---
title: direction 横纵布局改变
---

## direction

direction 能够改变子元素的排列方式 但是无法改变单段文本内（或者是一个内联元素）的每一个字体的排列方向

> 示例：

```html
    <style>
      p,
      ul {
        background: skyblue;
        direction: rtl;
      }

      ul {
        display: flex;
        justify-content: space-between;
      }
      ul li {
        border: 1px solid #333;
      }
    </style>
  </head>
  <body>
    <ul class="wrapper">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
    <p>正常顺序的文本内容</p>
  </body>
```

可以看到 `p`标签中的元素回从右向左布局 但是字体的顺序不会改变·················。

可以通过`unicode-bidi` 这个 css 属性改变文字的布局

> 以下这两个都可以改变布局

```css
unicode-bidi: bidi-override;
unicode-bidi: isolate-override;
```

## 通过 writing-mode 改变文档的对其方向

```css
b {
  writing-mode: vertical-rl;
}
```

## 逻辑方向和物理方向

像`margin-top` 这种都是逻辑方向 不会因为` writing-mode: vertical-rl;` 的改变为改变 top 的方向 因此可以用`margin-block-start` 代替 `margin-top` 其余的 `padding` 、`relative`以及`border`属性也是如此。

## 参考资料

- [_ICSS- CSS 世界中的方位与顺序_](https://github.com/chokcoco/iCSS/issues/127)
- https://stackoverflow.com/questions/16301625/rotated-elements-in-css-that-affect-their-parents-height-correctly
- https://developer.mozilla.org/zh-CN/docs/Web/CSS/writing-mode
