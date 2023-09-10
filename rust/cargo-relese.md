---
title: cargo
---

## 配置 cargo profile

> 每个 profile 的配置都独立于其它的 profile

Cargo 主要的两个 profile：

- dey profile：适用于开发，cargo build
- release profile：适用于发布，cargo build -release

cargo profile 都有一定预设值 可以在 `Cargo.toml` 中去修改。

```rust
[package]
name = "release-profile"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html
[profile.dev]
opt-level = 0 # 决定 rust 对代码进行的优化程度

[profile.release]
opt-level = 3
[dependencies]

```

## 文档注释

使用 `///` 可以给函数等添加注释 可以生成 example

````rust
/// add nums
/// # Examples
///
/// ```
/// let a = 1;
/// let b = 2;
/// let result = add(a,b);
/// assert_eq!(result, 3);
/// ```
pub fn add (a: i32, b: i32) -> i32 {
    a + b
}
````

## 文档注释

使用`//！`，为包含注释的项添加文档注释，这类注释通常用描述 crate 和模块，crate root（按惯例 src/lib.rs)，在一个模块内，将 crate 或模块作为一个整体进行记录

## 版本发布

需要先去 cargo 官方获取 token 并且验证邮箱 才能发布。

```rust
cargo publish # 发布版本
```

使用 cargo yank 从 Crates.io 撤回版本

- 不可以删除 crate 之前的版本，但可以防止其它项目把它作为新的依赖：yank（撤回）一个 crate 版本

防止新项目依赖于该版本
已经存在项目可继续将其作为依赖（并可下载）
yank 意味着：
所有己经产生 Cargo.lock 的项目都不会中断
任何将来生成的 Cargo.lock 文件都不会使用被 yank 的版本。
命令：

- yank 一个版本（不会删除任何代码）：cargo yank -vers 1.0.1
- 取消 yank: cargo yank --vers 1.0.1 -undo

## cargo workspace

```shell
cargo run -p <package_name> # 运行指定工作空间的代码
```

## 从 CRATES.!O 安装二进制 crate

```shell
cargo install
```

来源：https://crates.io
限制：只能安装具有二进制目标 (binary target)的 crate

- 二进制目标 binary target：是一个可运行程序
  由拥有 src/main.rs 或其它被指定为二进制文件的 crate 生成，通常：README 里有关于 crate 的描述：

- 拥有 library target
- 拥有 binary target

## 使用自定义命令扩展 cargo

- cargo 被设计成可以使用子命令来扩展
  例：如果 $PATH 中的某个二进制是 cargo-something，你可以像子命令一样运行：

```shell
cargo something # 类似这样的自定义命令可以通过该命令列出：cargo -list
```
