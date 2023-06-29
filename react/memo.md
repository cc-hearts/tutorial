---
title: 缓存函数的实现
---

# 缓存函数的实现

```ts
// 缓存函数的实现
class CacheNode {
  s = 0 // 状态值 0 表示还未结束 1表示 已经结束 2表示错误的结束
  v // 缓存的结果值
  p // 缓存基本数据类型的参数 使用new Map() 缓存
  o // 缓存引用类型的参数 使用 new WeakMap() 缓存
}

// 一般是当前fiber的缓存节点
const dispatchCache = {
  current: new WeakMap(),
}
function cache(fn) {
  return function () {
    let fnMap = dispatchCache.current
    if (fnMap === void 0) {
      // 说明当前的fiber不缓存 直接return即可
      return fn.apply(null, arguments)
    }
    let fnNode = fnMap.get(fn)
    let cacheNode
    // 对function 进行 缓存
    if (fnNode === void 0) {
      // 当前组件应该要被缓存 但是还没有值
      cacheNode = new CacheNode()
      fnMap.set(fn, cacheNode)
    } else {
      cacheNode = fnNode
    }
    // 接下来对函数的属性值进行缓存
    for (let i = 0; i < arguments.length; i++) {
      const arg = arguments[i]
      // 判断是原始数据类型还是引用类型
      if (
        (typeof arg == 'object' && arg !== null) ||
        typeof arg === 'function'
      ) {
        // 引用数据类型 使用WeakMap缓存
        let cacheObject = cacheNode.o
        if (cacheObject === void 0) {
          // 如果当前的args 没有被加入缓存 则加入缓存
          cacheObject = cacheNode.o = new WeakMap()
        }
        // 获取下一个cacheNode
        const nextCacheNode = cacheObject.get(arg)
        if (nextCacheNode === void 0) {
          // 添加映射
          cacheNode = new CacheNode()
          cacheObject.set(arg, cacheNode)
        } else {
          cacheNode = nextCacheNode
        }
      } else {
        // 原始数据类型
        let primitiveObject = cacheNode.p
        if (primitiveObject === void 0) {
          primitiveObject = cacheNode.p = new Map()
        }
        // 下一个cache缓存的值
        let nextPrimitiveCache = primitiveObject.get(arg)
        if (nextPrimitiveCache === void 0) {
          cacheNode = new CacheNode()
          primitiveObject.set(arg, cacheNode)
        } else {
          cacheNode = nextPrimitiveCache
        }
      }
    }
    if (cacheNode.s === 1 || cacheNode.s === 2) {
      return cacheNode.v
    }
    // 最后cacheNode 会在最后一个节点
    try {
      const result = fn.apply(null, arguments)
      cacheNode.s = 1
      cacheNode.v = result
      return result
    } catch (error) {
      const err = error
      cacheNode.s = 2
      cacheNode.v = err
      return err
    }
  }
}

module.exports = {
  cache,
}
```
