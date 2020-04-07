[webpack-dev-middleware](https://www.webpackjs.com/guides/development/#%E4%BD%BF%E7%94%A8-webpack-dev-server)
webpack-dev-middleware 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。webpack-dev-server内部就使用了它，如果不想使用webpack-dev-server,比如自行构建express服务器，就需要引入这个中间件。当express服务器脚本构建好之后，直接运行此服务器脚本，webpack就会自行打包，并将打包后的结果保存在内存中，此时即可在服务器中访问页面。
优点：
- No files are written to disk, rather it handles files in memory
- If files changed in watch mode, the middleware delays requests until compiling has completed.
- Supports hot module reload (HMR).
[webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware)
为自定义的服务器添加模块热更新功能(HMR),两步实现
- 在plugin中添加webpack-hot-middleware插件
- 在entry入口数组中(数组第一项)添加一个入口项['webpack-hot-middleware/client',path.resolve(__dirname, "./app/main.js")]

[connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback)
Fallback to index.html for applications that are using the HTML 5 history API
当一个请求满足以下四个条件的时候就会回退到index.html
- The request is a GET request
- which accepts text/html,
- is not a direct file request, i.e. the requested path does not contain a . (DOT) character and
- does not match a pattern provided in options.rewrites (see options below)
[vue-style-loader](https://github.com/vuejs/vue-style-loader)
vue-loader专用，等同于style-loader
This is a fork based on style-loader. Similar to style-loader, you can chain it after css-loader to dynamically inject CSS into the document as style tags. However, since this is included as a dependency and used by default in vue-loader, in most cases you don't need to configure this loader yourself.
Compiler对象

Compiler 对象包含了Webpack环境所有的配置信息，包含options，loaders, plugins这些项，这个对象在webpack启动时候被实例化，它是全局唯一的。我们可以把它理解为webpack的实列。
compilation 对象

compilation 对象包含了当前的模块资源、编译生成资源、文件的变化等。当webpack在开发模式下运行时，每当检测到一个文件发生改变的时候，那么一次新的 Compilation将会被创建。从而生成一组新的编译资源。

Compiler对象 与 Compilation 对象 的区别是：Compiler代表了是整个webpack从启动到关闭的生命周期。Compilation 对象只代表了一次新的编译。

PostCSS 是一个 CSS 处理工具，和 SCSS 不同的地方在于它通过插件机制可以灵活的扩展其支持的特性，而不是像 SCSS 那样语法是固定的。 PostCSS 的用处非常多，包括给 CSS 自动加前缀、使用下一代 CSS 语法等，目前越来越多的人开始用它，它很可能会成为 CSS 预处理器的最终赢家。

参考链接：
https://cloud.tencent.com/developer/section/1477246
https://github.com/webpack/docs/wiki/how-to-write-a-plugin
https://webpack.wuhaolin.cn/5%E5%8E%9F%E7%90%86/5-1%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E6%A6%82%E6%8B%AC.html
https://segmentfault.com/a/1190000013657042
https://www.cnblogs.com/donglegend/p/5821092.html