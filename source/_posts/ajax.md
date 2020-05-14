---
title: ajax
date: 2020-05-14 15:55:54
tags:
  - ajax
---

ajax 对象常用属性以及方法

<!-- more -->

## XMLHttpRequest.response

returns the response's body content as an `ArrayBuffer`, `Blob`, `Document`, `JavaScript Object`, or `DOMString`, depending on the value of the request's `responseType` property.

## XMLHttpRequest.responseType

如果不设置 `responseType`， 会被默认设置成 `text`，可以选择的响应类型有
`arraybuffer/blob/document/json/text/`
当设置 `responseType` 的时候，你一定要确认服务器会返回这种格式的数据，如果服务器返回的格式和设置的 `responseType` 不符，`XMLHttpRequest.response` 会被置为 `null`。

## XMLHttpRequest.responseText

如果 ajax 请求成功，`responseText` 包含的是 `textual data received using the XMLHttpRequest`,如果 ajax 请求失败 ，`responseText` 是 `null`
只有当 `XMLHttpRequest.responseType` 是 `空字符串` 或者 `text` 的时候，`responseText` 属性才有效，其它会抛出错误

## XMLHttpRequest.responseXML

returns a `Document` containing the `HTML` or `XML` retrieved by the request; or `null` if the request was unsuccessful, has not yet been sent, or if the data can't be parsed as `XML` or `HTML`.
If the server doesn't specify the `Content-Type` as "text/xml" or "application/xml", you can use `XMLHttpRequest.overrideMimeType()` to parse it as `XML` anyway.

## XMLHttpRequest.timeout

The default value is 0, which means there is no timeout. When a `timeout` happens, a `timeout event` is fired.

## XMLHttpRequest.upload

The XMLHttpRequest upload property returns an `XMLHttpRequestUpload object` that can be observed to monitor an upload's progress.
包含以下事件：
`loadstart/progress/abort/error/load/timeout/loadend`

## XMLHttpRequest.withCredentials

布尔值，同源 ajax 请求设置此属性无效。
作用是发起跨域 ajax 请求的时候是否携带验证信息,比如
`cookies`, `authorization headers` or `TLS client certificates`
如果设为 false 的话，跨域的网站返回的 响应中 不能在他们的域名下设置 cookie 。
The third-party cookies obtained by setting withCredentials to true will still honor same-origin policy and hence can not be accessed by the requesting script through document.cookie or from response headers.

## XMLHttpRequest.setRequestHeader()

When using `setRequestHeader()`, you must call it `after` calling `open()`, but `before` calling `send()`. If this method is called several times with the same header, the values are merged into one single request header.

## XMLHttpRequest.getResponseHeader()

## XMLHttpRequest.getAllResponseHeaders()

