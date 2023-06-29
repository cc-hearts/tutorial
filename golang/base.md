---
title: Golang 学习
---

- [基本语法介绍](./record.md)

## 文档

> [https://studygolang.com/pkgdoc](https://studygolang.com/pkgdoc) API 中文文档

> [http://docscn.studygolang.com/](http://docscn.studygolang.com/) 官方

## 基础指令

`go run main.go` 运行 golang 的代码

`go build` 命令来生成二进制文件

> 当标识符（包括常量、变量、类型、函数名、结构字段等等）以一个大写字母开头，如：Group1，那么使用这种形式的标识符的对象就可以被外部包的代码所使用（客户端程序需要先导入这个包），这被称为导出（像面向对象语言中的 public）；标识符如果以小写字母开头，则对包外是不可见的，但是他们在整个包的内部是可见并且可用的（像面向对象语言中的 protected ）

## 环境变量

环境变量 `GOROOT` 表示 Go 语言的安装目录
环境变量 `GOPATH` 用于指定我们的开发工作区(workspace), 是存放源代码、测试文件、库静态文件、可执行文件的工作。
环境变量 `GOBIN` 表示我们开发程序编译后二进制命令的安装目录

```go
export GOBIN=$GOPATH/bin
```

## 安装报错提示

```go
go.mod file not found in current directory or any parent directory; see 'go help modules'

 // go的环境设置问题，执行
go env -w GO111MODULE=auto

```

## 执行流程的分析

```text

如果使用go build对源码进行编译

执行过程如下

​     (go build)

.go文件 ============> 可执行文件（window下.exe可执行文件）==============>结果

​     (编译)                        (运行)

如果是对源码直接go run 源码  Go的执行流程:

.go文件 ==============================> 结果

​       编译运行都在这一步

​       (底层处理 还是会编译成可

​       执行文件在进行执行)

```

## 对于两种流程的分析

1. 如果先 go build 编译成了可执行文件 我们可以将该可执行文件拷贝到没有 GO 环境的机器上 他任然可以运行
2. 如果我们直接 go run go 的源码 那么如果要在另外一个机器上运行 也需要 go 的开发环境 否则无法执行
3. go build 的时候 编译器会将程序运行的依赖的库文件包含在可执行文件中 所以 go build 后可执行文件会比源码要大

## 编译自定义生成 exe 文件名

```go
go build -o myMain.exe main.go
```

> go 语言是一行一行编译的 多条语句在一行会报错
> `go 语言定义的变量或者 import的包如果没有使用到 代码不能编译通过`

## 格式化

```go
gofmt -w main.go //会格式化.go文件
```

## 查看一个变量的数据类型和字节数

- %T 查看数据类型
- %d 数字类型
- %c 字符类型
- %s 字符串类型
- %p 指针类型
- %v 打印任意类型
- %+v 打印类型的 key 和 value
- %#v 打印类型以及构造的方式

```go

package main

import(
  "fmt"
  "unsafe"
)

func main()  {

var n2 int64 = 10
 fmt.Printf("n2的数据类型 %T n2占用的字节数是%d",n2,unsafe.Sizeof(n2))
}

```

## range 遍历

```go
package main

import "fmt"

func main() {
   nums := []int{2, 3, 4}

   sum := 0
   for index, item := range nums {
      fmt.Println(index)
      fmt.Println(item)
      sum += item
   }

   fmt.Println(sum)

   m := map[string]string{"a": "aaa", "b": "bbb"}

   for key, value := range m {
      fmt.Println(key)
      fmt.Println(value)
   }
}
```

## 函数

```GO
func add(a int, b int) int {
   return a + b
}

func add1(a, b int) int {
   return a + b
}

func exists(m map[string]string, k string) (string, bool) {
   v, ok := m[k]
   return v, ok
}
```

## 指针

golang 中一切都是值传递

```go
func changeIntegerValue(i *int) {
   *i += 2
}

func changeMapperValue(m *map[string]int) {
   value := (*m)["string"]
   fmt.Println(value)
}

func main() {
   // 指针
   n := 5
   changeIntegerValue(&n)
   fmt.Println(n)

   mm := map[string]int{"aa": 123}
   // 引用类型 指针
   changeMapperValue(&mm)
}
```

## 结构体

```go
package main

import "fmt"

type user struct {
   name     string
   password string
}

func main() {
   // 没有的值会用类型的初始化值
   a := user{name: "s", password: "123"}
   fmt.Println(a)
   b := user{name: "aa"}
   fmt.Println(b)
   c := user{password: "123"}
   fmt.Println(c)
   var d user
   fmt.Println(d) // 空对象
   fmt.Println(d.name)
   fmt.Println(d.password)
}
```

## 结构体方法

```go
package main

import "fmt"

type user struct {
   name     string
   password string
}

// 普通的传值 只会传入值类型 相当于将结构体深拷贝了一份
func (u user) changeUserName(string2 string) {
   u.name = string2
}

// 指针传递类型地址 这样才可以改变外部的结构体值
func (u *user) setUserNames(string2 string) {
   u.name = string2
}

func main() {
   val := user{}
   val.changeUserName("123")
   fmt.Println(val) // {}
   val.setUserNames("123")
   fmt.Println(val)
}
```

## 序列化

```go
package main

import (
 "encoding/json"
 "fmt"
)

type user struct {
 Name     string `json:name`
 Password string `json:password`
}

// 序列化
func main() {
 // 只要是可导出成员（变量首字母大写），都可以转成json 小写的变量不能转成json
 a := user{Name: "heart", Password: "18"}
 // json 序列化操作
 buffer, err := json.Marshal(a)
 if err != nil {
  panic(err)
 }
 fmt.Println(buffer)         // [123 34 78 97 109 101 34 58 34 104 101 97 114 116 34 44 34 80 97 115 115 119 111 114 100 34 58 34 34 125]
 fmt.Println(string(buffer)) // 将 utf-8 转成字符串
 // json 格式序列化操作
 buffer, err = json.MarshalIndent(a, "", "\t")
 if err != nil {
  panic(err)
 }
 fmt.Println(string(buffer))
 var b user
 // 反序列化json
 err = json.Unmarshal(buffer, &b)
 if err != nil {
  panic(err)
 }
 fmt.Printf("%#v\n", b)
}

```

## 进制转换

```go
package main

import (
 "fmt"
 "strconv"
)

func main() {
 // 字符串和数字转换
 // 返回64位的浮点数
 f, _ := strconv.ParseFloat("1.234", 64)
 fmt.Println(f)

 // base当前字符串是什么进制 bitSize 表示返回的类型字段大小
 n, _ := strconv.ParseInt("111", 8, 64) // n: int64位
 fmt.Println(n)                         // 73 64 + 8 + 1

 // 自动推断进制
 n, _ = strconv.ParseInt("0x1000", 0, 64)
 fmt.Println(n)

 // 10 进制快速转换
 n2, _ := strconv.Atoi("123")
 fmt.Println(n2) // 123

 // 不是10进制 会抛出异常
 n2, err := strconv.Atoi("AAA")
 fmt.Println(n2, err)
}

```

## 随机数的使用

```go
package main

import (
   "fmt"
   "math/rand"   "time")

func main() {
   maxNumber := 100
   // 如果不设置随机数的种子 则 每次运行的结果都是相同的结果
   // https://pkg.go.dev/math/rand#Intn
   rand.Seed(time.Now().UnixNano())
   fmt.Println(rand.Intn(maxNumber))
   fmt.Println(rand.Intn(maxNumber))
   fmt.Println(rand.Intn(maxNumber))
   fmt.Println(rand.Intn(maxNumber))
}
```

## 字符串比较大小

```go
// 1.
strings.Compare("go", "GO")

// 2.
"go" == "GO"
```

## 函数

普通函数不能嵌套定义 但是匿名函数可以

## IIFE 写法

```go
func main() {
	func () {
		fmt.Println("hello")
	}()
}
```

> `500 * time.Millisecond` 代表的是 500ms

## Golang 中的值传递和引用类型传递

[知乎 Golang 是值传递还是引用传递](https://zhuanlan.zhihu.com/p/542218435)

## flush 的理解

主要用在 IO 中，即清空缓冲区数据，就是说你用读写流的时候，其实数据是先被读度到了内存中，然后用数据写到文件中，当你数据读完的时候不代表你的数据已经写完了，因为还有一部分有可回能会留在内存这个缓冲区中。这时候如果你调用了 close()方法关闭了读写流，那么这部分数据就会丢失，所以应该在关闭读写流之前先答 flush()，先清空数据。

## 使用 Map 实现一个 Set 集合

> 在 Go 中，空结构通常不使用任何内存

```go
unsafe.Sizeof(struct{}{}) // 结果为 0
```

因此可以使用 `空结构` 作为 `Map` 的第二项

```go
func main() {
	type void struct{}
	var undefined void
	set := make(map[string]void)
	// add
	set["foo"] = undefined

	// each
	for v := range set {
		fmt.Println(v)
	}

	// delete
	delete(set, "foo")
	// size
	size := len(set)
	fmt.Println(size)
}
```

## 遍历字符串

```go
func main() {
	var a = "123"

	for index, unicode := range a {
		fmt.Println(index, unicode)
	}
}
```

## 记录一次时间切片拷贝问题

```go
type MyQueue struct {
   preSlice, nextSlice []int
   size                int
}

func (this *MyQueue) inStack(val int) {
   copy(this.nextSlice, this.preSlice)
   var b bool
   if this.size+1 > len(this.preSlice) {
      // 扩容
      b = true
      this.preSlice = append(this.preSlice, 0)
   }
   this.preSlice[0] = val
   fmt.Println("next length", len(this.nextSlice), this.nextSlice)
   for j := 0; j < len(this.nextSlice); j++ {
      this.preSlice[j+1] = this.nextSlice[j]
   }
   if b {
      this.nextSlice = append(this.nextSlice, 0)
   }
   // 同一份地址值的拷贝 导致如果修改了 preSlice nextSlice的值也会跟着改变
   this.nextSlice = this.preSlice[:]
   // 如果需要拷贝切片 使用copy 即可
   //copy(this.nextSlice, this.preSlice)
   fmt.Println("--------------------", this.nextSlice)
}
```

## 参考资料

- [golang 设计模式](https://mp.weixin.qq.com/s/9iXdsgtuQh6pge5vSDPoQA)
