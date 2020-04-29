---

date: 2020-02-04 23:25:16
---
- site.data
在source/_data文件夹下的 YAML or JSON files
比如在此文件夹下有一个 munu.yaml 文件，则可以在模板字符串中，link是 property

<% for (var link in site.data.menu) { %>
  <a href="<%= site.data.menu[link] %>"> <%= link %> </a>
<% } %>

hexo new [layout] <title>
post is the default layout
There are three default layouts in Hexo: post, page and draft.
layout 存在于根目录下的 Scaffolds 文件夹中，里面默认有page.md/post.md/draft.md 三个

type="image/x-icon" 是什么

theme 文件夹
.
├── _config.yml
├── languages
├── layout   //模板字符串文件夹
├── scripts //hexo 初始化时候会自动加载这个文件夹的js文件
└── source  //js/css 等直接copy到根目录下的public文件夹 ，会忽略隐藏文件和以_开头的文件

网站部署的时候根目录是生成的public文件夹
page ：Page specific information and custom variables set in front-matter.
page.content：The full processed content of the article

`Hexo` has special `page` called `post`.
