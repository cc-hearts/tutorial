---
title: box-shadow 详细用法
categories: CSS
---

## 基本用法

```css
 {
  `box-shadow: ` `none` `| [``inset``? && [ <offset-x> <offset-y> <blur-radius>?
    <spread-radius>? <color>?]];
}
```

## 多层指定 box-shadow

```html
<style>
  div {
    width: 300px;
    height: 80px;
    border: 1px solid #333;
    border-bottom: none;
    box-sizing: border-box;
    box-shadow: 0 1px 1px rgb(0 0 0 / 20%), 0 7px 0 -3px #f6f6f6,
      0 8px 2px -3px rgb(0 0 0 / 20%), 0 13px 0 -6px #f6f6f6,
      0 14px 2px -6px rgb(0 0 0 / 20%);
  }
</style>
<div></div>
```

## 参考资料

- <https://www.cnblogs.com/coco1s/p/9913885.html>
