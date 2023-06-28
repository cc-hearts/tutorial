---
title: z-index失效
---

1、一般 z-index 的使用是在有两个重叠的标签，在一定的情况下控制其中一个在另一个的上方出现。
2、z-index 值越大就越是在上层。z-index：9999；z-index 元素的 position 属性要是 relative，absolute 或是 fixed。
3、z-index 在一定的情况下会失效。
①、父元素 position 为 relative 时，子元素的 z-index 失效。
解决：父元素 position 改为 absolute 或 static
②、该元素没有设置 position 属性为非 static 属性。
解决：设置该元素的 position 属性为 relative，absolute 或是 fixed 中的一种。
③、该标签在设置 z-index 的同时还设置了 float 浮动
解决：float 去除，改为 display：inline-block；
