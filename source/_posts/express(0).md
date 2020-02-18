# express
## express app.get()方法封装
```javascript
let http = require('http')
let url = require('url')
function createApplication() {
    //app是真正的请求监听函数
    let app = function (req, res) {
        let { pathname } = url.parse(req.url, true)
        for (let i = 0; i < app.routes.length; i++) {
            let route = app.routes[i]
            //路由和方法都匹配成功后调用处理函数
            if (route.method === req.method.toLowerCase()
                && pathname === route.path) {
                return route.handler(req, res)
            }
        }
        //如果都不匹配
        res.end(`Can not ${req.method} ${pathname}`)
    }
    //定义路由数组,保存服务器路由处理规则
    app.routes = []
    //启动一个服务器
    app.listen = function () {
        //Returns a new instance of http.Server类,这个server类上会暴露listen函数
        //http.createServer([requestListener])
        //The requestListener is a function which is automatically 
        //added to the 'request' event.它会绑定到request事件上面，每次有request事件触发，
        //都会调用requestListener
        let server = http.createServer(app)
        server.listen.apply(server, arguments)
    }
    //app.get方法用来将路由和路由处理函数保存到app.routes中
    //app.get 只能处理get请求
    app.get = function (path, handler) {
        app.routes.push({
            method: 'get',
            path,
            handler
        })
    }
    return app
}
module.exports = createApplication
```
使用
```js
let app = createApplication()
app.listen(8080, function () {
    console.log('server is running')
})
app.get('/hello', function (req, res) {
    res.end('hello')
})
```

http.METHODS提供了所有的请求方法数组，遍历封装所有的app.get/app.post等方法
```js
http.METHODS.forEach(method => {
    method = method.toLowerCase()
    app.[method] = function(path,handler){
        app.routes.push({
            method,
            path,
            handler
        })
    }
})
```