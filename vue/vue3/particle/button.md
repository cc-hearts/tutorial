---
title: button 实现
---

```vue
<script setup>
import ButtonVue3 from './core/button.vue'
</script>

<template>
  <div class="m-b4">
    <ButtonVue3>default</ButtonVue3>
    <ButtonVue3 type="primary">primary</ButtonVue3>
    <ButtonVue3 type="dashed">dashed</ButtonVue3>
    <ButtonVue3 type="danger">danger</ButtonVue3>
    <ButtonVue3 type="flat">flat</ButtonVue3>
  </div>
  <template></template>
</template>
```

```vue
<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { onMounted, reactive, withDefaults, ref } from 'vue'
type typeClick = 'primary' | 'dashed' | 'danger' | 'default' | 'flat'

type size = 'mini' | 'small' | 'default' | number

type classBtnType = typeClick extends typeClick ? `btn__${typeClick}` : never
interface Props {
  type?: typeClick
  disabled?: boolean
  size?: size
}

const clickType = ref<classBtnType>()

const emit = defineEmits(['click'])

// 设置默认值的情况
const props = withDefaults(defineProps<Props>(), {
  size: 'small',
  type: 'default',
  disabled: false,
})

const style = reactive<
  {
    '--x': string
    '--y': string
    '--fontSize': string
  } & CSSProperties
>({
  '--fontSize': '1em',
  '--x': '',
  '--y': '',
})

function btnClick(e: MouseEvent) {
  if (props.disabled) return

  const target = e.target as HTMLButtonElement
  if (target) {
    style['--x'] = e.offsetX + 'px'
    style['--y'] = e.offsetY + 'px'
  }
  emit('click', e)
}

onMounted(() => {
  clickType.value = `btn__${props.type || 'default'}`
})
</script>

<template>
  <button
    :class="['btn', clickType, props.disabled ? 'btn--disabled' : '']"
    ref="btn"
    @click="btnClick"
    :style="style"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss">
@use '../../../assets/scss/_variable.scss';

.btn {
  --flat-disabled-color: #3ecd79a8;
  --bg-color: var(--#{variable.$prefix}-full-white);
  --btn-color-dark: var(--#{variable.$prefix}-btn-color-dark);
  --btn-color-white: var(--#{variable.$prefix}-btn-color-white);
  --btn-primary-color: var(--#{variable.$prefix}-btn-primary);

  --btn-bgc-color-success: var(--#{variable.$prefix}-btn-bgc-color-success);
  --btn-bgc-color-danger: var(--#{variable.$prefix}-btn-bgc-color-danger);
  --btn-bgc-color-default: var(,transparent);

  --btn-primary-active-color: var(--#{variable.$prefix}-full-white);
  --btn-danger-active-color: var(--#{variable.$prefix}-full-white);
  --btn-border-default-color: var(--#{variable.$prefix}-btn-br-default);
  --btn-border-dashed-color: var(--#{variable.$prefix}-btn-br-dashed);
}

html.dark {
  .btn {
    --btn-color-dark::var(--btn-color)
  }
}

@media (prefers-color-scheme: dark)  {
  .btn {
    --btn-color-dark::var(--btn-color)
  }
}

@mixin changeColor($color: --btn-color-dark) {
  color: var($color);
  border-color: currentColor;
}

@mixin disabled() {
  opacity: 0.5;
  cursor: not-allowed;
}

@mixin default() {
  border: 1px solid var(--btn-border-default-color);
  color: var(--btn-color-dark);
  // focus-within属性 后代元素获取到了焦点 则会变成默认主题色
  &:not([disabled]):hover,
  &:not([disabled]):focus-within {
    @include changeColor(--btn-primary-color);
  }
}

@mixin colorAndBgcMixins($color, $bgColor) {
  color: var(#{$color});
  background-color: var(#{$bgColor});
}

@mixin primaryMixins($bgColor: --btn-bgc-color-success, $color: --btn-color-white) {
  @include colorAndBgcMixins($color, $bgColor);
}

@mixin flatMixins($bgColor: --btn-bgc-color-default, $color: --btn-color-dark) {
  @include colorAndBgcMixins($color, $bgColor);
}

@mixin gradientMixins($color: --btn-primary-color) {
  background-image: radial-gradient(circle, var($color) 10%, transparent 10.01%);
}

.btn {
  display: inline-block;
  position: relative;
  padding: 0.5em 1em;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: unset;
  user-select: none;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  background-color: var(--btn-bgc-color-default);
  transition: all 0.3s;
  overflow: hidden;

  @include changeColor();

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    background: var(--bg-color);
    transition: opacity 0.3s;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: var(--x, 0);
    top: var(--y, 0);
    pointer-events: none;
    background-repeat: no-repeat;
    background-position: 50%;
    // scale关键
    transform: translate(-50%, -50%) scale(10);
    opacity: 0;
    transition: transform 0.3s, opacity 0.8s;
    @include gradientMixins;
  }

  &:not([disabled]):active::after {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.3;
    transition: 0s;
  }

  &:not([disabled]):active::before {
    opacity: 0.2;
  }

  &__default {
    @include default();
  }

  &__primary {
    @include primaryMixins;
    &::after {
      @include gradientMixins(--btn-primary-active-color);
    }
  }

  &__dashed {
    @include default();
    border: 1px dashed var(--btn-border-dashed-color);
  }

  &__danger {
    @include primaryMixins(--btn-bgc-color-danger);

    &::after {
      @include gradientMixins(--btn-danger-active-color);
    }
  }

  &__flat {
    transition: color 0.3s, background-color 0.5s;
    &:not([disabled]):hover {
      @include flatMixins(--btn-bgc-color-default, --flat-disabled-color);
    }
  }

  &--disabled {
    @include disabled();
  }
}
</style>
```
