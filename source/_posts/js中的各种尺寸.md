---
title: js中的各种尺寸
date: 2020-05-25 15:28:19
tags:
- js
---
## window.screen

A window object (obtained through `document.defaultView`) returns information about both the window and the viewport. To get the application window size use `window.outerHeight`, to get viewport size use `window.innerHeight`.

The screen object refers to the actual monitor window or desktop size.

From all this, you can determine that if you are running a full-screen browser then `window.outerHeight == window.innerHeight == screen.height`.
## 移动端滚动效果
正常的滚动：我们平时使用的scroll，包括上面讲的滚动都属于正常滚动，利用浏览器自身提供的滚动条来实现滚动，底层是由浏览器内核控制。
惯性滚动：它是一种模拟出来的滚动效果，滚动到边缘会有回弹，手指停止滑动以后还会按惯性继续滚动一会，手指快速滑动时页面也会快速滚动。而这种原生滚动容器却没有。惯性滚动带来的好处就是流畅，大大的提升了用户的体验。
惯性滚动带来的影响：
- 处于惯性滚动时，click事件将不起作用，或者更确切的说，click事件，将会被认为是，强制滚动停止的事件
- touchend触发之后，滚动并没有停止
- 滚动穿透
惯性滚动原理：
有 `iScroll` 和 `better-scroll `两个库来实现，后者是基于前者的，现在都用 `better-scroll`
+ 监听滚动元素的touchmove事件，当事件触发时修改元素的transform属性来实现元素的位移，让手指离开时触发touchend事件，然后采用requestanimationframe来在一个线型函数下不断的修改元素的transform来实现手指离开时的一段惯性滚动距离。
+ 监听滚动元素的touchmove事件，当事件触发时修改元素的transform属性来实现元素的位移，让手指离开时触发touchend事件，然后给元素一个css的animation，并设置好duration和function来实现手指离开时的一段惯性距离。

[IOS端惯性滚动的影响](http://www.zhangyunling.com/854.html)
[移动端滚动研究](https://zhuanlan.zhihu.com/p/54146685)
[掘金-BetterScroll](https://juejin.im/post/59dc572c6fb9a0450f20e40e)
[better-scroll文档](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/)
[better-scroll在Vue中的使用](https://zhuanlan.zhihu.com/p/27407024)
## 参考链接
- [元素大小和滚动](https://zh.javascript.info/size-and-scroll)