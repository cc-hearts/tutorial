---
title: less 基本语法
---

## less 中循环写法

```less
.circleFor(@i) when(@i < 16) {
  &:nth-child(@{i}) {
    width: 170px - @c-w * (@i - 12);
    height: 170px - @c-w * (@i - 12);
  }
  .circleFor(@i + 1);
}
```
