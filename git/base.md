---
title: git 基本命令
---

## 提交规范

- `feat` -新功能 feature
- `fix` -修复 bug
- `docs` -文档注释
- `stye` -代码格式（不影响代码运行的变动）
- `refactor` -重构、优化（既不增加新功能，也不是修复 bug)
- `perf` -性能优化
- `test` -增加测试
- `chore` -构建过程或辅助工具的变动
- `revert` -回退
- `build` -打包

### 查看全局配置

```shell
git config --global --list
```

### 查看本地配置

```shell
git config --local --list
```

### 修改当前项目的用户名和邮箱

修改用户名:

```shell
git config  user.name <heart>
```

修改邮箱:

```shell
git config  --global user.email <heart@163.com>
```

### 修改全局用户名和邮箱

全局修改用户名:

> heart 为用户名 可以任意填写

```shell
git config  --global user.name <heart>
```

全局修改邮箱:

```shell
git config  --global user.email <heart@163.com>
```

### amend

用于 `commit` 的时候如果注释写错了 可以使用

```shell
git commit --amend  # 修改 commit 注释
```

### .gitconfig

修改.gitconfig 文件中的内容也可以修改用户名和邮箱

```shell
vi ~/.gitconfig #之后直接修改即可
```

### 分支操作

新建分支

```shell
git branch <name>
```

查看本地分支

```shell
git branch
```

查看所有的分支 红色的为远程分支 绿色的为本地分支

```shell
git branch -a
```

查看本地远程的对应分支

```shell
git branch -vv
```

删除本地分支

```shell
git branch - d <name>
```

#### 创建本地分支与远程分支关联

> 远程分支一定要存在 否则会失败

```shell
# 新建本地分支指定远程分支，该命令可以将远程git仓库里的指定分支拉取到本地
git checkout -b <本地分支名> origin/<远程分支名>
```

将已有的本地分支与远程分支创建关联

```shell
git branch --set-upstream-to origin/<远程分支名>  <本地分支名>
```

### 远程分支

新建远程分支

```shell
git checkout -b dev # 新建dev本地分支

git push origin dev # 将dev分支推送到远程

git branch --set-upstream-to=origin/dev # 分支关联

git branch -a # 查看分支
```

查看远程分支

```shell
git branch -r
```

查看远程分支地址

```shell
git remote -v
```

设置新的远程路径

```shell
git remote set-url origin git@xxx.git
```

添加远程仓库

> master 为分支名 url 为远程分支地址

```shell
git remote add <master> <url>
```

删除远程仓库

```shell
git remote rm <master>
```

删除远程分支

> 推送一个空分支到远程分支，其实就相当于删除远程分支

```shell
git push origin :dev_tmp # 也可以使用

git push origin --delete dev_tmp
```

### 切换分支

```shell
git checkout <分支名>
```

### 合并分支

将分支内容合并到 main 分支中

```shell
git merge main
```

​ 或者使用 `rebase` 变基合并

> 变基只适合在本地操作，如果记录已经推到了远程仓库，那么就不能再执行变基操作 否则 多人开发代码结构会混乱不堪

```shell
git checkout top # 切换到要进行变基的分支
git rebase master # 将当前的分支 变基到 master分支

# 之后 切换到 master 合并这个分支即可
git merge top # 此时的分支就会是一条线
```

```shell
# 将 feat-xxx 的分支变基到 main 分支上
git rebase feat-xxx main
# 解决冲突后推送
git push
```

### git 合并不想干的分支

```shell
git merge master --allow-unrelated-histories
```

### git merge --squash

使用 `--squash` 将 `merge` 的时候 commit 记录整合成一个

### git 中断合并

```shell
git merge --abort # 在合并的时候，出现了冲突，但是还没有解决冲突，没有进行提交的时候，放弃合并
```

> 如果已经 commit：
>
> - git revert -m 1 HEAD 新建一个 commit，并且回到合并之前的状态
> - git reset --hard commit_id 回退到指定的 commit 节点

### 清除本地修改

```shell
git checkout . && git clean -xdf
```

### git stash

将工作现场存储起来 等以后恢复现场继续工作

> 当前分支已修改了代码 但是需要切换到其他分支 则可以使用 git stash 存储工作内容 （存储之后代码会被保存起来 本地代码将会暂时消失）
>
> 之后便可以切换分支

多次 `git stash` 可以用 `git stash list` 查看 然后恢复制定的 stash

```shell
git stash apply stash@{0}
```

```shell
git stash list // 查看存储的工作内容列表
```

恢复存储内容：

```shell
git stash apply // 恢复存储的工作内容 但是stach的存储不会被删除 需要用git stach drop 删除
git stash pop // 恢复的同时把stash内容也删了
```

git stash pop 出的 stash 是可以找回的，因为每次 git stash 都会生成一个新的 commit，只要知道 commitID, 通过 git stash apply commitID 就可以应用之前的 stash

### cherry-pick

能复制一个特定的提交到当前分支

> 通常用于 bug 修复 例如: 在 master 分支上修复的 bug，想要合并到当前 dev 分支，可以用 `git cherry-pick <commit>` 命令，把 bug 提交的修改“复制”到当前分支，避免重复劳动。

```shell
git cherry-pick 593f63c60472ed5a5ab00d31f94fbadcdcd5f97d
```

## git 设置别名

```shell
git config --global alias.ck checkout # 这样git ck 就有git checkout的功能了
git config --global alias.brc "branch -a --contains" # 查看某一个commit 存在于哪些分支
git config --global alias.tagc "tag --contains"  # 查看某一个commit 存在于哪些tag
```

## 解决 Git 中 fatal: refusing to merge unrelated histories

两个分支没有任何的关系 则合并失败 可以添加 `--allow-unrelated-histories` 解决

```shell
git merge master --allow-unrelated-histories
```

如果是 `git pull` 或者 `git push` 报 `fatal: refusing to merge unrelated histories`

```shell
git pull origin master --allow-unrelated-histories
```

### git ignore track files

`.gitignore` 只能忽略那些原来没有被 `track` 的文件 因此要把本地缓存的 `track` 文件清除再 `commit` 即可清除缓存

```shell
git rm -r --cached . \
git add . \
git commit -m 'chore: update .gitignore file'
```

### git 创建一个没有关联的新分支

新建一个分支 但是这个分支会包含父元素的所有内容 但是这个分支没有历史节点

```shell
git checkout --orphan emptyBranch
```

删除所有的文件

```shell
git rm -rf .
```

创建一个新提交

```shell
echo 'new branch' >> README.md

git add README.md

git commit -m 'chore: init commit'
```

之后 `push` 到远程仓库即可

### git 删除 github 等以往的所有分支的提交记录

- `git checkout --orphan latest_branch`

- `git add -A`

- 删除分支 `git branch -D master` ，master 是分支名
- 将当前分支 **latest_branch** 重命名为 **master** ，`git branch -m master`
- 强制更新到远程仓库 `git push -f origin master`
