---
title: Nest cli 命令详解
---

## cli

创建项目

```shell
npx nest new <package_name>
```

生成`module`、`service`、`controll` 的代码

```shell
npx nest g controller [module_name]
npx nest g service [module_name]
npx nest g module [module_name]
```

如果需要生成完整的模块代码， 可以使用

```shell
npx nest resource|res [module_name]
```

之后会弹出交互式命令行，选择是是否生成相应的模块代码

![image-20230717124736371](http://114.55.225.186:30002/oss/file/WPJTOOANlAvXos4EJeb0m/2023-07-17/image-20230717124736371.png)

> 对`nest generate|g [options] <schematic> [name] [path]` 几个`options` 进行简述:
>
> - `flat` `no-flat` 是否生成对应目录
> - `dry-run` 交互式命令运行 但不写入文件到磁盘中



## build

`nest build` 可以指定编译方式是由`webpack`编译还是由`tsc`编译， 如果需要webpack 编译 使用`--webpack`

![image-20230717133612185](http://114.55.225.186:30002/oss/file/WPJTOOANlAvXos4EJeb0m/2023-07-17/image-20230717133612185.png)

## info

```shell
nest info # 查看npm nest 依赖版本
```

