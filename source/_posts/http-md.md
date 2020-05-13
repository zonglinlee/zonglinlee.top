---
title: http常见字段
date: 2020-05-13 14:12:52
tags:
- http
---
HTTP请求部首详解
<!-- more -->
## Content-Type
indicate the media type of the resource
In responses, a Content-Type header tells the client what the content type of the returned content actually is. Browsers will do MIME sniffing in some cases and will not necessarily follow the value of this header; to prevent this behavior, the header `X-Content-Type-Options` can be set to nosniff.

In requests, (such as POST or PUT), the client tells the server what type of data is actually sent.

这个只是说明了请求和相应的资源类型，但实际上不一定相符
### axios 中的 content-type 设置
默认的content-type是 `application/x-www-form-urlencoded`
在源码 `lib/defaults.js` 中 有个 `setContentTypeIfUnset` 函数，它会判断axios中传入的 data 类型，并修正HTTP请求中的 `Content-Type`类型。如果传入的是JS对象，则会调用`JSON.stringify()`方法进行序列化，服务端相应的进行反序列化
```js
//axios源码 https://github.com/axios/axios/blob/master/lib/defaults.js
//如果要使用 application、x-www-form-urlencoded 方式提交,可以使用 URLSearchParams API
//或者 调用 const qs = require('qs') 模块来序列化数据
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data
```
### 表单提交中的content-type
form元素中的 `enctype` attribute 表示了表单提交的 content-type，总共有三种类型

- `application/x-www-form-urlencoded`: the keys and values are encoded in key-value tuples separated by '&', with a '=' between the key and the value. Non-alphanumeric characters in both keys and values are percent encoded: this is the reason why this type is not suitable to use with binary data (use multipart/form-data instead)

- `multipart/form-data`: each value is sent as a block of data ("body part"), with a user agent-defined delimiter ("boundary") separating each part. The keys are given in the Content-Disposition header of each part.

- `text/plain`
## Authorization
The HTTP Authorization request header contains the credentials to authenticate a user agent with a server, usually, but not necessarily, after the server has responded with a 401 Unauthorized status and the WWW-Authenticate header.
一般第一次请求不会携带Authorization请求头，当用户第一次访问服务器时，如果此服务器配置了基本的 HTTP auth 验证，则服务器需要验证信息并返回`WWW-Authenticate`响应头，用户输入验证信息后，一般就是username 和 password ，浏览器转成base64字符串发送给服务器验证，验证通过即可访问。

`Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l`

基本验证很弱，所以很少有人使用。

