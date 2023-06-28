---
title: 装饰器
---

## 方法装饰器

> `@readonly`

```ts
function readonly(target, key, descriptor) {}
class Cat {
  m() {
    return `${this.name} is cats`
  }
}
// 相当于
let descriptor = {
  value: func,
  enumerable: false,
  configurable: true,
  writable: true,
}
const descriptor = readonly(Cat.prototype, 'm', descriptor) || descriptor
Object.defineProperty(Cat.prototype, 'm', descriptor)
```

## 参考资料

- [Exploring EcmaScript Decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)

- [装饰器](https://www.tslang.cn/docs/handbook/decorators.html)
