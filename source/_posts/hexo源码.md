---
title: hexo源码
date: 2020-05-01 08:58:17
tags:
  - hexo
---
## hexo 主目录
### locals.js
存储网站变量
## hexo extend
<!-- more -->
### js 补漏

#### Reflect.apply()

Reflect is a built-in object that provides methods for interceptable JavaScript operations. The methods are the same as those of proxy handlers. Reflect is not a function object, so it's not constructible.
`Reflect.apply()` 和 `Function.prototype.apply()`作用一样

```js
Reflect.apply(target, thisArgument, argumentsList);
console.log(Reflect.apply(Math.floor, undefined, [1.75]));
// expected output: 1
```

### filter.js
Filter 实例上有个 store 对象，结构如下
```js
{
  before_post_render: [fn1, fn2, fn3];
  after_post_render: [fn1, fn2];
}
```
当调用Filter实例上的 `register` 方法时，会向 `store` 中添加处理函数，当调用实例上的 `exec`方法时，会处理传入的数据，如果数据未做任何处理，照原样返回
### helper.js
这个和filter.js类似,实例对象上有一个store对象，调用register方法时会添加一些函数
```js
  register(name, fn) {
    this.store[name] = fn;
  }
```
源码内置插件(helper函数) toc.js 解读
`hexo-util`包运用`htmlparser2`(ast语法树) 包，封装了 `tocObj` 方法，可以将html解析出标题，在模板中如下使用
<%- toc(page.content) %>



## 参考链接
[hexo是怎么工作的](http://coderunthings.com/2017/08/20/howhexoworks/)