## `!function(){}()` 作用
跟(function(){})();这个函数是一个意思，都是告诉浏览器自动运行这个匿名函数的，因为!+()这些符号的运算符是最高的，所以会先运行它们后面的函数
## DOMTokenList interface
The DOMTokenList interface represents a set of space-separated tokens. Such a set is returned by `Element.classList`.
<div class="class1 class2"></div>
原生dom方法来toggle一个类：`div.classList.toggle("class1")`
<hr>
## noscript 标签
## form
enctype 属性
在method是post的情况下，enctype是form提交时候的mime类型
默认是：application/x-www-form-urlencoded
如果有input 的type为file类型，即这个表单要上传文件，则使用multipart/form-data类型
using the GET method (in this case the enctype attribute will be ignored).
## FormData 对象
在form enctype='multipart/form-data'情况下，可以使用FormData对象来讲form中要提交的数据转换成一个对象，用ajax来提交。
It is primarily intended for use in sending form data, but can be used independently from forms in order to transmit keyed data.

var formData = new FormData(someFormElement);//将form元素传入构造函数，返回表单提交的数据对象，还可以用formData.append("username", "Groucho");来添加新的键值对。
优缺点：Using the FormData API is the simplest and fastest, but has the disadvantage that data collected can not be stringified.

如果不想使用FormData对象，请参考以下链接
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Submitting_forms_and_uploading_files

