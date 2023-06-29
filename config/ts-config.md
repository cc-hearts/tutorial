---
title: tsconfig.json 配置
---

`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "outDir": "dist",
    "module": "ESNext",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "node",
    "downlevelIteration": true, // 迭代器语法降级
    "importHelpers": true, // 从 tslib 导入辅助工具函数
    "sourceMap": false,
    "stripInternal": true,
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。
    // 将 * as xxx from 可以编译成成 * from
    // https://zhuanlan.zhihu.com/p/148081795
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true, // 禁止对同一个文件的不一致的引用。
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "exclude": ["__test__/**/*", "node_modules/**/*", "types/**/*"]
}
```

[编译选项](https://www.tslang.cn/docs/handbook/compiler-options.html)
