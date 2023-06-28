---
title: 时间处理
---

## 基本操作

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	now := time.Now() // 获取当前时间
	fmt.Println(now)  // 2022-09-20 23:25:40.058745 +0800 CST m=+0.000071876
	t := time.Date(2022, 3, 27, 1, 25, 36, 0, time.UTC)
	fmt.Println(t)
}

```
