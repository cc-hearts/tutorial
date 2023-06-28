---
title: clip-path 的使用技巧
---

## Inset

```
inset( \<shape-arg\>{1,4} \[round \<border-radius\>]? )
```

shape-arg 分别为矩形的上右下左顶点到被剪裁元素边缘的距离（和 margin、padding 参数类似），border-radius 为可选参数，用于定义 border 的圆角。

## circle

circle() 用于定义一个圆。
参数类型：circle( \[\<shape-radius\>]? \[at \<position\>]? )
其中 shape-radius 为圆形的半径，position 为圆心的位置。
如果 shape-radius 为百分比，则 100% 相当于：

```less
sqrt(width^2+height^2)/sqrt(2)
```

## Ellipse

ellipse() 用于定义一个椭圆。
参数类型：ellipse( \[\<shape-radius\>{2}]? \[at \<position\>]? )
其中 shape-radius 为椭圆 x、y 轴的半径，position 为椭圆中心的位置。

## polygon

polygon() 用于定义一个多边形。

> shape-arg 分别为矩形的上右下左顶点到被剪裁元素边缘的距离（和 margin、padding 参数类似）

参数类型：polygon( \[\<fill-rule\>, ]? \[\<shape-arg\> \<shape-arg\>]# )
其中 fill-rule 为填充规则，即通过一系列点去定义多边形的边界。
[点击查看【codepen】](https://codepen.io/xiaochen2001/embed/porYVOv)

svg 暂时没学 不怎么会
[svg cli-path](https://segmentfault.com/a/1190000023301221)
