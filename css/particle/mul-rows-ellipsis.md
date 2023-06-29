---
title: 多行隐藏
---

`-webkit-box` 自适应布局

```css
* {
  display: -webkit-box; // 设置盒子模型为 伸缩弹性盒子
  -webkit-box-orient: vertical; //设置子元素的排列方式 vertical 纵向排列
  -webkit-line-clamp: 2； // 这个属性不是css的规范属性，，表示显示的行数
;
}
```

### box-orient

决定子元素如何排列布局

> `box-orient` 设置 `vertical` 类似于 `flex-direction: column;`

## 多行文本溢出隐藏

```css
.hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; // 设置盒子模型为 伸缩弹性盒子
  -webkit-box-orient: vertical; //设置子元素的排列方式 vertical 纵向排列
  -webkit-line-clamp: 2； // 这个属性不是css的规范属性，，表示显示的行数
;
}
```

## 参考资料

[box-orient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-orient)
