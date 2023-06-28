---
title: 接口interface
categories: Java
---

# 接口定义的是一种规范

java 不支持多继承 只支持单继承 但是有了接口 java 可以实现多继承
接口只是定义了行为特征 并没有实现

**接口和类是并列的结构**

> **接口中不能定义构造器的 意味着接口不可以实例化 可以由类去实现它**

**JDK7 以前 只能定义全局常量和抽象方法：**

1. **全局常量：public static final String attribute 但是书写时可以省略 public static final**
2. ** 抽象方法 public abstract 的方法 书写时候也能省略 public abstract **

```java
interface umn {
     String names = null;
     String toString();
}
```

**JDK8: 除了能够全局常量和抽象方法之外 还可以定义静态方法和默认的方法**

```java
 public static void name() {
        System.out.println("asadasd");
    }
public default void names() {}
```

如果实现类覆盖了接口中的所有的抽象方法 则此实现类就可以实例化
实现类如果没有覆盖接口中的所有的抽象的方法 则此实现类仍未一个抽象类&#x20;
**Java 类实现多个接口：**
** 格式:**

```java
 // 先继承在实现接口
class AA extends BB implements CC,DD,EE {

}
```

# 接口与接口之间

接口与接口之间可以多继承
接口也是多态性的一种体现形式在

> 接口可以看作是一种规范

**接口和类是同级的**

**如果类实现了多个接口 接口中重名的方法会被合并(如果有重名的 两个都会实现)**

> **通过类实现的对象 可以调用接口中的默认方法** > **如果实现类重写了接口中的默认方法 调用时 仍然调用的是重写以后的方法**

如果子类(或者是实现类) 继承的父类和实现的接口中有声明了同名同参数的方法
那么子类在没有重写此方法的情况下 默认调用的是父类中的同名同参数的方法（**父类优先**）

如果实现类实现了多个接口 这多个接口中定义了同名同参数的默认方法 实现类如果没有重写该方法 则会报错(**接口冲突**)

> 如果是同名不同参 则不会报错

```java
--------interface a
    public interface a {
    public default void name(int number) {
        System.out.println("name");
    }
}
--------interface b
    public interface b {
    public default void name(int str) {
        System.out.println("name");
    }
}
-------- class c

public class c  implements a,b{

    @Override
    public void name(int number) {
        a.super.name(number);
        b.super.name(number);
    }
}
```

> 调用接口中的默认方法 a.super.name(number)

# 内部类

调用静态的成员内部类

```java
Person.Dog dog = new Person.Dog();
```

调用非静态的成员内部类

```java
Person p = new Person();
Person.Bird bird = p.new Bird();
```

## 调用外部类的非静态属性

```java
Person.this.eat();
```

> 可以使用一个接口去声明一个变量 因为一个类实现一个接口会实现接口的方法 （抽象类也是如此）

```java
public interface Equipment {
    public String getDescription();
}

private Equipment equipment;
```

# 内部接口

```java
public class gengirc {
    interface Entry {

    }
}

```
