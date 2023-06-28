---
title: React Hook
---

# useImperativeHandle

可以让子组件暴露一些参数给父组件调用

> 子组件:

```typescript
useImperativeHandle(
  formRefs,
  () => ({
    getData: () => {
      return data
    },
    clearFormData: () => {},
  }),
  [data, clearFormData]
)
```

> 父组件

```typescript
const formsRef = useRef<{
  getData: () => loginForm
  clearFormData: (...args: any[]) => void
}>(null)

return (
  <>
    <LoginForm active={active} formRefs={formsRef} />
  </>
)
```

## 参考资料

函数式编程：
useEffect 的 distory 在下一次的组件更新的时候调用 return 函数
useEffect 的陷阱：
<https://overreacted.io/>
<https://zhuanlan.zhihu.com/p/84697185>
<https://juejin.cn/post/6959372766114119688>
<https://zhuanlan.zhihu.com/p/94586032>

rouer v6 用 Outlet 子组件 其余的父子组件使用的是 props.children
