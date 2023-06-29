---
title: 记录 image src 缓存问题
---

> 出现的问题： 当调用 api 去修改保存在服务器上的图片路径的时候 由于根据特定的算法 导致新生成的图片 `path` 和 原来的图片的 `path` 一致 此时 `img` 的标签会判断由于已经加载过 `path` 从而走浏览器缓存 不会再次请求远程资源 导致浏览器图片更新而页面无法查看效果

> app.vue

```vue
<template>
  <div>
    <Children
      :key="keys"
      img="https://mmbiz.qpic.cn/mmbiz_png/A1HKVXsfHNlwgSFtFxtcSIDswt94ibibvxpKPZgK1EOwvGOkRJq6jtz25qWcbjaWTcOR0DLLGzBv7735uV2gafuw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1"
    />

    <button @click="handleClick">click change key</button>
  </div>
</template>

<script>
import Children from './children.vue'

export default {
  components: {
    Children,
  },

  data() {
    return {
      keys: Date.now(),

      image:
        'https://mmbiz.qpic.cn/mmbiz_png/A1HKVXsfHNlwgSFtFxtcSIDswt94ibibvxpKPZgK1EOwvGOkRJq6jtz25qWcbjaWTcOR0DLLGzBv7735uV2gafuw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1',
    }
  },

  methods: {
    handleClick() {
      this.keys = Date.now()
    },
  },
}
</script>

<style></style>
```

> children.vue

```vue
<template>
  <div>
    <img :src="img" alt="" />
    {{ Date.now() }}
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,

      default: '',
    },
  },

  created() {
    console.log('created')
  },
}
</script>

<style></style>
```

通过点击按钮 我们可以修改 key 值 销毁子组件并且重新生成子组件

> 每次点击的时候 控制台会重新打印 `created`

但是可以在 `f12` 中的 `network` 中的 `img` 可以看到 浏览器并没有重新调用请求资源 而是直接走了组件的缓存资源 但是我们可以在请求图片资源的后面拼接时间戳 使得每次请求图片资源的时候 都能够从远程获取最新的资源

在 `app.vue` 中 动态的更改时间戳 并且拼接到图片路径后

> app.vue

```js
export default {
  data() {
    return {
      image:
        'https://mmbiz.qpic.cn/mmbiz_png/A1HKVXsfHNlwgSFtFxtcSIDswt94ibibvxpKPZgK1EOwvGOkRJq6jtz25qWcbjaWTcOR0DLLGzBv7735uV2gafuw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1',

      time: Date.now(),
    }
  },

  methods: {
    handleClick() {
      // 不在改变key 可以通过条件改变时间戳从而让图片资源重新获取
      this.time = Date.now()
    },
  },
}
```
