---
Example: rust example
---

## variable

```rust
#[allow(unused_variables)]
fn main() {
    let (a, mut b): (bool, bool) = (true, false);

    println!("a = {:?}, b = {:?}", a, b);

    b = true;

    println!("{}", b);

    // let 声明的变量可以重新赋值
    // let a = true
    // let b = false // 需要使用let 去声明 内存地址改变了
    // mut 可以修改同一个内存地址上的值 不会造成内存分配 因此 mut 的性能要更好
    // const 不能重新赋值 并且至始至终都是一种值
    let data = define_x();
    println!("{}", data);
    define_y();

    // cargo check 检查代码的准确性
    // cargo build
    // cargo build --release 生产版本构建
    // cargo run
    // cargo update 更新版本
}

fn define_x() -> String {
    let x = "hello".to_string();
    return x;
}

fn define_y() -> & 'static str {
    let y = "hello";
    println!("{}",type_of(&y));
    return y
}

fn type_of<T>(_: &T) -> String {
    format!("{}", std::any::type_name::<T>())
}

```

```rust
fn change() -> i32 {
    let a = 1;
    let b = 1;
    // 指明了返回值后 最后一层的函数将会作为值返回
    a + b
}
fn main() {
    change();
    println!("Hello, world!");
}

```

## guess games

```rust
// 应用库中的函数 如果不使用use std::io 则下面需要改写成
// std::io::stdin().read_line(&mut guess).expect("无法读取行");
use std::io;
use rand::Rng;
use std::cmp::Ordering;
// 猜数字游戏
fn main() {
    let secret_number = rand::thread_rng().gen_range(1,101);
    loop {
        // String::new 代表的是String 的一个关联函数 类似与 java的静态方法
        let mut guess =String::new();
        // &guess 引用默认也是不可变的
        // 这里使用guess 保证了引用的是 guess的内存地址 到时候修改的时候 则直接修改 guess 的内存中的值
        io::stdin().read_line(&mut guess).expect("无法读取行");

        // 这里程序会崩溃 使用match优化
        // let guess: u32 = guess.trim().parse().expect("解析guess 失败");
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("number is small"),
            Ordering::Greater => println!("number is big"),
            Ordering::Equal => {
                println!("number is {}", guess);
                break;
            },

        }
    }
}
```
