---
title: ref 赋值给 reactive引发的问题
---

```vue
<script setup>
import { ref, reactive, unref } from 'vue'

const msg = ref(['1', '2'])

// msg.value 还是一个Proxy 代理对象
console.log(msg.value)
const state = reactive({
  data: [],
})

function bind() {
  // 赋值ref对象之后 state.data 还是 ref对象  只有引用的时候会解包
  state.data = msg
  console.log(state.data === msg.value)
}

function inspect() {
  state.data = []
  // 为啥着里会影响着 msg 的改变?
  // 这里的state.data 赋值之后 会改变 msg的原因是因为在执行 state的setter的时候执行了以下的代码:
  /*
   *  if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
   *    oldValue.value = value;
   *    return true;
   * 	}
   */
  // target 就是一个 state 对象
  // 由于前面的赋值 `state.data = msg` 的 msg 这里不会解包 所以`target.data`他还是一个 RefImpl对象
  // oldValue的值自然是`msg`的引用
  // value的值便是下面的 `state.data = []` 中的 `[]`
  // 上述的条件成立 因此会走下面代码
  // `oldValue.value = value` 相当于走的是 `msg.value = value` 触发了 msg的 `set`
  // 因此改变 `state.data` 相当于改变了 `msg.value`
}
</script>

<template>
  <h1>{{ state.data }}</h1>
  <h2>
    {{ msg }}
  </h2>
  <button @click="bind">bind</button>
  <button @click="inspect">inspect</button>
</template>
```
