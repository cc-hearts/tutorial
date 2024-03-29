---
title: Map Set
---

对于 Map 的定义
Map 对象用于保存键值对 任何值(对象或者原始值)都可以作为一个键或者一个值

# Map 与 Object 的区别

1. Object 的对象的键只能是字符串或者 Symbols Map 的键值对可以是任意值
2. Map 中的键值是有序的（FIFO 原则），而添加到对象中的键则不是
3. Map 的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算。
4. Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。

如果是基本数据类型 则 key 取的是基本数据类型的值
如果是引用数据类型 则 key 取的是地址的值

# set(key, value)和 get(key)

```javascript
// key 为 字符串
let map = new Map()
let str = 'str'
let value = {}

map.set(str, value)
// get
console.log(map.get(str)) //{}
console.log(map.get('str')) //{}

// key 是对象
let mapObj = new Map()
let valueObj = {}

mapObj.set(valueObj, 'obj')
//get
console.log(mapObj.get(valueObj)) // obj
console.log(mapObj.get({})) // undefined valueObj !== {} 并不等于这里的{}

// key 是函数
let valueFunc = function () {}
let mapFunc = new Map()
mapFunc.set(valueFunc, 'mapFunc')
//get
console.log(mapFunc.get(valueFunc)) // mapFunc
console.log(mapFunc.get(function () {})) // undefined 引用类型

// key 是 NaN
let valueNaN = NaN
let NaNMap = new Map()

NaNMap.set(valueNaN, 'NaN')
//get
console.log(NaNMap.get(valueNaN)) // NaN
console.log(NaNMap.get(NaN)) // NaN
// 虽然 NaN 和任何值甚至和自己都不相等(NaN !== NaN 返回true)，NaN作为Map的键来说是没有区别的。
```

# Map 的迭代

- for of 迭代

```javascript
let map = new Map()

map.set(0, 'zero')
map.set(1, 'one')
// for of 迭代
for (let [key, value] of map) {
  console.log(key + '=' + value)
}
```

## entries() : MapIterator

entries 方法返回一个新的 Iterator 对象，它按插入顺序包含了 Map 对象中每个元素的 \[key, value] 数组。

```javascript
// entries方法
for (let [key, value] of map.entries()) {
  console.log(key + '=' + value)
}
```

## keys() : MapIterator

这个 keys 方法返回一个新的 Iterator 对象， 它按插入顺序包含了 Map 对象中每个元素的键。

```javascript
for (const key of map.keys()) {
  console.log(key)
}
```

## values(): MapIterator

这个 values 方法返回一个新的 Iterator 对象，它按插入顺序包含了 Map 对象中每个元素的值。

```javascript
for (const value of map.values()) {
  console.log(value)
}
```

## forEach()

```javascript
map.forEach((value, key, map) => {
  console.log(value, key, map)
})
```

# constractor

Map 的构造函数 可以将一个二维的键值对数组转化成一个 Map 对象

```javascript
let array = [
  ['key1', 'value1'],
  ['key2', 'value2', 'value3'],
]

let maps = new Map(array) //Map(2) { 'key1' => 'value1', 'key2' => 'value2' }
```

使用 Array.from 函数可以将一个 Map 对象转换成一个二维键值对数组

```javascript
varoutArray = Array.from(maps)
```

## Map 克隆

```javascript
let array = [
  ['key1', 'value1'],
  ['key2', 'value2', 'value3'],
]

let maps = new Map(array) //Map(2) { 'key1' => 'value1', 'key2' => 'value2' }
let maps2 = new Map(maps)
// Map 对象构造函数生成实例，迭代出新的对象。
console.log(maps === maps2) // false
console.log(maps2) // //Map(2) { 'key1' => 'value1', 'key2' => 'value2'}
```

# 合并

合并两个 Map 对象时，如果有重复的键值，则后面的会覆盖前面的

```javascript
var first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
])
var second = new Map([
  [1, 'uno'],
  [2, 'dos'],
])

var merged = new Map([...first, ...second]) //对应值即 uno，dos， three
```

# 结构赋值

```javascript
let map = new Map();
map.set(1, 2) //Map(1) {1 => 2}
map.set(2, 3) //Map(2) {1 => 2, 2 => 3}
[...map] // [Array(2), Array(2)]
```

# Set

**set 的构造函数接收一个数组 返回一个 Set 的实例化对象**

Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

\_Set 对象存储的值总是唯一的 所以需要判断两个值是否相等 \_
_特殊情况的几个值需要另外判断_

- _+0 和 -0 在存储判断唯一性的时候是恒等的 所以不重复_
- _undefined 与 undefined 是恒等的 所以不重复_
- _NaN 与 NaN 是不恒等的 在 Set 中只能存一个 不重复_

```javascript
let set = new Set()

set.add(+0)
set.add(-0)
console.log(set) // Set(1) {0}

set.add(undefined)
set.add(undefined)
console.log(set) // Set(2) { 0, undefined }

set.add(NaN)
set.add(NaN)

console.log(set) // Set(3) { 0, undefined, NaN }
```

## 类型转换

## 数组转 set

```javascript
var mySet = new Set(['value1', 'value2', 'value3'])
//Set(3) {'value1', 'value2', 'value3'}
```

## Stirng 转 set

```javascript
new Set("hello")
Set(4) {
    'h',
    'e',
    'l',
    'o'
}
```

## set 转数组

```javascript
var mySet = new Set(['value1', 'value2', 'value3'])
//Set(3) {'value1', 'value2', 'value3'}
var mySetArray = [...mySet]
```

# Set 对象去重

## Array 数组去重

```javascript
vat mySet = new Set([1, 2, 3, 4, 4, 4, 5])[...mySet] // [1,2,3,4,5]
```

## 求两个数组的并集

```javascript
var a = new Set([1, 2, 3, 4, 5, 6])
var b = new Set([1, 2, 3, 4, 5, 7, 8])
var c = new Set([...a, ...b])
// Set(8) { 1, 2, 3, 4, 5, 6, 7, 8 }
```

## 交集

```javascript
// 交集
var a = new Set([1, 2, 3, 4, 5, 6])
var b = new Set([1, 2, 3, 4, 5, 7, 8])

var c = new Set([...a].filter((x) => b.has(x)))

console.log(c) //Set(5) { 1, 2, 3, 4, 5 }
```

## 差集

```javascript
// 差集 即 a中有的元素 b没有
var a = new Set([1, 2, 3, 4, 5, 6])
var b = new Set([1, 2, 3, 4, 5, 7, 8])

var c = new Set([...a].filter((t) => !b.has(t))) //Set(1) { 6 }
console.log(c.size) // 1
```

## API

- add(value)：添加某个值，返回 Set 结构本身。
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- has(value)：返回一个布尔值，表示该值是否为 Set 的成员。
- clear()：清除所有成员，没有返回值。

## 遍历

Set 内部的元素可以用 for...of 遍历。

## 转数组

- **Array.from()方法可以将 Set 数据类型转化为数组类型。**
- **\[...set]**

# 去重

```javascript
var a = [1, 2, 3, 4, 5, 6]
var b = [1, 2, 3, 4, 5, 7, 8]

var c = a.concat(b)

var map = new Set(c)
console.log(map) // Set(8) { 1, 2, 3, 4, 5, 6, 7, 8 }
```

## 对象去重

没想到什么好方法 要么用 map 或者直接数组去重
