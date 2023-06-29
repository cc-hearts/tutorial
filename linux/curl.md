# curl 的基本使用

安装 `curl`

```shell
apt install curl  # Ubuntu
# 或
yum install curl  # CentOS
```

## 基本使用

```shell
# options 是配置项
curl [options][url]
curl www.baidu.com
```

### -A 指定 User-Agent

`-A` 参数指定用户代理标头，即 `User-Agent` 。
curl -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36' http://www.baidu.com

[掘金 curl 的使用](https://juejin.cn/post/7020291189832155166)
[curl docs](https://curl.se/docs/)
