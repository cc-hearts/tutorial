---
title: 变量提升
---

# 变量提升

只有声明本身会被提升，而赋值或其他运行逻辑会留在原地。如果提升改变了代码执行的顺序，会造成非常严重的破坏。

- 函数声明
- var 变量

（函数声明的优先级要比 var 变量声明的优先级要高）

函数声明会被提升，但是函数表达式却不会被提升。

```javascript
foo() // Typeerror
bar() // ReferenceError
var foo = function bar() {
  console.log('test')
}
```

var foo =  function bar 为函数表达式 不会进行变量提升

```javascript
//函数声明的形式
bar() // test
function bar() {
  console.log('test')
}
var foo = bar
```

> （作用域中遍寻不到所需的变量，引擎就会抛出 ReferenceError 异常。）

出现在后面的函数声明还是可以覆盖前面的

```javascript
function foo() {
  console.log('a')
}

function foo() {
  console.log('b')
}
foo() // b
```
