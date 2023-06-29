---
title: husky 的基本使用
---

基本安装

```shell
yarn add husky -d
```

配置 huksy 的文件

```json
// .huskyrc.json
{
  "hooks": {
    // git commit 执行的钩子 校验单测是否通过
    "pre-commit": "npm test"
  }
}
```

或者可以在 `package.json` 中配置

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test"
    }
  }
}
```

以上是 `husky v4 ` 版本的配置方法 `v6 版本发布之后` 将不在 `huskyrc.json` 或 `package.json` 中配置了

> 引用资料：
>
> - `husky install` 命令告诉 `Git` 使用 `.hooks` 目录作为钩子脚本目录，实际上就是修改了 `core.hooksPath` 的值；
> - `husky add` 创建了一个独立的 `shell` 脚本

## v6 版本的 huksy 的具体配置

> 可以选择 `自动创建配置` 或者 `手动创建配置` 之中一项即可

### 自动创建配置

```shell
npx husky-init && yarn
```

添加其他的钩子

```shell
npx hooks add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

### 手动创建配置

```shell
yarn add husky
```

配置 package.json

```shell
{
  "scripts":{
        "prepare":"husky install"
  }
}
```

添加 `git commit` 之前的校验

```shell
npx husky add .husky/pre-commit "npm test"
```

## 卸载 husky

```shell
npm uninstall husky && git config --unset core.hooksPath
```

## husky 取消检验

```shell
git commit -m "test" --no-verify
```

[husky 的传统方式配置](https://segmentfault.com/a/1190000039984342)
