---
title: shallowRef 浅层响应式依赖追踪
---

```vue
<template>
  <div>
    {{ data.data }}
  </div>
  <button @click="handleClick">click</button>
  <button @click="trigger">trigger</button>
</template>
<script setup lang="ts">
import { shallowRef } from 'shallowRef'

const shallowData = shallowRef({ val: 1 })

function handleClick() {
  // 浅层添加值 shallowRef追踪不到
  shallowData.value.data++
}

function trigger() {
  // 强制刷新 shallowRef的值
  triggerRef(shallowData)
}
</script>
```
