---
title: shallowReactive 对数组的影响
---

> `shallowReactive` 对于数组而言 代理的也是数组的根值

```vue
<script setup>
import { reactive, shallowReactive } from 'vue'
// shallowReactive 的时候 代理的是数组的每一项根值
const msg = reactive({
  columns: shallowReactive([{ a: 1 }]),
})

function handleClick() {
  msg.columns[0] = 'a'
  msg.columns.push('a')
  // 两者都是响应式的代理  shallowReactive不会受reactive 的影响
  isReactive(msg.columns) // true
  isReactive(msg) // true
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="handleClick">点击</button>
</template>
```

## 参考资料

* [vue docs - shallowReactive](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive)
