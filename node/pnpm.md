---
title: pnpm 的使用
---

## 基本命令

`-w` 作为所有的 package 的公共依赖安装到根目录

```shell
pnpm install react -w
```

如果是开发依赖 添加 `-D`

```shell
pnpm install react -wD
```

如果给某个模块单独安装依赖

> 需要在 `pnpm-workspace.yaml` 指定工作目录名称:

```yaml
repo:
  - 'packages/ **'
```

之后的包的 `package.json` 中的名字为 `@packages/vue2`

则可以使用 `pnpm add axios --filter @packages/vue2` 去安装依赖。

## 安装深层依赖

```shell
pnpm config set auto-install-peers true
```
