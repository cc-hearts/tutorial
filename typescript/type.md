---
title: 类型
---

## 数组类型

1. 类型 + \[] 表示的方法

```typescript
let fibonacci: number[] = [1, 1, 2, 3, 5]

// 数组的项中不允许出现其他的类型
let fibonacciTo: number[] = [1, 1, 2, 3, '5'] // 不能将类型“string”分配给类型“number”。

// 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制
let fibonacciNumber: number[] = [1, 1, 2, 3, 5]
fibonacciNumber.push('8') //类型“string”的参数不能赋给类型“number”的参数。

// 如果数组里面需要使用多个值 可以用type启用一个类型别名

type types = string | number

let fi: types[] = [1, 2, 3, 4, 5, '5']
```

## 数组范型

使用 Array\<elemType\> 表示一个数组

```typescript
let arrayGenerics: Array<string | number> = [1, 2, 3, 4, 5, '5']
```

用接口表示一个数组

```typescript
// 只要索引的类型为数字的时候 他的索引类型就必须是number类型或者string类型(ts会存在转换)

interface inter {
  [index: number]: number | string
}

let fibo: inter = [1, 123, 3213213, 321]
fibo[1] === fibo['1']
```

> 数字索引是 string 索引的子集
> 如果接口定义了 string 类型的任意属性签名，它不仅会影响其他 string 类型的签名，也会影响其他 number 类型的签名。
> 这一点可以参考两种任意类型签名并存时，number 类型的签名指定的值类型必须是 string 类型的签名指定的值类型的子集这句话。

```typescript
interface it {
  [index: number]: number | string // 会报错 “number”索引类型“string | number”不能分配给“string”索引类型“object”。
  [index: string]: object
}
```

## 类数组

类数组（Array-like Object）不是数组类型，比如 arguments
类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等

```typescript
interface likeObjArray {
  [index: number]: number
  length: number
  callee: Function
}

function sum(a: number, b: number): void {
  // let arg : number[]= arguments; //  类型“IArguments”缺少类型“number[]”的以下属性: pop, push, concat, join 及其他 27 项。
  let arg: likeObjArray = arguments
  // 注意不要写成
  // let arg : Array<likeObjArray> = arguments // 这里说明了 arg是一个二维数组 里面的每一项 都是likeObjArray的类数组
  let args: Array<likeObjArray> = Array(arguments)
}
```

```typescript
// 其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是
interface IArguments {
  [index: number]: any
  length: number
  callee: Function
}
```

## 索引类型

```typescript
const app = ['taobao', 'timal', 'alipay'] as const

// a = taobao | timal | alipay
type a = (typeof app)[number] // 如果传入string 会报错
```

## 布尔类型

```typescript
let b: boolean = false
let t: boolean = true

// const bObj:boolean  = new Boolean();
// Type 'Boolean' is not assignable to type 'boolean'.   'boolean' is a primitive,
// but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.

// 事实上 new Boolean() 返回的是一个 Boolean 对象
const bObj: Boolean = new Boolean()

// 直接调用 Boolean 也可以返回一个 boolean 类型：
const bb: boolean = Boolean(1)
console.log(bb) // false
console.log(bObj) // Boolean 类实例化的对象
```

## 函数类型

> 范型函数的一些要点：
>
> 1. 尽可能用更少的类型参数
> 2. 如果一个类型参数仅仅出现在一个地方，强烈建议你重新考虑是否真的需要它

在 TypeScript 中，函数也被认为是 object

> 函数的返回一个 void 他可以返回任何值 但返回的值会被忽略掉
> 如果定义的是一个字面量 则不能返回东西

```typescript
const f4 = function (): void {
  return true //会报错
}
```

```typescript
// 函数声明
function func(str: number, str2: number): number {
  return str2 + str
}

func(1, 2) // 输入多余变量或者少于多余变量都是不允许的

//函数表达式

// TODO: 这里只对赋值的右边进行了定义
let myFunc = function (x: number, y: number): number {
  return x + y
}
// 完整定义一个函数表达式

// 注意区分箭头函数和 ts类型定义的函数
let myfunc: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y
}
```

## 函数的可选参数

可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了

```typescript
function options(options: number, y?: number): number {
  return typeof y === 'number' ? options + y : options
}
```

y 的类型应该是 number | undefined

> 当你写一个回调函数的类型时,不要写一个可选参数, 除非你真的打算调用函数的时候不传入实参

```typescript
myForEach([1, 2, 3], (a, i) => {
  // i 可能会为undefined 这里的ts会报错
  console.log(i.toFixed())
  // Object is possibly 'undefined'.
})
```

## 参数默认值

```typescript
function optionsParams(options: number, y: number = 2): number {
  return options + y
}
```

## 剩余参数

```typescript
function resetFunc(n: number, ...rest: any[]): void {
  // ...
}
```

## 接口定义函数

```typescript
interface searchFunc {
  (source: string, subString?: string): number
  (source: string): boolean
}

function aFunc(foo: number): number
function aFunc(foo: number, subString?: string): number | boolean {
  if (typeof foo === 'number' && typeof subString === 'string') {
    return true
  } else return 12
}
```

