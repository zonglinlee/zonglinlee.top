---
---
### res.cookie(name, value [, options])
这个API是express添加到res对象中的，node.js原生不提供此方法，服务器端写入cookie给http响应头部。
options 中 expires 如果不设置，则默认创建一个session cookie，即浏览器不关闭就一直生效。
httpOnly,默认false，此时可以在浏览器中通过 document.cookie读取到，设为true，就只能被服务器读取。
secure设置为true，Marks the cookie to be used with HTTPS only.
signed用来设置cookie是否被签名。

浏览器发送到服务端的cookie如何读取，中间件 cookie-parser,Parse Cookie header and populate `req.cookies` with an object keyed by the cookie names.如果cookie 被signed ，可以用 `req.signedCookie` 来读取。
### [express-session](https://www.npmjs.com/package/express-session)
session机制，客户端第一次访问服务器的时候，服务器会生成全局唯一的session_id,之后通过http的响应头set-cookie发给客户端，此后客户端会带着这个session_id来访问服务器，服务器会通过这个session_id来取出服务端保存的数据。
session的持久化保存:session-store.  
 connect-mongo A MongoDB-based session store
 connect-redis A Redis-based session store.

如何在vscode中debugger，打断点
Object.defineProperty
object.create