---
title: pnpm 的使用
---

## 安装 pnpm

```shell
yarn gloabl add pnpm
```

## 初始化 pnpm

```shell
pnpm init
```

### 配置工作区

> 指定关键字 `packages` 之后 `packages` 下面的包就可以使用 `@packages/xxx` 标明包位置

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/**'
```

### 声明包名称

```json
// pakcage.json
{
  "name": "@packages/utils"
}
```

### ## 安装全局依赖

`-w` 把依赖安装到根目录下

```shell
pnpm install typescript -d -w
```

### 安装局部依赖

> `-F` 等价于 `--filter`

```shell
pnpm --filter @packages/utils add axios

# 卸载依赖
pnpm --filter @packages/utils remove axios

```

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

## link 机制

在 monorepo 中 各个包之间需要依赖的引用 可以使用如下方法安装

```shell
pnpm i @repo/utils -r --filter @repo/vue2-template@*
```

其中的 `@*` 表示默认同步最新版本，省去每次都要同步最新版本的问题。

此时的 `vue2-template` 的 `package.json` 中

```json
{
  "dependencies": {
    // 通过workspace 实现本地引用

    "@repo/utils": "workspace: *",

    "vite-plugin-vue2": "^2.0.2",

    "vue": "^2.7.10",

    "vue-template-compiler": "^2.7.10"
  }
}
```

通过通配符的看上去 workspace 是局部依赖， `pnpm publish` 会转成真实路径依赖.

## 列出这个包的源码位置，被 monorepo 内部哪些项目引用

```shell
pnpm why -r
```

## pnpm link

```shell
pnpm link --global  # 将当前的包link 到全局中
```

在需要`link`的包中使用`link` 链接到当前的包中

```shell
pnpm link --global <package_name>
# pnpm link --global @cc-heart/gen-index-export
```

如果使用完成 需要卸载 可以使用

```shell
pnpm unlink <package_name>
# pnpm unlink @cc-heart/gen-index-export
```



## 参考资料

- [pnpm 文档](https://pnpm.io/zh/)
- [pnpm 使用](https://zhuanlan.zhihu.com/p/422740629)
