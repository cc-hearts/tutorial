---
title: Grid 布局
---

## 基本属性介绍

```html
<div class="grid">
  <div class="container">1</div>
  <div class="container">2</div>
  <div class="container">3</div>
  <div class="container">4</div>
  <div class="container">5</div>
</div>
```

```css
.grid {
  display: grid;
}

.container {
  height: 50px;
  border: 1px solid #eee;
}
```

```css
.grid {
  display: grid;
  /* grid-template-columns: 100px 100px 100px; */
  /* fr 单位的灵活网格 */
  /* 定义每一列的宽度*/
  grid-template-columns: 100px 100px 100px;
  /* 定义每一个行的高度*/
  grid-template-rows: repeat(3, 100px);

  /* 定义行列之间的间隔*/
  /* 各个行之间的空隙 */
  row-gap: 20px;
  /* 各个列之间的空间 */
  column-gap: 20px;
  /* 简介写法：*/
  /* gap: 20px */
}
```

```css
/**  列开始位置 但是不会超过该列 */
.container:nth-of-type(1) {
  grid-column-start: 2;
}
```

如果 `grid-column-start` 的 列超过了 `grid-template-columns` 定义的列的宽度 则会自动分配剩余空间的宽度进行计算

```css
.container:nth-of-type(1) {
  grid-column-start: 9;
}
```

## 自动使用多列填充

> 关键 `repeat(auto-fill, minmax(200px, 1fr));`

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 20px;
}
```

默认情况下 容器元素都是块级元素，但也可以设成行内元素。

```less
div {
  display: inline-grid; //display:grid;
}
```

![image.png]\(../../assets/record/kqlleq/1640702624417-9283f495-27f7-4c3a-b0a4-dec0de293ccc.png) grid 容器变成了一个行内块元素

> 注意，设为网格布局以后，容器子元素（项目）的 float、display: inline-block、display: table-cell、vertical-align 和 column-\*等设置都将失效。

grid-template-columns 属性定义每一列的列宽，
grid-template-rows 属性定义每一行的行高。

```less
grid-template-columns: 100px 100px 100px;
grid-template-rows: 100px 100px 100px;

grid-template-columns: 33.33% 33.33% 33.33%;
grid-template-rows: 33.33% 33.33% 33.33%;
```

## repeat()

repeat()接受两个参数，第一个参数是重复的次数（上例是 3），第二个参数是所要重复的值。

```less
grid-template-columns: repeat(3, 33.3%); //
```

repeat()重复某种模式也是可以的。

> 重复 n 列为 100px n+1 列 20px n+2 列 80px

![image.png]\(../../assets/record/kqlleq/1640703467691-904e7bc7-e60d-4a57-928c-eb7e2f194b44.png)

## auto-fill 关键字

单元格的大小是固定的，但是容器的大小不确定。
如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用 auto-fill 关键字表示自动填充。

> 为什么对 grid-template-rows 指定一列 后续列无效

[点击查看【codepen】](https://codepen.io/xiaochen2001/embed/YzrYdRw)

## fr 关键字

为了方便表示比例关系，网格布局提供了 fr 关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为 1fr 和 2fr， 则表示后者的宽度是前者的两倍

> fr 可以与绝对长度的单位结合使用

```less
// 第一列的宽度为150像素，第二列的宽度是第三列的一半
.container {
  display: grid;
  grid-template-columns: 150px 1fr 2fr;
}
```

## minmax()

minmax()函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

## auto

auto 关键字表示由浏览器自己决定长度。

> 第二列的宽度，基本上等于该列单元格的最大宽度，除非单元格内容设置了 min-width，且这个值大于最大宽度。

![image.png]\(../../assets/record/kqlleq/1640705240141-3fd4d0a6-afca-4a60-8823-c4c5f4367d7a.png)

## gap

### row-gap 属性，&#xA; column-gap 属性，&#xA; gap 属性

row-gap 属性设置行与行的间隔（行间距），column-gap 属性设置列与列的间隔（列间距）。
gap 属性是 column-gap 和 row-gap 的合并简写形式

> gap 省略了第二个值，浏览器认为第二个值等于第一个值

```less
gap: <row-gap> <column-gap>;

gap: 20px 20px;
```

![image.png]\(../../assets/record/kqlleq/1640705631159-133e0a23-702a-42b2-9326-468327201d0d.png)

## grid-template-areas

指定区域

## grid-auto-flow 属性

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行。
grid-auto-flow 属性决定，默认值是 row，即"先行后列"。也可以将它设成 column，变成"先列后行"

> column dense 表示先列后行 并且尽可能填满 不出现空格
> row dense，表示"先行后列"，并且尽可能紧密填满，尽量不出现空格

![image.png]\(../../assets/record/kqlleq/1640707578263-eb33fc15-963e-405e-801d-42ba376a57aa.png)
此时的单元格是被空出来的
使用 column dense 可以尽可能填充空格
![image.png]\(../../assets/record/kqlleq/1640707623862-363ceecb-d80e-47dd-8744-28e2becfd482.png)

## 单元格内容属性

### justify-items 属性，&#xA; align-items 属性，&#xA; place-items 属性

> 设置了 justify-items 设置了之后 宽度会变为单元格内容(也就是各个.items 的内容宽度)
> 设置了 align-items 之后 高度会变为单元格内容(也就是各个.items 的内容高度)

```less
justify-items: start | end | center | stretch;
align-items: start | end | center | stretch;

