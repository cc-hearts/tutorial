---
title: 下划线效果
---

- 从左到右的下划线效果
  > 通过过渡 通过过渡 `container` 的 `after` 中 `width` 实现

```html
<div id="app">
  <div id="container">鼠标悬浮的时候 显示下划线效果</div>
</div>
```

```less
#app {
  width: 100vw;

  height: 100vh;

  display: flex;

  & > div {
    margin: auto;
  }
}

#container {
  position: relative;

  &::after {
    content: '';

    position: absolute;

    width: 0;

    height: 1px;

    bottom: 0;

    left: 0;

    background-color: red;

    transition: all 0.3s;
  }

  &:hover {
    &::after {
      width: 100%;
    }
  }
}
```

- 下划线从中间向两边扩散
  > 通过过渡 `container` 的伪元素 `after` 中 `sacle` 实现

```less
#container {
  position: relative;

  &::after {
    content: '';

    position: absolute;

    width: 100%;

    height: 1px;

    bottom: 0;

    left: 0;

    transform: scale(0);

    background-color: red;

    transition: all 0.3s;
  }

  &:hover {
    &::after {
      transform: scale(1);
    }
  }
}
```

- 下划线从右向左
  > 同下划线从左往右相似 只不过定位由 `left` 变成了 `right`

```less
#container {
  position: relative;

  &::after {
    content: '';

    position: absolute;

    width: 0;

    height: 1px;

    bottom: 0;

    right: 0;

    background-color: red;

    transition: all 0.3s;
  }

  &:hover {
    &::after {
      width: 100%;
    }
  }
}
```
