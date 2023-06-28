---
title: 设计模式
---

# 观察者模式

```typescript
interface Observer {
  update(...args: any[]): unknown
}
// Subject对象存储依赖对象改变后 通知观察者依赖已经修改
class Subject {
  /**
   * @param observers 对象改变通知的依赖
   * @param state 存放被观察的对象
   */
  constructor(
    private observers: Array<Observer> = [],
    private state: unknown = null
  ) {}
  add(observer: Observer) {
    this.observers.push(observer)
  }

  remove(observer: Observer) {
    const index = this.observers.findIndex((ob) => ob === observer)
    index > -1 && this.observers.splice(index, 1)
  }

  removeAll() {
    this.observers.length = 0
  }

  getState() {
    return this.state
  }

  setState(state: unknown) {
    if (state !== this.state) {
      this.state = state
      this.notifyAllObservers()
    }
  }

  notifyAllObservers() {
    for (let observer of this.observers) {
      observer && observer.update instanceof Function && observer.update()
    }
  }
}

// 创建实体观察者类
class ChildObserver implements Observer {
  constructor(private subject: Subject) {
    subject.add(this)
  }
  update(): void {
    console.log('ChildObserver: update')
  }
}

function main() {
  const subject = new Subject() // 主体对象
  // 创建观察者对象
  new ChildObserver(subject)
  // 主体的依赖改变的时候 通知观察者对象 改变
  subject.setState('change log')
}

main()
```
