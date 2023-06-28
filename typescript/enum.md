------
title: 枚举
---

**枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。**
**又分为 普通枚举 常数枚举 外部枚举**

# **常数项**

枚举（Enum）类型用于取值被限定在一定范围内的场景

```typescript
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}
```

枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射:

```typescript
var Days
;(function (Days) {
  Days[(Days['Sun'] = 0)] = 'Sun'
  Days[(Days['Mon'] = 1)] = 'Mon'
  Days[(Days['Tue'] = 2)] = 'Tue'
  Days[(Days['Wed'] = 3)] = 'Wed'
  Days[(Days['Thu'] = 4)] = 'Thu'
  Days[(Days['Fri'] = 5)] = 'Fri'
  Days[(Days['Sat'] = 6)] = 'Sat'
})(Days || (Days = {}))
```

## 手动赋值

```typescript
enum Days {
  Sun = 3,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days[3] == 'Sun') // false
console.log(Days['Sun']) //3
```

因为手动赋值的缘故 导致 Days\[3]的值先是"Sun" 而后又被"Wed"覆盖了

```typescript
var Days
;(function (Days) {
  Days[(Days['Sun'] = 3)] = 'Sun'
  Days[(Days['Mon'] = 1)] = 'Mon'
  Days[(Days['Tue'] = 2)] = 'Tue'
  Days[(Days['Wed'] = 3)] = 'Wed'
  Days[(Days['Thu'] = 4)] = 'Thu'
  Days[(Days['Fri'] = 5)] = 'Fri'
  Days[(Days['Sat'] = 6)] = 'Sat'
})(Days || (Days = {}))
```

**手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1 (小数会出现精度丢失的问题 慎用)**

手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)：

```typescript
enum Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};


---------
  var Days;
(function (Days) {
    Days[Days["Sun"] = 7] = "Sun";
    Days[Days["Mon"] = 8] = "Mon";
    Days[Days["Tue"] = 9] = "Tue";
    Days[Days["Wed"] = 10] = "Wed";
    Days[Days["Thu"] = 11] = "Thu";
    Days[Days["Fri"] = 12] = "Fri";
    Days[Days["Sat"] = "S"] = "Sat";
})(Days || (Days = {}));
```

如果不是数字 则该项后面的每一个枚举项都要初始化

# **计算所得项**

```typescript
enum Color {
  Red,
  Green,
  Blue = 'blue'.length,
}
```

"blue".length 就是一个计算所得项
**如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错**：

> 当满足以下条件时，枚举成员被当作是常数:

# 常数枚举

常数枚举是使用 const enum 定义的枚举类型：

```typescript
const enum Directions {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
]
```

常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
编译结果：

```javascript
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */]
```

假如包含了计算成员，则会在编译阶段报错：

```typescript
const enum Color {
  Red,
  Green,
  Blue = 'blue'.length,
}

// index.ts(1,38): error TS2474: In 'const' enum declarations member initializer must be constant expression.
```

# 外部枚举

外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型：

**declare 定义的类型只会用于编译时的检查，编译结果中会被删除。**

```typescript
declare enum Directions {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
]
```

编译结果:

```typescript
var directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
]
```

同时使用 declare 和 const 也是可以的

```typescript
declare const enum Directions {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
]
```

编译结果：

```typescript
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */]
```
