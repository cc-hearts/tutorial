---
title: vscode 调试技巧
---

## launch 调试模式

先把网页的 url 跑起来 指定调试端口，然后 frontend 自动 attach 到这个端口。

通过 vs code 的 `Run and Debugger` 功能创建调试配置 之后启动服务 再启动 launch 调试即可

```js
    {
        "type": "chrome",
        "request": "launch",
        // 启动的时候Chrome 可以配置的参数 这里关闭了跨域
        "runtimeArgs": ["--disable-web-security"],
        "name": "Launch Chrome against localhost",
        "url": "http://localhost:8002", // 启动调试的服务url
        "webRoot": "${workspaceFolder}"
    }
```

## attach 调试

> 默认的 Chrome 启动的时候 是关闭了端口调试的 可以启动 Chrome 的时候添加 `--remote-debugging-port` 启用远程的 http 调试

```shell
# mac下 可以 编写shell脚本启动
#!/bin/bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir=/Users/heart/chrome-debugger --disable-web-security
```

此时指定的端口 `9222` 可以使用 vs code 进行远程 ws 通信调试

> vs code 启动 attach 模式 要 Chrome 暴露一个可以供调试的 http 端口 即上面提供的配置开启

```js
 {
     "name": "Attach to Chrome",
     "port": 9222, // 指定浏览器提供调试的端口号
     "request": "attach",
     "type": "chrome",
     "webRoot": "${workspaceFolder}"
 }
```

之后点击运行即可运行 `attach` 调试功能

## 常用配置参数

runtimeExecutable：指定调试的浏览器
`canary` , `stable`

runtimeArgs：
`--user-data-dir` 用户数据存储目录
`--auto-open-devtools-for-tabs` 启动的时候自动打开控制台
`--incognito` 启用无痕浏览

sourceMaps:
`true | false` 开启 关闭 source map 映射

> sourcemap 到的文件路径在 VSCode 的工作区里找不到，这时候代码就只读了 需要再次做映射
> sourceMapPathOverrides 重新映射到本地文件路径

```js
// 基础配置：?:*
"sourceMapPathOverrides": {

    "meteor://💻app/*": "${workspaceFolder}/*",

    "webpack:///./~/*": "${workspaceFolder}/node_modules/*",

    "webpack://?:*/*": "${workspaceFolder}/*"

}
```

## 调试静态 html 文件

通过 file 参数映射

```js
  {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "webRoot": "${workspaceFolder}",
      "file": "${workspaceFolder}/index.html" // 通过file 代替url调试文件
  }
```

## 自用 launch.json 配置

```json
{
  "runtimeArgs": ["--disable-web-security", "--auto-open-devtools-for-tabs"],
  "userDataDir": "/Users/heart/chrome-debugger",
  "runtimeExecutable": "canary"
}
```

## vue-cli 创建 vue2 调试

> 需要修改 `vue.config.js` 中的 `devtools` 为 `source-map`

```js
  configureWebpack: (config) => {
      config.devtool = "source-map";
  },
```

launch.json 配置:

```json
  "configurations": [
    {
      "name": "Attach to Chrome",
      "port": 9222,
      "request": "attach",
      "type": "chrome",
      "webRoot": "${workspaceFolder}",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/src/*"
      }
    },
    {
      "type": "chrome",
      "request": "launch",
      "name": "vuejs: chrome",
      "runtimeExecutable": "canary",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/src/*"
      }
    }
  ]
```

> vue2 vs code 调试:
> <https://v2.cn.vuejs.org/v2/cookbook/debugging-in-vscode.html>

## 参考资料

chrome 浏览器启动参数配置:

* <https://www.cnblogs.com/gurenyumao/p/14721035.html>

远程调试技术介绍:

* <https://fed.taobao.org/blog/taofed/do71ct/chrome-remote-debugging-technics/>

* source-map 映射介绍
* <https://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html>
