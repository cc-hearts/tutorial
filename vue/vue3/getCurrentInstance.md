---
title: getCurrentInstance
---

# getCurrentInstance

```vue
<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const cur = getCurrentInstance()
console.log(cur.ctx)
console.log(cur.proxy)
</script>
```

获取当前组件的实例对象 当前的实例对象主要在 `ctx` 或者 `proxy` 属性中
