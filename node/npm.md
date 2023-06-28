---
title: npm 基本使用
---

## 发布包

```shell
npm publish --access public
```

## node 淘宝源

> 淘宝源镜像地址

```shell
npm config set registry https://registry.npmmirror.com
```

> npm 官方源地址

```shell
npm config set registry https://registry.npmjs.org
```

## node 全局安装的包位置查看

yarn:

```shell
yarn global list --depth=0
```

npm

```shell
npm list -g --depth=0
```

## node 查看包历史版本数据

```shell
npm view @cc-heart/utils versions
```

## 更新包

`yarn` 更新 `typescript` :

```ts
yarn global upgrade typescript
```

## 版本格式

 `major.minor.patch`

主版本号. 次版本号. 修补版本号

> 缺失.minor 或.patch 会默认用 0 代替

> 一般 patch 用于修复 bug、 minor 发布新功能等更新、major 用于破坏性更新

## 版本匹配规则

`version` : 必须匹配某个版本
例如
` "bpmn-js": "7.5.0",` 则 `bpmn-js` 的版本号就是 `7.5.0`

`>version` : 表示大于某个版本

> `>=version`  `< version`  `<= version` 亦是如此

`~version` : 大概匹配某个版本

`minor` 版本号指定了 则 `minor` 版本号不变 `patch` 版本号为任意
`~1.1.2` 表示 `>=1.1.2 && < 1.2.0` 之间的版本

`~1.1` 表示 `>=1.1.0 && < 1.2.0`

`~1` 表示的是 `>=1.0.0 && < 2.0.0`

`^version` : 表示兼容某个版本
不超过最左边非零数字

`^1.2.3` 表示 `>=1.2.3 && < 2.0.0`

`^0.2.3` 表示 `>=0.2.3 && < 0.3.0`

`^0.0.3` 表示 `>=0.0.3 && < 0.0.4`

`^1` 表示 `>=1.0.0 && < 2.0.0`

`*` : 表示匹配任意版本

`latest` : 已发布的最新版本

`version1 - version2` : 从 `version1` 到 `version2` 任意版本（包括自身）

例如: `1.0.0-2.0.0` : `>=1.0.0 && <= 2.0.0

`version.x` 表示一个位置的任意版本
`1.3.x` 表示 `>=1.3.0 && <= 1.4.0`

`version1 || version2` 表示的是
`< version1 || > version2` 的版本

## update 与 install 的区别

`install` 会忽略模糊版本

`update` 会将模糊版本安装至最新的

> npm install will install/update devDependencies unless --production flag is added
> npm update will ignore devDependencies unless --dev flag is added

## 版本管理

**alpha 版**：内部测试版。α 是希腊字母的第一个，表示最早的版本，一般用户不要下载这个版本，这个版本包含很多 BUG，功能也不全，主要是给开发人员和 测试人员测试和找 BUG 用的。
**beta 版**：公开测试版。β 是希腊字母的第二个，顾名思义，这个版本比 alpha 版发布得晚一些，主要是给“部落”用户和忠实用户测试用的，该版本任然存 在很多 BUG，但是相对 alpha 版要稳定一些。这个阶段版本的软件还会不断增加新功能。如果你是发烧友，可以下载这个版本。
**rc 版**：全写：Release Candidate（候选版本），该版本又较 beta 版更进一步了，该版本功能不再增加，和最终发布版功能一样。这个版本有点像最终发行版之前的一个类似 预览版，这个的发布就标明离最终发行版不远了。作为普通用户，如果你很急着用这个软件的话，也可以下载这个版本。
**stable 版**：稳定版。在开源软件中，都有 stable 版，这个就是开源软件的最终发行版，用户可以放心大胆的用了。

## npm link

在一个工程中 可以使用 `npm link` 将当前的包软链到全局的链接中

在使用的地方 通过 `npm link packageName` 将另一个工程中的包引用到当前的工程中

> 卸载 link 的命令是 `npm unlink packageName`

> `npm rm --global packageName` 移除全局的 link 或者包

> `npm ls --global --depth 0` 查看全局的包

## bin 文件

如果在 `package.json` 中指定了 `bin` 属性 则会在执行 `install` 的时候 会将 `bin` 属性生成一个 `shell` 文件 在 `node_modules` 的 `.bin` 目录中

> 可参考https://github.com/cc-hearts/iconfont-class-generate/blob/master/package.json#L20

## npm 发包忽略文件夹

`.npmignore` 在包发布时用于排除某些文件或目录。

> 如果没有指定该文件 **npm 默认会将 `.gitignore` 视为 `.npmignore` **

### 优先级问题

如果项目同时存在 `.gitignore` , `.npmignore` , 并且配置了 `files` 字段, 优先级如下：
`files` > `.npmignore` > `.gitignore` 。

## 参考资料

* [查看npm包大小](https://packagephobia.com/result?p%253D%2540cc-heart%252Futils)
* [npm 包 原理分析](https://cloud.tencent.com/developer/article/1555982)
* [npm install 与 npm update 的不同](https://stackoverflow.com/questions/12478679/npm-install-vs-update-whats-the-difference)
