---
title: 智能指针
---

智能指针的实现

- 智能指针通常使用 struct 实现，并且实现了：
  Deref 和 Drop 这两个 trait
  Deref frait：允许智能指针 struct 的实例像引用一样使用
  Drop frait：允许你自定义当智能指针实例走出作用域时的代码

`Box<T>`：在 heap 内存上分配值
`Rc<T>`：启用多重所有权的引用计数类型
`Ref<T>` 和 `RefMut<T>`，通过 `RefCell<T>`访问：在运行时而不是编译时强制借用规则的
类型
•此外：
内部可变模式（interior mutability pattern）：不可变类型暴露出可修改其内部值的
API
引用循环（reference cycles）：它们如何泄露内存，以及如何防止其发生。

## `Box<T>` 常用的场景

- 在编译时，某类型的大小无法确定。但使用该类型时，上下文却需要知道它的确切
  大小。
- 当你有大量数据，想移交所有权，但需要确保在操作时数据不会被复制。
- 使用某个值时，你只关心它是否实现了特定的 trait，而不关心它的具体类型。

`Box<T>` 是最简单的智能指针：
允许你在 heap 上存储数据（而不是 stack:
stack 上是指向 heap 数据的指针

- 没有性能开销
  一 没有其它额外功能
  实现了 Deref frait 和 Drop trait

Deref frait: 允许将 Box 引用的值当作引用来处理

Drop trait: 离开作用域或 heap 和 stack 上的值都会被处理。

Box 的简易实现

```rust
// 一个 struct 元祖
struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(target:T ) -> MyBox<T> {
        MyBox(target)
    }
}

impl<T> Deref for MyBox<T> {
    type Target = T;
    fn deref(&self) -> &T {
        &self.0
    }
}
fn main() {
    // Box的实现
    // Box<T> 是一个元祖
    // Deref trait
    // 实现 Deref trait
    // - 可以自定义解引用运算符(*)的行为;
    // 智能指针可以像常规引用一样来处理;
    let foo = 'x';
    let bar = 'x';
    let target = MyBox::new(foo);
    //  对 MyBox 使用 * 运算符 相当于
    // *(target.deref())
    assert_eq!(bar, *target);
}
```

`Vec<Box<dyn Draw>>` 表示 Box 中的元素都实现了 `Draw` 的 trait

> 如果使用范型。则 Vec 中就只能有一种确定的数据类型了。

## 解引用转换

隐式解引用转化（Deref Coercion） 是为函数和方法提供的一种便捷特性
假设 T 实现了 Deref trait：
Deref Coercion 可以把 T 的引用转化为 T 经过 Deref 操作后生成的引用

````rust
fn coercion_test(m: &str) {
    println!("coercion is {}", m);
}
fn main() {
    let data = MyBox::new(String::from("test"));
    // 这里编译器进行解引用
    // 先对MyBox 进行了解引用: deref &String
    // 之后对 String 进行解引用： deref &str
    // deref 操作在编译时已经完成 在运行时不会影响性能
    // 也可以使用以下方法对函数进行调用
    ///
    /// ```
    /// coercion_test(&(*data)[..])
    /// ```
    coercion_test(&data);
}
````

## DerefMut trait

•可使用 DerefMut trait 重载可变引用的\*运算符
•在类型和 trait 在下列三种情况发生时，Rus† 会执行 deref coercion:

- 当 T：Deref<Target=U>，允许 ＆T 转换为&U
- 当 T： DerefMut<Target=U>，允许 &mutT 转换为 &mut U
- 当 T：Deref<Target=U>，允许 &mutT 转换为&U

## Drop trait

```rust

struct CustomSmartPointer {
    data: String
}

impl CustomSmartPointer {
    pub fn new(data: String) -> CustomSmartPointer {
        CustomSmartPointer { data }
    }
}
impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("drop customSmartPointer data is {}", &self.data)
    }
}

fn main() {
    let result = CustomSmartPointer::new(String::from("data"));
    /// 会在终端输出
    /// create a customerSmartPointer
    /// drop customSmartPointer data is data
    println!("create a customerSmartPointer");
}
```

使用`drop` 方法提前进行垃圾回收

```rust
fn main() {
    let result = CustomSmartPointer::new(String::from("data"));
    // 可以调用drop(c) 直接进行垃圾回收
    drop(result);
    let result = CustomSmartPointer::new(String::from("data1"));
    println!("create a customerSmartPointer");
}
// 终端会输出
// drop customSmartPointer data is data
// create a customerSmartPointer
// drop customSmartPointer data is data1

```

## `Rc<T>`

`Rc<T>` 在预导入模块

`Rc<T>`通过不可变引用，使你可以在程序不同部分之间共享只读数据。

有时，一个值会有多个所有者
例如：为了支持多重所有权：`Rc<T>`（reference counting（引用计数））
追踪所有到值的引用:

> 0 个引用：该值可以被清理掉
>
> `Rc<T>` 智能运用于单线程环境中

```rust
Rc::clone(&variable) // 增加引用计数
Rc::strong_count(&variable) // 获取强引用计数
Rc:: weak_count(&variable) // 获取弱引用计数
```

使用 `Box<T>` 无法支持多重所有权：

