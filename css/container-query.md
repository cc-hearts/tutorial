---
title: 容器查询
---

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    #app {
      width: 200px;
      height: 200px;
      resize: both;
      overflow: hidden;
      /* 容器查询的名称 */
      container-name: wrap;
      /* inline-size 只在水平有效 */
      /* size 水平垂直都有效 */
      container-type: inline-size;
    }

    .container {
      width: 100px;
      height: 100px;
      background-color: red;
    }

    @container wrap (max-width: 50px) {
      .container {
        background-color: skyblue;
      }
    }
  </style>

  <body>
    <div>
      <!--  -->
      <div id="app">
        <div class="container"></div>
      </div>
    </div>
  </body>
</html>
```

## 参考资料

- [介绍 2022 最期待且已正式支持的 CSS container 容器查询](https://www.zhangxinxu.com/wordpress/2022/09/css-container-rule/)

- [CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)

- [新时代布局新特性 -- 容器查询](https://github.com/chokcoco/iCSS/issues/201)

- [CSS 高阶技巧 -- 不定宽文本溢出跑马灯效果完美解决方案](https://github.com/chokcoco/iCSS/issues/225)

- [CodePen Home Pure CSS Marquee](https://codepen.io/wheatup/pen/ZEMGaKw?editors=1100)
