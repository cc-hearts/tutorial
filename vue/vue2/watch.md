---
title: watch
---

# watch

> watch 方法会返回一个 stop 方法，若想要停止监听，便可直接执行该 stop 函数

## watchEffect

它与 watch 的区别主要有以下几点：

1. 不需要手动传入依赖
2. 每次初始化时会执行一次回调函数来自动获取依赖
3. 无法获取到原值，只能得到变化后的值

> https://cn.vuejs.org/api/reactivity-core.html#watcheffect

基本用法:

```ts
const state = ref(0)
const stop = watchEffect((onCleanup) => {
  const { next, cancel } = doAsyncMethod(state.value)
  // 每次watchEffect state.value更改时调用
  onCleanup(cancel)
  next()
})

// run stop method stop watch
stop()
```

`onClearUp:`

```vue
<script setup>
import { ref, watchEffect } from 'vue'

const msg = ref(0)
const stop = watchEffect((onClearUp) => {
  console.log(msg.value)
  onClearUp(() => {
    // 调用时机会在 watchEffect 回调之前
    console.log('cancel')
  })
})

function add() {
  msg.value++
  if (msg.value === 10) {
    stop()
  }
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="add">click</button>
</template>
```

> `watchPostEffect` , `watchSyncEffect` 就是对 `flush` 的别名

> 默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新**之前**被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。
>
> 如果想在侦听器回调中能访问被 Vue 更新**之后**的 DOM，你需要指明 `flush: 'post'`

> 在响应式依赖发生改变时立即触发侦听器。这可以通过设置 `flush: 'sync'` 来实现
>
> [ `flush` 的运行时机(https://cn.vuejs.org/guide/essentials/watchers.html#callback-flush-timing)

## 调试模式

## 动态监听 watch

```js
export default {
  // 不能在beforeCreate中动态监听 因为此时的watch还没有初始化完成
  create() {
    // 动态watch的第一个参数可以接受为一个函数 第二个参数为触发事件的回调函数
    // 第三个参数为是否深度监听等的配置参数
    // 动态watch回返回一个函数 执行该函数可以销毁watch
    const unWatch = this.$watch(
      () => {
        return dataValue.options
      },
      () => {
        // callback
      },
      {
        immediate: true,
        deep: true,
      }
    )
    this.unWatchList.push(unWatch)
  },
  beforeDestroy() {
    // 销毁watch
    this.unWatchList.forEach((unWatch) => {
      unWatch()
    })
  },
}
```
