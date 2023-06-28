---
title: 作用域
categories: JavaScript
---

# 词法作用域

> 词法作用域是由你在写 代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域 不变(大部分情况下是这样的)。

无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由函数被声明时所处 的位置决定。
词法作用域只会查找一级标识符 比如 a, b, c 如果代码中引用了 foo.bar.baz， 词法作用域查找只会试图查找 foo 标识符，找到这个变量后，对象属性访问规则会分别接 管对 bar 和 baz 属性的访问。

## 欺骗词法

（欺骗词法作用域）

> 欺骗词法作用域会导致性能 下降。

### eval

JavaScript 中的 eval(..) 函数可以接受一个字符串为参数，并将其中的内容视为好像在书写时就存在于程序中这个位置的代码(这会影响词法作用域的环境)
&#x20; 在执行 eval(..) 之后的代码时，引擎并不“知道”或“在意”前面的代码是以动态形式插 入进来，并对词法作用域的环境进行修改的。引擎只会如往常地进行词法作用域查找。

```javascript
function foo(str, a) {
    eval(str)
    console.log(a, b)
}
var b = 2
foo('var b = 3', 1) //1,3
```

在严格模式的程序中，eval(..) 在运行时有其自己的词法作用域，意味着其 中的声明无法修改所在的作用域。

```javascript
function foo(str, a) {
    'use strict'
    eval(str)
    console.log(a, b)
}
var b = 2
foo('let b = 3', 1) //1,2
```

> 关于 eval 的使用 let 和 const 没有欺骗作用域的问题
>
> 如果在非严格模式下 eval 执行会建立一个类似块级作用域的东西
>
> 严格模式，会建立一个类似函数作用域的东西

javascript 中还有一些其他的函数也有这样的效果

* setTimeout

```javascript
setTimeout('var a = 3; console.log(3)', 200)
```

* setInterval

```javascript
setInterval('var a =4; console.log(4)', 1000)
```

第一个参数可以是字符串，字符串的内容可以被解释为一段动态生成的 函数代码。

* new Function()

### with

with 通常被当作重复引用同一个对象中的多个属性的快捷方式，可以不需要重复引用对象 本身。(也是块作用域的一个例子)

with 可以将一个没有或有多个属性的对象处理为一个完全隔离的词法作用域，因此这个对 象的属性也会被处理为定义在这个作用域中的词法标识符。

```javascript
let obj = {
    a: 1,
    b: 2,
}
with(obj) {
    a = 2
    b = 3
    c = 1
}
console.log(obj.a) // 2
console.log(obj.b) // 3
console.log(obj.c) // undefind
console.log(c) // 1
```

这里的 obj.c 会为 undefind 但是 全局的 c 会为 1 解释：

因为 with 会将对象的属性进行一个特殊处理的词法作用域 因此在找不到会向上一级去查找(也就是 window) 在 window 中也没有会自动创建一个全局变量  （非严格模式下） window.c = 1

> 尽管 with 块可以将一个对象处理为词法作用域，但是这个块内部正常的 var 声明并不会被限制在这个块的作用域中，而是被添加到 with 所处的函数作 用域中。

> 另外一个不推荐使用 eval(..) 和 with 的原因是会被严格模式所影响(限 制)。with 被完全禁止，而在保留核心功能的前提下，间接或非安全地使用 eval(..) 也被禁止了。

```javascript
开启严格模式后使用with // Strict mode code may not include a with statement
```

# 函数作用域

> 区分函数声明和表达式最简单的方法是看 function 关键字出现在声明中的位 置(不仅仅是一行代码，而是整个声明中的位置)。如果 function 是声明中 的第一个词，那么就是一个函数声明，否则就是一个函数表达式。

### 匿名和具名

> 函数表达式可以是匿名的，而函数声明则不可以省略函数名

匿名函数表达式

```javascript
setTimeout(function() {
    console.log('I waited 1 second!')
}, 1000)
```

匿名函数如果需要引用自身 则需要使用 arguments.callee 引用

### 立即执行函数表达式

IIFE，代表立即执行函数表达式 (Immediately Invoked Function Expression)

```javascript
var a = 2;
(function foo() {
    var a = 3
    console.log(a) // 3
})()
console.log(a) // 2
```

许多场景中都有广泛使用这种模式 例如(express 中的 function 中都可以调用\_\_dirname)

```javascript
;
(function IIFE(def) {
    def(window)
})(function def(global) {
    var a = 3
    console.log(a) // 3 console.log( global.a ); // 2
})
```

# 块级作用域

```java
{
    // ... 块级作用域
}
```

* try/catch
* with
