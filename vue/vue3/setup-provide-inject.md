---
title: provide/inject 在setup中的使用
---

```vue
<template>
  <component />
</template>

<script setup lang="ts">
// parent.vue
import { provide } from 'vue'
import Component from './components/Component.vue'
provide('keys', { data: 'val' })
</script>
```

```vue
<template></template>

<script setup lang="ts">
// Child.vue
import { inject } from 'vue'

console.log(inject('keys'))
</script>
```
