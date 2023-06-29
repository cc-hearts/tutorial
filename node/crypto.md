---
title: crypto 模块
---

## uuid 生成

```ts
import { randomUUID } from 'crypto'
randomUUID()
```

# md5 加密解密

```typescript
const crypto = require('crypto')
// md5 加密
const password = '123456'
const md5Hash = crypto.createHash('md5')
md5Hash.update(password)

console.log(md5Hash.digest('hex'))
```

# Hmac

Hmac 也是一种 hash 算法 可以利用 md5 或者 SHA1 等哈希算法 不同的是 Hmac 算法还需要一个密钥

```javascript
const crypto = require('crypto')

const password = '123456'
const hmacHash = crypto.createHmac('md5', 'security-key')
hmacHash.update(password)
console.log(hmacHash.digest('hex'))
```

# AES

一种常用的对称加密算法，加解密都用同一个密钥

```typescript
const crypto = require('crypto')

function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key)
  var crypted = cipher.update(data, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key)
  var decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
```

## 参考资料

- [如何在 Node.js 中加密和解密数据](https://cloud.tencent.com/developer/article/1732824)
