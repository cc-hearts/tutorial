---
title: vue2 基础
---

## 获取当前的路由

```js
this.$route.path;
```

## watch 的深层使用

watch 用于监听数据的变化，但是如果监听的对象是一个引用类型的对象，对象的属性值变化默认是监听不到的 可以通过添加 deep 属性配置来深度监听

```js
watch: {
    tableData: {
        handler(newValue, oldValue) {
            // ...
        },
        deep: true, // 深度监听配置
    }
}
```

> handler 不仅可以是一个函数 还可以是一个数组函数 数组里面的函数会一次执行

```js
watch: {
    tableData: {
        handler: [
            function getData(newValue, oldValue) {
                // ...
            },
            function getLength(newValue, oldValue) {
                // ...
            },
        ];
    }
}
```

但是如果一个对象的属性很多 对每个属性都进行监听的性能开销会非常大 因为代码可以优化为:

```js
watch: {
    'tableData.rows.id': {
        handler(newValue, oldValue) {
            // ...
        },
        deep: true
    }
}
```

watch 还有一个属性就是 `immediate` 添加该属性之后可以使得侦听开始之后立即被调用（一般用于是否在侦听对象的初始化的时候是否需要进行侦听回调）

```js
watch: {
    'tableData.rows.id': {
        handler(newValue, oldValue) {
            // ...
        },
        deep: true,
        immediate: true,
    }
}
```

## .sync 的语法糖

sync 只是一个语法糖
官方例子:

```vue
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

后缩写为:

```vue
<text-document v-bind:title.sync="doc.title"></text-document>
```

> 注意 这里的 update 是 vue 约定好的部分 后面的 title 是要修改的状态的名称 需要和传入的 props 的名字对应（在 sync 中使用的时候）

```vue
<text-document v-bind.sync="doc"></text-document>
```

这样会把 doc 对象中的每一个 property (如 title) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器。

> v-modal 触发的是父组件的 input 事件，.sync 触发的是父组件的 update 事件

## vue2 响应式

* 对象类型 通过`Object.defineProperty()` 对属性的读取 修改 进行拦截(数据劫持)
* 数组类型：通过重写更新数组的一系列方法来实现拦截(对数组的变更方法进行了包裹)

> 数组响应式：https://segmentfault.com/a/1190000040238233

```js
Object.defineProperty(data, 'count', {
    get() {}
    set() {}
})
```

存在的问题

* 直接新增/删除属性 界面不会刷新

```vue
<script>
import Vue from 'vue'
export default {
  data() {
    return: {
      obj: {}
    }
  }
methods: {
  addProperty() {
  	this.obj.name = 1; // 数据不会响应式
    // 解决方法:
    this.$set(this.obj,'name', 1)
    Vue.set(this.obj,name,1)
	}
  handleDeleteProperty() {
    delete this.obj.name // 数据不会响应式
    // 解决方法:
    this.$delete(this.obj, 'name')
    Vue.delete(this.obj, 'name')
  	}
	}
}
</script>
```

* 直接通过下标修改数组界面不会刷新

```js
< script >
    import Vue from 'vue'
export default {
    data() {
        return: {
            arr: []
        }
    }
    methods: {
        addProperty() {
            this.arr[0] = 1; // 数据不会响应式
            // 解决方法:
            this.$set(this.arr, 0, 1)
            Vue.set(this.arr, 0, 1)
        }
        handleDeleteProperty() {
            delete this.arr[0] // 数据不会响应式
            // 解决方法:
            this.$delete(this.arr, 0)
            Vue.delete(this.arr, 0)
        }
    }
} <
/script>
```

## 生命周期钩子

如果一个组件没有(el 或者 template)，那么它的生命周期钩子 beforeCreate() 和 created() 会被调用 其他的不会被调用。

<!-- <img src="/images/lifecycle.png"> -->

## 废置属性

> slot slot-scope废弃 使用 v-slot代替

## 强制刷新

```js
... //相关修改操作
this.$forceUpdate() //强制重新渲染视图
```
