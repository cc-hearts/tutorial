---
title: final
categories: Java
---

final：最终的
final 可以用来修饰的结构有： 类 方法 变量

final 修饰一个类 此类则不能被其他类继承 例子有：String 类 System 类 StringBuffer 类

final 修饰一个方法 表示此方法不能被重写 比如 Object 类中的 getClass();

final 修饰变量 此变量就被称为是一个常量

> final 修饰一个属性的时候 可以考虑赋值的位置有 显示初始化 代码块中初始化 构造器中初始化

final 如果修饰的是一个局部变量
尤其在修饰形参的时候 表明此形参是一个常量 当我们调用此方法时 给常量形参赋值为一个实参 一旦赋值以后 只能在方法体内使用此形参 而且不能重新赋值

```java
public static void func(final int number) {
}
```

static final 修饰属性 表示类中的全局常量
static final 修饰方法 表示方法不能被子类重写
