---
title: axios
date: 2020-05-14 15:55:54
tags:
  - axios
---

## JS中Error对象

通用的Error构造函数： `new Error([message[, fileName[,lineNumber]]])`

error对象直接在控制台是console不出来的，需要进行 `error.message error.name` 进行查看
在 `Error.prototype` 上有两个标准属性 `message name` , 其余的四个非标准属性 `fileName lineNumber columnNumber stack` 也由各个浏览器得到了支持。
JavaScript还有6个其他类型的错误构造函数： `ReferenceError SyntaxError TypeError URIError InternalError RangeError EvalError`

## 响应拦截，错误处理

当请求出错时候，Axios 在 `createError.js` 中对请求返回的response进行了处理, 自定义了一个错误对象，并将 `response` 挂载到了自定义error对象上面，所以在响应拦截中，要从error.response中获取错误信息

``` js
// createError.js
module.exports = function createError(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, request, response);
};

// enhanceError.js
module.exports = function enhanceError(error, config, code, request, response) {
    error.config = config;
    if (code) {
        error.code = code;
    }

    error.request = request;
    error.response = response;
    error.isAxiosError = true;
    return error;
};
```

## 参考链接

- [前端开发中的Error以及异常捕获](https://juejin.im/post/6844903751271055374)
- [axios请求超时,设置重新请求的完美解决方法](https://juejin.im/post/6844903585751236621)
