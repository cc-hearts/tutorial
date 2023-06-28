---
title: v-on的基本使用
---

## on 监听多个方法

```Vue
  <button
    type="default"
    style="
      background: #ffffff;
      color: black;
      border-radius: 10rpx;
      border: 1rpx black solid;
    "
    @click="
      resetTaskFilterData()
      getData(true)
      handleClosePopup('popupProcessed')
    "
  >
    重置
  </button>
```

## v-on 进行事件的透传

通过 `v-on="$listeners" ` 可以进行事件的透传

> 属性的透传可以借助 `$attrs` 这个属性进行透传

```vue
<template>
  <!-- app.vue -->
  <ParentVue @click="handleClick" />
</template>

<script>
import ParentVue from './Parent.vue'
export default {
  name: 'App',
  components: { ParentVue },
  methods: {
    handleClick() {
      console.log('click')
    },
  },
}
</script>
```

```vue
<template>
  <!-- parent.vue -->
  <ChildrenVue v-on="$listeners" />
</template>

<script>
import ChildrenVue from './Children.vue'
export default {
  name: 'ParentVue',
  components: { ChildrenVue },
}
</script>
```

```vue
<template>
  <div>
    <button @click="handleClick">toggle click</button>
  </div>
</template>

<script>
export default {
  name: 'ChildrenVue',
  methods: {
    handleClick() {
      this.$listeners?.click?.()
    },
  },
}
</script>
```
