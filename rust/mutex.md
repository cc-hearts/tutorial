---
title: Mutex Api
---

```rust
use std::sync::Mutex;

fn main() {
    //使用 Mutex 来每次只允许一个线程来访问数据
    // Mutex 是 mutual exclusion（互斥锁）的简写
    // •在同一时刻，Mutex 只允许一个线程来访问某些数据
    // •想要访问数据：
    // 线程必须首先获取互斥锁 (lock)
    // • lock 数据结构是 mutex 的一部分，它能跟踪谁对数据拥有独占访问权
    // mutex 通常被描述为：通过锁定系统来保护它所持有的数据
    // Mutex 的两条规则
    // • 在使用数据之前，必须尝试获取锁 (lock)
    // 使用完 mutex 所保护的数据，必须对数据进行解锁，以便其它线程可以获取锁。

    // create a  mutex gurad
    let m = Mutex::new(5);

    {
        // LockResult 实现了 drop 的 trait
        // 离开作用域后自动会释放锁
        let mut num = m.lock().unwrap();
        *num = 6
    }

    println!("result is {:?}", m);
}

```

## 多线程的多重所有权

使用 `Arc`的智能指针对 `Mutex`进行一层封装

> Arc 与 Rc 相似， 但是 `Arc` 多用于并发的场景
