---
title: stylus
date: 2020-05-02 19:10:13
tags:
- CSS
---
stylus基本概念
- 运算符 operator
优先级从上到下依次降低
```js
[]
! ~ + -
is defined
** * / %
+ -
... ..
<= >= < >
in
== is != is not isnt
is a
&& and || or
?:
= := ?= += -= *= /= %=
not
if unless
```
- 插值 `{}`
Stylus supports interpolation by using the {} characters to surround an expression, which then becomes part of the identifier. For example
 -webkit-{'border' + '-radius'} evaluates to -webkit-border-radius.
- 后缀条件
Stylus支持后缀条件，这就意味着if和unless可以当作操作符；当右边表达式为真的时候执行左边的操作对象。
