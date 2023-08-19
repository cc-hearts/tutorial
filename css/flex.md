---
title: flex布局
---

> flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。 默认不放大(0)
> flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。默认的值是(1)
> flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。（默认为 auto) **(调整该元素的宽高比例进行缩放)**

# align-items

**stretch**
弹性元素被在侧轴方向被拉伸到与容器相同的高度或宽度。

flex: 1 其实是 flex-grow, flex-shrink, flex-basis 的缩写
&#x20; 对应的值是：flex-grow: 1, flex-shrink: 1, flex-basis: 0%
&#x20; flex-grow: 扩展，子元素宽度之和小于父元素宽度 那么子元素就会分配父元素剩余的宽度
&#x20; flex-shrink: 收缩, 子元素宽度之和大于父元素宽度 那么子元素就会按照比列收缩
&#x20; flex-basis: 是弹性盒子的基准值，在没有设置宽度的情况下宽度由 content 决定，如果 content 内容过长就会溢出外层容器，如果设置一个宽度，只要这个宽度小于外层容器的剩余宽度(一般设置为 0，这样就可以保证百分之百小于剩余宽度) flex-grow 就会起作用 自动分配剩余宽度，这样就可以保证 flex-basis 的宽度是外层容器的宽度而不是 content 的宽度，内容也就不会溢出

- flex-grow: 可拉伸
- flex-shrink 可压缩
- flex-basis 当前元素的宽度

flex 默认值

```css
flex {
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
}
```

flex: 1

```css
flex {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}
```

flex: auto

```css
flex {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}
```

> flex: 1 会导致父元素宽度自动变为 100%

## flex 嵌套撑开容器问题

flex-item 在非滚动容器的时候 他的最小自动尺寸就是它本身的值，而在滚动容器中，自动最小尺寸是 0

> <https://www.w3.org/TR/css-flexbox-1/#min-size-auto>

因此 解决 flex 嵌套撑开的问题 添加`min-width: 0` 或者`min-height: 0` 即可解决。
