---
title: backdrop-filter filter 的用法
---

> `backdrop-filter`和`filter`的语法类似

## backdrop-filter 和 filter 区别

`backdrop-filter`是让当前元素所在区域后面的内容模糊灰度或高亮之类，要想看到效果，需要元素本身半透明或者完全透明(`opacity`)；而`filter`是让当前元素自身模糊灰度或高亮之类。

### filter

```html
<div class="flex">
  <div id="app">balabalabalabalabalabalabalabalabala</div>
</div>
```

```css
/* 正题 */

#app {
  width: 400px;

  height: 200px;

  margin: auto;

  border: 1px solid #eee;

  /*filter是让当前元素自身模糊灰度或高亮之类。*/

  filter: blur(1px);
}
```

### backdrop-filter

```html
<div id="app">
  <div class="backdrop-filter"></div>

  balabalabalabalabala
</div>
```

```css
body,
html {
  width: 100%;

  height: 100%;
}

/* 正题 */

#app {
  width: 100%;

  height: 100%;

  position: relative;
}

.backdrop-filter {
  width: 100%;

  height: 100%;

  top: 0;

  position: absolute;

  background-color: rgba(0, 0, 0, 0.2);
  /*当前元素所在区域后面的内容模糊灰度或高亮*/
  backdrop-filter: blur(2px);
}
```

## 参考资料

- https://www.zhangxinxu.com/wordpress/2019/11/css-backdrop-filter/

- [css 之 filter 属性](./filter.md)
