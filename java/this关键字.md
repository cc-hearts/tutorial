---
title: this关键字
categories: Java
---

this 可以用来修饰 属性 方法 构造器

this 修饰属性和方法:
this 理解为 当前的对象 或者当前正在创建的对象

- 在类的方法中 可以使用 this.属性或者 this.方法的方式去调用当前对象的属性或者方法 一般情况下省略了 this 如果方法的形参和类的属性同名时候 需要显式调用 this.变量的形式
- 在类的构造器中 可以使用 this.属性或者 this.方法的形式去调用当前对象的属性或者方法 一般情况下省略了 this 如果构造器的形参和类的属性同名时候 需要显式调用 this.变量的形式

## this 调用构造器

在类的构造器中 可以显示 shyingthis(形参列表)方式 调用本类中其他的构造器
构造器中不能通过 this(形参列表) 方式调用自己
如果一个类中有 n 个构造器 则最多有 n - 1 构造器使用了 this(形参列表)
构造器内部最多只能声明 this(形参列表) 用来调用其他的构造器

```java
 public triangle(){

    }
    public triangle (double base , double height) {
        this();
        this.base = base;
        this.height = height;
    }
```
