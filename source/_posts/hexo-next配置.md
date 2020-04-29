---
date: 2020/2/13 20:46:25
categories:
- hexo
tags:
- hexo 
- next

---
# Hexo-Next 配置优化
## 如何在页面中关闭评论
在front-matter中配置 `comments: false`
## [如何引入图片](https://yanyinhong.github.io/2017/05/02/How-to-insert-image-in-hexo-post/)
- 绝对路径
在根目录source文件夹下新建images文件夹，通过绝对路径`![img](/images/image.jpg)` 引入到Markdown中
- 相对路径
根目录下主配置文件 _config.yml 
post_asset_folder: true
- [__()函数](https://hexo.io/docs/internationalization.html)
Use __ or _p helpers in templates to get the translated strings. The former is for normal usage and the latter is for plural strings. 