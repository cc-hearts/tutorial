---
title: vertical-align 对齐
---

对于行内元素、或者是设置了 display:inline-block 的元素而言 垂直的对齐方式并不是原本的对齐方式 而是跟 vertical-align 有关

vertical-align 的所有属性值：

1. baseline **根据父级元素的基线定位，那么父级元素的基线位置怎么确定呢？这里要涉及到神奇的小写字母 x，标准规定，基线的位置在小写字母 x 的底部所在直线的位置**
   ![image.png](./../assets/img/FE/css/gl59sz/1643211002182-89ec0ac1-54e2-4772-b219-24a5df93b8a1.png)
2. top 使元素及其后代元素的顶部与整行的顶部对齐。
3. middle 使元素的中部与父元素的基线加上父元素 x-height（译注：[x 高度](https://www.zhangxinxu.com/wordpress/2015/06/about-letter-x-of-css/)）的一半对齐。
4. bottom 使元素及其后代元素的底部与整行的底部对齐。
5. text-top 使元素的顶部与父元素的字体顶部对齐。
6. text-bottom 使元素的底部与父元素的字体底部对齐。
7. **sub**使元素的基线与父元素的下标基线对齐。
8. **super**使元素的基线与父元素的上标基线对齐。

属性的作用范围只是 **只对内联元素（或者 display：inline-block 的块级元素）有效，并根据父级元素的位置定位。**

> 此属性是为了确定此行内元素在他父级元素中的垂直距离

## 基线位置改变的情况

- 如果父级元素高度被某个子元素撑开
  - 如果这个子元素是图片，改变图片的高度会改变基线的位置；
  - 如果这个子元素是文字，改变字体的 font-size 和 line-height 属性，都会改变基线的位置
- 如果父级元素中包含多个含有 inline-block 属性值的元素，且这些元素都设置了 vertical-align：baseline 属性，那么会出现一个好玩的现象，这一行上面所有的元素都会是一个基线，改变一个元素的基线，其他所有元素的基线都会改变。基线的位置会跟基线最低的子元素或者父级元素的基线对齐。

## 参考文献

[MDN-vertical-align](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align)
