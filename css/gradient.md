---
title: 渐变锯齿问题
---

> tips: 一般设置渐变的时候 立马渐变 会出现锯齿问题 留一点空间减缓锯齿即可

```css
:root {
  --left-color: #fff;
  --right-color: red;
}

.battle {
  position: relative;
  width: 500px;
  height: 10px;
  margin: 100px;
  background: linear-gradient(
    40deg,
    var(--left-color) 0,
    var(--left-color) 50%,
    var(--right-color) 50%,
    var(--right-color)
  );
}
```

```css
:root {
  --left-color: #fff;
  --right-color: red;
}

.battle {
  position: relative;
  width: 500px;
  height: 10px;
  margin: 100px;
  background: linear-gradient(
    40deg,
    var(--left-color) 0,
    var(--left-color) 50%,
    var(--right-color) 50.2%,
    var(--right-color)
  );
}
```
