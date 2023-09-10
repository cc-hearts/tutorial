---
title: unsafe
---

Unsafe 超能力
使用 unsafe 关键字来切换到 unsafe Rust，开启一个块，里面放着 unsafe 代码
Unsafe Rust 里可执行的四个动作 (unsafe 超能力）：
解引用原始指针
调用 unsafe 函数或方法
访问或修改可变的静态变量 -实现 unsafe trait
注意：
unsafe 并没有关闭借用检查或停用其它安全检查
任何内存安全相关的错误必须留在 unsafe 块里
尽可能隔离 unsafe 代码，最好将其封装在安全的抽象里，提供安全的 API

解引用原始指针
原始指针 -可变的：*mut T
—不可变的：*const T。意味着指针在解引用后不能直接对其进行赋值

- 注意：这里的\*不是解引用符号，它是类型名的一部分。
  与引用不同，原始指针：
  允许通过同时具有不可变和可变指针或多个指向同一位置的可变指针来忽略借用规则
  无法保证能指向合理的内存 -允许为 null
  一不实现任何自动清理
  放弃保证的安全，换取更好的性能/与其它语言或硬件接口的能力

```rust
fn main() {
  let mut num =5;
  let r1 = &num as *const i32; // 声明原始指针
 	let r2 = &num as *mut i32;
}
```

调用 unsafe 函数或方法
•unsafe 函数或方法：在定义前加上了 unsafe 关键字
调用前需手动满足一些条件（主要靠看文档），因为 Rut 无法对这些条件进行验证

如果需要调用 unsafe 方法或者函数 需要在 unsafe 块或者 unsafe 函数中中调用

## extern

使用 extern 函数调用外部代码
extern 关键字：简化创建和使用外部函数接口（FFI）的过程。
外部函数接口(FFl ，Foreign Function Interface）：它允许一种编程语言定义
函数，并让其它编程语言能调用这些函数

从其它语言调用 Rust 函数
可以使用 extern 创建接口，其它语言通过它们可以调用 Rust 的函数
。在 fn 前添加 extern 关键字，并指定 ABI
还需添加 ＃Ino_manglel 注解：避免 Rust 在编译时改变它的名称

静态变量
静态变量与常量类似
命名：SCREAMING_SNAKE_CASE
必须标注类型
片
静态变量只能存储 ‘static 生命周期的引用，无需显式标注
访问不可变静态变量是安全的

使用 supertrait 来要求 trait 附带其它 trait 的功能
需要在一个 trait 中使用其它 trait 的功能：
一需要被依赖的 trait 也被实现
那个被间接依赖的 trait 就是当前 trait 的 supertrait

```rust
trait OutlinePrint : fmt::Dispaly {
  // ...
  // : 后面就是依赖的 trait
}
```

使用 newtype 模式在外部类型上实现外部 trait
孤儿规则：只有当 trait 或类型定义在本地包时，才能为该类型实现这个 trait
可以通过 newtype 模式来绕过这一规则
利用 tuple struct（元组结构体）创建一个新的类型

```rust
struct wrapper(Vec<String>)；
impl fmt::Display for Wrapper {
fn fmt(&self, f:&mut fmt:: Formatter) -> fmt :: Result {
		write!(f，"[{}]"， self.0.join("，"))
  	}
 }
```
