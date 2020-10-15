---
title: vue-cli的使用
tags:
- vue
---
vue-cli脚手架的配置和使用
<!-- more -->
## vue-cli插件

- @vue/cli-plugin-eslint
vue-cli 的 eslint 插件，通过这个插件给vue-cli注入了`vue-cli-service lint` 命令，提供了命令行使用lint的功能。@vue/cli-plugin-xxx功能都是注入命令行方法，扩展vue-cli 或者 webpack
- eslint 和 eslint-plugin-vue
Linters have two categories of rules:Formatting rules/Code-quality rules,都有相应的配置规则，以eslint为例，都需要自行配置(官方也有预设)。linter根据语言有不同的linter来匹配语法错误。在.vue文件中使用eslint，需要先安装eslint，然后安装eslint的vue插件才可以使用
eslint-plugin-vue:This plugin allows us to check the <template> and <script> of .vue files with ESLint
配置规则见官网，要覆盖默认的规则，看配置文件是在vue项目中单独出来了，还是在package.json 文件中的eslintConfig字段中配置
官网：<https://eslint.vuejs.org/>

- [prettier 和 eslint-plugin-prettier](https://prettier.io/docs/en/comparison.html)
prettier是一个code formatter，在vscode中安装了prettier后就可以 shift+alt+F 来格式化代码，它提供了linter中的Formatting rules功能,相当于只有一部分的linter功能，但并不会检查语法错误。这两个包是给eslint服务的。
- style-resources-loader
这个包是一个css注入包，在webpack中配置在最右边，style-loader/css-loader/stylus-loader/style-resources-loader ，即第一个调用，它被用作将一些全局css 变量 mixin 等注入到每个css模块中，从而不用手动在每个css模块中引入了。在vue.config.js中配合chainWepack使用
替代包：vue-cli-plugin-style-resources-loader
- babel-plugin-import
模块化导入用
Modular import plugin for babel, compatible with antd, antd-mobile, lodash, material-ui, and so on.使用的时候看所使用的的框架是否支持
babelrc文件或者webpack中babel-loader中添加配置。
- vue-loader
在webpack的配置文件中使用，是用来自行构建脚手架时候使用的，官方推荐使用vue-cli构建开发环境。
- vue-template-compiler
使用vue-cli构建时候 自动安装的
这个包可以被用来将 Vue 2.0 的模板预编译为渲染函数以避免运行时不必要的编译开销和 CSP 的限制。
- css预处理器
vue-cli搭建环境的时候会选择预处理器，如果没选的话，只需要手动npm安装即可，内置的webpack会处理好一切。

## Eslint

<https://eslint.org/docs/user-guide/getting-started>

## eslint 使用

```shell
npm install eslint --save-dev # 安装 eslint
# 执行 npx eslint --init 在当前项目文件夹下创建配置文件 .eslintrc.js
# 如果是vue项目，在执行--init过程中会自动安装 @vue/cli-plugin-eslint 插件
# https://eslint.vuejs.org/user-guide/
# 如果使用vue-cli脚手架创建项目，会自动安装 eslint 和 @vue/cli-plugin-eslint 无需自行配置，但是要手动创建 .eslintrc.js 配置文件
# 推荐安装vs-code eslint插件，配置 lintOnSave选项，很好用，具体见vscode中安装插件页面，按照步骤配置即可,参考链接如下
# https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
npx eslint --init
```

## eslint ignore

- `.eslintignore` 文件
You can tell ESLint to ignore specific files and directories by creating an .eslintignore file in your project's root directory.
- Using eslintIgnore in package.json
If an `.eslintignore` file is not found and an alternate file is not specified, ESLint will look in `package.json` for an `eslintIgnore` key to check for files to ignore
