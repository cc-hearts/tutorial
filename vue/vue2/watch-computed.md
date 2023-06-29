# vue hooks(生命周期) computed watch methods 执行顺序

## 页面首次加载时

1. 如果`watch`字段没有设置`immediate:true` 则页面首次加载时 不会加载`watch`

```js
  watch: {
      count: {
          handler() {
              // 为了区分watch 添加颜色
              console.log('%c watch', 'color:#00d859;')
          },
      },
  },
```

> computed 首次加载 是在 `beforeCreate` 之后 在 `data` 初始化之后挂载

此时的页面加载顺序: `beforeCreate` => `inject` => `Props` => `Methods` => `Data` => `Computed` => `Watch` => `provide` => `created` => `beforeMount` => `mounted`

2. 设置了`immediate:true` 页面初始化便会加载`watch` 中的 `handler ` 方法

```js
watch: {
    count: {
        handler() {
            // 为了区分watch 添加颜色
            console.log('%c watch', 'color:#00d859;')
        },
        // 设置 immediate 则页面初始化会调用handler方法
        immediate: true,
    },
},
```

> 设置了 `immediate ` 之后 首次加载便会执行 `watch`

此时的页面加载顺序还是一致的 只不过设置了 `immediate` 之后 初始化 `watch` 的时候 就会调用一次

## 触发交互事件之后 watch methods computed 的执行顺序

> 交互事件 就是 例如 点击事件(@click) 输入事件(@input) 鼠标事件(@mouseMove 等) 这些与视图(浏览器)进行交互的 监听事件

执行的顺序: `methods` => **`watch`** => `beforeUpdate` => **`computed`** => `update`

完整代码调试:

> app.vue

```js
< template >
    <
    div >
    <
    Home: count = "count"
@add = "handleClick" / >
    <
    /div> <
    /template>

    <
    script >
    import Home from './pages/home/home.vue'
export default {
    name: 'App',
    data() {
        return {
            count: 0,
        }
    },
    components: {
        Home,
    },
    methods: {
        handleClick() {
            this.count += 1
        },
    },
} <
/script>

<
style > < /style>
```

> home.vue

```vue
<template>
  <div>
    <button @click="handleClick">刷新页面</button>
    {{ getCount }}
  </div>
</template>

<script>
export default {
  beforeCreate() {
    console.log('beforeCreated')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    this.data++
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },

  computed: {
    getCount() {
      console.log('%c computed', 'color:#427bd5;')
      return this.count
    },
  },
  watch: {
    count: {
      handler() {
        // 为了区分watch 添加颜色
        console.log('%c watch', 'color:#00d859;')
      },
      immediate: true,
    },
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleClick() {
      this.$emit('add')
    },
  },
}
</script>

<style></style>
```

## 参考资料

[vue2 生命周期图](https://v2.cn.vuejs.org/v2/guide/instance.html)
