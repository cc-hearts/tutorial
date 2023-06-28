---
title: abstract
categories: Java
---

# abstract 修饰类或者方法

修饰类： 表示为抽象类

1. 抽象类不能被实例化
2. 抽象类会有构造器 便于子类实例化的时候调用(子类对象实例化的全过程)
3. 一般会有一个继承抽象类的子类 这个子类用于实例化 完成操作

修饰 方法： 表示为抽象方法
抽象方法 没有方法体

```java
//抽象方法
public abstract void eat();
```

子类继承抽象类中 需要去实现抽象类中的抽象方法 如果子类没有重写父类中的所有的抽象方法 则子类也是一个抽象类 需要使用 abstract 修饰

> 子类需要重写完父类所有的抽象方法才能实例化

> 抽象方法只能在抽象类中 抽象类中可以没有抽象方法

abstract 不能修饰 属性 构造器等结构（属性和构造器不能被重写）
abstract 不能修饰私有方法 静态方法 final 的方法

# 抽象类的匿名子类

先看匿名对象:

```java
public void work(){
  method(new Manager()); // new Manager 匿名对象
}
public static void method(Eployer e) {}
```

匿名子类:

```java
    public abstract class Eployer {
        protected String name;
        protected int id;
        protected int salary;

        public Eployer() {

        }

        public Eployer(String name, int id, int salary) {
            this.name = name;
            this.id = id;
            this.salary = salary;
        }

        public abstract void work();
    }
---------------
    public static void main(String[] args) {
        Employee e = new Employee();
        Employee.Eployer comm = e.new Eployer(){
            @Override
            public void work() {
            }
        };
    }
```

通过 new 抽象类后面直接重写方法 完成匿名子类

> 简写成匿名子类的匿名对象

```java
methods(new Employee().new Eployer() {
  @Override
  public void work() {}
})
```
