---
title: project references
---

`project references` 可以使得项目中的不同的模块使用不同的配置。
例如使用 `vite` 创建的项目:

```json
{
  "references": [
    {
      // 可以使用 prepend: boolean 指定编译的优先级
      "path": "./tsconfig.node.json"
    }
  ]
}
```

可以看到 `references` 了 `tsconfig.node.json` 这个配置文件。

> 使用 `references` 字段引入的配置文件需要设置 `composite: true` 字段，并用 `include` 或 `files` 等等属性指明配置覆盖的文件范围。

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

根据配置可以看出， `tsconfig.node.json` 这个配置文件所覆盖的范围是 `vite.config.ts` 这个文件。
