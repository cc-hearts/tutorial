---
title: 3d perspective
---

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        display: flex;
      }

      .app {
        width: 100px;
        height: 100px;
        margin: auto;
        /* translateZ 改变  perspective 是无效的 */
        /* perspective perspective-origin  都需要设置在父元素上 */
        perspective: 100px;
      }

      .container {
        width: 50px;
        height: 50px;
        background-color: red;
        transform: translateZ(0px);
      }
    </style>
  </head>

  <body>
    <div class="app">
      <div class="container"></div>
    </div>
  </body>
</html>
```

## 参考资料

- [css3 系列之详解 perspective](https://www.cnblogs.com/yanggeng/p/11285856.html)

- [理解 css 中 perspective 的特性](https://blog.liuyunzhuge.com/2019/06/27/%E7%90%86%E8%A7%A3css%E4%B8%ADperspective%E7%9A%84%E7%89%B9%E6%80%A7/)
