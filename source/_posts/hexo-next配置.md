---
date: 2020/2/13 20:46:25
categories:
  - hexo
tags:
  - hexo
  - next
---

## Hexo 配置

## 如何在页面中关闭评论
<!-- more -->
在 front-matter 中配置 `comments: false`

## [如何引入图片](https://yanyinhong.github.io/2017/05/02/How-to-insert-image-in-hexo-post/)

- 绝对路径
  在根目录 source 文件夹下新建 images 文件夹，通过绝对路径`![img](/images/image.jpg)` 引入到 Markdown 中
- 相对路径
  根目录下主配置文件 \_config.yml
  post_asset_folder: true
  当执行`hexo new [layout] title`时会生成 title 文件名的文件夹来存放图片，通过相对路径引入即可

## next 主题配置
### 模板中的变量
在模板中打印变量,以下三段代码可以在分别打印出各自的变量
```html
//打印page变量
  <div style="border:solid 2px;">
    {% for key ,value in page %}
     {{ key }}---{{ value }}<br>
     {% endfor %}
  </div>
// 打印page.posts变量
  <div style="border:solid 2px;">
    {% for key ,value in page %}
     {% for key , value in page.posts %}
      {{ key }}*******{{ value }}<hr>
     {% endfor %}
     {% endfor %}
  </div>
// page.posts本身好像不是一个数组??
   <div style="border:solid 2px;">
    {% set foo = page.posts.toArray() %}
      {% for key , value in foo[0] %}
          {{ key }}*******{{ value }}<hr>
    {%- endfor %}
  </div>
```
### 根目录下的db.json文件
在这个json文件中存放了整个hexo中的数据模型和数据，这是其中的post模型，可以参考 warehose这个包，这个数据库类似 mongodb
https://hexojs.github.io/warehouse/
```json
    "Post": [
            {
                "title": "常用Windows命令行工具",
                "date": "2020-04-30T09:10:06.000Z",
                "_content": "## tree(生成目录结构树)\n在所在目录执行 `tree /f > list.txt`,就会在当前文件夹list.txt中生成当前目录结构树(所有文件都会列出)\n可以不加 /f 只列出文件夹目录，不包含文件。\n\n",
                "source": "_posts/常用Windows命令行工具.md",
                "raw": "---\ntitle: 常用Windows命令行工具\ndate: 2020-04-30 17:10:06\ntags:\n---\n## tree(生成目录结构树)\n在所在目录执行 `tree /f > list.txt`,就会在当前文件夹list.txt中生成当前目录结构树(所有文件都会列出)\n可以不加 /f 只列出文件夹目录，不包含文件。\n\n",
                "slug": "常用Windows命令行工具",
                "published": 1,
                "updated": "2020-04-30T09:29:38.928Z",
                "comments": 1,
                "layout": "post",
                "photos": [],
                "link": "",
                "_id": "ck9o4hfz000005wtu6oe90npt",
                "content": "<h2 id=\"tree-生成目录结构树\"><a href=\"#tree-生成目录结构树\" class=\"headerlink\" title=\"tree(生成目录结构树)\"></a>tree(生成目录结构树)</h2><p>在所在目录执行 <code>tree /f &gt; list.txt</code>,就会在当前文件夹list.txt中生成当前目录结构树(所有文件都会列出)<br>可以不加 /f 只列出文件夹目录，不包含文件。</p>\n",
                "site": {
                    "data": {}
                },
                "excerpt": "",
                "more": "<h2 id=\"tree-生成目录结构树\"><a href=\"#tree-生成目录结构树\" class=\"headerlink\" title=\"tree(生成目录结构树)\"></a>tree(生成目录结构树)</h2><p>在所在目录执行 <code>tree /f &gt; list.txt</code>,就会在当前文件夹list.txt中生成当前目录结构树(所有文件都会列出)<br>可以不加 /f 只列出文件夹目录，不包含文件。</p>\n"
            }
        ]
```
### next 主题 scripts 脚本目录

                            events
                            │ index.js
                            │
                            └─lib
                                config.js
                                injects-point.js
                                injects.js

在 injects-point.js 中定义了一个对象，存放了许多 `inject-points`,

```js
{
  views: ['head','header','sidebar','postMeta','postBodyEnd',
  'footer','bodyEnd', 'comment'],
  styles: ['variable','mixin','style']
}
```

