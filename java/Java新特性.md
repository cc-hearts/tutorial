---
title: Java新特性
categories: Java
---

## Lambda 表达式

```java
package feature;

//  匿名实现类都可以用Lambda表达式来写
// 可以使用注解检查是否式一个函数式接口
@FunctionalInterface
interface MathOperation {
    // 只有一个抽象方法的接口 成为函数式接口
    int operation(int a, int b);

}

// Lambda 表达式的本质 作为一个接口的实例 并且是一个函数式接口（或者只有一个抽象方法）
public class lambda {
    // lambda 表达式
    public static void main(String[] args) {
        MathOperation mathOperation = (int a, int b) -> a - b;
    }
}
```

## 方法引用

传递给 Lambda 体的操作 已经有实现的方法了 则可以使用方法引用
本质上也是 Lambda 表达式 而 Lambda 表达式作为函数式接口的实例 所以方法引用 也是函数式接口的实例

> 使用格式 :
> 类(或 对象) :: 方法名
>
> 1.  对象 ::非静态方法
> 2.  类 :: 静态方法
> 3.  类 :: 非静态方法

```java
public class lambda {
    // lambda 表达式
    public static void main(String[] args) {
        MathOperation mathOperation = (int a, int b) -> a - b;

        MathOperation mathOperation1 = lambda::add;
    }

    public static int add(int a, int b) {
        return a - b;
    }
}
```
