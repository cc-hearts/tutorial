---
title: '盒子布局'
---

## BFC 的布局规则

内部的 Box 会在垂直方向，一个接一个地放置。

Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠。

每个盒子（块盒与行盒）的 margin box 的左边，与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

> BFC 区域同样可以清除浮动带来的影响

BFC 的区域不会与 float box 重叠。

BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

计算 BFC 的高度时，浮动元素也参与计算。

> 参考资料[BFC 布局](https://blog.csdn.net/sinat_36422236/article/details/88763187?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-88763187-blog-125261564.t5_layer_targeting_s&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-88763187-blog-125261564.t5_layer_targeting_s&utm_relevant_index=1)

## 外边距重叠

> 参考资料[外边距重叠](https://segmentfault.com/a/1190000009519546)
