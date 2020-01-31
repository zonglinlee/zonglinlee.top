---
title: responsive web design
date: 2020-01-31 09:31:49
tags:
---
- 容器块级元素自适应
```css
.container{
    width:70%;//    宽度自适应屏幕，70%
    max-width:980px; // 限定最大宽度
    min-width:320px; //
    margin: 0 auto; //居中
    img{
        width:100%; 
        //自适应父元素container,图片高度会自己调节，但是当宽度大于图片自身尺寸之后，会拉伸图片，所以推荐写成max-width:100%;这样当宽度超过图片自身宽度时图片不再变宽，就不会降低图片显示质量，它也能很好的自适应屏幕尺寸变小的情况。
        display:block;
        //图片默认inline
    }

}
```
- rem 单位：继承自html元素的font-size，一般默认16px
```css
html{
    font-size:62.5%; 
    //默认字体如果16px,则html元素的font-size现在为10px;
    //不推荐
}
```
- em 单位：如果父元素没有规定font-size，它会一直往上搜素直到body元素,继承body元素的font-size，一般默认16px.
- 如何选择字体单位
    general rule of thumb:
    - font-size: rem;
    - padding and margin: em; //这里有一个坑，就是em一般是参考父元素的font-size，但当涉及到padding和margin的时候，它是以自身元素的font-size为基准的。
    - width：em or percentage

- media query
```css
syntax:@media media-type and (media-features){ ... }
// 媒体查询顺序很重要，以下写法会导致 第一个媒体查询不起作用，会被后一个覆盖掉。
当resize了之后，css会重新进行渲染，从头至尾走一步css,只要规则匹配，后面的就会覆盖掉前面的，所以媒体查询一般都写在最后面。
@media screen and (min-width:600px){
    //当屏幕宽度大于等于600px时候
    body{
        background-color:pink;
    }
}
@media screen and (min-width:400px){
    body{
        background-color:orange;
    }
}
```

- UI设计先从移动端开始，小屏幕到大屏幕考虑。小屏幕都是竖着从上往下排列，等到屏幕宽度变大之后来一个 media query(min-width) 即可，这样可以少些好多代码
- 如果页面最先展现 图片 ，小标题来展现一些 info 信息，html 结构也应该先写标题，段落(用于展现info)，保证在没有css加载的时候逻辑顺序正确，通过css flex-box 中的order调整视觉上的布局。
