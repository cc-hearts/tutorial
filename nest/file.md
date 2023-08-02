---
title: 文件上传
---

> 在`http` 中， 文件上传使用的`Content-type` 都是`multipart/form-data`

单文件上传案例:

```ts
export class FormController { 
@Post('formData')
  @UseInterceptors(
		// 指定文件的字段名
    FileInterceptor('file1'),
  )
  createFormData(@UploadedFile() data, @Body() b) {
    console.log(data);
    console.log(b);
    return 200;
  }
}
```

被`FileInterceptor`指定的字段的文件的数据值可以通过`UploadedFile` 装饰器拿到

## 文件数组上传

文件数组上传案例:

> 注意 单文件上传和多文件上传的拦截器和注解都不同

```ts
export class FormController { 
@Post('formData')
  @UseInterceptors(FilesInterceptor('files'))
  createFormData(@UploadedFiles() data, @Body() b) {
    console.log(data);
    console.log(b);
    return 200;
  }
}
```

上传的`html`案例:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.jsdelivr.net/npm/axios@1.4.0/dist/axios.min.js"></script>
</head>

<body>
  <input id="fileInput" type="file" multiple />
  <script>
    const fileInput = document.querySelector('#fileInput');
    async function formData() {
      const data = new FormData()
      console.log(fileInput.files);
      data.append('files', fileInput.files[0])
      data.append('files', fileInput.files[1])

      await axios.post('http://localhost:3000/form/formData', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    fileInput.onchange = formData

  </script>
</body>
```

## 多文件上传

> 使用`FileFieldsInterceptor` 拦截器获取字段值

```ts
export class FormController { 
	@Post('formData')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file1', maxCount: 1 },
      { name: 'file2', maxCount: 1 },
    ]),
  )
  createFormData(@UploadedFiles() data: Array<Express.Multer.File>, @Body() b) {
    console.log(data);
    console.log(b);
    return 200;
  }
}
```

## 接收任意文件上传

`AnyFilesInterceptor ` 接收任意文件上传 

```ts
export class FormController { 
	@Post('formData')
  @UseInterceptors(
  AnyFilesInterceptor({
    dest: 'uploads',
  }),
  createFormData(@UploadedFiles() data: Array<Express.Multer.File>, @Body() b) {
    console.log(data);
    console.log(b);
    return 200;
  }
}
```

## 参考资料

[nest docs file-upload](https://docs.nestjs.com/techniques/file-upload)