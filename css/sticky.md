---
title: sticky的使用
---

```css
position: sticky;
```

> 粘性定位可以简单理解为`relative`和`fixed`定位的混合。
> `fixed` 定位 会脱标 因此 `z-index` 有效

## 基本概念

- 流盒

  指的是粘性定位元素最近的`可滚动元素`（overflow 属性值不是 visible 的元素）的尺寸盒子，如果没有可滚动元素，则表示浏览器视窗盒子。

- 粘性约束矩形

  即粘性布局元素的父级元素矩形

## 特性

- 它的定位效果完全受限于父级元素们。如果父元素的`overflow`属性设置了`scroll`，`auto`,`overlay`值，那么，粘性定位将会失效
- 同一容器中多个粘贴定位元素独立偏移，因此可能重叠；位置上下靠在一起的不同容器中的粘贴定位元素则会挤开原来的元素，形成依次占位的效果。
- 粘性定位元素如果和它的父元素一样高，则垂直滚动的时候，粘性定位效果是不会出现的(因为粘性定位的元素受限于父元素的)

### 实战案例

## 参考资料

- https://www.zhangxinxu.com/wordpress/2020/03/position-sticky-rules/
- https://www.zhangxinxu.com/wordpress/2018/12/css-position-sticky/
