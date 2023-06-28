---
title: scss base
---

## !default

变量默认 如果变量已经赋值 则使用原来的值 如果变量没有赋值 则使用当前的默认值

没有默认值的情况:

```scss
$prefix-color: cc !default; // 编译之后为cc
```

有默认值的情况:

```scss
$prefix-color: cc-s; // 已有默认值

$prefix-color: cc !default; // 编译结果为 cc-s
```

## !global

> 默认情况之下，所有定义在任何选择器之外的变量被认为是全局变量。
>
> 变量的值为 `null` (视为未赋值)

将局部变量存储为全局的变量

```scss
@mixin b($block) {
  $b: $prefixCls + $common-separator + $block !global;

  .#{$b} {
    @content; // @content 作用与 @mixin 中 类似于插槽作用
  }
}
```

meta 中有提供两个方法 用于 `检查变量是否存在` | `检查全局变量是否存在`

```scss
@use 'sass:meta';
meta.variable-exists("e"); // true
meta.global-variable-exists("e"); // false
```

## list

list 是 sass 中的列表

```scss
$list: (); // 声明一个list列表
```

[参考链接](https://www.sass.hk/skill/sass31.html)

## 占位符选择器%

与常用的 `. #` 相似 占位符选择器必须通过 `@extend` 指令调用。

> 占位符选择器 `%` 所属的样式未使用时，不会被编译到 `css` 文件中

```scss
.btn %base {
  margin-button: 0;
}

.btn-default {
  @extend %base;
}
```

## 私有成员

私有成员以 `_` 开头

```scss
$_container: 100vw 100vh;
```

## other

```scss
@use 'src/function' as * // as * 将模块处于全局的命名空间中
  @use 'src/function' as mixin- *; // 模块变量等带上前缀
```

`@function` 用来计算， `@mixin` 用来封装样式

@forward 可以引入另一个模块的所有变量、 `mixins` 和函数 通过控制 `show` 和 `hide` ，自身不能使用, 可以决定模块中的哪些成员对引入后的模板可见。对隐藏的变量，在下游文件中不可以使用，相当于模块私有成员。

```scss
@forward 'src/common' show $data;
@forward 'src/function' hidden sum;
```

> `@forward` 应先于 `@use`

## @at-root

`@at-root` 用来跳出嵌套，在多级嵌套时比较常用，包含 `without` 和 `with` 。

默认 `@at-root` 只会跳出选择器嵌套，而不能跳出 `@media` 或 `@support` ，如果要跳出这两种，则需使用 `@at-root (without: media)` 或 `@at-root (without: support)` ， `@at-root` 的关键词有四个：

1. `all `表示所有；
2. `rule `表示常规`css`选择器；
3. `media` 表示`media`；
4. `support`表示`support`（`@support`主要是用于检测浏览器是否支持`css`的某个属性）。

> 我们默认的 `@at-root` 是 `@at-root (without:rule)`

## 参考资料

> [scss](https://segmentfault.com/a/1190000041314876)
