---
title: jest react 单元测试
---

1. 预先需要安装的包

```shell
pnpm add @swc/core @swc/jest identity-obj-proxy @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/testing-library__jest-dom jest jest-environment-jsdom
```

> `@types/testing-library__jest-dom` 是 `jest-dom` 的 `tds` 声明 2. 生成 jest 的配置文件

```shell
pnpm jest --init
```

修改几项配置文件

> 路径匹配哪些文件作为 test 文件

```js
  testMatch: [
      '<rootDir>/src/**/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}',
      '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
      '<rootDir>/__test__/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
```

> 配置文件的类型配置 如果是 ts 类型的单测 则将 ts 放在前面

```js
  moduleFileExtensions: [
      'ts', 'tsx', 'js', 'jsx'
  ],
```

> 处理静态资源的映射

```js
  moduleNameMapper: {
      '^.+\\.module\\.(css|sass|scss|less)$': 'identity-obj-proxy',
      '\\.svg$': 'identity-obj-proxy',
      '\\.(css|sass|scss|less)$': 'identity-obj-proxy'
  },
```

> 对 ts tsx 做编译转换(babel 的功能 这里使用了 swc 代替)

```js
transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ["@swc/jest"],
},
```

> 转换需要忽略的文件

```js
transformIgnorePatterns: [
    '[/\\\\]node_modules/(?!(antd)/)[/\\\\].+\\.(js|jsx|ts|tsx)$',
],
```

> 测试的环境 为 `jsdom` 后 (在 version 28 之后 需要在安装 ` jest-environment-jsdom`

```js
testEnvironment: 'jsdom'
```

> 每次单测文件加载之后都会加载的文件 一般用来加载环境变量
> 由于 react 的组件测试都需要依赖 `js-dom` 因此可以将 `js-dom` 放在这个文件中导入

```js
 setupFilesAfterEnv: [
         '<rootDir>/jest/setupJestDom.ts'
     ],

     // ./jest/setupJestDom.ts
     import '@testing-library/jest-dom'
```

> 每次执行完毕后，不自动清理单测缓存，这样执行效率会快

```js
setupFiles: [
    '@testing-library/react/dont-cleanup-after-each'
],
```

## React testing library 测试

> fetch.tsx

```typescript
import { useState, useReducer } from 'react'
function greetingReducer(
  state: initState,
  action: {
    type: 'SUCCESS' | 'ERROR' | undefined
    greeting?: string
    error?: string
  }
) {
  switch (action.type) {
    case 'SUCCESS': {
      return {
        error: null,
        greeting: action.greeting,
      }
    }
    case 'ERROR': {
      return {
        error: action.error,
        greeting: null,
      }
    }
    default: {
      return state
    }
  }
}
const initialState = {
  error: null,
  greeting: null,
}
type initState = { error?: string | null; greeting?: string | null }
const initArg = () => {
  return { error: null, greeting: 'hello' }
}

export default function Fetch({ url = '' }) {
  const [{ error, greeting }, dispatch] = useReducer(
    greetingReducer,
    initialState,
    initArg
  )
  const [buttonClicked, setButtonClicked] = useState(false)
  const fetchGreeting = async () => {
    new Promise((resolve, reject) => {
      if (url === '') reject('错误')
      else resolve({ data: { greeting: 1 } })
    })
      .then((response: any) => {
        const { data } = response
        if (!data) return
        const { greeting } = data
        dispatch({ type: 'SUCCESS', greeting })
        setButtonClicked(true)
      })
      .catch((error) => {
        dispatch({ type: 'ERROR', error })
      })
  }

  const buttonText = buttonClicked ? 'Ok' : 'Load Greeting'
  return (
    <div>
      <button onClick={() => fetchGreeting()} disabled={buttonClicked}>
        {buttonText}
      </button>
      {greeting && <h1>{greeting}</h1>}
      {error && <p role="alert">Oops, failed to fetch!</p>}
    </div>
  )
}
```

> getByRole 是通过可访问性的属性获取元素的 也就是 `Accessibility`

> 通过 Chrome 中的 `Accessibility` 中可以查看一个 DOM 元素的 role 一级 name 从而可以获取到指定的 DOM 元素

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Fetch from './fetch'
import '@testing-library/jest-dom'
test('load and display greeting', async () => {
  render(<Fetch url="as" />)
  // 点击了事件
  await userEvent.click(screen.getByText('Load Greeting'))
  //
  expect(screen.getByRole('heading')).toHaveTextContent('1')
  expect(screen.getByRole('button')).toBeDisabled()
})
```

# hook 测试

react hook 有单独的测试

```typescript
import { useState } from 'react'

function useCounter(initialValue = 0) {
  const [current, setCurrent] = useState(initialValue)

  const add = (number = 1) => setCurrent((v) => v + number)
  const dec = (number = 1) => setCurrent((v) => v - number)
  const set = (number = 1) => setCurrent(number)

  return [
    current,
    {
      add,
      dec,
      set,
    },
  ] as const
}

export default useCounter
```

> test.tsx

```tsx
import { renderHook, act } from '@testing-library/react-hooks'
import useCounter from './myTest'
describe('useCounter 测试', () => {
  it('数字加1', async () => {
    const { result } = renderHook(() => useCounter(7))
    expect(result.current[0]).toEqual(7)

    act(() => {
      result.current[1].add()
    })
    expect(result.current[0]).toEqual(8)
  })
})
```

## 参考资料

[react + vite + testing-library 单测环境构建](https://segmentfault.com/a/1190000041989123)
<https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer>
<https://ithelp.ithome.com.tw/articles/10281691>
<https://testing-library.com/docs/react-testing-library/example-intro/#quickstart-annotated>
<https://jestjs.io/docs/tutorial-react>
