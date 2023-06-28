---
title: gradients
---

渐变分为两种：

* 线性渐变（Linear Gradients）- 向下/向上/向左/向右/对角方向。
* 径向渐变（Radial Gradients）- 由它们的中心向四周发散。

## 线性渐变

**background-image: linear-gradient(direction, color-stop1, color-stop2, …); **
**线性渐变默认从上到下**
[点击查看【codepen】](https://codepen.io/xiaochen2001/embed/BawxKwR)
**direction:**
**to top 从下到上**
**to bottom 从上到下**
**to left 从右到左**
**to right 从左到右**
// 对角渐变
[点击查看【codepen】](https://codepen.io/xiaochen2001/embed/wvrjGmr)

## 角度渐变

> 从顶部开始 沿顺时针

[点击查看【codepen】](https://codepen.io/xiaochen2001/embed/MWEGyPz)

## 重复的线性渐变

[点击查看【codepen】](https://codepen.io/xiaochen2001/embed/MWEGyPz)

## 颜色终止位置

```less
#gradient {
  height: 100px;
  // 这里的10% 77% 表示的是颜色的停止点
  // 中间的有些位置你没有明确设置，
  // 那么它将会被自动计算(例如10% - 77% 之间的停止点)
  background: linear-gradient(to right, green 10%, red 77%, yellow 77%);
}
```

[点击查看【codepen】](https://codepen.io/xiaochen2001/embed/RwLyQaN)

## 渐变中心点

渐变会平滑地从一种颜色过渡到另一种颜色 可以设置渐变的中心点控制渐变的平滑过渡

> 10% 就是渐变的中心点 默认值是 50%

[点击查看【codepen】](https://codepen.io/xiaochen2001/embed/PoJeQOb)

## 堆叠渐变

[点击查看【codepen】](https://codepen.io/xiaochen2001/embed/dyVedjo)

## radial-gradient 径向渐变

```less
.radial-gradient {
  position: relative;
  width: 262px;
  height: 262px;
  border-radius: 50%;
  background: linear-gradient(
        30deg,
        transparent 40%,
        rgba(42, 41, 40, 0.85) 40%
      ) no-repeat 100% 0, linear-gradient(
        60deg,
        rgba(42, 41, 40, 0.85) 60%,
        transparent 60%
      ) no-repeat 0 100%, repeating-radial-gradient(#2a2928, #2a2928 4px, #ada9a0
        5px, #2a2928 6px);
  background-size: 50% 100%, 100% 50%, 100% 100%;
}
.radial-gradient:after {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -35px;
  border: solid 1px #d9a388;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px #da5b33, inset 0 0 0 27px #da5b33;
  background: #b5ac9a;
  content: '';
}
```

```html
<div class="radial-gradient"></div>
```
