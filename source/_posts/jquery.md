- jQuery对象类似数组，它的每个元素都是一个引用了DOM节点的对象。
- jQuery的选择器不会返回undefined或者null
- jQuery对象和DOM对象之间可以互相转化
```js
var div = $('#abc'); // jQuery对象
var divDom = div.get(0); // 假设存在div，获取第1个DOM元素
var another = $(divDom); // 重新把DOM包装为jQuery对象
```
- 可以查找同时包含red和green的节点
```js
var a = $('.red.green');// 注意没有空格！
var email = $('[name=email]'); // 找出<??? name="email">
var emailInput = $('input[name=email]');
根据tag和class来组合查找也很常见：
var tr = $('tr.red'); 
```
- $('ancestor descendant')
-子选择器$('parent>child')
- 过滤器（Filter）过滤器一般不单独使用，它通常附加在选择器上，帮助我们更精确地定位元素。last-child/first-child/even/odd/nth-child
- 针对表单元素，jQuery还有一组特殊的选择器
:enabled/:disabled/:file/:radio/:focus

## 查找和过滤
通常情况下选择器可以直接定位到我们想要的元素，但是，当我们拿到一个jQuery对象后，还可以以这个对象为基准，进行查找和过滤。

最常见的查找是在某个节点的所有子节点中查找，使用find()方法，它本身又接收一个任意的选择器。如果要从当前节点开始向上查找，使用parent()方法parent() 对于位于同一层级的节点，可以通过next()和prev()方法

过滤方法：filter()方法可以过滤掉不符合选择器条件的节点；map()方法把一个jQuery对象包含的若干DOM节点转化为其他对象；此外，一个jQuery对象如果包含了不止一个DOM节点，first()、last()和slice()方法可以返回一个新的jQuery对象，把不需要的DOM节点去掉
过滤方法中传入一个函数，要特别注意函数内部的this被绑定为DOM对象，不是jQuery对象

## 操作DOM
jQuery对象的text()和html()方法分别获取节点的文本和原始HTML文本，jQuery的API设计非常巧妙：无参数调用text()是获取文本，传入参数就变成设置文本，HTML也是类似操作

一个jQuery对象可以包含0个或任意个DOM对象，它的方法实际上会作用在对应的每个DOM节点上
## 修改CSS
jQuery对象有“批量操作”的特点，这用于修改CSS实在是太方便了
$('#test-css li.dy>span').css('background-color', '#ffd351').css('color', 'red');
为了和JavaScript保持一致，CSS属性可以用'background-color'和'backgroundColor'两种格式。
```js
var div = $('#test-div');
div.hasClass('highlight'); // false， class是否包含highlight
div.addClass('highlight'); // 添加highlight这个class
div.removeClass('highlight'); // 删除highlight这个class
```
## 显示和隐藏DOM
要隐藏一个DOM，我们可以设置CSS的display属性为none，利用css()方法就可以实现。不过，要显示这个DOM就需要恢复原有的display属性，这就得先记下来原有的display属性到底是block还是inline还是别的值。

考虑到显示和隐藏DOM元素使用非常普遍，jQuery直接提供show()和hide()方法
## 获取DOM信息
利用jQuery对象的若干方法，我们直接可以获取DOM的高宽等信息，而无需针对不同浏览器编写特定代码：

// 浏览器可视窗口大小:
$(window).width(); // 800
$(window).height(); // 600

// HTML文档大小:
$(document).width(); // 800
$(document).height(); // 3500

attr()和removeAttr()方法用于操作DOM节点的属性
prop()方法和attr()类似
attr()和prop()对于属性checked处理有所不同：

var radio = $('#test-radio');
radio.attr('checked'); // 'checked'
radio.prop('checked'); // true
prop()返回值更合理一些。不过，用is()方法判断更好：

var radio = $('#test-radio');
radio.is(':checked'); // true
类似的属性还有selected，处理时最好用is(':selected')。
## 操作表单
对于表单元素，jQuery对象统一提供val()方法获取和设置对应的value属性,一个val()就统一了各种输入框的取值和赋值的问题
## 修改DOM结构
直接使用浏览器提供的API对DOM结构进行修改，不但代码复杂，而且要针对浏览器写不同的代码。
- 除了通过jQuery的html()这种暴力方法外，还可以用append()方法
ul.append('<li><span>Haskell</span></li>');
除了接受字符串，append()还可以传入原始的DOM对象，jQuery对象和函数对象
传入函数时，要求返回一个字符串、DOM对象或者jQuery对象。因为jQuery的append()可能作用于一组DOM节点，只有传入函数才能针对每个DOM生成不同的子节点。

append()把DOM添加到最后，prepend()则把DOM添加到最前。
另外注意，如果要添加的DOM节点已经存在于HTML文档中，它会首先从文档移除，然后再添加，也就是说，用append()，你可以移动一个DOM节点。

如果要把新节点插入到指定位置after(),也就是说，同级节点可以用after()或者before()方法

删除节点
要删除DOM节点，拿到jQuery对象后直接调用remove()方法就可以了。如果jQuery对象包含若干DOM节点，实际上可以一次删除多个DOM节点

## 事件
下面两种写法等价，后者更常用
```js
var a = $('#test-link');
a.on('click', function () {
    alert('Hello!');
})
a.click(function () {
    alert('Hello!');
});
```
鼠标事件：mousemove：鼠标在DOM内部移动时触发； hover：鼠标进入和退出时触发两个函数，相当于mouseenter加上mouseleave。
ready事件仅作用于document对象。由于ready事件在DOM完成初始化后触发，且只触发一次，所以非常适合用来写其他的初始化代码。

$(function () {
    // init...
});
这种写法最为常见。如果你遇到$(function () {...})的形式，牢记这是document对象的ready事件处理函数。可以反复绑定事件处理函数，它们会依次执行
取消绑定
一个已被绑定的事件可以解除绑定，通过off('click', function)实现
可以使用off('click')一次性移除已绑定的click事件的所有处理函数。
同理，无参数调用off()一次性移除已绑定的所有类型的事件处理函数
浏览器安全限制
在浏览器中，有些JavaScript代码只有在用户触发下才能执行，例如，window.open()函数

编写jQuery插件
给jQuery对象绑定一个新方法是通过扩展$.fn对象实现的
$.fn.highlight1 = function () {
    // this已绑定为当前jQuery对象:
    this.css('backgroundColor', '#fffceb').css('color', '#d85030');
    return this;
}
注意到函数内部的this在调用时被绑定为jQuery对象，所以函数内部代码可以正常调用所有jQuery对象的方法。

最终，我们得出编写一个jQuery插件的原则：

给$.fn绑定函数，实现插件的代码逻辑；
插件函数最后要return this;以支持链式调用；
插件函数要有默认值，绑定在$.fn.<pluginName>.defaults上；
用户在调用时可传入设定值以便覆盖默认值。