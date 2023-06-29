---
title: vue2 响应式原理实现-简易版
---

## defineReactive 实现

> `defineReactive` 函数 用于对 对象的属性进行数据劫持操作 如果劫持的数据类型是一个 引用的对象类型 则继续对数据进行递归劫持操作

```javascript
const childOb = observe(val)
```

> 而 observe 用于判断进行数据劫持的数据类型是否是一个引用类型 如果是一个引用类型 而且没有进行过数据劫持的操作 则通过 Obsever 类 进行迭代对象的每一个属性 进行数据劫持操作

```javascript
import Observer from './observer.js'

export function defineReactive(data, key, val) {
  // 获取属性描述的操作符
  const property = Object.getOwnPropertyDescriptor(data, key)
  if (property.configurable === false) return
  if (arguments.length === 2) {
    val = data[key]
  }
  // 如果数据是一个对象类型 则 进行递归添加属性
  const childOb = observe(val)
  Object.defineProperty(data, key, {
    configurable: true,
    get() {
      // 如果定义了getter 的话 则 获取的属性都是走 get的return的值 和原来的data[key] 无关了
      console.log('invoke getter:', val)
      return val
    },
    set(newVal) {
      console.log('invoke setter:', newVal)
      if (val === newVal) return
      observe(newVal)
      val = newVal
    },
  })
}
```

## observe 的实现

```javascript
// 通过 数据递归 对引用类型完成响应式的原理
function observe(value) {
  if (typeof value !== 'object' || value === null) return
  let ob
  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob
}
```

## Observer 类

```javascript
import { defineReactive } from './defineReactive.js'

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  })
}
export default class Observer {
  constructor(value) {
    this.value = value
    def(value, '__ob__', this)
    // 下面的定义会被枚举造成死循环
    // value.__ob__ = this
    // 判断是数组还是对象 是对象再次调用defineReactive 添加响应式对象
    if (Array.isArray(this.value)) {
    } else if (
      Object.prototype.toString.call(this.value) === '[object Object]'
    ) {
      const keys = Object.keys(this.value)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        defineReactive(this.value, key)
      }
    }
  }
}
```

上述便是递归实现响应式数据的简易版本&#x20;
这里的递归是通过 `defineReactive` 调用了 `observe` 判断是否是一个对象类型 如果是一个对象类型 而且没有进行过数据劫持 则通过 `new Observer` 对这整个对象的属性依次枚举依次进行数据劫持 又调用了 `defineReactive` 从而形成了一个逻辑的闭环

> 测试用例

```javascript
import { defineReactive } from './defineReactive.js'

const obj = {
  a: {
    b: {
      c: 1,
    },
  },
}

// 将obj所有的值添加为响应式对象
function define(obj) {
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    defineReactive(obj, key)
  }
}

define(obj)
console.log(obj)

setTimeout(() => {
  obj.a.b.c = {
    d: 123,
  }
})
```

## 响应式原理失效实现

设置属性的 `configurable` 使得该属性无法重写 getter setter 方法

```javascript
< template >
    <
    div id = "app" > {
        {
            a
        }
    } <
    /div> <
    /template>

    <
    script >
    import './index.less'

export default {
    name: 'App',
    data() {
        const obj = {
            a: {
                b: 1
            }
        }
        Object.defineProperty(obj, 'a', {
            configurable: false,
        })
        return obj
    },
    mounted() {
        console.log(this.a)
    },
} <
/script> <
style lang = "less" > < /style>
```
