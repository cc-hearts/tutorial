---
title: css-外边距合并详解
---

> 在同一个 BFC 布局的两个相邻的块级元素会发生垂直外边距重叠的情况

# 计算规则

- 全部是正值，则取最大值；
- 有正值、有负值；则都取绝对值，用正值的最大值 — 绝对值的最大值；
- 全部是负值，则都取绝对值，然后用 0 减去绝对值的最大值（0 - 最大绝对值）

因此可以看见`offset`元素的 `margin-top`与`app`元素的 边距计算后的值为 0 这也是`antd`的 `form-item`也是使用这一技巧 在表单校验失败的时候`error message`的时候 不会影响布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .app {
        width: 100px;
        height: 100px;
        background-color: red;
        margin: 0 0 24px;
      }
      .app1 {
        width: 100px;
        height: 100px;
        background-color: skyblue;
        margin: 0 0 24px;
      }
      .offset {
        /* 边距合并了 */
        margin-top: -24px;
      }
    </style>
  </head>

  <body>
    <div class="app"></div>
    <div class="offset"></div>
    <div class="app1"></div>
  </body>
</html>
```

## 参考资料

<https://www.w3school.com.cn/css/css_margin_collapse.asp>
