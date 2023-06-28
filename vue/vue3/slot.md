---
title: vue3 插槽透传方式
---

vue3 在 `setup` 下的插槽透传机制和 `vue2` 不同

在 `v3` 中 官方提供了 `useSlots` api 可以获取当前组件的插槽值

```vue
<script setup lang="ts">
import { useSlots } from 'vue'
	const slots = useSlots()
	// 通过slotKeys 和 动态插槽 就可以进行组件的插槽透传了
	const slotKeys = reacitve(Object.keys(slots))
</script>

<template>
	<!-- 这里的data为了进行作用域插槽的值传递 -->
	<template v-for="key in slotKeys"
	v-slot:[n]="data">
		<slot :name="key" v-bind="data" />
	</tepmlate>
</template>
```
