---
title: tsconfig 配置
---

tsconfig.json 有以下顶层属性:

- compileOnSave - 在保存的时候是否需要自动触发编译
- compilerOptions
- exclude
- extends
- files
- include
- references
- typeAcquisition

# 生成 tsconfig.json

通过 tsc --init 初始化 tsconfig.json 文件。

```json
{
  "compilerOptions": {
    "target": "ES5", // 编译后的JavaScript版本
    "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
    "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
    "diagnostics": true, // 打印诊断信息
    "module": "ES2015", // module 指定要使用的模块化的规范 es6 ES2015 commonjs
    "noImplicitAny": true, // any必须为显式声明 隐式声明会报错 不允许隐式的any类型
    "removeComments": true, // 移除注释(块注释 行注释)
    "outDir": "dist", // 	编译之后输出的位置
    "allowJS": true, // 允许编译器编译JS，JSX文件
    "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
    "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
    "declaration": true, // 生成声明文件，开启后会自动生成声明文件
    "declarationDir": "./file", // 指定生成声明文件存放目录
    "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
    "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
    "declarationMap": true, // 为声明文件生成sourceMap
    "typeRoots": [], // 声明文件目录，默认时node_modules/@types
    "types": [], // 加载的声明文件包
    "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
    "noEmitOnError": true, //有错误时 不会生成编译后的文件
    "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
    "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
    "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
    "rootDirs": ["src", "out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
    "listEmittedFiles": true, // 打印输出文件
    "listFiles": true, // 打印编译的文件(包括引用的声明文件)
    "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
    // "outFile": "./app.js", // es6 会报错 // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
    "sourceMap": true, // 是否映射文件  生成目标文件的sourceMap文件
    "preserveConstEnums": true, //希望使用 const enums 保留这种映射 保留 const 和 enum 声明
    "strict": true,
    "alwaysStrict": true, // 在代码中注入'use strict'
    "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
    "strictFunctionTypes": true, // 不允许函数参数双向协变
    "strictPropertyInitialization": true, // 类的实例属性必须初始化
    "strictBindCallApply": true, // 严格的bind/call/apply检查
    "noImplicitThis": true, // 不允许this有隐式的any类型
    "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
    "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
    "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
    "noImplicitReturns": true, //每个分支都会有返回值
    "esModuleInterop": true, // 允许export=导出，由import from 导入
    "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
    "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": {
      // 路径映射，相对于baseUrl
      // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
      "jquery": ["node_modules/jquery/dist/jquery.min.js"]
    }
  },
  "include": ["src/js/**/*"], //指定哪些ts文件会被编译
  "exclude": [
    // 不需要编辑的文件列表
    "node_modules"
  ],
  "files": [
    //指定被编译的文件列表 只有需要编译的文件少时才会用到
    "./src/index.ts"
  ]
}
```

