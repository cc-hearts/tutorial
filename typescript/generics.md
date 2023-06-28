---
title: 范型
---

泛型（Generics）是指在定义函数、接口或类（包括范型函数）的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

# 范型约束

> T extends U 保证了 T 是 U 的子类或者 T 就是 U 的类

```typescript
interface length {
  length: number
}

function add<T extends length>(arg: T): number {
  return arg.length
}
```

```java
class O {
  n: string
}

class Person extends O {
  name: string
}

class Student extends Person {
  age: number
}



function test<T extends Person>(num: T) {
  console.log(num);
}
// 此时是 Person的子类
test({ name: '1', age: 2, n: '1' });

// 报错
// test(new O());

test(new Person());
test(new Student());

```

# 泛型参数的默认类型

> 可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

```typescript
function createArray<T = string>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
```

# 范型接口

```typescript
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>
}

createArray = function <T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
```

可以把泛型参数提前到接口名

```typescript
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>
}

let createArray: CreateArrayFunc<any>
createArray = function <T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
```

## 泛型类

```typescript
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
```

```typescript
// 范型类
class GenericClass<T> {
  public name: T

  r<E>(str: T = null) {
    console.log(str)
  }
}

// 范型接口
interface GenericInterface<T> {
  name: T
}

//范型方法（函数）
function names<T>(): void {}

// 箭头函数的范型方法
;<T>() => {}

const g: GenericClass<string> = new GenericClass()

g.r<string>()
```

# keyof 约束

> 在范型中则使用 extends keyof 约束

```typescript
// keyof Studen 相当于 是 Student的联合类型 'name' | 'n' | 'age'
function test<T extends Person, U extends keyof Student>(num: T, key: U) {
  console.log(num)
}
// 此时是 Person的子类
test({ name: '1', age: 2, n: '1' }, 'name')

// 报错
// test(new O());

test<Person, 'name' | 'n'>(new Person(), 'name')
test<Student, 'name' | 'n' | 'age'>(new Student(), 'age')

// 相当于了 Person的联合类型
const num: keyof Person = 'name'
```
