---
title: tabs components
---

# tabs 切换导航组件

导航切换组件

## 普通用法

```vue
<script setup>
import { reactive, ref } from 'vue'
import Tabs from './core/tabs.vue'
const tabsProps = reactive({
  columns: [
    { text: 'user' },
    { text: 'config' },
    { text: 'role' },
    { text: 'task' },
  ],
})

const slotTabsProps = reactive({
  columns: [
    { slot: { name: 'user' } },
    { text: 'config' },
    { text: 'role' },
    { text: 'task' },
  ],
})

const active = ref(2)
</script>

<template>
  <div>
    <Tabs v-bind="tabsProps" />
  </div>
</template>
```

```vue
<script setup>
import { reactive } from 'vue'
import Tabs from './core/tabs.vue'
const tabBarProps = reactive({
  columns: [
    { text: 'user' },
    { text: 'config' },
    { text: 'role' },
    { text: 'task' },
  ],
})
</script>

<template>
  <div>
    <Tabs v-bind="tabBarProps" />
  </div>
</template>
```

## 插槽使用

```vue
<template>
  <div>
    <Tabs v-bind="slotTabsProps">
      <template #user>
        <i>123213</i>
      </template>
    </Tabs>
  </div>
</template>
```

```vue
<script setup>
import { reactive } from 'vue'
import Tabs from './core/tabs.vue'
const slotTabsProps = reactive({
  columns: [
    { slot: { name: 'user' } },
    { text: 'config' },
    { text: 'role' },
    { text: 'task' },
  ],
})
</script>

<template>
  <div>
    <Tabs v-bind="slotTabsProps">
      <template #user>
        <i>123213</i>
      </template>
    </Tabs>
  </div>
</template>
```

## active

使用 `active` 属性可以控制显示的 tab 拦

```vue
<template>
  <Tabs v-bind="slotTabsProps" v-model:active="active">
    <template #user>
      <i>123213</i>
    </template>
  </Tabs>
</template>
```

```vue
<script setup>
const active = ref(2)
</script>

<template>
  <Tabs v-bind="slotTabsProps" v-model:active="active">
    <template #user>
      <i>123213</i>
    </template>
  </Tabs>
</template>
```

```vue
<template>
  <ul class="tab-bar-wrapper" :style="styles">
    <li
      v-for="(item, index) in columns"
      :class="[
        activeTabs === index ? 'tab-bar__active' : '',
        textHidden ? 'tab-bar__text-hidden' : '',
      ]"
      @click="handleChangeTabs(index)"
      ref="liEl"
    >
      <template v-if="item.slot">
        <slot :name="item.slot.name">
          {{ item.text }}
        </slot>
      </template>
      <template v-else>
        {{ item.text }}
      </template>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, withDefaults, watch } from 'vue'
interface Tabs {
  text: string
  slot?: { name: string }
  [prop: string]: unknown
}
interface IProps {
  columns: Tabs[]
  active?: number | undefined
  textHidden?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  columns: () => [],
  active: void 0,
  textHidden: false,
})

const emits = defineEmits<{
  (event: 'update:active', index: number): void
}>()
const styles = reactive({
  '--tab-bar-current-width': '0px',
  '--tab-bar-current-left': '0px',
})

const liEl = ref<HTMLLIElement[] | null>(null)

const activeTabs = ref(-1)
function handleChangeTabs(index: number) {
  const el = liEl.value?.[index]
  if (!el) {
    return
  }
  const { width } = el.getBoundingClientRect()
  styles['--tab-bar-current-left'] = el.offsetLeft + 'px'
  styles['--tab-bar-current-width'] = width + 'px'
  activeTabs.value = index
  emits('update:active', index)
}

watch(
  () => props.active,
  (val) => {
    if (val !== void 0 && val !== activeTabs.value) {
      activeTabs.value = val
    }
  }
)

onMounted(() => {
  if (liEl.value && liEl.value.length > 0) {
    handleChangeTabs(props.active ?? 0)
  }
})
</script>

<style>
:root {
  --tab-bar-background: #f5f5f5;
  --tab-bar-active-tab: #fff;

  --tab-bar-border-radius: 4px;
  --tab-bar-current-width: 0px;
  --tab-bar-current-left: 0px;
  --tab-bar-active-color: #007fff;
  --tab-bar-z-index: 1;
}
:root.dark {
  --tab-bar-background: #1a1a1a;
  --tab-bar-active-tab: #292929;
}
</style>
<style lang="scss" scoped>
.tab-bar {
  &-wrapper {
    &,
    li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    display: flex;
    width: 100%;
    align-items: center;
    background-color: var(--tab-bar-background);
    border-radius: var(--tab-bar-border-radius);
    position: relative;
    & {
      padding: 0 3px;
    }

    li {
      flex: 1;
      text-align: center;
      padding: 0 12px;
      position: relative;
      white-space: nowrap;

      z-index: calc(var(--tab-bar-z-index) + 1);
    }

    &::after {
      content: '';
      width: var(--tab-bar-current-width);
      height: 80%;
      position: absolute;
      border-radius: inherit;
      top: calc(10%);
      left: var(--tab-bar-current-left);
      background-color: var(--tab-bar-active-tab);
      transition: all 0.3s ease;
      z-index: var(--tab-bar-z-index);
    }
  }

  &__active {
    color: var(--tab-bar-active-color);
  }

  &__text-hidden {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
```
