---
title: rxjs 基本的理解与使用
---

```ts
// Observable 用于监听一个一个的事件
type callback = (...args: any[]) => void
class Observable {
  // new 一个Observable 的时候需要传入一个订阅的逻辑
  constructor(public _subscriber: (...args: any[]) => void) {}
  // 调用 subScribe 也就是订阅的方法 将
  subScribe(observer: {
    next?: callback
    error?: callback
    complete?: callback
  }) {
    // 创建一个订阅者
    const subScriber = new Subscriber(observer)
    // 收集自身的返回值用于取消订阅 取消订阅是在 _subscriber中返回的
    subScriber.add(this._subscriber(subScriber))
    return subScriber
  }

  pipe(...operations) {
    return pipeFormArray(operations)(this)
  }
}

class Subscription {
  constructor(
    private readonly _tearDowns: (callback | { unsubscribe: callback })[] = []
  ) {}

  unsubscribe() {
    this._tearDowns.forEach((call) => {
      typeof call === 'function' ? call() : call?.unsubscribe()
    })
  }

  add(teardown) {
    teardown && this._tearDowns.push(teardown)
  }
}
class Subscriber extends Subscription {
  private isStopped: boolean
  constructor(
    private observer: { next?: callback; error?: callback; complete?: callback }
  ) {
    super()
    this.isStopped = false
  }

  error<T>(value: T) {
    this.isStopped = true
    this.observer.error?.(value)
  }

  next<T>(value: T) {
    if (this.isStopped) return
    this.observer.next?.(value)
  }

  complete<T>(value: T) {
    this.isStopped = true
    this.observer.complete?.(value)

    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }
}

function map(callback: callback) {
  // 返回一个新的observable
  // subscriber 是下一个的订阅者
  return (observable) =>
    new Observable((subscriber) => {
      const subscription = observable.subScribe({
        next(val) {
          // 将上一次的值传递到给下一次的订阅者
          console.log(val)
          return subscriber.next(callback(val))
        },
        err(err) {
          return subscriber.error(err)
        },
        complete() {
          subscriber.complete()
        },
      })
      return subscription
    })
}

function pipeFormArray(fns) {
  if (fns.length === 0) {
    return (x) => x
  }
  if (fns.length === 1) {
    return fns[0]
  }

  return (input) => {
    return fns.reduce((acc, fn) => {
      return fn(acc)
    }, input)
  }
}
const observable = new Observable((subscriber) => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)
  setTimeout(() => {
    subscriber.next(4)
    subscriber.complete()
  }, 1000)
})

console.log('just before subscribe')
// 返回的是最后一个管道的 Observable实例
observable
  .pipe(
    map((x) => x * 10),
    map((x) => x * 10)
  )
  .subScribe({
    next(x) {
      console.log('got value ' + x)
    },
    error(err) {
      console.error('something wrong occurred: ' + err)
    },
    complete() {
      console.log('done')
    },
  })
console.log('just after subscribe')
```

> 案例测试：

```ts
import { Observable } from 'rxjs'

const observable = new Observable((subscriber) => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)
  setTimeout(() => {
    subscriber.next(4)
    subscriber.complete()
  }, 1000)
})

console.log('just before subscribe')
observable.subscribe({
  next(x) {
    console.log('got value ' + x)
  },
  error(err) {
    console.error('something wrong occurred: ' + err)
  },
  complete() {
    console.log('done')
  },
})
console.log('just after subscribe')
```

## 参考资料

* [80 行代码实现简易 RxJS](https://mp.weixin.qq.com/s/G-Af4gDuBuXuHMTV-de-0w)
---
title: rxjs 基本的理解与使用
---

```ts
// Observable 用于监听一个一个的事件
type callback = (...args: any[]) => void
class Observable {
  // new 一个Observable 的时候需要传入一个订阅的逻辑
  constructor(public _subscriber: (...args: any[]) => void) {}
  // 调用 subScribe 也就是订阅的方法 将
  subScribe(observer: {
    next?: callback
    error?: callback
    complete?: callback
  }) {
    // 创建一个订阅者
    const subScriber = new Subscriber(observer)
    // 收集自身的返回值用于取消订阅 取消订阅是在 _subscriber中返回的
    subScriber.add(this._subscriber(subScriber))
    return subScriber
  }

  pipe(...operations) {
    return pipeFormArray(operations)(this)
  }
}

class Subscription {
  constructor(
    private readonly _tearDowns: (callback | { unsubscribe: callback })[] = []
  ) {}

  unsubscribe() {
    this._tearDowns.forEach((call) => {
      typeof call === 'function' ? call() : call?.unsubscribe()
    })
  }

  add(teardown) {
    teardown && this._tearDowns.push(teardown)
  }
}
class Subscriber extends Subscription {
  private isStopped: boolean
  constructor(
    private observer: { next?: callback; error?: callback; complete?: callback }
  ) {
    super()
    this.isStopped = false
  }

  error<T>(value: T) {
    this.isStopped = true
    this.observer.error?.(value)
  }

  next<T>(value: T) {
    if (this.isStopped) return
    this.observer.next?.(value)
  }

  complete<T>(value: T) {
    this.isStopped = true
    this.observer.complete?.(value)

    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }
}

function map(callback: callback) {
  // 返回一个新的observable
  // subscriber 是下一个的订阅者
  return (observable) =>
    new Observable((subscriber) => {
      const subscription = observable.subScribe({
        next(val) {
          // 将上一次的值传递到给下一次的订阅者
          console.log(val)
          return subscriber.next(callback(val))
        },
        err(err) {
          return subscriber.error(err)
        },
        complete() {
          subscriber.complete()
        },
      })
      return subscription
    })
}

function pipeFormArray(fns) {
  if (fns.length === 0) {
    return (x) => x
  }
  if (fns.length === 1) {
    return fns[0]
  }

  return (input) => {
    return fns.reduce((acc, fn) => {
      return fn(acc)
    }, input)
  }
}
const observable = new Observable((subscriber) => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)
  setTimeout(() => {
    subscriber.next(4)
    subscriber.complete()
  }, 1000)
})

console.log('just before subscribe')
// 返回的是最后一个管道的 Observable实例
observable
  .pipe(
    map((x) => x * 10),
    map((x) => x * 10)
  )
  .subScribe({
    next(x) {
      console.log('got value ' + x)
    },
    error(err) {
      console.error('something wrong occurred: ' + err)
    },
    complete() {
      console.log('done')
    },
  })
console.log('just after subscribe')
```

> 案例测试：

```ts
import { Observable } from 'rxjs'

const observable = new Observable((subscriber) => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)
  setTimeout(() => {
    subscriber.next(4)
    subscriber.complete()
  }, 1000)
})

console.log('just before subscribe')
observable.subscribe({
  next(x) {
    console.log('got value ' + x)
  },
  error(err) {
    console.error('something wrong occurred: ' + err)
  },
  complete() {
    console.log('done')
  },
})
console.log('just after subscribe')
```

## 参考资料

* [80 行代码实现简易 RxJS](https://mp.weixin.qq.com/s/G-Af4gDuBuXuHMTV-de-0w)
