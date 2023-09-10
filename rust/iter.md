---
title: 迭代器 iter
---

## 什么是迭代器

迭代器模式：对一系列项执行某些任务
迭代器负责：

- 遍历每个项
- 确定序列（遍历）何时完成
  Rus+ 的迭代器：
  懒惰的：除非调用消费迭代器的方法，否则迭代器本身没有任何效果。
  （例子）

```rust
fn main() {
    let ve = vec![1,2,3];
    // for循环会取得 ve的所有权 并且内部是可变的
    for val in ve {
        println!("{}", val)
    }

    // 上述的情况相当于使用迭代器下面的情况：
    let ve1 = vec![1,2,3];
    let mut iter = ve1.iter();
    assert_eq!(iter.next(), Some(&1));
    assert_eq!(iter.next(), Some(&2));
    assert_eq!(iter.next(), Some(&3));
}
```

## 几个迭代方法

iter 方法：在不可变引用上创建迭代器（只是不可变的引用上 不是变量）
into_iter 方法：创建的迭代器会获得所有权
iter mut 方法：迭代可变的引用

## 消耗迭代器

- 在标准库中，Iterator trait 有一些带默认实现的方法
- 其中有一些方法会调用 next 方法
  - 实现 Iterator trait 时必须实现 next 方法的原因之一

调用 next 的方法叫做“消耗型适配器”

- 因为调用它们会把迭代器消耗尽

## 产生其它迭代器的方法

定义在 Iterator trait 上的另外一些方法叫做“迭代器适配器”

- 把迭代器转换为不同种类的迭代器
- 可以通过链式调用使用多个迭代器适配器来执行复杂的操作，这种调用可读性较高。

```rust
// 使用map 产生新的迭代器
fn main() {
    let ve1 = vec![1,2,3];
    // collect 方法 也是消耗型适配器，可以把迭代器收集到一个集合类型中
    let result: Vec<_> = ve1.iter().map(|x| x + 2).collect();
    let mut iter = ve1.iter().map(|x| x +1);

    for val in iter {
        println!("{}", val)
    }

    for val in result {
        println!("{}", val)
    }
}
```

## 自定义迭代器

需要实现 Iterator trait

```rust
pub struct Counter {
    count: i32,
}

impl Iterator for Counter {
    type Item = i32;

    fn next(&mut self)  -> Option<Self::Item> {
        if self.count < 5 {
            let result = self.count;
            self.count += 1;
            Some(result)
        } else {
            None
        }
    }
}

impl Counter {
   pub fn new () -> Counter {
        Counter { count : 0 }
    }
}
```
