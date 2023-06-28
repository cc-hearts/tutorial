---
title: git reset 使用
---

## git reset --soft HEAD^

> HEAD^ 代表的是 HEAD~1 表示的是上一个版本
>
> 如果要回复到 n 个前的版本 使用 HEAD~N

### mixed

```shell
git reset --mixed HEAD^ # 不删除工作空间改动代码 撤销Commit 并且撤销git add . 的操作
```

### soft

```shell
git reset --soft HEAD^ # 不删除工作空间改动代码，撤销commit，不撤销git add .
```

### hard

```shell
git reset --hard HEAD^ # 删除工作空间改动代码，撤销commit，撤销git add .  这样就相当于回到了上一次的commit 记录了
```
