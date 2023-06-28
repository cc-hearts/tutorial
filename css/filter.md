---
title: css之filter属性
---

> filter: none 无任何效果

## filter:blur(px) 高斯模糊

> 给图像一个高斯模糊效果，length 值越大，图像越模糊

公共样式：

```less
.content() {
  width: 100px;
  height: 100px;
  transition: all 0.3s ease;
}
```

```less
#blur {
  .content();
  background-color: gray;
  filter: blur(0px);
  &:hover {
    filter: blur(2px);
  }
}
```

```html
<h2>高斯模糊blur</h2>
<div id="blur"></div>
```

## filter:brightness(%) 线性乘法

> 可以让图片看起来更亮或者更暗 百分比越小越暗

## contrast(%) 对比度

```less
#contrast {
  .content();
  background-color: skyblue;
  filter: contrast(70%);
  &:hover {
    filter: contrast(30%);
  }
}
```

```html
<h2>对比度</h2>
<div id="contrast"></div>
```

> **drop-shadow(h-shadow v-shadow blur color)**
> 给图像设置一个阴影效果。阴影是合成在图像下面，可以有模糊度的，可以以特定颜色画出的遮罩图的偏移版本。函数接受\<shadow\>(在 CSS3 背景中定义)类型的值，除了”inset”关键字是不允许的。该函数与已有的 box-shadow box-shadow 属性很相似；不同之处在于，通过滤镜，一些浏览器为了更好的性能会提供硬件加速
> 利用这个方案，我们其实改变类似于一些图标的颜色，比如黑色的图标变成蓝色的图标

```less
#drop-shadow {
  .content();
  background-color: fuchsia;
  filter: drop-shadow(20px 10px 3px #ddd);
}
```

## hue-rotate(deg) 色相旋转

```less
#rotate {
  .content();
  background-color: pink;
  filter: hue-rotate(60deg);
}
```

利用 hue-rotate 实现对渐变颜色的 animation

```html
<div id="change"></div>
```

```less
@keyframes charing {
  0% {
    width: 10%;
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
#change {
  width: 100%;
  height: 80px;
  background: linear-gradient(to bottom, #7abcff 0%, #00bcd4 44%, #2196f3 100%);
  animation: charing 3s ease 0s normal infinite;
}
```

[点击查看【codepen】](https://codepen.io/xiaochen2001/embed/RwLYPaE)

## invert(%) 反转

> 函数的作用是反转输入图像，有点像曝光的效果

```less
.content() {
  width: 100px;
  height: 100px;
  transition: all 0.3s ease;
}
#invert {
  .content();
  background-color: #eee;
  filter: invert(0%);
  &:hover {
    filter: invert(100%);
  }
}
```

## grayscale(%) 将图像转换为灰度图像

> 将图片做旧，有一种时代沧桑感。喜欢古风的人一定会喜欢上这个效果的

```less
#grayscale {
  .content();
  background-color: red;
  filter: grayscale(0%);
  &:hover {
    filter: grayscale(60%);
  }
}
```

> 还有一种用法是有的时候需要将全站变成灰色

```less
* {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
}
```

## sepia(%) 将图像转换为深褐色

```less
#sepia {
  .content();
  background-color: skyblue;
  filter: sepia(0%);
  &:hover {
    filter: sepia(48%);
  }
}
```

sepia grayscale invert 的 codeopn：
[点击查看【codepen】](https://codepen.io/xiaochen2001/embed/jOwvNQx?editors=0100)

## 复合函数

```less
filter: contrast(175%) brightness(3%);
```

## 重点:filter:url()

<https://www.jb51.net/css/645314.html>
