## 创建通道

```go
ch := make(chan Type)
```

```go
// 使用`<-`操作符将数据`value`发送到channel`ch`。发送操作会阻塞，直到有其他goroutine接收这个数据。
ch <- value
```

```go
// 使用`<-`操作符从channel`ch`接收数据，并将其赋值给变量`result`。接收操作会阻塞，直到有其他goroutine发送数据到这个channel。
result := <-ch
```

```go
// 使用`close`函数关闭channel。关闭后的channel不能再发送数据，但仍然可以接收已发送的数据，直到所有数据都被接收完毕。
close(ch)
```

## 缓冲通道

```go
// 通过在创建channel时指定缓冲区大小，可以创建一个带缓冲的channel。带缓冲的channel可以在发送操作时不阻塞，只有当缓冲区满时才会阻塞
ch := make(chan Type, bufferSize)
```

```go
// 使用`ok`变量判断channel是否已经关闭。如果channel已经关闭并且没有待接收的数据，`ok`值将为`false`，否则为`true`
value, ok := <-ch

```

```go
package main

import (
    "fmt"
    "sync"    "time")

const DaysOfWeek = 7

var initChan = make(chan int, DaysOfWeek)
var syncWait sync.WaitGroup

func layEggs() {
    defer syncWait.Done()
    for i := 0; i < DaysOfWeek; i++ {
       time.Sleep(time.Millisecond * 500)
       initChan <- 1
       fmt.Println("Eggs laid")
    }

    close(initChan)
}

func collectEggs() {
    defer syncWait.Done()
    var eggCounts int
    var (
       counts int
       ok     bool
    )
    // 可以使用 for range 简化操作
    for {
       counts, ok = <-initChan
       eggCounts += counts
       // 如果数据信道发送完毕 关闭后 判断是否关闭
       if !ok {
          break
       }
       fmt.Println("Eggs collected")
    }

    fmt.Println("Total eggs collected:", eggCounts)
}
func main() {
    syncWait.Add(2)
    go layEggs()
    go collectEggs()
    syncWait.Wait()
}
```

## 单向通道

单向通道要基于已有的通道进行声明

```go
// 声明只接收的通道 使用 <- chan type 声明
var readOnlyChan <-chan int = initChan
```

```go
// 声明只发送的通道 使用 chan<- type 声明
var sendOnlyCHan chan<- int = initChan
```

## 延时器

无论 Timer 还是 Ticker，调用 stop() 方法会立即停止数据的发送，但很可能都不会立即关闭通道。这是为了保证正常接收而设计的，不过别担心，Go 程序会在合适的时机自动关闭通道。

```go
package main

import (
    "fmt"
    "time")

func main() {
    // 定时器是一次性的 如果需要重新接收 可以调用 Reset    downloadTimer := time.NewTimer(time.Second * 2)
    defer downloadTimer.Stop()
    result := <-downloadTimer.C
    fmt.Println(result)
    fmt.Println("Download")
    downloadTimer.Reset(time.Second * 3)
    result = <-downloadTimer.C
    fmt.Println(result)

}
```

## 定时器

```go
package main

import "time"

func main() {
    cpuUsageTicker := time.NewTicker(time.Second)
    defer cpuUsageTicker.Stop()
    var count int
    for {
       <-cpuUsageTicker.C
       count++
       println(count)
    }
}
```

## select case 操作

## 锁

### 互斥锁

互斥锁的工作原理是通过在代码中设置临界区（Critical Section），也就是一段同一时间只能被一个线程执行的代码段。当一个线程进入临界区时，它会尝试获取互斥锁的所有权。如果互斥锁已被其他线程获取，则当前线程将被阻塞，直到互斥锁被释放。一旦线程完成了对共享资源的访问，它会释放互斥锁，使其他线程能够获取锁并进入临界区。

```go

package main

import (
    "fmt"
    "sync")

var testInit int
var lock sync.Mutex
var syncWait sync.WaitGroup

func inCreTestInit() {
    defer syncWait.Done()
    defer lock.Unlock()
    lock.Lock()
    for i := 0; i < 1000 && testInit < 1000; i++ {
       testInit++
    }
}
func main() {
    syncWait.Add(2)
    go inCreTestInit()
    go inCreTestInit()

    syncWait.Wait()

    fmt.Println("testInit", testInit)

}
```

## 读写互斥锁

    • 当协程任务获得读操作锁后，读操作并发运行，写操作等待；
    • 当协程任务获得写操作锁后，考虑到数据可能发生变化，所以无论是读还是写操作都要等待。

```go
package main

import (
    "fmt"
    "sync"    "time")

var testInit int
var lock sync.RWMutex
var syncWait sync.WaitGroup

func read5Sec() {
    defer syncWait.Done()
    defer lock.RUnlock()
    lock.RLock()
    fmt.Println("读文件操作5, 开始", time.Now().Format("15:04:05"))
    time.Sleep(5 * time.Second)
    fmt.Println("读文件操作5, 结束", time.Now().Format("15:04:05"))
}
func read3Sec() {
    defer syncWait.Done()
    defer lock.RUnlock()
    lock.RLock()
    fmt.Println("读文件操作3, 开始", time.Now().Format("15:04:05"))
    time.Sleep(3 * time.Second)
    fmt.Println("读文件操作3, 结束", time.Now().Format("15:04:05"))
}
func read1Sec() {
    defer syncWait.Done()
    defer lock.RUnlock()
    lock.RLock()
    fmt.Println("读文件操作1, 开始", time.Now().Format("15:04:05"))
    time.Sleep(1 * time.Second)
    fmt.Println("读文件操作1, 结束", time.Now().Format("15:04:05"))
}
func write5Sec() {
    defer syncWait.Done()
    defer lock.Unlock()

    lock.Lock()
    fmt.Println("写文件操作5, 开始", time.Now().Format("15:04:05"))
    time.Sleep(5 * time.Second)
    fmt.Println("写文件操作5, 结束", time.Now().Format("15:04:05"))
}
func main() {
    syncWait.Add(4)
    go read5Sec()
    go write5Sec()
    go read3Sec()
    go read1Sec()
    syncWait.Wait()  // 13s 结束
    fmt.Println("程序结束", time.Now().Format("15:04:05"))
}
```