## 函数重载的两种方式

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理
TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

1. 函数声明定义函数重载的方式

> 函数重载的返回值类型都是按照重载的却没有实现的最后一个类型确定的 (例如下面的最后一个确定却没有实现的是 string)

> 当从多重调用签名（就比如重载函数）中推断类型的时候，会按照最后的签名进行推断，因为一般这个签名是用来处理所有情况的签名

```typescript
function aFunc(foo: number): number
function aFunc(foo: string): string
function aFunc(
  foo: number | string,
  subString?: string
): number | boolean | string {
  if (typeof foo === 'number' && typeof subString === 'string') {
    return true
  } else if (foo === 'string') {
    return 'string'
  } else return 12
}
type funcType<T> = T extends (...args: any[]) => infer r ? r : never // returnType<R>
type aFuncType = funcType<typeof aFunc> // aFuncType = string
```

前面两个函数签名被称为重载签名
后面一个是一个兼容签名的函数（这里也被称为实现签名）

> 实现签名必须和重载签名必须兼容

2. 接口定义函数重载的方式

> 重载覆盖都是一样的 用 ReturnType 推断的也是最后一个返回值

```typescript
interface searchFunc {
  (source: string, subString?: string): number
  (source: string): boolean
}

type func = ReturnType<searchFunc> // boolean
let mySearch = function (
  source: string,
  subString?: string
): ReturnType<searchFunc> {
  if (subString) return source.search(subString) !== -1
  else return true
}
```

## 联合类型 |

联合类型表示的是多种取值当中的一种情况 采用| 进行分隔

> 如果采用联合类型 不确定具体的类型的时候 可以使用联合类型的公共类型 不能使用某一个属性的单独的一个类型

```typescript
function getLengths(type: string | number): unknown {
  // 类型“string | number”上不存在属性“length”。  类型“number”上不存在属性“length”
  // return type.length

  // 访问number和string的共有属性没有问题
  return type.toString()
}
```

## 交叉类型 &

> 多种类型的集合

交叉类型会把同一类型做合并 不同的类型舍弃

## 类型推论

没有明确指定一个类型 ts 会根据类型推论的规则推断一个类型

```typescript
let number = 7 //这里进行了类型推论 number变量的类型是number

// 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
let numbers //这里的类型是any

numbers = 'a' // numbers:any

numbers = number // numbers: any
```

## this 类型

TypeScript 可以允许你在函数体内声明 this 的类型

在类中，有一个特殊的名为 this 的类型，会动态的引用当前类的类型，

## 分发条件类型

```typescript
// 分发条件类型
type toArray<Type> = Type extends any ? Array<Type> : never

// string[] | number[]
type result = toArray<string | number>

// 如果要的是(string | number)[] 的结果 可以为
type toArray1<Type> = [Type] extends [any] ? Array<Type> : never

type result2 = toArray1<string | number>
```

## 映射类型

```typescript
// 映射类型，就是使用了 PropertyKeys 联合类型的泛型，其中 PropertyKeys 多是通过 keyof 创建，然后循环遍历键名创建一个类型
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean
}

type add = OptionsFlags<PresentationStyle>
```

## 映射修饰符

```typescript
// 在使用映射类型时，有两个额外的修饰符可能会用到，一个是 readonly，用于设置属性只读，一个是 ? ，用于设置属性可选。

// 你可以通过前缀 - 或者 + 删除或者添加这些修饰符，如果没有写前缀，相当于使用了 + 前缀
// 删除属性中的只读属性
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property]
}

type LockedAccount = {
  readonly id: string
  readonly name: string
}

type UnlockedAccount = CreateMutable<LockedAccount>

// type UnlockedAccount = {
//    id: string;
//    name: string;
// }

// 删除属性中的可选属性
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property]
}

type MaybeUser = {
  id: string
  name?: string
  age?: number
}

type User = Concrete<MaybeUser>
// type User = {
//    id: string;
//    name: string;
//    age: number;
// }
```

as 键名重新命名：

```typescript
// 这里的Events 就是 SquareEvent | CircleEvent   E in keyof Events ===  E = kind x y | kind radius
type EventConfig<Events extends { kind: string }> = {
  // [E in keyof Events as Events["kind"] ]: (event: E) => void
  [E in keyof Events]: (event: E) => void
}
// 传入的是 SquareEvent | CircleEvent
// Events 就是 SquareEvent
type SquareEvent = { kind: 'square'; x: number; y: number }

type CircleEvent = { kind: 'circle'; radius: number }

// 这里相当于是 {kind(){}, x(){},y(){}}
// {kind(){},radius(){}}
type Config = EventConfig<SquareEvent | CircleEvent>
const asss: Config = {
  kind() {},
  x() {},
  radius() {},
}
```

## 构造函数使用声明

```typescript
type a<Type> = { new (): Type }

class func {
  constructor() {
    return new Date()
  }
}

function funcs<T>(as: a<T>) {
  // ... so that
}

funcs<func>(func)
```

## 明确赋值断言操作符

```typescript
class OKGreeter {
  // Not initialized, but no error
  name!: string
}
```
