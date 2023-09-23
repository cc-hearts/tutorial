## 获取命令行参数

```go

func main() {
	os.Args // []string
}
```

## 创建文件

```go
func _createFile(filePath *string) {

file, err := os.Create(*filePath)

if err != nil {

fmt.Println("创建文件失败，错误：", err)

panic(err)

}

file.Close()

}

func createFile(filePath *string) {

fileInfo, err := os.Stat(*filePath)

if err != nil {

if os.IsNotExist(err) {

_createFile(filePath)

return

} else {

panic(err)

}

} else {

if fileInfo.IsDir() {

_createFile(filePath)

return

} else {

fmt.Println("文件已存在", *filePath)

return

}

}

}
```

## 写入文件

```go

func writeFile(filePath *string, content *string) {

// 打开文件

file, err := os.OpenFile(*filePath, os.O_RDWR, os.ModePerm)

if err != nil {

fmt.Println("打开文件失败，错误：", err)

panic(err)

}

defer file.Close()



_, err = file.Write([]byte(*content))

if err != nil {

fmt.Println("写入文件失败，错误：", err)

panic(err)

}



fmt.Println("写入文件成功")



}

```

## 读取文件

读取文件的包会有一点不同， 相关的 API 在 `io/ioutil` 中

```go
func readFile(filePath *string) *[]byte {

file, err := ioutil.ReadFile(*filePath)

if err != nil {

fmt.Println("读取文件失败，错误：", err)

panic(err)

}

return &file

}
```

## 操作系统相关

如果想要查看 Golang 支持的 操作系统和 CPU 架构 可以使用 `go tool dist list` 查看

```go

package main

import (
    "fmt"
    "runtime")

func main() {
    // 当前的操作系统
    fmt.Println(runtime.GOOS)
    // 当前系统的CPU架构
    fmt.Println(runtime.GOARCH)
    // 获取当前运行的CPU核心数量
    fmt.Println(runtime.NumCPU())

	// 设置可用的CPU核心数
	runtime.GOMAXPROCS(runtime.NumCPU() / 2) // 返回结果是之前的CPU核心数

	fmt.Println(runtime.GOMAXPROCS(0)) // 获取当前可用的CPU核心数

}
```

## 让出资源

```go
package main

import (
    "fmt"
    "runtime"    "sync")

func main() {
    var wg sync.WaitGroup
    wg.Add(2)

    go func() {
       defer wg.Done()

       for i := 0; i < 5; i++ {
          fmt.Println("Goroutine 1:", i)
          runtime.Gosched() // 让出执行权限
       }
    }()

    go func() {
       defer wg.Done()

       for i := 0; i < 5; i++ {
          fmt.Println("Goroutine 2:", i)
          runtime.Gosched() // 让出执行权限
       }
    }()

    wg.Wait()
}
```

## 终止自身协程

```go
package main

import (
    "fmt"
    "runtime"    "sync")

func main() {
    var wg sync.WaitGroup
    wg.Add(2)

    go func() {
       defer wg.Done()

       for i := 0; i < 10; i++ {
          fmt.Println("Goroutine 1:", i)
          if i > 5 {
             runtime.Goexit() // 立即终止当前goroutine的执行
          }
       }

    }()

    go func() {
       defer wg.Done()

       for i := 0; i < 5; i++ {
          fmt.Println("Goroutine 2:", i)
       }
    }()

    wg.Wait()
}
```
