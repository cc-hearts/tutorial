---
title: 自定义图床的搭建
---

由于七牛云的测试域名到期，无法继续使用七牛云的 `oss` 服务，因此萌生了自己搭建一个自定义图床。

首先下载图床的软件 `upic`

偏好设置中选择图床 ===> 选择自定义图床

![image-20230416222950470](http://oss.cc-heart.cn:30002/oss/file/WPJTOOANlAvXos4EJeb0m/2023-04-16/image-20230416222950470.png)

编辑 `API地址` 、 `请求方式` 、 `请求字段名等字段`

> URL 路径的编写规则见下<a href="#参考资料">参考资料</a>

## Nest 搭建图床

起一个 `Nest` 的项目 这里我是用自己的模版:[stared-nest](https://github.com/cc-hearts/started-nest.git)

编写图片的上传接口

```ts
  @Post('pic')
  async pic(@Req() request) {
    const { filename, suffix, key, file } = request.body || {}
    Logger.log(`${filename} ${suffix} ${key}`)
    const bool = await this.containerKeyService.validateKey(key)
    if (!bool) return { message: '密钥验证失败' }
    const { oss_prefix, host } = getConfig()
    const path = this.uploadService.getStoredPath(key)
    if (!file)
      throw new HttpException(
        '上传文件不能为空',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    if (!filename)
      throw new HttpException(
        '上传文件名不能为空',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    if (!suffix)
      throw new HttpException(
        '上传文件后缀不能为空',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    const originalname = `${filename}.${suffix}`
    const binaryFile = Buffer.from(file, 'base64')
    this.uploadService.saveBinary({ buffer: binaryFile }, path, originalname)
    const relativePath = relative(process.cwd(), join(path, originalname))
    const url = `${host}/${oss_prefix}/${relativePath}`
    Logger.log(url, 'save url:')
    return { url }
```

对应的 `Services`

```ts
import { Injectable } from '@nestjs/common'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
@Injectable()
export class UploadService {
  private readonly folderName = 'file'
  getFormatTime() {
    return new Date().toISOString().split('T')[0]
  }
  getStoredPath(containerKey = '') {
    const date = this.getFormatTime()
    const cwd = process.cwd()
    const folderPath = join(cwd, this.folderName, containerKey, date)
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true })
    }
    return folderPath
  }

  saveBinary(file: { buffer: Buffer }, path: string, fileName: string) {
    const filePath = join(path, fileName)
    const writeStream = createWriteStream(filePath)
    writeStream.write(file.buffer)
  }
}
```

> 注：
>
> 由于图床的文件是以 base64 上传的，因此需要设置 json 的大小
>
> 在 `main.ts` 中设置:

````ts
> app.use(json({ limit: '50mb' }))
> app.use(urlencoded({ extended: true, limit: '50mb' }))
> ```

## 编写 `dockerfile`

```shell
FROM node:latest as base-node

LABEL maintainer="heart<7362469@qq.com>"

WORKDIR /usr/nest-pic

COPY . .

RUN rm -rf node_modules

RUN npm config set registry https://registry.npm.taobao.org

RUN npm i

RUN npm run build

RUN cp ./app.production.yaml ./dist/app.production.yaml

EXPOSE 30002

CMD npm run start:prod
````

通过运行 `docker build -t nest-pic:1.0.0 .` 构建镜像。

之后使用 `docker run -p 30002:30002 -v /opt/nest-pic/nest-pic/file:/usr/nest-pic/file --name nest-pic -d nest-pic:1.0.0` 启动一个图床的容器。

## 参考资料

- [uPic 图床配置教程 - 自定义](https://blog.svend.cc/upic/tutorials/custom/)

- [NestJs docs file upload](https://docs.nestjs.com/techniques/file-upload)
