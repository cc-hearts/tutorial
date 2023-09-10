---
title: closure 闭包
---

## 函数声明

```rust
let closure = |num: i32| -> i32 {
  num
}
```

## example: 实现 cahcer

```rust
use std::collections::HashMap;

// 实现一个 Cacher 函数

// 匿名函数会实现以下三个trait 之一
// - Fn
// - FnMut
// - FnOnce

struct Cacher<T>
where T: Fn(u32) -> u32 {
    pub func: T,
    pub map: HashMap<u32, u32>
}

impl<T> Cacher<T>
where T: Fn(u32) -> u32 {
    pub fn new(func:T) -> Cacher<T> {
        Cacher {
            func,
            map: HashMap::new()
        }
    }

    pub fn value(&mut self,val:u32) -> u32 {
        match &self.map.get(&val) {
            Some(e) => {
                **e
            },
            None => {
                let result = (&self.func)(val);
                let _ = &self.map.insert(val, result);
                result
            }
        }
    }
}


#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn callback_cacher() {
        let closure = |x| {
            x + 1
        };
        let mut cacher = Cacher::new(closure);
        assert_eq!(cacher.value(1), 2);
        assert_eq!(cacher.value(2), 3)
    }
}
```

闭包从所在环境捕获值的方式
与函数获得参数的三种方式一样：

1. 取得所有权：FnOnce

2. 可变借用：FnMut

3. 不可变借用：Fn
   创建闭包时，通过闭包对环境值的使用，Rust 推断出具体使用哪个 trait：

- 所有的闭包都实现了 FnOnce

- 没有移动捕获变量的实现了 FnMut
- 无需可变访问捕获变量的闭包实现了 Fn

因此严格关系为： FnOnce >>> FnMut >>> Fn

## move 关键字

在参数列表前使用 move 关键字，可以强制闭包取得它所使用的环境值的所有权

- 当将闭包传递给新线程以移动数据使其归新线程所有时，此技术最为有用。

```rust

fn main() {
    let z = String::from("data");
    let closure =  move || {
        z
    };
    println!("{}", z); // 此时的z 的所有权转交 这里会报错
}

```
