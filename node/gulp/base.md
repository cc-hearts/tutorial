---
title: gulp使用
---

## gulp 在 ECMA 环境下使用

1. ~~需要先将名称替换为 `gulpfile.esm.js`~~

2. ~~安装`esm`模块~~

   > ~~`esm` 可以转换 ECMA 代码为 CJS 以便兼容历史版本 node（node 的 CJS 环境）的运行~~

```shell
   pnpm i esm
```

3. ~~运行`npx gulp` 即可运行任务~~

创建文件`gulpfile.mjs` 即可 （参考<https://gitlab.com/rawsec/rawsec-cybersecurity-list/-/blob/89e758c91474c426f9281c48ff1218d822f6ca48/package.json>）
