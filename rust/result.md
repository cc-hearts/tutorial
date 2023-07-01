---
title: Result 处理可修复panic
---

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    result_use_base();
    unwrap();
    println!("Hello, world!");
}

fn result_use_base() {
    let data = File::open("hello1.txt");
    match data {
        Ok(file) => println!("Success {:?}", file),
        Err(error) => match error.kind() {
	          // 错误类型
            ErrorKind::NotFound => match File::create("hello1.txt") {
                 Ok(file) => println!("Success {:?}", file),
                Err(e) => println!("Error {:?}", e),
            },
            _ => (),
         },
    }
}

fn unwrap() {
    // unwrap Result的match表达式的一种快捷写法
    // 如果是Ok 则返回OK中的变量值
    // 如果是Error 则会调用panic! 宏 unwrap 无法自定义panic! 宏中的提示
    let data = File::open("data.txt");
    // let result = data.unwrap();
    // println!("{:?}", result);
    // 使用expect 可以在unwrap 的基础上可以在panict提示的错误信息
    let result = data.expect("错误信息");
    println!("{:?}",result)
}

```