在 injects.js 中定义了 样式插入类 `StylusInject`,提供了`push(file)`方法, 还定义了 模板插入类`ViewInject`,提供了 `file()`和`raw()`方法，用来插入 js 和 swig 模板文件

用户可以在 source 目录下新建一个`_data`文件夹来存放各种用户数据和模板，然后创建自定义脚本，当 hexo 加载用户脚本的时候就会自动扩展 next 主题。
这样做的好处就是不用修改 next 主题自身，用户可以方便的进行扩充和数据管理。


```js
//在body结束标签前插入脚本，injects.bodyEnd是一个 ViewInject 实例。
//1.注册filter
hexo.extend.filter.register("theme_inject", function (injects) {
  injects.bodyEnd.raw(
    "load-custom-js",
    '<script src="js-path-or-cdn.js"></script>',
    {},
    { cache: true }
  );
});
//2.在index.js 中，generateBefore 事件触发时候 调用 filter
hexo.on("generateBefore", () => {
  require("./lib/config.js")(hexo);
  require("./lib/injects.js")(hexo);//引入并调用注册在"theme_inject"下的所有filter函数
});
//3.步骤2中调用的结果就是将之前注册的filter全部添加到了hexo对象上保存了起来。
  points.styles.forEach(type => {
    hexo.theme.config.injects[type] = injects[type].files;
  });
//4.next主题自带的next_inject辅助函数
//当执行的时候，会将保存在hexo.theme.config.injects中的用户自定义模板，通过partial(hexo自带的helper)方法全部导入进来
hexo.extend.helper.register('next_inject', function(point) {
  return hexo.theme.config.injects[point]
    .map(item => {  return this.partial(item.layout, item.locals, item.options)})
    .join('');
});
//5.next_inject 函数的调用
//在_layout.swig等等其它模板文件中调用，比如下面的就是在_layout.swig 结尾调用了
{{- next_inject('bodyEnd') }}
```
这样做的缺点就是只能在指定inject-point地方扩展next主题，像 `about` 页面就无法修改，因为它用的是`page.swig`作为模板生成的，但模板本身就没有对 about页面做任何处理,只能自行扩展,下面我对原模板稍作了修改，在next主题目录下`/images/avatar.jpg`传入了头像，当front-matter中有`type: about`时，就会渲染下面的内容，这个是写死的，不能再theme中的_config.yml中配置。还有要找到指定的文件修改样式。
```js
    {% elif page.type === 'about' %}
        <img src="/images/avatar.jpg" class="author-image">
          <div class="author-description">
            {{page.motto}}
          </div>
          {{page.content}}
```
## 点击文字特效
```js
//需要引入jQuery
jQuery(document).ready(function ($) {
    let coreSocialistValues = ["富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善"]
    let colors = ["#11f0e5","#e815d3","#f7f30f","#e8270e","#15eb59","#881df2","#fa9120"]
    let index = Math.floor(Math.random() * coreSocialistValues.length);
    $('body').click(function (e) {
      //过滤a标签
      if (e.target.tagName == 'A') {
        return;
      }
      let $i = $("<span />").text(coreSocialistValues[index]);
      index = (index + 1) % coreSocialistValues.length;
      let color_index = Math.floor(Math.random() * colors.length);
      let color = colors[color_index]
      let x = e.pageX,
        y = e.pageY;
      $i.css({
        "z-index": 999999,
        "top": y - 20,
        "left": x,
        "position": "absolute",
        "font-weight": "bold",
        "color": color
      });
      $("body").append($i);
      $i.animate({
        "top": y - 180,
        "opacity": 0
      },
        1500,
        function () {
          $i.remove();
        });
    })
  })
</script>
```

## next配置问题
### 本地白屏
在本地执行`hexo -s --debug`时白屏
next 主题配置文件中禁用 motion ,其他的motion配置保持不变
### [渲染报错](https://www.jianshu.com/p/6032a1a2dc25)
Template render error: (unknown path)
  Error: filter not found: date
    at Object._prettifyError (D:\projects\node\zonglinlee\node_modules\nunjucks\src\lib.js:36:11)
原因：md文件语法和模板引擎语法冲突
解决方法：用{% raw %} {% endraw %} 包裹之后，可以渲染，但是不能解析成html ，尚未解决。

## 参考链接:
- [next-injects](https://theme-next.org/docs/advanced-settings)
