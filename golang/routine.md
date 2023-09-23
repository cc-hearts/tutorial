## 前言

本文将讲述如何进行并发编程

> 在源码中 有一个 Goroutine 的计数器，每次调用 Add 的方法时， 传入的参数便会作为累加值使用，调用 Done 时 会使累加数减 1，直到累加数位 0 的时候,await 的方法才会结束

```go
package main

import (
    "fmt"
    "sync"    "time")

var goRoutineWait sync.WaitGroup

func testFunc() {
    //调用Done()方法减少等待的并发操作计数
    defer goRoutineWait.Done()
    for i := 1; i <= 10; i++ {
       fmt.Println("test result is ", i)
       time.Sleep(time.Second)
    }
}
func main() {
    //  调用Add()方法增加等待的并发操作计数
    goRoutineWait.Add(1)
    go testFunc()
    // 调用Wait()方法等待所有并发操作完成
    goRoutineWait.Wait()
    fmt.Println("program end")
}
```
