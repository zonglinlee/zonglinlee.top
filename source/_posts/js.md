---
title: js补漏
tags:
- js
---
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

## ajax cookie
ajax 配置nginx,跨域请求的时候会不带cookie,如果要带cookie
request header 要配置 withCredentials：true
response header 要配置 Access-Control-Allow-Credentials: true

如果用koa框架，会有 `koa-cors`包设置Access-Control-Allow-Credentials.  查看koa-cors源码配置选项{credentials:true}
## FormData 对象
```js
let form = $('form')
let formdata = new FormData('form')
console.log(formdata) //打印出{}空对象
//FormData实例对象打印不出任何东西，但它提供了许多方法，会返回迭代器。
```
FormData.entries()
Returns an iterator allowing to go through all key/value pairs contained in this object.
## File interface
The File interface provides information about files and allows JavaScript in a web page to access their content.
`File` objects are generally retrieved from a `FileList` object returned as a result of a user selecting files using the <input> element, from a drag and drop operation's `DataTransfer` object, or from the `mozGetAsFile() API` on an `HTMLCanvasElement`.
A File object is a specific kind of a `Blob`, and can be used in any context that a Blob can. In particular, `FileReader`, `URL.createObjectURL()`, `createImageBitmap()`, and `XMLHttpRequest.send()` accept both Blobs and Files.
file属性
Properties:File.lastModified/File.lastModifiedDate/File.name/File.size/File.type
file 方法
File接口不实现任何方法，都是从Blob接口上继承上来的。
## Blob
The Blob object represents a blob, which is a file-like object of immutable, raw data; they can be read as text or binary data, or converted into a `ReadableStream` so its methods can be used for processing the data.

Blobs can represent data that isn't necessarily in a JavaScript-native format. The File interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system.
## ArrayBuffer
The ArrayBuffer object is used to represent a generic, fixed-length raw binary data buffer.
It is an array of bytes, often referred to in other languages as a "byte array".You cannot directly manipulate the contents of an ArrayBuffer; instead, you create one of the `typed array objects` or a `DataView` object which represents the buffer in a specific format, and use that to read and write the contents of the buffer.

The ArrayBuffer() constructor creates a new ArrayBuffer of the given length in bytes, you can also get an array buffer from existing data, for example from a `Base64 string` or from a `local file`.