## 源码文件名

英文单词全部小写，每个单词之间使用下划线分割。

## 变量名

整体遵循驼峰式命名法。允许从外部访问的名字（类似 Java 中的 public 修饰符）以大写开头（大驼峰法，亦称帕斯卡命名法），不允许从外部访问的名字以小写开头（小驼峰法）。对于布尔类型的变量，可考虑添加 Has、Is、Can、Allow 前缀。

## 常量名

英文单词全部大写，每个单词之间使用下划线分割。对于布尔类型的变量，可考虑添加 Has、Is、Can、Allow 前缀。

## 接口名

整体遵循驼峰式命名法。允许从外部访问的名字（类似 Java 中的 public 修饰符）以大写开头（大驼峰法，亦称帕斯卡命名法），不允许从外部访问的名字以小写开头（小驼峰法），通常以“er”结尾。

## 单元测试

golang 中的单元测试和文件方在一起 并且使用的是 `_test` 作为文件名的结尾。测试函数名通常是在被测函数名前加“Test”前缀，且要求测试函数有且只有一个参数，即 *testing.T（用于函数测试）、*testing.B（用于基准测试）、\*testing.M（用于测试 main） 三种类型之一。

```go
import "testing"

func TestAddCalc(t *testing.T) {
    if result := AddCalc(1, 2); result != 3 {
       t.Error("result is not 3")
    }
}
```

go test 除了可以直接使用外，还可以添加 -v 参数输出每个用例的结果，-cover 参数输出测试覆盖率， -run 参数指定要执行的测试函数。

TestMain 测试的 Main 函数。

## 基准测试

```go
// 要求用例的函数名都用 Benchmark 开头 后面接带测的函数名，参数必须为 b *test.B
func BenchmarkAddCalc(b *testing.B) {
    for i := 0; i < b.N; i++ {
       fmt.Println(AddCalc(100, 222))
    }
}
// 共调用了 187917 次 每次 执行了 6357 纳秒 每次分配了 8个字节 共有一次分配的操作
//   187917              6357 ns/op               8 B/op          1 allocs/op
// PASS

```

```shell
go test --benchmem -bench .
```
