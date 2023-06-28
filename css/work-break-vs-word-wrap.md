---
title: 换行的比较
categories: Record
---

# work-break 和 word-wrap

work-break:break-all 所有的都换行;
word-wrap:break-word 一行文字有可以换行的点，如空格 等 则换行;
区别:

```html
<h2>word-break</h2>
<div id="app">
  了解清楚学生会退会到底是一种怎么样的存在，是解决一切问题的关键。
  了解清楚学生会退会到底是一种怎么样的存在，是解决一切问题的关键。
  我们都知道，只要有意义，那么就必须慎重考虑。
  一般来讲，我们都必须务必慎重的考虑考虑。 asdkasldhfgasd;as
  asdakshdaksldhalfgaas das'ldkhasgfasdjkldasdb vfdhafga;sldashjkl djals;f a
</div>
<h2>word-warp</h2>
<div id="warp">
  了解清楚学生会退会到底是一种怎么样的存在，是解决一切问题的关键。
  了解清楚学生会退会到底是一种怎么样的存在，是解决一切问题的关键。
  我们都知道，只要有意义，那么就必须慎重考虑。
  一般来讲，我们都必须务必慎重的考虑考虑。 asdkasldhfgasd;as
  asdakshdaksldhalfgaas das'ldkhasgfasdjkldasdb vfdhafga;sldashjkl djals;f a
</div>
```

```less
.width() {
  width: 150px;
  border: 1px solid #eee;
}
#app {
  .width();
  word-break: break-all;
}
#warp {
  .width();
  word-wrap: break-word;
}
```

[点击查看【codepen】](https://codepen.io/xiaochen2001/embed/wvrxXGv)

# word-spacing 和 white-space

word-spacing 是单词之间间距的，white-space 是字符是否换行显示的。

# 单行文本省略号

```less
#app {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

# 多行文本省略号

```less
.app {
  display: box;
  display: -webkit-box;
  display: -moz-box;
  //文本显示的行数 可以把 块容器 中的内容限制为指定的行数
  -webkit-line-clamp: 2;
  // box-orient 属性指定一个box子元素是否应按水平或垂直排列。
  box-orient: vertical;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  overflow: hidden;
}
```
