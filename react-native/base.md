---
title: react-native base
---

react native 启动命令：

```Shell
npx react-native start
```

## FAQ

### error Failed to build iOS project. We ran "xcodebuild" command but it exited with error code 65

https://stackoverflow.com/questions/55235825/error-failed-to-build-ios-project-we-ran-xcodebuild-command-but-it-exited-wit

### AsyncStorage

[docs](https://react-native-async-storage.github.io/async-storage/)

```Shell
yarn add @react-native-async-storage/async-storage
pod install # 安装完后如果是 ios 需要使用 这个命令链接
npx react-native link @react-native-async-storage/async-storage # Android

```
