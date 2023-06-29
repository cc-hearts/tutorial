---
title: redux 的使用
---

## 基本使用

> `store.js` :

```js
// createStore 已经被废弃 推荐使用 @reduxjs/toolkit 包
import { createStore } from 'redux'

function counterReducer(
  state = {
    value: 0,
  },
  action
) {
  switch (action.type) {
    case 'counter/incremented':
      return {
        value: state.value + 1,
      }
    case 'counter/decremented':
      return {
        value: state.value - 1,
      }
    default:
      return state
  }
}
// createStore(counterReducer)的 API 有 { subscribe, dispatch, getState }.
export default createStore(counterReducer)
```

```jsx
import { useState } from 'react'
import { useEffect } from 'react'
import store from './store'
export default () => {
  function handleClick() {
    store.dispatch({ type: 'counter/incremented' })
  }
  const [count, setCount] = useState(store.getState().value)
  useEffect(() => {
    const unSubscribe = store.subscribe(() => {
      const { value } = store.getState()
      setCount(value)
    })
    return unSubscribe
  }, [])

  console.log('update')
  return (
    <div>
      {count}
      <button onClick={handleClick}>click</button>
    </div>
  )
}
```

## redux toolkit 改造 原始 redux

先安装依赖包

```shell
pnpm add @reduxjs/toolkit
```

使用 `createAction` 、 `createReducer` API 创建 `action` 、 `reducer`

```js
import { createAction, createReducer, configureStore } from '@reduxjs/toolkit'
// # 创建 action
const increment = createAction('INCREMENT')
const decrement = createAction('DECREMENT')
// increment() ===> {type: 'INCREMENT', payload:undefined }
// # 创建reducer
const counter = createReducer(
  {
    value: 0,
  },
  {
    // 不能直接使用 [increment] 作为key  函数作为key可能无法正常工作
    [increment().type]: (state) => {
      state.value += 1
    },
    [decrement().type]: (state) => {
      state.value -= 1
    },
  }
)
export { increment, decrement }
export default configureStore({
  reducer: counter,
})
```

使用 `createSlice` 优化 `createAction` 、 `createReducer` :

```js
import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    // Redux Toolkit 允许在 reducers 中编写 "mutating" 逻辑。
    // 使用Immer 库 检测到state中的状态变化 会生成一个新的不可变的state
    incremented(state) {
      state.value += 1
    },
    decremented(state) {
      state.value -= 1
    },
  },
})

// {caseReducers,getInitialState,actions,name,reducer}
console.log(counterSlice)

// 导出actions的操作
export const { incremented, decremented } = counterSlice.actions
// console.log(counterSlice.getInitialState() === counterSlice.getInitialState()); // true
export default configureStore({
  reducer: counterSlice.reducer,
})
```

### createAsyncThunk 的使用

> createAsyncThunk() 创建一个 thunk，接受一个动作类型字符串和一个 Promise 的函数

```js
import { createAsyncThunk, createSlice, configureStore } from '@reduxjs/toolkit'

function fetchById() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(Math.random())
    })
  })
}

// First, create the thunk
export const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await fetchById(userId)
    return response
  }
)
const initialState = {
  entities: [],
}

const counterReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.entities.push(action.payload)
    })
  },
})

export default configureStore({
  reducer: counterReducer.reducer,
})
```

```jsx
import { useState, useEffect } from 'react'
import store, { fetchUserById } from './store'

export default () => {
  function handleClick() {
    store.dispatch(fetchUserById())
  }
  const [count, setCount] = useState([])
  useEffect(() => {
    const unSubscribe = store.subscribe(() => {
      const { entities } = store.getState()
      setCount([...count, ...entities])
    })
    return unSubscribe
  }, [])
  return (
    <div>
      {count.map((val) => {
        return <div key={val}>{val}</div>
      })}
      <button onClick={handleClick}>click</button>
    </div>
  )
}
```

## redux-thunk

## redux-saga

## 参考资料

- [redux 中文网](https://cn.redux.js.org/)
- [redux toolkit](https://redux-toolkit.js.org/)
- [Redux 最佳实践 Redux Toolkit](https://juejin.cn/post/7101688098781659172)
