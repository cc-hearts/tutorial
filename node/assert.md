---
title: assert 断言
---

```js
import assert from 'assert'

assert(true, 'error')

// assert是assert.ok() 的别名。两者作用一模一样，都是判断值是否为真值。
assert.ok(true, 'error')

// 相当于 ==
assert.equal(1, '1', '实际值与期望值比较为false')
assert.equal(1 + 1, '2', '实际值与期望值比较为false')

// 深层次的比较
assert.deepEqual([1, 2, 3], [1, 2, 3], 'error')

// 严格相等 ===
assert.strictEqual(1, 1, 'error')

// deepStrictEqual 深层次的比较
assert.deepStrictEqual(
  {
    a: 1,
  },
  {
    a: 1,
  },
  'error'
)

// 不想等
assert.notEqual(1, '2', 'error')

assert.notDeepEqual(
  {
    a: 1,
  },
  {
    a: 2,
  },
  'error'
)

// notStrictEqual notDeepStrictEqual 相似

// assert.fail(message) 会直接报错
// assert.fail("error");
```

node 的测试框架可以使用 `--test-only` 开启测试