```json
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es5", // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [], // 指定要包含在编译中的库文件
    "allowJs": true, // 允许编译 javascript 文件
    "checkJs": true, // 报告 javascript 文件中的错误
    "jsx": "preserve", // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true, // 生成相应的 '.d.ts' 文件
    "sourceMap": true, // 生成相应的 '.map' 文件
    "outFile": "./", // 将输出文件合并为一个文件
    "outDir": "./", // 指定输出目录
    "rootDir": "./", // 用来控制输出目录结构 --outDir.
    "removeComments": true, // 删除编译后的所有的注释
    "noEmit": true, // 不生成输出文件
    "importHelpers": true, // 从 tslib 导入辅助工具函数
    "isolatedModules": true, // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true, // 启用所有严格类型检查选项
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true, // 启用严格的 null 检查
    "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "noUnusedParameters": true, // 有未使用的参数时，抛出错误
    "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true, // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./", // 用于解析非相对模块名称的基目录
    "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [], // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [], // 包含类型声明的文件列表
    "types": [], // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true, // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true, // 启用装饰器
    "emitDecoratorMetadata": true // 为装饰器提供元数据的支持
  }
}
```

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */
    /* Projects */
    // "incremental": true,                              /* TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度 */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./",                          /* 增量编译文件的存储位置 */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */
    /* Language and Environment */
    "target": "esnext" /* 编译后的JavaScript版本 */,
    // "lib": [],                                        /* TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array" */
    "jsx": "preserve" /* Specify what JSX code is generated. */,
    "experimentalDecorators": true /* Enable experimental support for TC39 stage 2 draft decorators. */,
    "emitDecoratorMetadata": true /* Emit design-type metadata for decorated declarations in source files. */,
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h' */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx*`.` */
    // "reactNamespace": "",                             /* Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    /* Modules */
    "module": "esnext" /*  module 指定要使用的模块化的规范 es6 ES2015 commonjs esnext */,
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    "moduleResolution": "node" /* 模块解析策略，ts默认用node的解析策略，即相对的方式导入 */,
    // "baseUrl": "./",                                  /* 解析非相对模块的基地址，默认是当前目录 */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": ["src","out"],                        /* 指定输出文件目录(用于输出)，用于控制输出目录结构 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错 */
    "typeRoots": [
      "src/types/**/*"
    ] /* 声明文件目录，默认时node_modules/@types*/,
    "types": ["node"] /* 加载的声明文件包 node react */,
    // "allowUmdGlobalAccess": true,                     /* 允许在模块中全局变量的方式访问umd模块 */
    // "resolveJsonModule": true,                        /* Enable importing .json files */
    // "noResolve": true,                                /* Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project. */
    /* JavaScript Support */
    // "allowJs": true,                                  /* 允许编译器编译JS，JSX文件 */
    // "checkJs": true,                                  /* 允许在JS文件中报错，通常与allowJS一起使用 */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`. */
    /* Emit */
    // "declaration": true,                              /* 生成声明文件，开启后会自动生成声明文件 */
    // "declarationMap": true,                           /* 设置生成*.d.ts.map文件（sourceMap） */
    // "emitDeclarationOnly": true,                      /* 不生成js文件，仅仅生成*.d.ts和*.d.ts.map */
    // "sourceMap": true,                                /* 是否映射文件  生成目标文件的sourceMap文件 */
    // "outFile": "./",                                  /* 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD" ES6报错 */
    // "outDir": "./",                                   /* 编译之后输出的位置 */
    // "removeComments": true,                           /* 移除注释(块注释 行注释) */
    // "noEmit": true,                                   /* 不输出文件,即编译后不会生成任何js文件 */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types */
    // "downlevelIteration": true,                       /* 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现 */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                          /* 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中 */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have `@internal` in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* 通过tslib引入helper函数，文件必须是模块 */
    // "noEmitOnError": true,                            /* 有错误时 不会生成编译后的文件 */
    // "preserveConstEnums": true,                       /* 希望使用 const enums 保留这种映射 保留 const 和 enum 声明 */
    // "declarationDir": "./",                           /* 指定生成声明文件(.d.ts)存放目录 */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */
    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true /* 允许export=导出，由import from 导入 */,
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,
    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,
    "noImplicitAny": true /* any必须为显式声明 隐式声明会报错 不允许隐式的any类型 */,
    // "strictNullChecks": true,                         /* 不允许把null、undefined赋值给其他类型的变量 */
    // "strictFunctionTypes": true,                      /* 不允许函数参数双向协变 */
    // "strictBindCallApply": true,                      /* 严格的bind/call/apply检查. */
    // "strictPropertyInitialization": true,             /* 类的实例属性必须初始化 */
    // "noImplicitThis": true,                           /* 不允许this有隐式的any类型 */
    // "useUnknownInCatchVariables": true,               /* Type catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* 在代码中注入'use strict' */
    // "noUnusedLocals": true,                           /* 检查只声明、未使用的局部变量(只提示不报错) */
    // "noUnusedParameters": true,                       /* 检查未使用的函数参数(只提示不报错)*/
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* 防止switch语句贯穿(即如果没有break语句后面不会执行) */
    // "noUncheckedIndexedAccess": true,                 /* Include 'undefined' in index signature results */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */
    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  },
  "include": ["src/js/**/*"] /* 指定哪些ts文件会被编译*/,
  "exclude": ["node_modules"] /* 不需要编辑的文件列表*/,
  "files": [
    "./src/index.ts"
  ] /* 指定被编译的文件列表 只有需要编译的文件少时才会用到*/
}
```

## tslib

如果开启了 tslib 选项 则一些降级的操作会从`tslib` 中引入

> 例如： 如果开启了`target` 为 `es5` 但是使用了`es6`的语法 并且开启了`importedHelper` 就会从`tslib` 导入依赖进行降级处理

## exclude

exclude 字段中的声明只对 include 字段有排除效果，对 files 字段无影响，即与 include 字段中的值互斥。

> 如果 tsconfig.json 文件中 files 和 include 字段都不存在，则默认包含 tsconfig.json 文件所在目录及子目录的所有文件，且排除在 exclude 字段中声明的文件或文件夹。

## baseUrl & paths

baseUrl：设置基本目录以解析非绝对模块名称(定义一个根目录，以此进行绝对文件路径解析)

paths：用于设置模块名或路径映射列表，这样就可以简写项目中自定义模块的文件路径。

```js
{
  "compilerOptions": {
    // 注意：baseUrl 必选，与 paths 成对出现，以 tsconfig.json 文件所在目录开始
    "baseUrl": ".",
    "paths": {
      // 映射列表
      "@/*": [
        "src/*"
      ],
      "moduleA": [
        "src/libs/moduleA"
      ]
    }
  }
}

