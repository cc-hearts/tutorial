---
title: prettier 配置
---

下载 `prettierrc` ：

```shell
npm install prettier
```

创建所需的配置文件 `.prettierrc.js`

```js
module.exports = {
  $schema: 'http://json.schemastore.org/prettierrc',
  semi: false,
  singleQuote: true,
}
```

## 配置文件的优先级顺序

1. `package.json`
2. `.prettierrc.json` 或者 `prettierrc.yml`
3. `.prettierrc.js` 或 `prettier.config.cjs`

> 忽略的配置文件些在 `.prettierignore` 中

```txt
build
coverage
node_modules/
dist/
```

## 格式化参数配置

格式化全部文档

```shell
npx prettier --write .
```

格式化指定文档:

```shell
npx prettier --write src/index.ts
```

检查是否格式化

```shell
npx prettier --check .
```

## eslint 集成

> 与 `eslint` 集成 需要安装 `eslint-config-prettier` 包 这个包禁用了一些和 `eslint` 冲突的一些规则 、在 `eslint` 的配置中添加

```ts
extends: [
  // ...
  "prettier"
]
```

这些仅仅只是将规则禁用了 但是需要避免 `prettier` 格式化之后 `eslint` 又报错的问题 需要在安装 `eslint-plugin-prettier`

> 这个插件的主要作用就是将 `prettier` 的规则作为 `eslint` 的规则来使用。当不符合 `prettier` 的规则的时候 会报出一个 `eslint` 错误 可以通过 `npx eslint --fix` 修复

此时修改 `eslint` 配置

```json
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

将上面的两部整合成一个简化版的配置就是：

```ts
 extends: ['plugin:prettier/recommended']
```

相当于

```json
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off"
  }
}
```

```javascript
{
    // 使能每一种语言默认格式化规则
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[less]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },

    /*  prettier的配置 */
    "prettier.printWidth": 100, // 超过最大值换行
    "prettier.tabWidth": 4, // 缩进字节数
    "prettier.useTabs": false, // 缩进不使用tab，使用空格
    "prettier.semi": true, // 句尾添加分号
    "prettier.singleQuote": true, // 使用单引号代替双引号
    "prettier.proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
    "prettier.arrowParens": "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
    "prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    "prettier.disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
    "prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
    "prettier.eslintIntegration": false, //不让prettier使用eslint的代码格式进行校验
    "prettier.htmlWhitespaceSensitivity": "ignore",
    "prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
    "prettier.jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
    "prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
    "prettier.parser": "babylon", // 格式化的解析器，默认是babylon
    "prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier
    "prettier.stylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验
    "prettier.trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
    "prettier.tslintIntegration": false // 不让prettier使用tslint的代码格式进行校验
}
```
