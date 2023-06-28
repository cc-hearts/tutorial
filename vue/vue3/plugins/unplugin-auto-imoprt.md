---
title: unplugin-auto-import
---

```shell
pnpm i unplugin-auto-import
```

在 `vite.config.ts` 中配置

```ts
import AutoImport from "unplugin-auto-import/vite";
export default defineConfig({
  plugins: [
    AutoImport({
      imports: ["vue"],
      dts: "./src/auto-import.d.ts", //避免ts报错问题
    }),
    // ...
   )}
```

> 如果有 `eslint` 报错 关闭 `eslint` 报错
>
>  

```js
> module.exports = {
        >
        rules: {
            >
            'no-undef': 'off',
            >
        },
        >
    } >
```
