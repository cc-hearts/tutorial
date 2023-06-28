---
title: toRaw markRow
---

## toRaw

讲一个响应式的对象完全的转换为一个普通的对象

```vue
<script setup>
import { ref, reactive, toRaw } from 'vue'
const data = reactive({
  a: { b: { c: 1 } },
})
console.log(toRaw(data)) // { "a": { "b": { "c": 1 } } }
</script>
```

## markRaw

`markRaw` 标记一个对象，不会被 vue 的响应式函数转化为响应式对象

```vue
<script setup>
import { markRaw } from 'vue'
// ...
const icon = meta?.icon || markRaw(House) // 第三方的组件 不应该被标记成响应式
</script>
```
