---
title: 异常（Error 或Exception）
categories: Java
---

Error Java 虚拟机无法解决的严重问题 例如 StackOverflowError（栈溢出）和 OOM（内存溢出） 一般不编写针对性代码进行处理
Exception 其他因编译错误或者偶然的外在因素导致的一般性问题 可以使用针对性的代理进行处理&#x20;
例如:

1. 空指针访问

2. 试图读取不存在的文件

3. 网络连接终端

4. 数组角标越界 ArrayOutOfBoundsExceptions

5. 字符串角标越界 StringOutOfBoundsExceptions

6. InputMismatchException 输入不匹配

编译错误 字节码文件不会生成
运行错误 会生成字节码文件 运行会报错

# 处理异常错误的方式

1. **try-catch-finally**
2. **throws + 异常类型**

**程序在正常执行的过程中 如果出现了异常 就会在异常代理处生成一个对应的异常类的对象 并将此对象抛出 一旦抛出其对象后 其他的代码将不会在执行**

```java
    public void test() {
        String str = "123";
        str = "abc";
        try {
            int num = Integer.parseInt(str);
        } catch (NumberFormatException e) {
            // NumberFormatException
            System.out.println("NumberFormatException");
        } catch (Exception e) {
            System.out.println(e);
        }
        System.out.println("finish");
        // result:
        // NumberFormatException
        // finish
    }
```

    **一个try可以写多个catch进行匹配 一旦try中的异常对象匹配到某一个catch时 就会进入catch中进行异常处理 一旦处理完成 则会跳出当前的catch循环 执行后面的代码(有finally 就会走finally)**

**catch 需要注意的事项：**
**子类必须要在父类的上面 否则报错**

**处理异常的两个操作：**

1. **getMessage()**
2. **pritStackTrace()**

> **注意 try 里面的块级作用域**

try - catch -finally 孩子会处理编译时异常 不会处理运行时异常（只是将编译时异常 延迟到运行时异常）

finally 的作用：finally 的代码是一定会被执行的代码 即使 catch 中又出现了异常 或者是 try 中有了 return 语句 catch 中有 return 语句的情况 finally 都会执行

```java
    @Test
    public void finallyTest() {
        try {
            // [0-1]
            int num = (int) (Math.random() * 2);
            System.out.println(num);
            int[] arr = new int[]{1};
        } catch (ArrayIndexOutOfBoundsException e) {
            e.printStackTrace();
        } finally {
            System.out.println("最终都会被执行");
        }
    }
```

# finally 的使用案例

数据库的连接 输入输出流 网络编程 Socket 等资源 JVM 是不能自动回收的 我们需要自己手动的进行资源释放 此时的资源释放 就需要声明在 finally 中
try-catch-finally 中可以嵌套使用
**运行时异常一般不用 try-catch**

## 异常处理的方式二： throws + 异常类型

```java
    public void method() throws IOException {
        File file = new File("new.txt");
        FileInputStream fis = new FileInputStream(file);
        int data = fis.read();
        while (data != -1) {
            System.out.println("char");
            data = fis.read();
        }
        fis.close();
    }
```

谁调用了这个方法 则需要去处理这个异常（try catch finally 才是真的解决问题）

**try-catch-finally 真正的将异常给处理掉**
**throws 的方式 只是将异常抛给了方法的调用者 没有处理掉异常**

# 使用 throws

如果有父类抛出异常 子类也要抛出异常（异常要比父类的小）

如果一个方法里面会递进关系调用另外几个方法的 可以使得另外几个方法 throw 的方式进行处理(如果前面的代码出错了 后面的代码则可以不用进行处理) 而这个方法可以使用 try-catch-finally 进行处理

# 手动抛出异常

throw
只能 new 这两个对象

```java
       throw  new Exception();
// 运行时异常抛出可以不处理
       throw  new RuntimeException();
```

# 自定义异常类

自定义异常类去继承现有的异常结构 Exception
提供一个全局常量： serialVersionUID
提供重载的构造器

```java
public class TeamException extends Exception {
    public static long serialVersionUID = 1231231233;

    public TeamException(String msg) {
        super(msg);
    }
}

```
