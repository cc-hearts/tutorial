---
title: Result 处理可修复panic
---

```rust
Result<T,E>
```

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

## ？操作符

```rust
fn read_usename_from_file() -> Result<String, io::Error> {
    let mut f = File::open("hello.txt")?;
    // ?操作符 是错误处理的简单用法
    // 等同于以下操作
    // let mut f = match File::open("hello.txt") {
    //  Ok(file) => file,
    //  Err(e) => return Err(e),
    // }
    let mut s = String::from();
    f.read_to_string(&mut s)?;
    Ok(s);
}
```

### ? 与 form函数

`trait std::convert::Form` 上的`form`函数 用于对错误之间的转换

呗`?`所引用的错误 会隐式调用`form`函数进行处理

当`?`调用 from 函数时;

- 它所接收的错误类型会被转化为当前函数返回类型所定义的错误类型

用于：针对不同错误原因，近回同一种错设类型

- 只要每个错误类型实现了转换为所返回的错误类型的`form`函数

```rust
fn read_usename_from_file() -> Result<String,io::Error> {
  let mut s = String::new();
  // 链式调用
  File::open("hello.txt")?.read_to_string(&mut s)?;
  Ok(s)
}
```