// 代码里这么写
import Toast from '@/components/Toast.ts' // 模块实际位置: src/components/Toast.ts
import TestModule from 'moduleA/index.js' // 模块实际位置: src/libs/moduleA/index.js

```

## noEmit

noEmit 设置是否输出 js 文件

## 参考资料

- https://www.tslang.cn/docs/handbook/compiler-options.html
- https://www.typescriptlang.org/tsconfig/#compilerOptions

- [会写 TypeScript 但你真的会 TS 编译配置吗？](https://www.51cto.com/article/694463.html?u_atoken=dac20e63-0d87-4411-8ac8-22780345ec5e&u_asession=01n8G9vloyDUq7LekNwXRyfeg78SLmCJBsWIbjo4bfyzPCDpgekz7DXCu9GnceiBULX0KNBwm7Lovlpxjd_P_q4JsKWYrT3W_NKPr8w6oU7K-AjyiUCpLGLVDgyBtSmx3D-eS9_bVFQDGVlnkFZYH7PGBkFo3NEHBv0PZUm6pbxQU&u_asig=05-yycY1lxRkIXA0qDjEOiQiwt4rD7uREwYzAkQZb3NhnJlo27HRiepQuY7Qpg92cTCvvJ6EdKBoncWukeJtn4Bf34U8hDN9OEAOltQyB-n3sIPVXU0F85nyNe9qPXlYyQU5uM0sjLwqpF_99Er452NjcaqpW9sZzpl3wjV2uM1CL9JS7q8ZD7Xtz2Ly-b0kmuyAKRFSVJkkdwVUnyHAIJzWpLzL1DmsS6XtYE-NkzPtudo1K-WjlZHRWPMgdX55in0y_4-Ib35wOiAv7-4XJ12O3h9VXwMyh6PgyDIVSG1W-WMxZ4yWlvFmh26bhx7IDPiC5haaDpMo85GGl7nYBJOcqEkdemwGUVWOZk7Ef24s0wJLSLe_hpuSo_oVtt_dFnmWspDxyAEEo4kbsryBKb9Q&u_aref=EHMQOi974ExRxp9LJr7uaqD%2FwbY%3D)
