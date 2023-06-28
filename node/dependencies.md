---
title: dependencies与devDependencies开发依赖的关系
---

* 如果是一个 SPA 应用 则 放在 dependencies 或者 devDependencies 的作用都是一样的 例如 通过 npm install 的时候 会将两个依赖都一起拉下来。（如果 后跟随了`--production` 则只会拉去 dependencies 下的依赖）
* 如果是一个 Node runtime 应用 需要严格区分 dependencies 与 devdependencies 的区别 避免将`eslint` 等开发依赖在线上拉取
* 如果是一个 Node 包 则其他第三方如果 install 这个包 只会 install 包下面 dependencies 依赖

## 参考资料

* https://github.com/facebook/create-react-app/issues/6180
