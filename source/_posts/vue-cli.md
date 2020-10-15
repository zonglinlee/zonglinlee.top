---
title: vue-cli
date: 2020-04-30 17:10:06
tags: 
    - vue
    - vue-cli
---
vue-cli
<!-- more -->
<https://cli.vuejs.org/zh/guide/installation.html>

```shell
vue --version #查看本地vue-cli版本
npm update -g @vue/cli # 升级
# 升级项目中的 Vue CLI 相关模块（以 @vue/cli-plugin- 或 vue-cli-plugin- 开头）
vue upgrade [options] [plugin-name]
vue create hello-world # 创建一个项目（命令行方式）
vue ui # 创建一个项目（图形界面面方式创建）
vue add eslint # 在现有的项目中安装vue-cli 插件 ，插件都是以 @vue/cli-plugin- 开头的，只要输入最后的plugin名称即可
```

注意事项
vue add 的设计意图是为了安装和调用 Vue CLI 插件。这不意味着替换掉普通的 npm 包。对于这些普通的 npm 包，你仍然需要选用包管理器。

Preset：一个 Vue CLI preset 是一个包含创建新项目所需预定义选项和插件的 JSON 对象，让用户无需在命令提示中选择它们，在 vue create 过程中保存的 preset 会被放在你的 home 目录下的一个配置文件中 (~/.vuerc)。你可以通过直接编辑这个文件来调整、添加、删除保存好的 preset

CLI 服务：在一个 Vue CLI 项目中，@vue/cli-service 安装了一个名为 vue-cli-service 的命令。你可以在 npm scripts 中以 vue-cli-service、或者从终端中以 ./node_modules/.bin/vue-cli-service 访问这个命令。
