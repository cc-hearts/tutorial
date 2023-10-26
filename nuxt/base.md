---
title: Nuxt base
---

## 默认别名

```json
{
  "~~": "/<rootDir>",
  "@@": "/<rootDir>",
  "~": "/<rootDir>",
  "@": "/<rootDir>",
  "assets": "/<rootDir>/assets",
  "public": "/<rootDir>/public"
}
```

## 全局的 css 导入

1. 在 `nuxt.config.js` 中引入 `css`

```ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['assets/theme.scss'],
})
```

2. 在 `app.vue` 中通过 `sfc` 引入

## 整合 unocss

```bash
pnpm add -D @unocss/nuxt
```

在 `nuxt.config.ts` 中添加 `unocss` 配置

```ts
export default defineNuxtConfig({
  modules: ['@unocss/nuxt'],
})
```

添加 `unocss` 配置文件夹

```ts
import { defineConfig } from 'unocss'
export default defineConfig({
  // ...
})
```

## 基本的请求方式
