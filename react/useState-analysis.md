---
title:useState 的简易实现
---

## useState 的变化

一个 `useState` 会返回一个 callback 但是同一个 `useState` 每次返回的 callback 的值都是同一个

```tsx
import { useState, useRef } from 'react'
export default function App() {
  const [s, setS] = useState(1)
  const refs = useRef<{
    count: number
    setCount: ((...rest: any[]) => void) | null
  }>({ count: -1, setCount: null })
  if (refs.current.count === -1) {
    console.log('执行次数')
    refs.current.count = s
    refs.current.setCount = setS
  }
  console.log(refs.current.setCount === setS)
  return (
    <React.Fragment>
      <button onClick={() => setS((state) => state + 1)}>
        click change state
      </button>
    </React.Fragment>
  )
}
```

首先 利用闭包的特性 将 state 声明到 function 之外 使得数据持久化

useState.ts

```ts
let state: unknown
import { render } from '../../../main'
export default function <T>(initialState: T): readonly [T, (state: T) => void] {
  state = state ? state : initialState
  function setState(newState: T): void {
    state = newState
    render()
  }
  // state as T 暂时不知如何解决
  return [state as T, setState] as const
}
```

此时这里导入的 render 是 main.tsx 的渲染函数

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
const root = ReactDOM.createRoot(document.getElementById('root')!)
export function render() {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
render()
```

> index.tsx

```tsx
import React from 'react'
import useState from './hooks/useState'
interface Props {}
const testUseState: React.FC<Props> = function () {
  const [state, setState] = useState<number>(0)
  return (
    <>
      <h1>testUseState</h1>
      <div>{state}</div>
      <button
        onClick={() => {
          setState(state + 1)
          console.log(state)
        }}
      >
        handle click state
      </button>
    </>
  )
}
export default testUseState
```

此时的 state 就是一个简易版的 hook 这样的 hook 有一个缺点 他就是一个 `state` 单例的 hooks

useState 应该要调用多次 每次应该生成不同的 state 数据 这时的 state 和 setState 都应该是一个数组

```ts
import { render } from '../../../main'
let state: unknown[] = []
// 用于存储改变state的值
let setState: ((state: unknown) => void)[] = []
let stateIndex = 0

// 改进setState
function createSetter(index: number) {
  return (newState: unknown) => {
    state[index] = newState
    render(() => {
      stateIndex = 0
    })
  }
}

export default function <T>(initialState: T) {
  // 初始化state
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState
  // 初始化setState
  // setState[stateIndex] = ((index: number) => {
  //   return (newState: unknown) => {
  //     state[index] = newState;
  //     // 每次调用玩应该重新刷新页面
  //     render(() => {
  //       // render的时候应该将stateIndex 重置为 0
  //       stateIndex = 0;
  //     });
  //   };
  // })(stateIndex);
  // ! 改进setState[]
  setState[stateIndex] = createSetter(stateIndex)
  // 每次调用一个useStateMany时，stateIndex++ 使得可以存储多个值
  stateIndex++

  return [state[stateIndex - 1] as T, setState[stateIndex - 1]] as const
}
```

此时的 state 和 state2 的数据将互不干扰

```tsx
import React from 'react'
import useStateMany from '../hooks/useStateMany'
interface Props {}
const StateMany: React.FC<Props> = function () {
  const [state, setState] = useStateMany<number>(0)
  const [state2, setState2] = useStateMany<number>(1)
  return (
    <>
      <h1>StateMany</h1>
      <div>
        <span>{state}</span>
        <button
          onClick={() => {
            setState(state + 1)
          }}
        >
          handle click state
        </button>
      </div>
      <div>
        <span>{state2}</span>
        <button
          onClick={() => {
            setState2(state2 + 1)
          }}
        >
          handle click state2
        </button>
      </div>
    </>
  )
}
export default StateMany
```

## setState 同步异步的问题

在 react 18.0 之前 在 react 控制范围之内(例如生命周期钩子和合成事件之中 react 是异步更新的)

> setState 一直都是同步执行的 只不过在生命周期钩子或者合成事件之中 react 是将当前同步执行的 setState 执行的时候 会 dispatchAction 创建一个任务推进到 任务队列 等待下次批量执行 而通过宏任务 微任务设置的不会设置 `excutionContext` 则会同步执行

setState 的同步 异步取决于 react 的机制 它本身还是同步执行的一个方法

```jsx
class App extends React.Component {
  static defaultProps = {
    name: '123123',

    age: '123432312',
  }

  state = { val: 0 }

  componentDidMount() {
    // 因为宏任务的原因 在执行完 钩子函数后 还没有执行 setState 没有设置excutionContext
    // 因此当异步setTimeOut只想的时候 setState 就是同步执行了
    setTimeout(() => {
      // 第一次调用

      this.setState({ val: this.state.val + 1 })

      console.log('first setState', this.state)

      // 第二次调用

      this.setState({ val: this.state.val + 1 })

      console.log('second setState', this.state)
    })
  }

  handleClick = () => {
    // 这里的微任务也是如此
    Promise.resolve().then(() => {
      this.setState({
        val: this.state.val + 1,
      })

      console.log(this.state)
    })
  }

  render() {
    return (
      <div>
        val: {this.state.val}
        <button onClick={this.handleClick}>click</button>
      </div>
    )
  }
}
```

参考资料
[掘金 state 同步异步](https://juejin.cn/post/7108362046369955847#heading-2)
