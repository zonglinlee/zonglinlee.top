---
title: koa-middleware
date: 2020-05-20 14:03:54
tags:
- koa
- http
---
koa常见中间件
<!-- more -->
基本上，Koa 所有的功能都是通过中间件实现的，每个中间件默认接受两个参数，第一个参数是 Context 对象，第二个参数是next函数。只要调用next函数，就可以把执行权转交给下一个中间件。
如果有异步操作（比如读取数据库），中间件就必须写成 async 函数。

## [koa-session-minimal](https://github.com/longztian/koa-session-minimal)
session机制：session是一种特殊的cookie，服务端返回一个通过response header 中的`Set-Cookie: sessionId=sessionIdValue` 来设置一个cookie，之后浏览器就带上这个cookie发送给服务器，服务器再通过这个id来在数据库中查询相关信息。
在koa中通过`ctx.cookies.set(name, value, [options])`函数来写 Cookie，在`koa-session-minimal`中
```js
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
app.use(
  session({
    key: 'USER_SID', // 响应头set-cookie中的key
    store: new MysqlStore(sessionMysqlConfig), //创建一个 mysql 表来保存 sessionID
    cookie:{
      httpOnly:true,// cookie选项配置详情参考https://github.com/pillarjs/cookies
    }
  }),
);
```
原理：每次koa服务器接收到新的请求时，都会app.use()一次这个中间件，内部会调用`ctx.cookies.get(key)`来得到session-id，如果不存在，就会创建一个session-id,并初始化一个`ctx.session`对象挂载到koa的context上，如果存在，就会根据此ID在数据库中查找到数据挂载到ctx.session上。 然后执行 `next()`方法，即调用下一个中间件函数继续执行后续处理，等后续中间件执行完毕之后(在这期间用户会对ctx.session进行操作，或者调用`ctx.sessionHandler`重置session id)，再继续执行此中间件的后续部分，判断session id 是否重置，以及ctx.session是否有改动等等，然后写入数据库存储
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
## [koa-static-cache](https://github.com/koajs/static)
如果静态资源中有 gzip 格式存在，以express服务器为例，需要配置如下中间件函数，返回正确的资源类型。在koa中也是一样，如果使用koa-static-cache就可以自己检测，当然koa-static-cache还有很多其它功能
```js
app.get(['/index.js','/index.css'], function (req, res, next) {
  req.url = req.url + '.gz'
  res.set('Content-Encoding', 'gzip')
  res.setHeader("Content-Type", generateType(req.path)) // 这里要根据请求文件设置content-type
  next()
})
```
### 参考链接
[彻底搞懂浏览器缓存机制](https://juejin.im/post/5c4528a6f265da611a4822cc)
## [koa-cors](https://github.com/evert0n/koa-cors)
For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts.  XMLHttpRequest and the Fetch API follow the `same-origin policy`. This means that a web application using those APIs can only request resources from the same origin the application was loaded from unless the response from other origins includes the right CORS headers.

The HTTP response headers

>Access-Control-Allow-Origin: <origin> | *
>Access-Control-Expose-Headers: <header-name>[, <header-name>]*
>Access-Control-Max-Age: <delta-seconds>
>Access-Control-Allow-Credentials: true
>Access-Control-Allow-Methods: <method>[, <method>]*
>Access-Control-Allow-Headers: <header-name>[, <header-name>]*

The HTTP request headers
>Origin: <origin>
>Access-Control-Request-Method: <method>
>Access-Control-Request-Headers: <field-name>[, <field-name>]*

### 参考链接
- [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
## [koa-logger](https://github.com/koajs/logger)
Development style logger middleware for koa. supports koa@2
## [koa-body](https://github.com/dlau/koa-body)
## [koa-router](https://github.com/ZijianHe/koa-router)
boom库 ： 封装了http-statusCode的一个error库
## [mysql](https://github.com/mysqljs/mysql)
## 参考链接
- [Koa 框架教程](http://www.ruanyifeng.com/blog/2017/08/koa.html)
- [十个常用中间件](https://www.jianshu.com/p/c1e0ca3f9764)
- [MiddleWare-Lists](https://www.bookstack.cn/read/koa-docs-Zh-CN-v2.7.0/middleware.md)