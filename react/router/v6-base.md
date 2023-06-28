---
title: react-router-v6
---

link 标签传递值的方式：

```tsx
<Link
  to={'/service/test'}
  state={{
    name: 'test',
  }}
>
  test
</Link>
```

`useHistory` 提供了路由的跳转方法

> `redirect` 更好的用于重定向
