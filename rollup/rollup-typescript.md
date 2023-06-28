---
title: rollup 打包typescript 为cjs
---

> `rollup.config.js`

```js
import typescript from '@rollup/plugin-typescript'
import tsConfig from './tsconfig.json' assert { type: 'json' }

tsConfig.compilerOptions.declaration = false

export default {
  input: 'src/utils/index.ts',
  output: {
    file: 'src/lib/cjs/index.cjs',
    format: 'cjs',
  },
  plugins: [typescript(tsConfig)],
}
```

所需要的包:
[plugin-typescript](https://www.npmjs.com/package/@rollup/plugin-typescript)