```rust
use crate::List::{ Cons, Nil };

enum List {
    Cons(i32, Box<List>),
    Nil,
}
fn main() {
    let a = Box::new(Cons(10, Box::new(Cons(20,Box::new(Nil)))));
    let b = Cons(20, a);
    // 此时的a 的所有权已经被b构造的时候所借用 因此在构造c的时候会出现所有权不能借用的报错
    let c = Cons(30, a); // value used here after move
}
```

解决方法有两个：

1. 将 a 进行 clone

```rust
#[derive(Clone)]
enum List {
    Cons(i32, Box<List>),
    Nil,
}
fn main() {
    let a = Box::new(Cons(10, Box::new(Cons(20,Box::new(Nil)))));
    let b = Cons(20, a.clone());
    // 此时的a 的所有权已经被b构造的时候所借用 因此在构造c的时候会出现所有权不能借用的报错
    let c = Cons(30, a.clone()); // value used here after move
}
```

2. 使用 `Rc<T>` 的智能指针：

```rust
enum List {
    Cons(i32, Rc<List>),
    Nil,
}
fn main() {
    let a = Rc::new(Cons(10, Rc::new(Cons(20,Rc::new(Nil)))));
    // 不获取a的所有权(不会深拷贝 clone 会深拷贝) 只会引用a 并且将a的引用计数 + 1
    // 只有a的引用计数为0 才会被清理
    let b = Cons(20, Rc::clone(&a));
    let c = Cons(30, Rc::clone(&a));
}
```

```rust
fn main() {
    let a = Rc::new(Cons(10, Rc::new(Cons(20,Rc::new(Nil)))));
    // 不获取a的所有权(不会深拷贝 clone 会深拷贝) 只会引用a 并且将a的引用计数 + 1
    println!("a reference count is {}", Rc::strong_count(&a));
    // 只有a的引用计数为0 才会被清理
    {
        let b = Cons(20, Rc::clone(&a));
        // 引用计数退出作用域后会自动 - 1
        println!("a reference count is {}", Rc::strong_count(&a));
    }
    let c = Cons(30, Rc::clone(&a));
    println!("a reference count is {}", Rc::strong_count(&a));
}
```

## `RefCell<T>`

使用 `RefCell<T>` 在运行时记录借用信息
`RefCell<T>`会记录当前存在多少个活跃的 `Ref<T>`和 `RefMut<T>` 智能指针： -每次调用 borrow：不可变借用计数加 1
任何一个 `Ref<T>` 的值离开作用域被释放时：不可变借用计数减 1
每次调用 borrow_mut：可变借用计数加 1
任何一个 `RefMut<T>`的值离开作用域被释放时：可变借用计数减 1
以此技术来维护借用检查规则： -任何一个给定时间里，只允许拥有多个不可变借用或一个可变借用。

|                  | `Box<T>`                       | `RC<T>`                  | `RefCell<T>`                   |
| ---------------- | ------------------------------ | ------------------------ | ------------------------------ |
| 同一数据的所有者 | 一个                           | 多个                     | 一个                           |
| 可变性、借用检查 | 可变、不可变借用（编译时检查） | 不可变借用（编译时检查） | 可变、不可变借用（运行时检查） |

使用 `RefCell<T>` 在运行时记录借用信息
两个方法（安全接口）：
borrow 方法
•返回智能指针 `Ref<T>`，它实现了 Deref
borrow\_ mut 方法
返回智能指针 `RefMut<T>`，它实现了 Deref

> 其它可实现内部可变性的类型
> `Cell<T>`：通过复制来访问数据
> `Mutex<T>`：用于实现跨线程情形下的内部可变性模式

## 循环引用问题

防止循环引用
把 `Rc<T>`换成 `Weak<T>`
Rc::clone 为 `Rc<T>`实例的 strong_count 加 1，`Rc<T>`的实例只有在
strong_count 为 0 的时候才会被清理
`Rc<T>`实例通过调用 Rc::downgrade 方法可以创建值的 Weak Reference
引用） -返回类型是 `Weak<T>`（智能指针）

- 调用 Rc::downgrade 会为 weak_count 加 1。
  `Rc<T>`使用 weak_count 来追踪存在多少 `Weak<T>`。
  weak count 不为 0 并不影响 `Rc<T>`实例的清理

Strong vs Weak
Strong Reference（强引用）是关于如何分享 `Rc<T>`实例的所有权
Weak Reference（弱引用）并不表达上述意思
使用 Weak Reference 并不会创建循环引用：

- 当 Strong Reference 数量为 0 的时候，Weak Reference 会自动断开
  在使用 `Weak<T>`前，需保证它指向的值仍然存在：
  一在 `Weak<T>` 实例上调用 upgrade 方法，返回 Option<`Rc<T>`>

```rust
use core::cell::RefCell;
use std::rc::{Rc, Weak};

#[derive(Debug)]
struct Node {
    value: i32,
    parent_node: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

fn main() {
    // 创建叶子节点
    let leaf = Rc::new(Node {
        value: 10,
        // RefCell 规避编译器的可变和不可变引用的关系
        parent_node: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });
    // 创建分支
    let branch = Rc::new(Node {
        value: 20,
        parent_node: RefCell::new(Weak::new()),
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });

    // 获取一个可变的引用修改他的值
    *leaf.parent_node.borrow_mut() = Rc::downgrade(&branch);
    println!("the leaf is {:?}", leaf);
    println!("the branch is {:?}", branch);
    println!(
        "this leaf parent is {:?}",
        leaf.parent_node.borrow().upgrade()
    )
}

```
