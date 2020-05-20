---
title: koa-middleware
date: 2020-05-20 14:03:54
tags:
- koa
- http
---
koa常见中间件
<!-- more -->
## [koa-compress](https://github.com/koajs/compress)
koa-compress中间件会针对返回的文件类型和大小决定是否开启压缩，以及采用哪种压缩算法
配置中 `options.filter` 函数会根据 `response content type` 决定对那种文件类型进行压缩,你可以手动配置，返回 true/false 开启关闭压缩，如下
```js
  filter (content_type) {
  	return /text/i.test(content_type)
  }
```
如果不配置的话，默认对以下几种格式开启压缩，图片等其他格式则不压缩
`text/*`   `*/*+json`   `*/*+text`   `*/*+xml`
options.threshold 配置压缩阈值，Default `1024` bytes or `1kb`.
>压缩文件的产生
>spa文件可以在webpack构建中压缩出来，直接上传服务器，配合koa-static返回给客户端
>动态渲染的文件可以在koa服务器中使用koa-compress中间件压缩并返回，也可以在nginx中开启gizp压缩，对于客户端来说都是一样的，都是属于服务端压缩的
### 参考链接
- [探索HTTP传输中gzip压缩的秘密](https://juejin.im/entry/5a577f64518825733a30a050)
## [koa-static](https://github.com/koajs/static)
如果静态资源中有 gzip 格式存在，以express服务器为例，需要配置如下中间件函数，返回正确的资源类型。在koa中也是一样，如果使用koa-static就可以自己检测，当然koa-static还有很多其它功能
```js
app.get(['/index.js','/index.css'], function (req, res, next) {
  req.url = req.url + '.gz'
  res.set('Content-Encoding', 'gzip')
  res.setHeader("Content-Type", generateType(req.path)) // 这里要根据请求文件设置content-type
  next()
})
```

## 参考链接
- [十个常用中间件](https://www.jianshu.com/p/c1e0ca3f9764)