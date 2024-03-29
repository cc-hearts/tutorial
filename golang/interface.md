---
title: GO 空接口声明
---

空接口类型 `interface {}`

空接口是接口类型的特殊形式，空接口没有任何方法，因此任何类型都无须实现空接口。从实现的角度看，任何值都满足这个接口的需求。因此空接口类型可以保存任何值，也可以从空接口中取出原值。

```go
var a interface{}
	a = 1
	a = "hello"
	a = false
	// 空接口赋值会有问题
	// Cannot use 'a' (type interface{}) as the type string
	// 解决方法 进行类型断言 a.(string)
	var b string = a.(string) // 报错
	fmt.Println(b)
```

## 类型值的比较

1. 比较两个值的类型的时候 如果类型不等 则比较直接会是 false

```go
   var a interface{}

   	a = 100

   	var b = 100

   	fmt.Println(a == b) // true
```

2. 不能比较空接口中的动态值

| 类 型           | 说 明                                                                     |
| --------------- | ------------------------------------------------------------------------- |
| map             | 宕机错误，不可比较                                                        |
| 切片（[]T）     | 宕机错误，不可比较                                                        |
| 通道（channel） | 可比较，必须由同一个 make 生成，也就是同一个通道才会是 true，否则为 false |
| 数组（[容量]T） | 可比较，编译期知道两个数组是否一致                                        |
| 结构体          | 可比较，可以逐个比较结构体的值                                            |
| 函数            | 可比较                                                                    |
