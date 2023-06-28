---
title: 定位
---

## 定位与 transition

如果父元素有 `overflow: hidden` 属性 不会影响`fixed`、`absolute`子元素

> 此时子元素的还是 `150px`

```html
<style>
    #app {
      width: 100px;
      height: 100px;
      background-color: red;
      overflow: hidden;
    }

    .container {
      position: absolute;
      width: 150px;
      height: 150px;
      background-color: skyblue;
    }
  </style>
</head>

<body>
  <div id="app">
    <div class="container"></div>
  </div>
</body>
```

如果父元素有 `transform` 属性 则 `overflow` 会正常发挥作用

```diff
 #app {
      width: 100px;
      height: 100px;
      background-color: red;
      overflow: hidden;
+      transform: translate3d(0,0,0); */
    }

    .container  {
      position: absolute;
      width: 150px;
      height: 150px;
      background-color: skyblue;
    }
```

> 此时的 子元素只会有 `100px`

## transform 限制 position:fixed 的跟随效果

如果 父元素使用了 `transform` 而子元素使用了`fixed` 则 会被父元素限制 降级成
`position:absolute` 的效果

## 参考资料:

- <https://www.zhangxinxu.com/wordpress/2015/05/css3-transform-affect/>
