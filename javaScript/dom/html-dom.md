---
title: html 文件下载
---

1. 通过`a`标签的`download` 属性 实现下载

```html
<a id="download" href="http://localhost:3000/static/test.docx" download>下载</a>
<script>
    const link = document.getElementById('download')
    link.download = 't.docx'
    link.click()
</script>
```

> 如果跨域 则制定的 download 则制定的 fileName 属性无效

2. 通过文件流转成 blob 下载

```html
<body>
    <button id="btn">click</button>
    <script>
        const btn = document.getElementById('btn')
        const url 'http://localhost:3000/static/test.docx'
        btn.onclick = function() {
            fetch(url, {
                method: 'get',
            }).then(res => {
                return res.blob()
            }).then(content => {
                const el = document.createElement('a')
                const blob = new Blob([content]);
                el.href = URL.createObjectURL(blob);
                el.style.display = 'hidden'
                el.download = 't.docx'
                document.body.appendChild(el)
                el.click()
                document.body.removeChild(el)
            })
        }
    </script>
</body>
```

3. base64 实现图片下载

```tsx
<body>
  <img id="img" src="./avatar.png" alt="头像">
  <button id="btn">download</button>
  <script>
    const btn = document.getElementById('btn')
    const img = document.getElementById('img')
    btn.onclick = function () {
      const link = document.createElement('a')
      link.style.overflow = 'hidden'
      link.download = 'test.jpeg'
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      link.href = canvas.toDataURL('image/jpeg') // image/png
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  </script>
</body>
```

## 参考资料

* [JS 前端创建 html 或 json 文件并浏览器导出下载](https://www.zhangxinxu.com/wordpress/2017/07/js-text-string-download-as-html-json-file/)
