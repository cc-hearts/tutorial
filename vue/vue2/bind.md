---
title: vue2
---

## Vue 扩展多层属性

```vue
<template>
  <!-- 使用 `v-bind="obj"` 可以类似于`{{...obj}}` 这样在模版属性上解构 -->
  <!-- 这种结构无法绑定事件和指令 -->
  <test-vue v-bind="p" />
</template>
<script>
import TestVue from './test.vue'
export default {
  components: { TestVue },
  data() {
    return {
      p: {
        title: 'cc-heart',
        visible: false,
      },
    }
  },
}
</script>
```

同时 这种写法也支持 `.sync` 指令符

```vue
<template>
  <div>
    <button @click="handleClick">click me</button>
    {{ title }}
    {{ visible }}
  </div>
</template>

<script>
export default {
  name: 'TestVue',
  props: ['title', 'visible'],
  methods: {
    handleClick() {
      this.$emit('update:title', 'update-cc-heart')
      this.$emit('update:visible', true)
    },
  },
}
</script>
```
