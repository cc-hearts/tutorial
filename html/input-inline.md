---
title: input与inline-block的问题
---

# 父元素 inline-block 子元素 input 的的宽度决定问题

父元素设置 display:inline-block 后，其宽度由内容（子元素）决定；子元素设置百分比 ，宽度由父元素确定，这样就导致了父元素的宽度由子元素决定，而子元素的宽度由父元素决定

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
        .inline {
            display: inline-block;
        }
    </style>
</head>

<body>
    <div class="inline">
        <input type="text" id="input" />
    </div>
</body>
<script>
    const input = document.getElementById('input')
    input.style.width = '0%'
</script>

</html>
```

根据视图可知 `input` 是否设置了百分比 都不会影响父元素的宽度
根据子元素无论是否设置宽度百分比而不影响父元素的宽度（inline-block，宽度由内容决定），可以得出如下结论：

* 先计算父元素的宽度，不考虑子元素宽度的百分比，这样父元素的宽度就通过子元素给撑开了；由于不同浏览器默认的 Input 框的宽度不一样，就导致了父元素的宽度不一样
* 然后再根据父元素的宽度来及其子元素的百分比来设置子元素的宽度
