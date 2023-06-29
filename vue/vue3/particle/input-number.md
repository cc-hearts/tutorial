---
title: 利用input实现一个可以格式化number的组件
---

```vue
<template>
  <input
    class="input-number"
    ref="inputRef"
    :value="inputVal"
    @input="handleInputChange"
  />
</template>

<script lang="ts" setup>
import { ref, InputHTMLAttributes } from 'vue'

const inputVal = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

function handleInputChange(e: Event) {
  if (e instanceof InputEvent) {
    const type = e.inputType
    const lastCode = e.data
    switch (type) {
      case 'insertText':
        if (lastCode && /[0-9\.]/.test(lastCode)) {
          inputVal.value += lastCode
        }
        break
      case 'deleteSoftLineBackward':
      case 'deleteContentBackward':
        inputVal.value = (e.target as InputHTMLAttributes).value
        break
      case 'insertFromPaste':
        const code = inputRef.value?.value || ''
        if (/^[0-9,\.]*$/.test(code)) {
          inputVal.value = code
        }
        formatVal()
        break
      case 'deleteByCut':
        inputVal.value = ''
        break
    }
    if (type !== 'insertFromPaste') formatVal()
  }

  function formatVal() {
    let value = inputVal.value.split(',').join('')
    const reg = value.includes('.')
      ? /(?!^)(?=(\d{3})+\.)/g
      : /(?!^)(?=(\d{3})+$)/g
    value = value.replace(reg, ',')
    inputVal.value = value
    inputRef.value!.value = value
  }
}
</script>

<style lang="scss">
.input-number {
  border: 1px solid;
}
</style>
```