## Ajax 发送 二进制数据
```js
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Sending forms with pure AJAX &ndash; MDN</title>
<script type="text/javascript">

"use strict";

/*\
|*|
|*|  :: XMLHttpRequest.prototype.sendAsBinary() Polyfill ::
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#sendAsBinary()
\*/

if (!XMLHttpRequest.prototype.sendAsBinary) {
 XMLHttpRequest.prototype.sendAsBinary = function(sData) {
   var nBytes = sData.length, ui8Data = new Uint8Array(nBytes);
   for (var nIdx = 0; nIdx < nBytes; nIdx++) {
    //& (Bitwise AND) 先将操作数转成32位的2进制数，然后按位进行 & 运算，同为1返回1，否则返回0
     ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
   }
   /* send as ArrayBufferView...: */
   this.send(ui8Data);
   /* ...or as ArrayBuffer (legacy)...: this.send(ui8Data.buffer); */
 };
}


var AJAXSubmit = (function () {

 function ajaxSuccess () {
   console.log(this.responseText);
 }

 function submitData (oData) {
   /* the AJAX request... */
   var oAjaxReq = new XMLHttpRequest();
   oAjaxReq.submittedData = oData;
   oAjaxReq.onload = ajaxSuccess;
   if (oData.technique === 0) {
     /* method is GET */
     oAjaxReq.open("get", oData.receiver.replace(/(?:\?.*)?$/,
         oData.segments.length > 0 ? "?" + oData.segments.join("&") : ""), true);
     oAjaxReq.send(null);
   } else {
     /* method is POST */
     oAjaxReq.open("post", oData.receiver, true);
     if (oData.technique === 3) {
       /* enctype is multipart/form-data */
       var sBoundary = "---------------------------" + Date.now().toString(16);
       oAjaxReq.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + sBoundary);
       oAjaxReq.sendAsBinary("--" + sBoundary + "\r\n" +
           oData.segments.join("--" + sBoundary + "\r\n") + "--" + sBoundary + "--\r\n");
     } else {
       /* enctype is application/x-www-form-urlencoded or text/plain */
       oAjaxReq.setRequestHeader("Content-Type", oData.contentType);
       oAjaxReq.send(oData.segments.join(oData.technique === 2 ? "\r\n" : "&"));
     }
   }
 }

 function processStatus (oData) {
   if (oData.status > 0) { return; }
   /* the form is now totally serialized! do something before sending it to the server... */
   /* doSomething(oData); */
   /* console.log("AJAXSubmit - The form is now serialized. Submitting..."); */
   submitData (oData);
 }

 function pushSegment (oFREvt) {
   this.owner.segments[this.segmentIdx] += oFREvt.target.result + "\r\n";
   this.owner.status--;
   processStatus(this.owner);
 }

 function plainEscape (sText) {
   /* How should I treat a text/plain form encoding?
      What characters are not allowed? this is what I suppose...: */
   /* "4\3\7 - Einstein said E=mc2" ----> "4\\3\\7\ -\ Einstein\ said\ E\=mc2" */
   return sText.replace(/[\s\=\\]/g, "\\$&");
 }

 function SubmitRequest (oTarget) {
   var nFile, sFieldType, oField, oSegmReq, oFile, bIsPost = oTarget.method.toLowerCase() === "post";
   /* console.log("AJAXSubmit - Serializing form..."); */
   this.contentType = bIsPost && oTarget.enctype ? oTarget.enctype : "application\/x-www-form-urlencoded";
   this.technique = bIsPost ?
       this.contentType === "multipart\/form-data" ? 3 : this.contentType === "text\/plain" ? 2 : 1 : 0;
   this.receiver = oTarget.action;
   this.status = 0;
   this.segments = [];
   var fFilter = this.technique === 2 ? plainEscape : escape;
   for (var nItem = 0; nItem < oTarget.elements.length; nItem++) {
     oField = oTarget.elements[nItem];
     if (!oField.hasAttribute("name")) { continue; }
     sFieldType = oField.nodeName.toUpperCase() === "INPUT" ? oField.getAttribute("type").toUpperCase() : "TEXT";
     if (sFieldType === "FILE" && oField.files.length > 0) {
       if (this.technique === 3) {
         /* enctype is multipart/form-data */
         for (nFile = 0; nFile < oField.files.length; nFile++) {
           oFile = oField.files[nFile];
           oSegmReq = new FileReader();
           /* (custom properties:) */
           oSegmReq.segmentIdx = this.segments.length;
           oSegmReq.owner = this;
           /* (end of custom properties) */
           oSegmReq.onload = pushSegment;
           this.segments.push("Content-Disposition: form-data; name=\"" +
               oField.name + "\"; filename=\"" + oFile.name +
               "\"\r\nContent-Type: " + oFile.type + "\r\n\r\n");
           this.status++;
           oSegmReq.readAsBinaryString(oFile);
         }
       } else {
         /* enctype is application/x-www-form-urlencoded or text/plain or
            method is GET: files will not be sent! */
         for (nFile = 0; nFile < oField.files.length;
             this.segments.push(fFilter(oField.name) + "=" + fFilter(oField.files[nFile++].name)));
       }
     } else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
       /* NOTE: this will submit _all_ submit buttons. Detecting the correct one is non-trivial. */
       /* field type is not FILE or is FILE but is empty */
       this.segments.push(
         this.technique === 3 ? /* enctype is multipart/form-data */
           "Content-Disposition: form-data; name=\"" + oField.name + "\"\r\n\r\n" + oField.value + "\r\n"
         : /* enctype is application/x-www-form-urlencoded or text/plain or method is GET */
           fFilter(oField.name) + "=" + fFilter(oField.value)
       );
     }
   }
   processStatus(this);
 }

 return function (oFormElement) {
   if (!oFormElement.action) { return; }
   new SubmitRequest(oFormElement);
 };

})();

</script>
</head>
<body>

<h1>Sending forms with pure AJAX</h1>

<h2>Using the GET method</h2>

<form action="register.php" method="get" onsubmit="AJAXSubmit(this); return false;">
 <fieldset>
   <legend>Registration example</legend>
   <p>
     First name: <input type="text" name="firstname" /><br />
     Last name: <input type="text" name="lastname" />
   </p>
   <p>
     <input type="submit" value="Submit" />
   </p>
 </fieldset>
</form>

<h2>Using the POST method</h2>
<h3>Enctype: application/x-www-form-urlencoded (default)</h3>

<form action="register.php" method="post" onsubmit="AJAXSubmit(this); return false;">
 <fieldset>
   <legend>Registration example</legend>
   <p>
     First name: <input type="text" name="firstname" /><br />
     Last name: <input type="text" name="lastname" />
   </p>
   <p>
     <input type="submit" value="Submit" />
   </p>
 </fieldset>
</form>

<h3>Enctype: text/plain</h3>

<form action="register.php" method="post" enctype="text/plain"
   onsubmit="AJAXSubmit(this); return false;">
 <fieldset>
   <legend>Registration example</legend>
   <p>
     Your name: <input type="text" name="user" />
   </p>
   <p>
     Your message:<br />
     <textarea name="message" cols="40" rows="8"></textarea>
   </p>
   <p>
     <input type="submit" value="Submit" />
   </p>
 </fieldset>
</form>

<h3>Enctype: multipart/form-data</h3>

<form action="register.php" method="post" enctype="multipart/form-data"
   onsubmit="AJAXSubmit(this); return false;">
 <fieldset>
   <legend>Upload example</legend>
   <p>
     First name: <input type="text" name="firstname" /><br />
     Last name: <input type="text" name="lastname" /><br />
     Sex:
     <input id="sex_male" type="radio" name="sex" value="male" />
     <label for="sex_male">Male</label>
     <input id="sex_female" type="radio" name="sex" value="female" />
     <label for="sex_female">Female</label><br />
     Password: <input type="password" name="secret" /><br />
     What do you prefer:
     <select name="image_type">
       <option>Books</option>
       <option>Cinema</option>
       <option>TV</option>
     </select>
   </p>
   <p>
     Post your photos:
     <input type="file" multiple name="photos[]">
   </p>
   <p>
     <input id="vehicle_bike" type="checkbox" name="vehicle[]" value="Bike" />
     <label for="vehicle_bike">I have a bike</label><br />
     <input id="vehicle_car" type="checkbox" name="vehicle[]" value="Car" />
     <label for="vehicle_car">I have a car</label>
   </p>
   <p>
     Describe yourself:<br />
     <textarea name="description" cols="50" rows="8"></textarea>
   </p>
   <p>
     <input type="submit" value="Submit" />
   </p>
 </fieldset>
</form>
<script>
    AJAXSubmit(myForm);
</script>
</body>
</html>
```
