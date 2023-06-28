---
title: collapse transition 实现
---

## 源代码

 `shard.js`

```js
/**
 * @description add element class attribute
 * @param { Element } el
 * @param { String } className
 */
export function addClassName(el, className) {
    el.classList.add(className)
}

/**
 * @description remove element class attribute
 * @param { Element } el
 * @param { String } className
 **/
export function removeClassName(el, className) {
    el.classList.remove(className)
}
```

```vue
<template>
  <Transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
import { addClassName, removeClassName } from '../utils/shard'
function beforeEnter(el) {
  addClassName(el, 'progress-collapse-transition')
  if (!el.dataset) el.dataset = {}
  // 保存内联元素的值
  el.dataset.oldPaddingTop = el.style.oldPaddingTop || ''
  el.dataset.oldPaddingBottom = el.style.paddingBottom || ''

  el.style.height = '0'
  el.style.paddingTop = 0
  el.style.paddingBottom = 0
}

function enter(el) {
  el.dataset.oldOverflow = el.style.overflow
  if (el.scrollHeight !== 0) {
    el.style.height = el.scrollHeight + 'px'
  } else {
    el.style.height = ''
  }

  el.style.paddingTop = el.dataset.oldPaddingTop
  el.style.paddingBottom = el.dataset.oldPaddingBottom
  el.style.overflow = 'hidden'
}

function afterEnter(el) {
  removeClassName(el, 'progress-collapse-transition')
  el.style.height = ''
  el.style.overflow = el.dataset.oldOverflow
}

function beforeLeave(el) {
  if (!el.dataset) el.dataset = {}
  el.dataset.oldPaddingTop = el.style.paddingTop
  el.dataset.oldPaddingBottom = el.style.paddingBottom
  el.dataset.oldOverflow = el.style.overflow
  el.style.height = el.scrollHeight + 'px'
  el.style.overflow = 'hidden'
}

function leave(el) {
  // 触发浏览器重绘
  if (el.scrollHeight !== 0) {
    addClassName(el, 'progress-collapse-transition')
    el.style.height = 0
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
  }
}

function afterLeave(el) {
  removeClassName(el, 'progress-collapse-transition')
  el.style.height = ''
  el.style.overflow = el.dataset.oldOverflow
  el.style.paddingTop = el.dataset.oldPaddingTop
  el.style.paddingBottom = el.dataset.oldPaddingBottom
}
</script>

```

## 实现 expandCard

```vue
<template>
  <div :class="['expand-card', isExpand ? 'card-expanded' : '']">
    <div class="expand-card__title">
      <slot name="title">
        <div class="expand-card__title--default" @click="handleToggleExpand">
          <div class="arrow">
            <span class="el-icon-caret-right" />
          </div>
          <span class="expand-card__title--text">{{ title }}</span>
        </div>
      </slot>
    </div>
    <progress-transition name="collapse">
      <div v-show="isExpand" class="expand-card__contain">
        <div>
          <slot />
        </div>
      </div>
    </progress-transition>
  </div>
</template>

<script lang="ts" setup>
import ProgressTransition from './collapseTransition.vue'
import { ref } from 'vue'
interface IProps {
  title?: string
}
defineProps<IProps>()
const isExpand = ref<boolean>(false)

function handleToggleExpand() {
  isExpand.value = !isExpand.value
}
</script>

<style lang="scss">
.expand-card {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
<style lang="scss" scoped>
.expand-card {
  --expand-card-bgc: #fff;
  --expand-card-border: #ebeef5;
  --expand-arrow-icon-color: #4e80f7;
  border-radius: 4px;

  background-color: var(--expand-card-bgc);
  border: 1px solid var(--expand-card-border);

  &__title {
    padding: 8px 12px;

    &--default {
      display: flex;
      cursor: pointer;
    }
    &--text {
      color: var(--expand-arrow-icon-color);
    }
  }

  &__contain {
    overflow: hidden;
    height: 0;
    & > div {
      padding: 12px;
    }
  }
}
.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: rgba(59, 130, 255, 0.15);
  border-radius: 2px;
  margin-right: 10px;
  & > span {
    color: var(--expand-arrow-icon-color);
    transition: transform 0.3s;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-left: 6px solid var(--expand-arrow-icon-color);
      border-bottom: 6px solid transparent;
      border-top: 6px solid transparent;
    }
  }
}
.card-expanded {
  .arrow > span {
    transform: rotate(90deg);
  }
  .expand-card__title {
    border-bottom: 1px solid var(--expand-card-border);
  }
  .expand-card__contain {
    overflow: inherit;
    height: inherit;
  }
}

.progress-collapse-transition {
  transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out,
    0.3s padding-bottom ease-in-out;
}
// ! 直接使用transition 会卡顿
// .collapse-enter-active,
// .collapse-leave-active {
//   transition: all 0.3s ease;
// }

// .collapse-enter,
// .collapse-leave-to {
//   padding-top: 0;
//   padding-bottom: 0;
//   max-height: 0px;
//   will-change: height;
//   overflow: hidden;
// }

// .collapse-enter-to,
// .collapse-leave {
//   max-height: 1000px;
//   will-change: height;
//   overflow: hidden;
// }
</style>

```

## 参考资料

[element transition](https://element.eleme.io/#%252Fzh-CN%252Fcomponent%252Ftransition%2523collapse-zhan-kai-zhe-die)