start：对齐单元格的起始边缘。
end：对齐单元格的结束边缘。
center：单元格内部居中。
stretch：拉伸，占满单元格的整个宽度（默认值）。
```

```less
justify-items: center;
align-items: center;
```

![image.png]\(../../assets/record/kqlleq/1640708457292-11886a4e-a9ec-450f-94f5-ba195ee15156.png)
place-items 属性是 align-items 属性和 justify-items 属性的合并简写形式。

```less
place-items: <align-items> <justify-items>;
```

如果省略第二个值，则浏览器认为与第一个值相等。

### justify-content 属性，&#xA; align-content 属性，&#xA; place-content 属性

justify-content 属性是整个内容区域在容器里面的水平位置（左中右），
align-content 属性是整个内容区域的垂直位置（上中下）。

```less
 justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
 align-content: start | end | center | stretch | space-around | space-between | space-evenly;

start - 对齐容器的起始边框
stretch - 项目大小没有指定时，拉伸占据整个网格容器。
space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔
space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔
```

![image.png]\(../../assets/record/kqlleq/1640708942826-9d063c8d-afec-455a-b43b-5d7a0c0a147c.png)place-content 属性是 align-content 属性和 justify-content 属性的合并简写形式。

```less
place-content: <align-content> <justify-content>;
```

### grid-auto-columns 属性，&#xA; grid-auto-rows 属性

有时候，一些项目的指定位置，在现有网格的外部。比如网格只有 3 列，但是某一个项目指定在第 5 行。这时，浏览器会自动生成多余的网格，以便放置项目。
grid-auto-columns 属性和 grid-auto-rows 属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与 grid-template-columns 和 grid-template-rows 完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。
[点击查看【codepen】](https://codepen.io/xiaochen2001/embed/eYGyXNz)

### grid-template 属性，&#xA; grid 属性

grid-template 属性是 grid-template-columns、grid-template-rows 和 grid-template-areas 这三个属性的合并简写形式。
grid 属性是 grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、grid-auto-flow 这六个属性的合并简写形式

### grid-column-start 属性，&#xA; grid-column-end 属性，&#xA; grid-row-start 属性，&#xA; grid-row-end 属性

项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

```less
grid-column-start属性：左边框所在的垂直网格线
grid-column-end属性：右边框所在的垂直网格线
grid-row-start属性：上边框所在的水平网格线
grid-row-end属性：下边框所在的水平网格线
```

除了指定为第几个网格线，还可以指定为网格线的名字

> grid-template-areas 会改变网格线名字 或者手动改变网格线名字 grid-template-column grid-template-row

```less
.item-1 {
  grid-column-start: header-start;
  grid-column-end: header-end;
}
```

这四个属性的值还可以使用 span 关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。
![image.png]\(../../assets/record/kqlleq/1640709960646-7b327e40-560f-4f13-b4d1-5900d47f6455.png)
使用这四个属性，如果产生了项目的重叠，则使用 z-index 属性指定项目的重叠顺序。

### grid-column 属性，&#xA; grid-row 属性

grid-column 属性是 grid-column-start 和 grid-column-end 的合并简写形式，grid-row 属性是 grid-row-start 属性和 grid-row-end 的合并简写形式。

```less
grid-column: <start-line> / <end-line>;
grid-row: <start-line> / <end-line>;

.item1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
```

## grid-area 属性

grid-area 属性指定项目放在哪一个区域。

```less
.item-1 {
  grid-area: e;
}
```

![image.png]\(../../assets/record/kqlleq/1640710224384-80fde9f6-3a08-4ba0-9a09-d1b28be7b001.png)

grid-area 属性还可用作 grid-row-start、grid-column-start、grid-row-end、grid-column-end 的合并简写形式，直接指定项目的位置。

```less
.item {
  grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}
```

### justify-self 属性，&#xA; align-self 属性，&#xA; place-self 属性

justify-self 属性设置单元格内容的水平位置（左中右），跟 justify-items 属性的用法完全一致，但只作用于单个项目。
align-self 属性设置单元格内容的垂直位置（上中下），跟 align-items 属性的用法完全一致，也是只作用于单个项目。

```less
 justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;

start：对齐单元格的起始边缘。
end：对齐单元格的结束边缘。
center：单元格内部居中。
stretch：拉伸，占满单元格的整个宽度（默认值）。
```

![image.png]\(../../assets/record/kqlleq/1640710398018-3e6288d9-76ed-4e19-aa2a-2879ee28b734.png)
place-self 属性是 align-self 属性和 justify-self 属性的合并简写形式。

```less
place-self: <align-self> <justify-self>;
```

<https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html>

## grid 瀑布流写法

[点击查看【codepen】](https://codepen.io/xiaochen2001/embed/gOGvYax?editors=1100)

## 参考资料

> grid 布局在线网址: <https://grid.layoutit.com/>

- <https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html>
- <https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout>
