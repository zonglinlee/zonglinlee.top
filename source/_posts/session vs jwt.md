---
title: session vs jwt
date: 2020-01-31 09:31:49
tags:
---
## koa-session-minimal
内部引入了uid-safe(unique id for cookie and url)模块来产生一个sid(session id),当用户登录后调用ctx.cookies.set(key,value),key时koa-session-minimal配置时候传入的key,value是uid模块生成的session id,服务器在返回的时候设置了 set-cookie=sid,用来管理会话,服务器和客户端来回传递此sessionid ,服务器保存了ctx.session对象，通过此id来查询服务器上保存的用户信息，默认保存在memory-store中，浏览器窗口关闭，session对象就会丢失，持久化保存请用对应的数据库store

jwt 是另外一种会话管理机制
服务的生成token返回给客户端，客户端保存在localStorage 或者sessionStorage中，在axios中配置全局默认响应头 authorization，传入token
axios.defaults.headers['Authorization'] = sessionStorage.getItem("token");
服务端收到之后，从req对象中提取token,再校验token的合法性，token中包含了用户名。



服务端设置httponly后，客户端不能使用document.cookie获取值
res.header("Access-Control-Allow-Origin", "具体请求源");  //这里要写具体请求地址
res.header(" Access-Control-Allow-Credentials", true);      //增加
vue中：
axios.defaults.withCredentials = true
