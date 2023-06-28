---
title: mac 常用脚本
---

## 启动 vscode insiders

```shell
#!/bin/bash

open -a "/Applications/Visual Studio Code - Insiders.app" ./

exit 0
```

## 启动 Google Canary

> dir 地址需要更换

```shell
#! /bin/bash
/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --remote-debugging-port=9222 --user-data-dir=/Users/heart/chrome-debugger --disable-web-security
```

## 启动 Google

```shell
#! /bin/bash
open -a "/Applications/Google Chrome.app" --args --disable-web-security  --user-data-dir=/Users/heart/google-disable-security
```
