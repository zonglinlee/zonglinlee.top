---
title: ajax上传文件
date: 2020-05-14 19:35:29
tags:
- ajax
- node
---
前端文件上传以及后台处理
<!-- more -->
## ajax上传文件
### 创建文件预览链接的两种方式
 `FileReader`  `URL`  构造函数以及`HTMLCanvasElement`对象。
 - `URL.createObjectURL(obj)`
 obj：A File, Blob, or MediaSource object to create an object URL for.
 The URL lifetime is tied to the document in the window on which it was created.
 - `FileReader.readAsDataURL(blob/file)`
The `readAsDataURL` method is used to read the contents of the specified `Blob` or `File`. When the read operation is finished, the `readyState` becomes `DONE`, and the `loadend` is triggered. At that time, the `result` attribute contains the data as a data: URL representing the file's data as a base64 encoded string.
- `HTMLCanvasElement.toDataURL(type, encoderOptions)`
 ```js
//方法一 返回一个链接
const objectURL = URL.createObjectURL(object)
//方法二 结果是base64编码的，保存在 reader.result 中
const img = document.createElement("img");
    preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
    const reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
//方法三 
var canvas = document.getElementById('canvas');
var dataURL = canvas.toDataURL();
// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby
// blAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"
 ```
## 后台处理(express为例)
express 中间件 `body-parser` 只能处理以下几种:
- JSON body parser
- Raw body parser
- Text body parser
- URL-encoded form body parser
对于 multipart/form-data 格式的类型，需要用其它中间件处理，比如 [`multer`](https://github.com/expressjs/multer),它是基于 [`busboy`](https://github.com/mscdex/busboy)(A streaming parser for HTML form data for node.js)封装的。

### 参考链接
- [自定义上传图标/文件缩略图/文件上传进度条/拖放上传文件](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications)
- [nodejs 保存 base64 图片](https://segmentfault.com/q/1010000014834091)
- [multer](https://github.com/expressjs/multer)
- [busboy](https://github.com/mscdex/busboy)