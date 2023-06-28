---
title: 接口和类
categories: Typescript
---

类的三种修饰符 (这里缺醒的修饰符表示的是 public 而不是 default)

> 字段可以添加一个 readonly 前缀修饰符，这会阻止在构造函数之外的赋值

TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。

- public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
- private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

TypeScript 编译之后的代码中，并没有限制 private 属性在外部的可访问性

### readonly

只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。

> readonly 不能改变值 但是 可以通过别名修改(赋值给别的变量修改)

```typescript
interface person {
  readonly name: string
  readonly age: number
}

const a: person = {
  name: 'John',
  age: 36,
}

const b: {
  name: string
  age: number
} = a

b.age++
console.log(a)
```

### 抽象类

abstract 用于定义抽象类和其中的抽象方法

抽象类是不允许被实例化

> 抽象类实现接口

抽象类会实现接口的

## 类实现接口

## 接口继承接口

## 接口继承类

## 类作为类类型使用

声明 类时创建的类的 类型只包含其中的实例属性和实例方法：

```typescript
class Point {
  /** 静态属性，坐标系原点 */
  static origin = new Point(0, 0)
  /** 静态方法，计算与原点距离 */
  static distanceToOrigin(p: Point) {
    return Math.sqrt(p.x * p.x + p.y * p.y)
  }
  /** 实例属性，x 轴的值 */
  x: number
  /** 实例属性，y 轴的值 */
  y: number
  /** 构造函数 */
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  /** 实例方法，打印此点 */
  printPoint() {
    console.log(this.x, this.y)
  }
}

interface PointInstanceType {
  x: number
  y: number
  printPoint(): void
}

let p1: Point
let p2: PointInstanceType
```

Point 和类型 PointInstanceType 是等价的
接口继承类的时候，也只会继承它的实例属性和实例方法

> ts 中并不支持向上转型
> 如果一个属性是 private 支持在类中并且传入的实例中引用

```typescript
class MySafe {
  private secretKey = 12345
}

const s = new MySafe()

// Not allowed during type checking
console.log(s.secretKey)
// Property 'secretKey' is private and only accessible within class 'MySafe'.

// OK
console.log(s['secretKey'])
```

ts 的 private 是弱私有 javascript 的#是强私有

# 抽象构造签名

> 例如：new() => base

```typescript
function greet(ctor: new () => Base) {
  const instance = new ctor()
  instance.printName()
}
greet(Derived)
greet(Base)
```

## 声明类

```ts
// {new (): T} 可以声明一个class类
// 声明一个函数可以使用 { (): void } 不带new 关键字即可
const StringClass: {
  new (...args: never[]): String & object
} = class extends String {
  constructor(...args: never[]) {
    super()
    return ''
  }
}
```
