---
title: http-Content-negotiation
date: 2020-05-20 14:16:12
tags:
- http
---
HTTP 内容协商 机制
<!-- more -->
一个URL对应一个资源，一个资源在服务器端有多种展现形式(text/html,text/pdf,gizp)等等，当客户端请求该资源的时候究竟服务器应该返回哪一种资源给客户端，这就是由内容协商机制决定的。
客户端告诉服务端我可以接受什么样的资源类型`Accept,Accept-Charset,Accept-Encoding,Accept-Language`，服务端返回相应的`Content-Type,Content-Language,Content-Encoding,Content-Location`
## 相关 http header
request headers：
- Accept
- Accept-Charset 
- Accept-Encoding
- Accept-Language 
- User-Agent(非标准)
response headers:
- vary
It indicates the list of headers used by the server during the server-driven content negotiation phase.
The special value of '*' means that the server-driven content negotiation also uses information not conveyed in a header to choose the appropriate content.

The Vary header was added in the version 1.1 of HTTP and is necessary in order to allow caches to work appropriately. A cache, in order to work with server-driven content negotiation, needs to know which criteria was used by the server to select the transmitted content. That way, the cache can replay the algorithm and will be able to serve acceptable content directly, without more request to the server. Obviously, the wildcard '*' prevents caching from occurring, as the cache cannot know what element is behind it.

## 两种协商机制
### Server-driven content negotiation
### Agent-driven negotiation
## 参考链接
- [mdn-http内容协商](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation)