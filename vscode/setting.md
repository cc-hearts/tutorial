---
title: Vscode 配置
categories: Config
---

## setting.json

```json
{
  "explorer.compactFolders": false, // 文件是否紧凑显示

  "editor.formatOnSave": true, // 保存之后是否格式化

  "editor.tabSize": 2, // tab缩进

  "merge-conflict.autoNavigateNextConflict.enabled": true, // 是否在解决合并冲突后自动转到下一个合并冲突

  "files.autoSave": "afterDelay", // 延迟自动保存

  "files.autoSaveDelay": 5000, // 等待5秒自动保存

  "editor.bracketPairColorization.enabled": true, // 彩虹括号对

  "editor.wordWrapColumn": 150, // 单词换行

  "editor.lineHeight": 25, // 编辑器行高

  "files.trimTrailingWhitespace": true, // 保存文件时候删除行尾的空格

  "workbench.iconTheme": "material-icon-theme", // 主题文件夹
  "explorer.confirmDelete": false, // 删除文件是否确认
  "git.confirmSync": false, // 同步git存储库先确认
  "explorer.confirmDragAndDrop": false, // 控制在资源管理器内拖放移动文件或文件夹时是否进行确认

  "tabnine.experimentalAutoImports": true, // tabnine 插件自动提示

  "editor.fontFamily": "Fira Code", // 字体设置
  "editor.fontWeight": "400",
  "editor.fontLigatures": false // 是否启用连字符
}
```

## 常用插件

- Code Spell Checker

- Easy Snippet

- IntelliJ IDEA Keybindings

- Stylelint

- Prettier - Code formatter

- EsLint

- Code Translate

- Error Lens

- EditorConfig for VS Code

---

### 单测插件

- Jest Runner

---

### vue 插件

- Vetur

- Vue Language Feature (Volar)

- Vite

### 其他插件

- CodeSnap

- Butter Comments

  > TODO 等注释显示

- DotENV

- Quokkas

  > 在线运行

### 主题

- Material Icon Theme

  > 文件夹主题

## vscode setting.json

```json
{
  "explorer.compactFolders": false,

  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "editor.formatOnSave": true,

  "editor.tabSize": 2,

  "merge-conflict.autoNavigateNextConflict.enabled": true,

  "files.autoSave": "afterDelay",

  "files.autoSaveDelay": 5000,

  "editor.bracketPairColorization.enabled": true,

  "editor.wordWrapColumn": 150,

  "editor.lineHeight": 25,

  "files.trimTrailingWhitespace": true,

  "workbench.iconTheme": "material-icon-theme",
  "explorer.confirmDelete": false,
  "git.confirmSync": false,
  "explorer.confirmDragAndDrop": false,

  "tabnine.experimentalAutoImports": true,

  "editor.fontFamily": "Fira Code",
  "editor.fontWeight": "400",
  "editor.fontLigatures": false,
  // 主题配置
  "workbench.colorTheme": "Vitesse Light",
  "window.autoDetectColorScheme": true,
  "workbench.preferredDarkColorTheme": "Vitesse Dark",
  "workbench.preferredLightColorTheme": "Vitesse Light",
  "workbench.preferredHighContrastColorTheme": "Vitesse Dark Soft",
  "workbench.preferredHighContrastLightColorTheme": "Vitesse Light Soft"
}
```
