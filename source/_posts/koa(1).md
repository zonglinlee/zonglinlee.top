---
title: koa
tags:
- koa
---
koa不包含任何middleware,express.static这种都不包括
它的中间件原理和express不太一样
app.use(async function(ctx,next){
    console.log(1)//先打印1
    await next() //这里会走下一个中间件，打印a
    console.log(2)//再执行打印2
})
app.use(async function(ctx,function(){
    console.log("a")
}))
app.listen(4000)


koa 中写异步需要用promise包装一下
## koa中间件
koa-bodyparser 处理响应体，当请求体过来的时候会赋值给ctx.request.body
缺点：不支持文件上传
如果要支持文件上传 再express中用multer中间件，再koa 中用koa-better-body中间件，它会将请求体对象赋值给ctx.request.fields,中间件需要配置上传路径
表单form中要添加enctype属性 <form method="POST" enctype="multipart/form-data">,否则上传不了
koa-convert
将一个generator中间件(koa1)转成koa2可以使用的async中间件
app.use(convert(bodyParser({
    uploadDir:path.join(__dirname,'uploads')
})))
