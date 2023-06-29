---
title: shell
---

## ; 顺序执行

` ;` 号可以结束一行的命令 但是需要注意的是，命令的顺序执行，不会因为出错而终止。也就是说，即使上一条命令执行失败了（退出码非 0），后面的命令也会按序执行。

```shell
command1; command2; command3
```

## | 流水线

流水线是种 I/O 重定向功能，可以把上一个命令的输出作为下一个命令的输入。

```shell
history | grep "echo"
```

## & 后台执行

在命令后添加运算符 & 表示启动一个子 shell 进程在后台异步执行这个命令，结果输出到当前 shell。

```shell
echo 1 & echo 2 & echo 3 # echo 1 和 echo2 在后台执行 echo3 在前台执行 echo 1 和 echo 2 的结果会返回到控制台上
```

## 快捷键

```text
Ctrl + A/E: 移动到行首/尾。
Ctrl + U/K: 清除光标位置到行首/尾的字符。
Ctrl + C: 中止正在执行的命令。
Ctrl + L: 清空 shell 打印内容。同命令 clear。
Ctrl + D: 关闭 shell 会话。
```

- [bash editing](https://www.gnu.org/software/bash/manual/html_node/Command-Line-Editing.html)

## 历史记录

`bash` 中 的 `~/.bash_history` 会记录用户执行过的历史记录

- `!!` 指上一条命令
- `!-n` 指带前第 n 条命令 比如`!-1` 表示`!!`
- `!n` 指代 `history` 中的第 n 行命令
  除了命令，还能指代上一条命令的参数：
  `!$` : 上一个命令的最后一个参数。
  `!*` 上一个命令的所有参数。

## 命令别名

通过 `alias` 可以简化一些常用的命令操作

```shell
#! /bin/sh
alias e="echo"

e 1
```

`alias` 别名只会在当前的会话中有效。重启终端等操作，别名就会不再了。如果需要持久化一个别名 可以定义到 `~/.bashrc` 中

## 变量

> $（变量展开）, `（命令替换） 和 \（转义）

```shell
val=value

files=`val` # 命令替换
```

### 使用变量

```shell
#! /bin/sh

# 普通变量声明
val="detail"

# 使用命令替换语法能把命令的输出赋给变量：
files=`ls`

echo $files

echo $val

echo "${val}__end"
```

### 变量的作用域

- 环境变量：一般使用 `decalre -x` 或者 `export` 导出的变量
- 全局变量： 只能当前的 shell 进程中使用
- 局部变量： 只能在函数内部使用 使用 `local` 声明

### declare 命令

量除了保存值以外，还可能绑定某些属性，比如 只读、只能存储数值、作用域。
declare 命令可以赋予变量一些特殊的属性。

```shell
declare -r CONST_INT=2 # 设置只读变量，同 readonly 命令声明的变量
declare -i a_int=3 # 数字类型变量
declare -x ENV_VAR=value # 设置为环境变量
```

也可以作用于已有的变量

```shell
var=val

decalre -r var
```

## set 与 unset

`unset` 命令可以删除变量。

> set 命令在不接参数会输出所有的变量

## 案例

读取文件名 创建 `md` 文件：

```shell
#! /bin/bash

read -p "enter file name:" fileName

touch $fileName\.md

echo "---
title: ${fileName}
categories: Mysql
---" >> $fileName\.md

```

## 参考资料

-[shell 基础](https://juejin.cn/post/7130982053528469511#heading-26)
