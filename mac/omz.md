---
title: oh-my-zsh 及插件
categories: Mac
---

安装：oh-my-zsh

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

## 插件

> 安装 zsh-autosuggestions

```bash
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

编辑 `.zshrc文件` 在 `plugins=(git)` 后添加插件名称 `zsh-autosuggestions`

```bash
 vim ~/.zshrc
```

```bash
plugins=(git zsh-autosuggestions)
```

之后 `:wq` 保存退出
