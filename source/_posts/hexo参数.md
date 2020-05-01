---
title: hexo命令以及主题结构
date: 2020-02-04 23:25:16
---

## hexo 基本概念

### 辅助函数(helper)

辅助函数帮助您在模板中快速插入内容,不能在源文件中使用

```js
hexo.extend.helper.register(name, function () {});
```

## hexo 命令

### hexo new [layout] <title>

默认是 post,在根目录的`scaffolds`文件夹下有三个 `.md`文件，当执行`hexo new post mypost` 这条命令时，会在根目录`/source/_posts`文件夹下以 post.md 为模板生成一个 Markdown 文件，然后就可以开始写博文了。
你可以在这些模板中提前定义好 front matter。这几个文件是 Markdown 的博文模板，不要和主题中的模板搞混淆了。

## hexo 主题目录结构

- layout folder
  This folder contains the theme’s template files, which define the appearance of your website.
- Script folder. Hexo will **automatically load all JavaScript** files in this folder during initialization.
- Source folder. Place your assets (e.g. CSS and JavaScript files) here. Hexo ignores hidden files and files or folders prefixed with \_ (underscore).
  Hexo will process and save all renderable files to the public folder. Non-renderable files will be copied to the public folder directly.

### layout
模板可以有很多个,以下6个是比较常见的，分别是主页，新建页面(通用的)，博文页，归档页，分类页，标签页，当然你可以扩展比如 about.swig ,然后再front-matter中定义 type: about即可
<table>
    <tr><th>Template</th><th>Page</th><th>Fallback</th></tr>
    <tr><td>index</td><td>home page</td><td>index</td></tr>
    <tr><td>page</td><td>pages</td><td>index</td></tr>
    <tr><td>post</td><td>posts</td><td>index</td></tr>
    <tr><td>archive</td><td>Archives</td><td>index</td></tr>
    <tr><td>category</td><td>Category archives</td><td>archive</td></tr>
    <tr><td>tag</td><td>Tag archives</td><td>archive</td></tr>
</table>

### 永久链接
可以在_config.yml中定义
`permalink: :year/:month/:day/:hour/:minute`
来显示文章链接
### 数据文件夹
 Hexo 3 introduced the new Data files. This feature loads **YAML or JSON** files in source/_data folder so you can use them in your site.
- site.data
在source/_data文件夹下的 YAML or JSON files
比如在此文件夹下有一个 munu.yaml 文件，则可以在模板字符串中
```js
<% for (var link in site.data.menu) { %>
<a href="<%= site.data.menu[link] %>"> <%= link %> </a>
<% } %>
```


## hexo debug

chrome://inspect
`node --inspect-brk ./node_modules/hexo/node_modules/hexo-cli/bin/hexo g`
