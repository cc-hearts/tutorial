---
title: 变量声明
---

> 允许从外部访问的名字 以大写开头

## 变量声明

1. 指定变量类型 `声明后若不赋值 使用默认值`

```go
var i int //0
 fmt.Println(i)
```

2. 根据值自行判定变量类型(类型推导)

```go
 // 类型推导:
 var t = 10 // 自动推导类型为int类型
 fmt.Println(t)
```

3. 省略 var 注意:=左侧的变量不应该是已经声明过的 否则会导致编译错误

```go
 // 省略var 使用:=声明赋值
 // 等价 var s number s=102
 s := 102
 fmt.Println(s)
```

## 多变量声明

```go
var n1,n2,n3 int //多变量声明

//第二种多变量声明的方法:
var n1,name,n3 = 200,"tom","n3"

//第三种方式 省略var 用:=代替

n1,name,n3 := 200, 'tom', 'ne'
```

## 声明全局变量

```go
import "fmt"
// 声明全局变量
var (
 n1 =200
 n3 =400
 n5 = 12301
)
func main(){
 fmt.Println("n1=",n1,"n3=",n3,"n5=",n5)
}
```

```go
var (
 n1 =200
 n3 =400
 n5 = 12301
)
// 这里等价于
// var n1 =200
// var n2 =400
// vae n5 =12301
```

> 变量有范围 不要超过变量的范围值且变量应该是在 `同一类型范围内可以不断变化`

> 变量在同一个给作用域(在一个函数或者在代码块)内不能重名
> 1byte = 8bit

## 整数类型的变量

整形变量使用时 遵守保小不保大的原则 即 在保证程序正确运行下 尽可能使用占用空间小的数据类型

int

> int 大小具体和操作系统有关，如果是在 32 位的操作系统则 int 大小和 int32 一致，如果是在 64 位操作系统则 int 大小和 int64 一致. 所以如果是在 64 位操作系统上 int 和 int64 的大小是一样的。
> 需要注意的是，即使 int32(int64)和 int 在特定体系结构上可能具有相同的大小，它们也不是同一类型。

int8

int16

int32

> rune 也是 int32 的别名 表示一个 Unicode 码点 有中文的话 用 rune 保存

int64

uint

uint8

> byte uint8 的别名 byte 和 uint8 一样 0-255

| 类型  | 有无符号 | 表数范围               | 占用存储空间 |
| ----- | -------- | ---------------------- | ------------ |
| int8  | 有       | -128~127（-2^7~2^7-1） | 1byte        |
| int16 | 有       | -2^15~2^15-1           | 2byte        |
| int32 | 有       | -2^31~2^31-1           | 3byte        |
| int64 | 有       | -2^63~2^63-1           | 4byte        |

## 浮点类型的变量

float32 4 个字节 IEEE-754 32 位浮点型数

float64 8 个字节 EEE-754 64 位浮点型数

complex64 32 位实数和虚数

complex128 64 位实数和虚数

浮点型的存储分为三个部分: 符号位 指数位 尾数位 在存储过程中 可能会造成 `精度丢失`

尾数部分可能会丢失 造成精度丢失

如果要保存精度高的数字 应该选用 float64

Golang 的默认浮点类型是 float64 类型

## 其他变量

uintptr 无符号整型，用于存放一个指针

## 字符型的变量

没有专门的字符型 使用 byte 来保存单个字母字符

Golang 中没有专门的字符类型 如果要存储单个字符 一般用 byte 保存(如果是汉字 会超出 byte 的范围 则可以用更大的字节变量来保存 如 int 否则会 overflow 溢出)

```go
package main

import "fmt"

func main() {
   var name int = 'a'
   fmt.Println(name) // utf-8 的码
}
```

## 字符串的变量

字符串就是一串固定长度的字符连接起来的字符序列 go 的字符串是由单个字节连接起来的

对于传统的字符串 是由字符组成的 `而Go的字符串不同 它是由字节组成的`

```go

package main

import "fmt"

func main() {
   var ss = "this is name"
   fmt.Printf("%s\n", ss)
}
```

## 引用类型

## 数组

```go
package main

import "fmt"

func main() {
   // 切片
   s := make([]string, 3)
   s[0] = "a"
   s[1] = "b"
   s[2] = "c"
   fmt.Println(s[2])
   fmt.Println(len(s)) // 3

   // append 的时候 如果原本的数组容量不够 则会扩容 返回一个新的数组
   s = append(s, "d")
   s = append(s, "e", "f")
   fmt.Println(s) // [a b c d e f]

   c := make([]string, len(s))
   copy(c, s)     // 拷贝s的数据到c中
   fmt.Println(c) // [a b c d e f]

   fmt.Println(s[2:5]) // [c d e]
   fmt.Println(s[:5])  // [a b c d e]
   fmt.Println(s[2:])  // [c d e f]
}
```

## map

> map 遍历的时候 完全无序

```go
package main

import "fmt"

func main() {
   s := make(map[string]int)

   s["one"] = 1
   s["two"] = 2
   fmt.Println(s)

   // int b b 表带当前是否有key存储的值
   key, b := s["unknown"]
   fmt.Println(key) // 0
   fmt.Println(b)   // false

   delete(s, "one")

   fmt.Println(s)

   s1 := map[string]int{"one": 1, "two": 2}
   fmt.Println(s1)

   var s2 = map[string]int{"one": 1, "two": 2}
   fmt.Println(s2)

}
```

## 创建对象的几种方式

```go
type Car struct {
 color string
 size string
}

// ------------- 结果为值类型
 c := Car{}

// ------------- 结果为指针类型
 c1 := new(Car)

// ------------- 结果为指针类型
 c2 := &Car{}
```
